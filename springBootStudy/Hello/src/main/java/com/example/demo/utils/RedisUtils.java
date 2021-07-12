package com.example.demo.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class RedisUtils {
    @Autowired
    private  StringRedisTemplate redisTemplate;

    public  void setKey(String key,String value)
    {
        redisTemplate.opsForValue().set(key,value);
    }

    public  String getKey(String key)
    {
        String value = (String) redisTemplate.opsForValue().get(key);
//        log.info("value=="+value);
        return value;
    }
}
