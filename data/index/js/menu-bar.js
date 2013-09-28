$(function () {
    $("#register-button").click(function () {
	$("#register-dialog").dialog("open");
    });

    $("#admin").hover(
	function () { $("#adm-link").show("clip",  800); },
	function () { $("#adm-link").hide("clip",  800); }
    );
});