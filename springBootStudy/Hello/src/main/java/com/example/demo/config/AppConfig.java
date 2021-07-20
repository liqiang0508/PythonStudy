//package com.example.demo.config;
//
//
//import com.mongodb.client.MongoClient;
//import com.mongodb.client.MongoClients;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.mongodb.core.MongoTemplate;
//
//@Configuration
//public class AppConfig {
//
//    public @Bean
//    MongoClient mongoClient() {
//        return MongoClients.create("mongodb://Lee:201162@localhost:27017/hello");
//    }
//
//    public @Bean
//    MongoTemplate mongoTemplate() {
//        return new MongoTemplate(mongoClient(), "hello");
//    }
//}