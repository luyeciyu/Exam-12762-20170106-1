package com.yws.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yws.mapper.CustomerMapper;
import com.yws.pojo.Customer;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerMapper customerMapper;
	
	public Customer getByName(String name){
		return customerMapper.getByName(name);
	}
}
