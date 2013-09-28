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
	$.ajax({
	    url:	$this.attr("action"),
	    data:	newData,
	    success:	function (res) { result(res, loginSuccess); },
	    error:	function (res) { result(res, loginFailure); },
	    dataType:	"text"
	});
    });

    function loginSuccess(res) {
	$("#login-result").html("<span class='success'>" + res + "</span>");
	$(".success").show("fade");
    }

    function loginFailure(res) {
	$("#login-result").html("<span class='failure'>" + res.responseText + "</span>");
	$(".failure").show("fade");
    }

    function result(res, callback) {
	var c = $("#login-result").html();
	$("#login-result").html("<span class='toclear'>" + c + "</span>");
	$(".toclear").hide("fade", function () {
	    $("#login-result").html("");
	    callback(res);
	});
    }

    function loginClose() {
	$(".login-c").hide("fold", { size: 40 }, 2000);
    }
});