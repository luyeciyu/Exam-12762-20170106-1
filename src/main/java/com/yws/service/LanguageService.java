package com.yws.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yws.mapper.LanguageMapper;
import com.yws.pojo.Language;

@Service
public class LanguageService {

	@Autowired
	private LanguageMapper languageMapper;
	
	public List<Language> find(Map params){
		return languageMapper.find(params);
	}
}
