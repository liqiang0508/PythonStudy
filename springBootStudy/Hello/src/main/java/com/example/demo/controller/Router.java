package com.example.demo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
@Slf4j
@Controller
public class Router {
    // 返回template下面的Index.html
    @RequestMapping({"/toLogin","/"})
    public String Index() {
        return "login"; //
//        http://localhost:8888/Hello.html 返回static下面的静态html
//        http://localhost:8888/index      返回templates下面的动态html
    }
    @RequestMapping({"/index"})
    public String Home() {
        return "index";
    }

    @RequestMapping(value = "/ws")
    public String Chat() {
        return "websocket";
    }

    //Test
    @RequestMapping(value = "/test")
    public String test(Model model) {
        model.addAttribute("msg","6666");
        return "test";
    }


    @RequestMapping(value = "/changelog")
    public String changelog() {
        return "changelog";
    }
    @RequestMapping(value = "/admin")
    public String admin() {
        return "admin";
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

//    //    文件上传
//    @PostMapping("/uploadFile")
//    public String UpLoadFile(@RequestParam("file") MultipartFile file, RedirectAttributes attrs) throws IOException {
//        if (file.isEmpty()) {
//            return "redirect:/uploadError";
//        }
//
//        String fileName = file.getOriginalFilename();
//        String fileDir = "upload/";
//        File filePath = new File(ResourceUtils.getURL("classpath:").getPath());
//        if (!filePath.exists())
//        {
//            filePath = new File("");
//        }
//        File upload = new File(filePath.getAbsolutePath(),fileDir);
//        File dstFile = new File(filePath.getAbsolutePath(),fileDir+fileName);
//        if(!upload.exists()) {
//            upload.mkdirs();
//        }
//        try {
//            file.transferTo(dstFile);
//            attrs.addFlashAttribute("msg",fileName);
//            return "redirect:/uploadSuccess";
//        } catch (IOException e) {
//
//        }
//        return "redirect:/uploadError";
//    }

}