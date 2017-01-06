
function formSubmit(){
	var name = $("#name").val();
	//var password = $("#password").val();
	if(trim(name) == ""){
		$("#nameError").text("用户名不能为空");
		return false;
	}
	$("#nameError").text("");

	var data = {
		name:name
	};

	//提交
	$.postJSONAsync("/Exam-12762-20170106-1/customer/login", data, function(data){
		if(typeof(data.info) != "undefined"){
			$("#nameError").text(data.info);
		}
		if(typeof(data.url) != "undefined"){
			location.href=data.url;
		}
	});

	return false;
}


