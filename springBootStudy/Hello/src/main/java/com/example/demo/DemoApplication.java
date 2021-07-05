/*
 * @Description:
 * @Author: li qiang
 * @Date: 2021-06-07 09:55:38
 * @LastEditTime: 2021-06-07 10:45:22
 */

package com.example.demo;
import com.example.utils.PersonDao;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
        PersonDao.getInstance().findAllAndRemove(query(where("name").exists(true)));
    }
}
            
