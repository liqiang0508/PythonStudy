package com.example.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.component.HttpComponent;
import com.example.demo.component.RedisComponent;
import com.example.demo.dao.PersonDao;
import com.example.demo.dao.UserDao;
import com.example.demo.model.Greeting;
import com.example.demo.model.Person;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import sun.misc.IOUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

//import com.example.demo.common.PersonDao;

@Slf4j
@RestController
public class RequestController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    public Logger logger = (Logger) LoggerFactory.getLogger(getClass());

    @Value("classpath:jsondata.json")
    private Resource areaRes;

    @Autowired
    public HttpComponent httpComponent;
    @Autowired
    public PersonDao personDao;

    @Autowired
    public UserDao userDao;

    final RedisComponent redisComponent;
    @Autowired
    public RequestController(RedisComponent redisComponent) {
        this.redisComponent = redisComponent;
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

    @GetMapping(value = "/get",produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getTest() {

        String url = "http://httpbin.org/get";
        JSONObject data = httpComponent.httpGet(url);

        return data;

    }

    @GetMapping(value = "/cityData",produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject cityData() {
        JSONObject res = new JSONObject();

        res.put("Code",0);

        try {
           String str = new String(IOUtils.readFully(areaRes.getInputStream(), -1, true));
           res.put("Data", JSON.parseObject(str, JSONArray.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }

    @GetMapping(value = "/getFile")
    public String getFile(){
        String Data = null;
        ClassPathResource classPathResource = new ClassPathResource("66.txt");
        try {
            InputStream inputStream =classPathResource.getInputStream();
            Data = new String(IOUtils.readFully(inputStream, -1, true));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Data;
    }

    @GetMapping("/redis")
    public String redis() {
        String value = "666";
        long age = new Date().getTime() / 1000;
        redisComponent.setKey("name", String.valueOf(age));
        value = redisComponent.getKey("name");
        return value;

    }

    public void SayHello(HttpServletRequest req, HttpServletResponse response) throws IOException {
        response.getWriter().write("Hello");
    }

    //返回json
    @GetMapping(value = "/hello", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        List<Person> persons = personDao.findPerson(query(where("age").gte(0)).with(Sort.by(Sort.Direction.ASC, "age")));
        return persons;
    }

    @GetMapping(value = "/getPerson/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Person getPerson(@PathVariable(value = "id") long id) {
        Person person= new Person(new Date().getTime(),"王麻子",(int)id);
        Person p = personDao.insertPerson(person);
//        System.out.println(p.toString());
        return person  ;
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

    //    文件上传
    @PostMapping("/uploadFile")
    public JSONObject UpLoadFile(@RequestParam("file") MultipartFile file, RedirectAttributes attrs) throws IOException {
        JSONObject res = new JSONObject();
        if (file.isEmpty()) {
            res.put("code",1);
            return res;
        }

        String fileName = file.getOriginalFilename();
        String fileDir = "upload/";
        File filePath = new File(ResourceUtils.getURL("classpath:").getPath());
        if (!filePath.exists())
        {
            filePath = new File("");
        }
        File upload = new File(filePath.getAbsolutePath(),fileDir);
        File dstFile = new File(filePath.getAbsolutePath(),fileDir+fileName);
        if(!upload.exists()) {
            upload.mkdirs();
        }
        try {

            res.put("code",0);
            res.put("path",fileName);
            file.transferTo(dstFile);
            attrs.addFlashAttribute("msg",fileName);
            return res;
        } catch (IOException e) {

        }
        res.put("code",2);
        return res;
    }

    //    登录
//    @PostMapping("/login")
//    public LoginResult login(@RequestParam("email") String email, @RequestParam("password") String Pwd) {
//        log.info("login===" + email + ":" + Pwd);
//        LoginResult result = new LoginResult();
//        if (Pwd.equals("123456")) {
//            result.setCode(0);
//        } else {
//            result.setCode(201);
//        }
//        return result;
//    }

}
