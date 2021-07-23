package com.example.demo.dao;


import com.example.demo.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {
    @Autowired
    MongoOperations mongoOperations;


    public UserInfo findUser(Query query)
    {
        UserInfo userInfo = (UserInfo) mongoOperations.findOne(query,UserInfo.class);
        return userInfo;
    }
    public void saveUser(UserInfo userInfo)
    {
        mongoOperations.insert(userInfo);

    }


}
