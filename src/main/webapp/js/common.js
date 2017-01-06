//去除空格
function trim(s) {
	return trimRight(trimLeft(s));
}
// 去掉左边的空白
function trimLeft(s) {
	if (s == null) {
		return "";
	}
	var whitespace = new String(" \t\n\r");
	var str = new String(s);
	if (whitespace.indexOf(str.charAt(0)) != -1) {
		var j = 0, i = str.length;
		while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
			j++;
		}
		str = str.substring(j, i);
	}
	return str;
}
// 去掉右边的空白
function trimRight(s) {
	if (s == null)
		return "";
	var whitespace = new String(" \t\n\r");
	var str = new String(s);
	if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
		var i = str.length - 1;
		while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
			i--;
		}
		str = str.substring(0, i + 1);
	}
	return str;
}


$.postJSONAsync = function(url, data, callback, errorFun) {
	return $.ajax({
		'type' : 'POST',
		'url' : url,
		'data' : data,
		'dataType' : 'json',
		'async': false
	}).done(callback).fail(errorFun);
};

// $.$.ajax({
// 	url: '/path/to/file',
// 	type: 'default GET (Other values: POST)',
// 	dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
// 	data: {param1: 'value1'},
// })
// .done(function() {
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });
