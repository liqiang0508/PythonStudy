/*
 * @Description:
 * @Author: li qiang
 * @Date: 2021-06-07 09:55:38
 * @LastEditTime: 2021-06-07 10:45:22
 */

package com.example.demo;

import com.example.common.Greeting;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;


@SpringBootApplication
@RestController
public class DemoApplication {



    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
    }



}
            
