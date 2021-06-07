package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Router {

    @RequestMapping("/index")
    public String Index() {
        return "Index"; //
//        http://localhost:8888/Hello.html 返回static下面的静态html
//        http://localhost:8888/index      返回templates下面的动态html
    }

    @RequestMapping("/login")
    public String login() {
        return "Login";
    }


}