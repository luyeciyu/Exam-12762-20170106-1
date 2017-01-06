package com.yws.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yws.pojo.Customer;
import com.yws.service.CustomerService;

@Controller
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, String> login(String name, HttpSession session){
		Map<String, String> map = new HashMap<String, String>();
		Customer customer = customerService.getByName(name.trim());
		if(customer == null){
			map.put("info", "用户名错误");
		}else{
			session.setAttribute("loginFlag", "true");
			map.put("url", "film.html");
		}
		
		return map;
	}
}
