package com.yws.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.javassist.tools.framedump;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mysql.fabric.Response;
import com.yws.pagination.Page;
import com.yws.pagination.responsePageData;
import com.yws.pojo.Film;
import com.yws.service.FilmService;

@Controller
@RequestMapping("/film")
public class FilmController {

	@Autowired
	private FilmService filmService;
	
	@RequestMapping("/list")
	@ResponseBody
	public responsePageData pageList(Page<Film> page, Film film){
		page.setEntity(film);
		return filmService.findPage(page);
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public Map delete(Integer id){
		Map<String, String> map = new HashMap<String, String>();
 		try {
			filmService.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", "fail");
			return map;
		}
 		map.put("status", "ok");
		return map;
	}
	
	
	@RequestMapping("/update")
	@ResponseBody
	public Map update(Film film){
		Map<String, String> map = new HashMap<String, String>();
 		try {
			filmService.update(film);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", "fail");
			return map;
		}
 		map.put("status", "ok");
		return map;
	}
	
	@RequestMapping("/insert")
	@ResponseBody
	public Map insert(Film film){
		Map<String, String> map = new HashMap<String, String>();
 		try {
			filmService.insert(film);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", "fail");
			return map;
		}
 		map.put("status", "ok");
		return map;
	}
}
