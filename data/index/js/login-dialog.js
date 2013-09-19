$(function () {
    $("#login-dialog").dialog({
	draggable: false,
	resizable: false,
	autoOpen: true,
	closeOnEscape: false,
	width: 450, // px
	dialogClass: "login-c no-close",
	buttons: [{
	    text: "Connexion",
	    click: function () { loginClose(); },
	}]
    });
});