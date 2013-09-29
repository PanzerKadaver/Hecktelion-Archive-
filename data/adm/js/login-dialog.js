$(function () {
    $("#login-dialog").dialog({
	draggable:	false,
	resizable:	false,
	autoOpen:	true,
	closeOnEscape:	false,
	width:		450,
	dialogClass:	"login-c no-close",
	buttons: [{
	    text:	"Connection",
	    type:	"submit",
	    form:	"login-form",
	    disabled:	"true",
	    id:		"connect-button",
	    click:	function () {}
	}]
    });

    $("#login-form").submit(function (event) {
	event.preventDefault();
	$("#login-result").html("Connection in progress...");
	var $this = $(this);
	var newData = $this.serializeObject();
	newData.pwd = sha256_digest(newData.pwd);
	newData.timestamp = new Date().getTime();
	$.ajax({
	    url:	$this.attr("action"),
	    data:	newData,
	    success:	function (res) { result(res, newData, loginSuccess); },
	    error:	function (res) { result(res, newData, loginFailure); },
	    dataType:	"text"
	});
    });

    function loginSuccess(res, newData) {
	var callback = function (newData) {
	    setTimeout(function () {
		var url = '/panel?login=' + newData.login
		url += '&pwd=' + newData.pwd
		url += '&timestamp=' + new Date().getTime();
		open(url, '_self');
	    }, 800);
	}
	$("#login-result").html("<span class='success'>" + res + "</span>");
	$(".success").show("fade", function () {
	    callback(newData);
	});
    }

    function loginFailure(res, newData) {
	$("#login-result").html("<span class='failure'>" + res.responseText + "</span>");
	$(".failure").show("fade");
    }

    function result(res, newData, callback) {
	var c = $("#login-result").html();
	$("#login-result").html("<span class='toclear'>" + c + "</span>");
	$(".toclear").hide("fade", function () {
	    $("#login-result").html("");
	    callback(res, newData);
	});
    }

    function loginClose() {
	$(".login-c").hide("fold", { size: 40 }, 2000);
    }
});