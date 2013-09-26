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
	}],
	close: function () { cleanForm() },
	open: function () { cleanForm() }
    });

    $("#register-button").click(function () {
	$("#register-dialog").dialog("open");
    });

    function cleanForm () {
	$("#register-form").find(":input").each(function () {
	    $(this).val("");
	});
    }
});