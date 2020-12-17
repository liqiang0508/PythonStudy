package com.my.plugintest;

import android.content.Intent;
import android.util.Log;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.bridge.JSCallback;


import io.dcloud.feature.uniapp.annotation.UniJSMethod;
import io.dcloud.feature.uniapp.bridge.UniJSCallback;
import io.dcloud.feature.uniapp.common.UniModule;

public class pluginTest extends UniModule {

    String TAG = "TestModule";

    //run ui thread
    @UniJSMethod(uiThread = true)
    public void testAsyncFunc(JSONObject options, UniJSCallback callback) {
        Log.e(TAG, "testAsyncFunc--"+options);
        if(callback != null) {
            JSONObject data = new JSONObject();
            data.put("code", "success");
            data.put("name", options.get("name"));
            data.put("age", options.get("age"));
            callback.invoke(data);
            //callback.invokeAndKeepAlive(data);
        }
    }

    //run JS thread
    @UniJSMethod (uiThread = false)
    public JSONObject testSyncFunc(){
        JSONObject data = new JSONObject();
        data.put("code", "success");
        return data;
    }


}
