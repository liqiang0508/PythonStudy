package com.example.demo.controller;

import com.example.common.Greeting;
import com.example.common.Person;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@RestController
public class HelloController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    public Logger logger = (Logger) LoggerFactory.getLogger(getClass());

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
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

    @PostMapping("/login")
    public String login(@RequestParam("title") String title, @RequestParam("password") String Pwd) {
        log.info("login==="+title+":"+Pwd);
        if(Pwd=="123456")
        {
            return title + ":" + Pwd;
        }

        return "err login";

    }
}
