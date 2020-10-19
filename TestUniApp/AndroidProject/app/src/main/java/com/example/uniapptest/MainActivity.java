package com.example.uniapptest;


import io.dcloud.PandoraEntry;

import android.os.Bundle;
import android.util.Log;

import java.security.PublicKey;

public class MainActivity extends PandoraEntry {

    public String TAG = "MainActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.i(TAG, "MainActivity oncreate");
    }
}
