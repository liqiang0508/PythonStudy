package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.thymeleaf.model.IModel;

import java.io.File;
import java.io.IOException;

@Controller
public class Router {
    // 返回template下面的Index.html
    @RequestMapping({"/login", "/"})
    public String Index() {
        return "login"; //
//        http://localhost:8888/Hello.html 返回static下面的静态html
//        http://localhost:8888/index      返回templates下面的动态html
    }

    //Test
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test(Model model) {
        model.addAttribute("msg","6666");
        return "test";
    }

    //上传成功
    @RequestMapping(value = "/uploadSuccess")
    public String uploadSuccess() {

        return "uploadSuccess";
    }
    //上传失败
    @RequestMapping(value = "/uploadError")
    public String uploadError() {

        return "uploadError";
    }

    //    文件上传
    @PostMapping("/uploadFile")
    public String UpLoadFile(@RequestParam("file") MultipartFile file, RedirectAttributes attrs) throws IOException {
        if (file.isEmpty()) {
            // return "上传失败，请选择文件";
        }

        String fileName = file.getOriginalFilename();
        String filePath = ResourceUtils.getURL("classpath:").getPath()+"upload/";
        File dest = new File(filePath + fileName);
        if (!dest.exists())
        {
            dest.mkdirs();
        }
        try {
            file.transferTo(dest);
            attrs.addFlashAttribute("msg",fileName);
            return "redirect:/uploadSuccess";
        } catch (IOException e) {

        }
        return "redirect:/uploadError";
    }

}