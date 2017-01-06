package com.yws.mapper;

import java.util.List;

import com.yws.pagination.Page;
import com.yws.pojo.Film;

public interface FilmMapper extends BaseMapper<Film, Integer>{
	public List<Film> findPage(Page<Film> page);
	public int getTotalPage(Page<Film> page);
	public void setForignKeyChech(Integer status);
}
