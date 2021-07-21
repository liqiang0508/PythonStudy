package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PersonDao {
    @Autowired
    MongoOperations mongoOperations;

    //插入Person
    public Person insertPerson(Person p){
        return mongoOperations.insert(p);
    }
    //查找
    public List<Person> findPerson(Query query)
    {
        List<Person> persons = mongoOperations.find(query,Person.class);
        return persons;
    }

    public List<Person> findAllAndRemove(Query query)
    {
        List<Person> persons = mongoOperations.findAllAndRemove(query,Person.class);
        return persons;
    }
}
