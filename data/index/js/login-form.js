$(function () {
    var form = $("#login-form")
    var login = $("#login");
    var pwd = $("#pwd");
    var v_login = false;
    var v_pwd = false;

    form.validate();

    login.rules("add", {
	required: true,
	messages: {
	    required: "Enter your login"
	}
    });

    pwd.rules("add", {
	required: true,
	messages: {
	    required: "Enter your password"
	}
    });

    login.keyup(function () {
	v_login = login.valid();
	formValidation();
    });

    pwd.keyup(function () {
	v_pwd = pwd.valid();
	formValidation();
    });

    $("form").submit(function (event) {
	event.preventDefault();
	$("#login-result").html("Connection in progress...");
	var $this = $(this);
	$.ajax({
	    url : $this.attr("action"),
	    data: $this.serialize(),
	    success: function (res) { result(res, loginSuccess); },
	    error: function (res) { result(res, loginFailure); },
	    dataType: "text"
	});
    });

    function formValidation() {
	if (v_login && v_pwd)
	    document.getElementById("connect-button").disabled = false;
	else
	    document.getElementById("connect-button").disabled = true;
	$("#connect-button").button("refresh");
    }
});