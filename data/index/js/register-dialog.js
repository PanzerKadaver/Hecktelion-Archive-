$(function () {
    $("#register-dialog").dialog({
	draggable:	false,
	resizable:	false,
	autoOpen:	true,
	closeOnEscape:	false,
	width:		800,
	dialogClass:	"register-c",
	show: { effect: "fade", duration: 500 },
	hide: { effect: "fade", duration: 500 },
	modal: true,
	buttons: [{
	    text:	"Confirm",
	    type:	"submit",
	    form:	"register-form",
	    disable:	"true",
	    id:		"confirm-button",
	    click:	function () {}
	}]
    });


});