package com.example.uniapptest;


import io.dcloud.PandoraEntry;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import com.tencent.bugly.crashreport.CrashReport;

import java.security.PublicKey;

public class MainActivity extends Activity {

    public String TAG = "MainActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        CrashReport.initCrashReport(getApplicationContext());
//        CrashReport.testJavaCrash();
////        CrashReport.postCatchedException(thr);
//        Log.i(TAG, "MainActivity oncreate");
    }
}
