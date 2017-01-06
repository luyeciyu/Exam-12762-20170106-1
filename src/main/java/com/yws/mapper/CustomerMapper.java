package com.yws.mapper;

import com.yws.pojo.Customer;

public interface CustomerMapper extends BaseMapper<Customer, Integer>{
	public Customer getByName(String name);
}
