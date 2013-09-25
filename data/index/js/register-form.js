$(function () {
    var form = $("#register-form");
    var login = $("#reg-login");
    var pwd = $("#reg-pwd");
    var vpwd = $("#reg-vpwd");
    var mail = $("#reg-mail");
    var key = $("#reg-key");
    var v_login = false
    var v_pwd = false
    var v_vpwd = false
    var v_mail = false;
    var v_key = false;
    var v_check = true;

    form.validate();

    login.rules("add", {
	required: true,
	minlength: 3,
	maxlength: 20,
	messages: {
	    required: "Required",
	    minlength: jQuery.format("{0} characters min."),
	    maxlength: jQuery.format("{0} characters max.")
	}
    });

    login.keyup(function () {
	v_login = login.valid();
    });
});