package com.example.demo.component;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class HttpComponent {

     public JSONObject httpGet(String url) {
        RestTemplate client = new RestTemplate();
        JSONObject response = client.getForObject(url, JSONObject.class);
        return response;
    }

     public JSONObject httpPost(String url, JSONObject data) {
        RestTemplate client = new RestTemplate();
        JSONObject response = client.postForObject(url, data, JSONObject.class);
        return response;
    }
}
