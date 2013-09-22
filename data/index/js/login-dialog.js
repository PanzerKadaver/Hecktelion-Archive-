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
	    form: "login-form"
	}]
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