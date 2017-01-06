package com.yws.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yws.pojo.Language;
import com.yws.service.LanguageService;

@Controller
@RequestMapping("/language")
public class LanguageController {

	@Autowired
	private LanguageService languageService;
	
	@RequestMapping("/list")
	@ResponseBody
	public List<Language> find(){
		return languageService.find(null);
	}
}
