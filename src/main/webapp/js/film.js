var defaultPage = {
	pageNo:1,
	pageSize:10,
	pageTotal:0,
	total:0
}; 


$(function(){
	doQuery(defaultPage);
	
	$.postJSONAsync("/Exam-12762-20170106-1/language/list", {}, function(data){
		showLanguage(data, "mod_language");
		showLanguage(data, "add_language");
	});



	
});


function doQuery(dataInfo){
	
	var defaultData = {
		pageNo:1,
		pageSize:10
	};
	
	var pageParams = $.extend({}, defaultData, dataInfo);
	$.postJSONAsync("/Exam-12762-20170106-1/film/list", pageParams, function(data){
		showData(data, pageParams);
	});
	
}

function showData(data, pageParams){
	var datas = data.rows;
	var total = data.total;
	$("#myTable").empty();
	for(var i = 0;i < datas.length;i++){
		var str = "<tr>";
		str += "<td>"+datas[i].id+"</td>";
		str += "<td>"+datas[i].title+"</td>";
		str += "<td>"+datas[i].description+"</td>";
		str += "<td>"+datas[i].language.name+"</td>";
		str += "<td>"+
				"<div class=\"op\" style=\"padding-top: 0px;\"><div class=\"optarget\"><a href=\"#\"></a>" +
				" <b>" +
						"<a href=\"javascript:void(0);\" onclick=\"doModify('"+i+"');\">修改</a>" +
						"<a href=\"javascript:void(0);\" onclick=\"doDelete('"+i+"');\">删除</a>" +
						
				"</b></div></div></td>";
		str += "</tr>";
		$("#myTable").append(str);
	}

	if(datas.length > 0){
		$("#pageDiv").css("display", "block");
		defaultPage.total = total;
		defaultPage.pageTotal = Math.ceil(total/defaultPage.pageSize);
		pageList();
	}else{
		$("#pageDiv").css("display", "none");
	}
}


//pageSize改变
function pageSizeChange(){
	var currentPageSize = $("#pageSize").val();
	defaultPage.pageSize = currentPageSize;
	defaultPage.pageNo = 1;
	doQuery(defaultPage);
}

//跳转页面
function goPage(){
	var pageNum = $("#pageNum").val();
	if(pageNum > defaultPage.pageTotal){
		alert("超过总页数");
		return;
	}
	defaultPage.pageNo = pageNum;
	doQuery(defaultPage);
}


function paginationInit(total){
	var pageData = defaultPage;
	var pageList = new Array();
	var totalPage = total/(pageData.pageSize);   
}


function pageList(){

	if(defaultPage.pageTotal - defaultPage.pageNo < 2){
		showPageData(Math.max(1, defaultPage.pageTotal - 4), defaultPage.pageTotal);
	}else if(Number(defaultPage.pageNo) - 1 < 2){
		showPageData(1, Math.min(defaultPage.pageTotal, 5));
	}else{
		showPageData(Number(defaultPage.pageNo) - 2, Number(defaultPage.pageNo)  + 2);
	}

}

function showPageData(first, end){
	var ul = $("ul.pagination").empty();
	var str = "<li><a href='#'>&laquo;</a></li>";
	for(var i = first; i <= end; i++){
		if(i == defaultPage.pageNo){
			str += "<li class='active page'><a href='#'>" + i + "</a></li>"
		}else{
			str += "<li class='page'><a href='#'>" + i + "</a></li>"
		}
	}
	str += "<li><a href='#'>&raquo;</a></li>  ";
	$("ul.pagination").append(str);

	var str =  "共" + defaultPage.total + "条记录" + ", 当前页为" + defaultPage.pageNo + ", 总页数为" + defaultPage.pageTotal;
	$("#pageInfo").empty();
	$("#pageInfo").append(str);

	$("ul.pagination li.page").click(function(){
		var text = $(this).text();
		defaultPage.pageNo = text;
		doQuery(defaultPage);
	});

	$("ul.pagination li:first").click(function(){
		defaultPage.pageNo = 1;
		doQuery(defaultPage);
	});

	$("ul.pagination li:last").click(function(){
		defaultPage.pageNo = defaultPage.pageTotal;
		doQuery(defaultPage);
	});
}


function doDelete(i){
	var row=parseInt(i);
	var items_id=$("#myTable tr:eq("+row+")").find("td").eq(0).text();
	$("#deleteText").text("确认删除？");
	$("#delete_film_id").text(items_id);
	$("#deleteBox").modal("show");
}

function deleteItem(){
	var delete_film_id = $("#delete_film_id").text();
	$.postJSONAsync("/Exam-12762-20170106-1/film/delete", {id:delete_film_id}, function(data){
		if(data.status == "ok"){
			$("#deleteBox").modal('hide');
			defaultPage.pageNo = 1;
	        doQuery(defaultPage);
	     	alert("操作成功!");
		}else{
			alert("操作失败");
		}
	}, function(){
		alert("操作失败");
	});
}

function doModify(i){
	var row=parseInt(i);
	$("#modifyBox").modal("show");
	$("#mod_film_id").val($("#myTable tr:eq("+row+")").find("td").eq(0).text());
	$("#mod_film_title").val($("#myTable tr:eq("+row+")").find("td").eq(1).text());
	$("#mod_description").val($("#myTable tr:eq("+row+")").find("td").eq(2).text());
	//$("#mod_language").text($("#myTable tr:eq("+row+")").find("td").eq(3).text());


	var language=$("#myTable tr:eq("+row+")").find("td").eq(3).text();
	if(language=='')language='--请选择--';
	$("#mod_language option:contains('"+language+"')").attr("selected",true);
}


function modifyItem(){
	var mod_film_id = $("#mod_film_id").val();
	var mod_film_title = $("#mod_film_title").val(); 
	var mod_language = $("#mod_language").val(); 
	var mod_description = $("#mod_description").val(); 

	if(trim(mod_film_title) == ""){
		alert("标题不能为空！");
		return;
	}
	if(trim(mod_language) == "0"){
		alert("请选择语言");
		return;
	}


	 var params = {
		"id":mod_film_id,
		"title":mod_film_title,
		"language.id":mod_language,
		"description":mod_description
	};
	$.postJSONAsync("/Exam-12762-20170106-1/film/update", params, function(data){
		if(data.status == "ok"){
			$("#modifyBox").modal('hide');
	        doQuery(defaultPage);
	     	alert("操作成功!");
		}else{
			alert("操作失败");
		}
	}, function(){
		alert("操作失败");
	});
}

function doAdd(){
	$("#addBox").modal("show");
}

function addItem(){
	var add_film_title = $("#add_film_title").val(); 
	var add_language = $("#add_language").val(); 
	var add_description = $("#add_description").val(); 

	if(trim(add_film_title) == ""){
		alert("标题不能为空！");
		return;
	}
	if(trim(add_language) == "0"){
		alert("请选择语言");
		return;
	}


	var params = {
		"title":add_film_title,
		"language.id":add_language,
		"description":add_description
	};
	$.postJSONAsync("/Exam-12762-20170106-1/film/insert", params, function(data){
		if(data.status == "ok"){
			$("#addBox").modal('hide');
	        doQuery(defaultPage);
	     	alert("操作成功!");
		}else{
			alert("操作失败");
		}
	}, function(){
		alert("操作失败");
	});
}


function showLanguage(data, selectId){
	var htmlStr = "";
	htmlStr += "<option value=\"0\">--请选择--</option>";
	for(var i = 0;i < data.length;i++){
		htmlStr += "<option value=" + data[i].id +">" + data[i].name + "</option>";
	}
	$("#"+selectId).append(htmlStr);


}