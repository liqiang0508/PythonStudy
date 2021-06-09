package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Router {
// 返回template下面的Index.html
    @RequestMapping({"/index","/"})
    public String Index() {
        return "Index"; //
//        http://localhost:8888/Hello.html 返回static下面的静态html
//        http://localhost:8888/index      返回templates下面的动态html
    }
    // 返回template下面的Login.html
    @RequestMapping(value = "/login",method = RequestMethod.GET )
    public String login() {
        return "Login";
    }

    // 返回template下面的bootStrapLogin.html
    @RequestMapping(value = "/blogin",method = RequestMethod.GET )
    public String blogin() {
        return "bootStrapLogin";
    }


}