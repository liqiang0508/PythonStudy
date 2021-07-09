package com.example.utils;


import com.alibaba.fastjson.JSONObject;
import org.springframework.web.client.RestTemplate;

public class HttpUtils {

    static public JSONObject httpGet(String url) {
        RestTemplate client = new RestTemplate();
        JSONObject response = client.getForObject(url, JSONObject.class);
        return response;
    }

    static public JSONObject httpPost(String url, JSONObject data) {
        RestTemplate client = new RestTemplate();
        JSONObject response = client.postForObject(url, data, JSONObject.class);
        return response;
    }
}
