/*
 * @Description: 
 * @Author: li qiang
 * @Date: 2021-06-07 10:44:17
 * @LastEditTime: 2021-06-07 10:44:18
 */
package com.example.demo.common;

public class Greeting {

	public  long id;
	public  String content;

	public Greeting(long id, String content) {
		this.id = id;
		this.content = content;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}