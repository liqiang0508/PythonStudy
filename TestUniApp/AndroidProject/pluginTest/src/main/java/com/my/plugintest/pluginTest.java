package com.my.plugintest;

import android.content.Intent;
import android.util.Log;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

public class pluginTest extends WXModule{

    String TAG = "TestModule";

    //run ui thread
    @JSMethod(uiThread = true)
    public void testAsyncFunc(JSONObject options, JSCallback callback) {
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
    @JSMethod (uiThread = false)
    public JSONObject testSyncFunc(){
        JSONObject data = new JSONObject();
        data.put("code", "success");
        return data;
    }


}
