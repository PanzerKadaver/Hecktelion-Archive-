$(function () {
    $("#register-dialog").dialog({
	draggable:	false,
	resizable:	false,
	autoOpen:	false,
	closeOnEscape:	true,
	width:		650,
	dialogClass:	"register-c",
	show: { effect: "fold", duration: 800 },
	hide: { effect: "fold", duration: 800 },
	modal: true,
	buttons: [{
	    text:	"Confirm",
	    type:	"submit",
	    form:	"register-form",
	    disabled:	"true",
	    id:		"confirm-button",
	    click:	function () {}
	}]
    });

    $("#register-form").submit(function (event) {
	event.preventDefault();
	$("#register-result").html("Registration in progress...");
	var $this = $(this);
	var time = new Date().getTime();
	var newData = $this.serializeObject();
	newData.pwd = sha256_digest(newData.pwd);
	newData.vpwd = sha256_digest(newData.vpwd);
	newData.timestamp = time;
	$.ajax({
	    url : $this.attr("action"),
	    data: newData,
	    success: function (res) { result(res, regSuccess); },
	    error: function (res) { result(res, regFailure); },
	    dataType: "text"
	});
    });

    function regSuccess(res) {
	$("#register-result").html("<span class='success'>" + res + "</span>");
	$(".success").show("fade");
    }

    function regFailure(res) {
	$("#register-result").html("<span class='failure'>" + res.responseText + "</span>");
	$(".failure").show("fade");
    }

    function result(res, callback) {
	var c = $("#register-result").html();
	$("#register-result").html("<span class='toclear'>" + c + "</span>");
	$(".toclear").hide("fade", function () {
	    $("#register-result").html("");
	    callback(res);
	});
    }
});