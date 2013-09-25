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