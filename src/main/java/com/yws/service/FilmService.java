package com.yws.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yws.mapper.FilmMapper;
import com.yws.pagination.Page;
import com.yws.pagination.responsePageData;
import com.yws.pojo.Film;

@Service
public class FilmService {
	
	@Autowired
	private FilmMapper filmMapper;
	
	public responsePageData<Film> findPage(Page<Film> page){
		List<Film> films = filmMapper.findPage(page);
		int total = filmMapper.getTotalPage(page);
		responsePageData<Film> pageData = new responsePageData<>();
		pageData.setRows(films);
		pageData.setTotal(total);
		return pageData;
	}
	
	public void delete(Integer id){
		filmMapper.setForignKeyChech(0);   //mysql 外键约束失效
		filmMapper.deleteById(id);
		filmMapper.setForignKeyChech(1);   //mysql 外键约束启用
	}
	
	public void update(Film film){
		filmMapper.update(film);
	}
	
	public void insert(Film film){
		filmMapper.insert(film);
	}
}
