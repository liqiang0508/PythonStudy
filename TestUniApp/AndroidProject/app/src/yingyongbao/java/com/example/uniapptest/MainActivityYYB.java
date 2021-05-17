package com.example.uniapptest;


import io.dcloud.PandoraEntry;

import android.os.Bundle;
import android.util.Log;

import com.tencent.bugly.crashreport.CrashReport;

import java.security.PublicKey;

public class MainActivityYYB extends PandoraEntry {

    public String TAG = "MainActivityYYB";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        CrashReport.initCrashReport(getApplicationContext());
        CrashReport.testJavaCrash();
//        CrashReport.postCatchedException(thr);
        Log.i(TAG, "MainActivity oncreate");
    }
}
