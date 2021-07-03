package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Router {
    // 返回template下面的Index.html
    @RequestMapping({"/login", "/"})
    public String Index() {
        return "login"; //
//        http://localhost:8888/Hello.html 返回static下面的静态html
//        http://localhost:8888/index      返回templates下面的动态html
    }

    // 返回template下面的Login.html
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String login() {
        return "test";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home() {
        return "home";
    }

}