package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.common.Greeting;
import com.example.demo.common.LoginResult;
import com.example.demo.common.Person;
import com.example.demo.utils.HttpUtils;
import com.example.demo.utils.PersonDao;
import com.example.demo.utils.RedisUtils;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

//import com.example.demo.utils.PersonDao;

@Slf4j
@RestController
public class HelloController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    public Logger logger = (Logger) LoggerFactory.getLogger(getClass());

    final RedisUtils redisUtils;
    @Autowired
    public HelloController(RedisUtils redisUtils) {
        this.redisUtils = redisUtils;
    }
    @GetMapping("/666")
    public void Test(HttpServletRequest req, HttpServletResponse response) {

        String action = req.getParameter("actiond");//反射
        try {
            Method method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this, req, response);
        } catch (Exception e) {
            log.info("action==" + action + "  not fond");
        }
    }

    @GetMapping("/get")
    public JSONObject getTest() {

        String url = "http://httpbin.org/get";
        JSONObject data = HttpUtils.httpGet(url);
        return data;

    }

    @GetMapping("/redis")
    public String redis() {
        String value = "666";
        long age = new Date().getTime()/1000;
        redisUtils.setKey("name", String.valueOf(age));
        value = redisUtils.getKey("name");
        return value;

    }

    public void SayHello(HttpServletRequest req, HttpServletResponse response) throws IOException {
        log.info("SayHello");
        response.getWriter().write("Hello");
    }

    @GetMapping("/hello")
    public List<Person> hello(@RequestParam(value = "name", defaultValue = "World") String name) {

//        Person p = new Person();
//        p.setName("lee");
//
//        long age = new Date().getTime()/1000;
//        //log.info("age=="+age);
//        p.setAge((int)age);
//       //
//        PersonDao.getInstance().insertPerson(p);

        List<Person> persons = PersonDao.getInstance().findPerson(query(where("age").gte(0)).with(Sort.by(Sort.Direction.ASC,"age")));
        return persons;
    }

    //用类来接收参数
    @GetMapping("/greeting")
    public Greeting greeting(Person person) {
        return new Greeting(counter.incrementAndGet(), String.format(template, person.toString()));
    }

    @GetMapping("getTime")
    public long getTime() {
        long time = new Date().getTime();
        return time;
    }

    //    登录
    @PostMapping("/login")
    public LoginResult login(@RequestParam("email") String email, @RequestParam("password") String Pwd) {
        log.info("login===" + email + ":" + Pwd);
        LoginResult result = new LoginResult();
        if (Pwd.equals("123456")) {
            result.setCode(0);
        } else {
            result.setCode(201);
        }
        return result;
    }

}
