package com.example.demo.common;

import com.example.demo.model.Person;
import com.mongodb.client.MongoClients;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonDao {
//    private static PersonDao instance;
//    private PersonDao(){}
//    public static synchronized PersonDao getInstance() {
//        if (instance == null) {
//            instance = new PersonDao();
//        }
//        return instance;
//    }
    private final MongoOperations mongoOps = new MongoTemplate(new SimpleMongoClientDatabaseFactory(MongoClients.create(), "hello"));

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
