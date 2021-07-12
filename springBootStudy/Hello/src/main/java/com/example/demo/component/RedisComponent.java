package com.example.demo.component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class RedisComponent {

    final   StringRedisTemplate redisTemplate;
    @Autowired
    public RedisComponent(StringRedisTemplate redisTemplate)
    {
        this.redisTemplate = redisTemplate;
    }
    public  void setKey(String key,String value)
    {
        redisTemplate.opsForValue().set(key,value);
    }

    public  String getKey(String key)
    {
        return redisTemplate.opsForValue().get(key);
    }
}
