package com.yws.pagination;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Page<T> {
    private int pageNo = 1;			//页码，默认是第一页
    private int pageSize = 10;		//每页显示的记录数，默认是10
    private T entity;
	

    
    public int getFirst(){   //mysql 计算limit开始的记录
    	return (pageNo-1)*pageSize;
    }
    
    public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public T getEntity() {
		return entity;
	}

	public void setEntity(T entity) {
		this.entity = entity;
	}

	@Override
	public String toString() {
		return "Page [pageNo=" + pageNo + ", pageSize=" + pageSize + ", entity=" + entity + "]";
	}



    
    
    
    
}
