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

    $.validator.addMethod(
	"regexp",
	function(value, element, regexp) {
	    var re = new RegExp(regexp);
	    return re.test(value);
	},
	"Invalid character in input"
    );

    $.validator.addMethod(
	"equals",
	function(value, element, eq) {
	    var eq_val = document.getElementById(eq).value;
	    return (value === eq_val);
	},
	"Fields must be equals"
    );

    var v_form = form.validate({
	success: function (label) {
	    label.addClass("valid").text("OK");
	},
	onfocusout: false,
    });

    login.rules("add", {
	required: true,
	minlength: 2,
	maxlength: 20,
	regexp: "^[a-zA-Z0-9_]+$",
	remote: {
	    url: "check-login",
	    error: function(xhr) {
		var label = $('label[for="'+login.attr('id')+'"]');
		label.removeClass("valid").addClass("error").text(xhr.responseText);
		login.removeClass("valid").addClass("error");
		v_login = false;
		validateForm();
	    }
	},
	messages: {
	    required: "Required",
	    minlength: jQuery.format("{0} characters min."),
	    maxlength: jQuery.format("{0} characters max."),
	    regexp: "Only a-z, A-Z, 0-9 or _",
	    remote: "Wrong"
	}
    });

    pwd.rules("add", {
	required: true,
	minlength: 6,
	maxlength: 16,
	regexp: "^[a-zA-Z0-9_]+$",
	equals :"reg-vpwd",
	messages: {
	    required: "Required",
	    minlength: jQuery.format("{0} characters min."),
	    maxlength: jQuery.format("{0} characters max."),
	    regexp: "Only a-z, A-Z, 0-9 or _",
	    equals: "Passwords must be equals"
	}
    });

    vpwd.rules("add", {
	required: true,
	minlength: 6,
	maxlength: 16,
	regexp: "^[a-zA-Z0-9_]+$",
	equals :"reg-pwd",
	messages: {
	    required: "Required",
	    minlength: jQuery.format("{0} characters min."),
	    maxlength: jQuery.format("{0} characters max."),
	    regexp: "Only a-z, A-Z, 0-9 or _",
	    equals: "Passwords must be equals"
	}
    });

    mail.rules("add", {
	required: true,
	email: true,
	messages: {
	    required: "Required",
	    email: "Enter a valid email address"
	}
    });

    key.rules("add", {
	required: true,
	regexp: "^[A-NP-Z0-9]{5}-[A-NP-Z0-9]{5}-[A-NP-Z0-9]{5}-[A-NP-Z0-9]{5}-[A-NP-Z0-9]{5}$",
	messages: {
	    required: "Required",
	    regexp: "Invalid key format"
	}
    });

    login.keyup(function () {
	v_login = login.valid();
	validateForm();
    });

    pwd.keyup(function () {
	v_pwd = pwd.valid();
	v_vpwd = vpwd.valid();
    });

    vpwd.keyup(function () {
	v_pwd = pwd.valid();
	v_vpwd = vpwd.valid();
	validateForm();
    });

    mail.keyup(function () {
	v_mail = mail.valid();
	validateForm();
    });

    key.keyup(function () {
	v_key = key.valid();
	validateForm();
    });

    function validateForm() {
	if (v_login && v_pwd && v_vpwd && v_mail && v_key)
	    $("#confirm-button")[0].disabled = false;
	else
	    $("#confirm-button")[0].disabled = true;
	$("#confirm-button").button("refresh");
    }
});