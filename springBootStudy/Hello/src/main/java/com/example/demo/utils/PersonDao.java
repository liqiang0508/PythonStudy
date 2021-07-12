package com.example.demo.utils;

import com.example.demo.common.Person;
import com.mongodb.client.MongoClients;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class PersonDao {
    private static PersonDao instance;
    private PersonDao(){}
    public static synchronized PersonDao getInstance() {
        if (instance == null) {
            instance = new PersonDao();
        }
        return instance;
    }
    private static MongoOperations mongoOps = new MongoTemplate(new SimpleMongoClientDatabaseFactory(MongoClients.create(), "hello"));

//Find
//p = mongoOps.findById(p.getId(), Person.class);
//log.info("Found: " + p);
//
//Update
//mongoOps.updateFirst(query(where("name").is("lee")), update("age", 35), Person.class);
// p = mongoOps.findOne(query(where("name").is("lee")), Person.class);
//log.info("Updated: " + p);
//
//Delete
//mongoOps.remove(p);
//List<Person> students =  mongoOps.findAllAndRemove(query(where("name").is("lee")),Person.class);
//List<Person> people =  mongoOps.findAll(Person.class);
//log.info("Number of people = : " + people.size());
//return p;

    //插入Person
    public void insertPerson(Person p){
        mongoOps.insert(p);
    }
    //查找
    public List<Person> findPerson(Query query)
    {
        List<Person> persons = mongoOps.find(query,Person.class);
        return persons;
    }

    public List<Person> findAllAndRemove(Query query)
    {
        List<Person> persons = mongoOps.findAllAndRemove(query,Person.class);
        return persons;
    }
}
