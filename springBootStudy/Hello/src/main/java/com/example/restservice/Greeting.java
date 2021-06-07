/*
 * @Description: 
 * @Author: li qiang
 * @Date: 2021-06-07 10:44:17
 * @LastEditTime: 2021-06-07 10:44:18
 */
package com.example.restservice;

public class Greeting {

	private final long id;
	private final String content;

	public Greeting(long id, String content) {
		this.id = id;
		this.content = content;
	}

	public long getId() {
		return id;
	}

	public String getContent() {
		return content;
	}
}