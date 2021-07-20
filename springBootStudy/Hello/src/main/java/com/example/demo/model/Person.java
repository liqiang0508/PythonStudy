package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Person {
//    @JsonIgnore //类返回json的时候过滤掉这个属性
    private long id;
    private String name;
    private int age;

}
