package com.example.demo.config;

import com.example.demo.dao.UserDao;
import com.example.demo.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public UserDao userDao;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/", "/layui/**","font-awesome-4.7.0/**", "/**/*.png","/**/*.jpg","/**/*.ico","/**/*.html","/**/*.css", "/**/*.json","/**/*.js","/**/*.svg").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/toLogin")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/admin")
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and().csrf().disable();

        //防止iframe不能访问
        http.headers().frameOptions().disable();



    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            System.out.println("username======"+username);
            UserInfo user = userDao.findUser(query(where("username").is(username)));
            if (user == null ) {
//                System.out.println("username======2"+username);
                throw new UsernameNotFoundException("用户名未找到");
            }
            String password = user.getPassword();

            PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            String passwordAfterEncoder = passwordEncoder.encode(password);
            return User.withUsername(username).password(passwordAfterEncoder).roles("").build();
        };
    }

}

