package com.yws.mapper;

import java.util.List;
import java.util.Map;

import com.yws.pagination.Page;

public interface BaseMapper<T, P> {
	//List<T> find(Page page);
	List<T> find(Map params);
	T get(P id);
	void insert(T entity);
	//void delete(P[] ids);
	void deleteById(P id);
	void update(T entity);
}
