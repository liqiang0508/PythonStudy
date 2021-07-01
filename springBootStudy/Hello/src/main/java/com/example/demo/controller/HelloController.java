package com.example.demo.controller;

import com.example.common.Greeting;
import com.example.common.Person;
import com.mongodb.client.MongoClients;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDbFactory;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Update.update;

@Slf4j
@RestController
public class HelloController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    public Logger logger = (Logger) LoggerFactory.getLogger(getClass());

    @GetMapping("/hello")
    public Person hello(@RequestParam(value = "name", defaultValue = "World") String name) {

        MongoOperations mongoOps = new MongoTemplate(new SimpleMongoClientDbFactory(MongoClients.create(), "hello"));
        Person p = new Person();
        p.setName("lee");
        p.setAge(29);
        mongoOps.insert(p);

        // Find
        p = mongoOps.findById(p.getId(), Person.class);
        log.info("Found: " + p);

        // Update
        mongoOps.updateFirst(query(where("name").is("lee")), update("age", 35), Person.class);
        p = mongoOps.findOne(query(where("name").is("lee")), Person.class);
        log.info("Updated: " + p);

        // Delete
        //mongoOps.remove(p);
        List<Person> people =  mongoOps.findAll(Person.class);
        log.info("Number of people = : " + people.size());
        return p;//String.format("Hello %s!", name);
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
