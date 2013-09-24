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
	    type: "submit",
	    form: "login-form",
	    disabled: "true",
	    id: "connect-button"
	}]
    });

    var form = $("#login-form")

    form.validate();
 
    $("#login").keyup(function () {
	if (form.valid())
	    document.getElementById("connect-button").disabled = false;
	else
	    document.getElementById("connect-button").disabled = true;
	$("#connect-button").button("refresh")
    });

    $("#pwd").keyup(function () {
	if (form.valid())
	    document.getElementById("connect-button").disabled = false;
	else
	    document.getElementById("connect-button").disabled = true;
	$("#connect-button").button("refresh")
    });

    $("form").submit(function (event) {
	event.preventDefault();
	var $this = $(this);
	$.ajax({
	    url : $this.attr("action"),
	    data: $this.serialize(),
	    success: function (data) { alert('success: \n' + data); },
	    error: function (a, b, c) { alert('error: \n' + a.responseText); },
	    dataType: "text"
	});
    });
});

function loginClose() {
    $(".login-c").hide("fold", { size: 40 }, 2000);
}