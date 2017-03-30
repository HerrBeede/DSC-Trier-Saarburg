// contact.js

function UICheck(Form) {
	var ret = true;
	var newfocus = null;
	if (!Form.surname.value || !ValidateNameField(Form.surname.value)) {
		newfocus = Form.surname;
		ret = false;
	}
	if (!Form.phone.value && !Form.email.value) {
		if (!newfocus)
			newfocus = Form.phone;
		ret = false;
	} else {
		if (Form.phone.value && !ValidatePhoneField(Form.phone.value)) {
			if (!newfocus)
				newfocus = Form.phone;
			ret = false;
		}
		if (Form.email.value && !ValidateEMailAddressField(Form.email.value)) {
			if (!newfocus)
				newfocus = Form.email;
			ret = false;
		}
	}
	if (!ret) {
		//document.getElementById('errmsg').style.display = "";
		$("#errmsg").css('display', 'table-row');
		if (newfocus)
			newfocus.focus();
	}
	return ret;
}

function ValidateNameField(value) {
	if (value == null)
		return false;
	var stripped = value.replace(/[\' ']/g, '');
	if (stripped.length < 3 || stripped.length > 40)
		return false;
	return true;
}

function ValidatePhoneField(value) {
	if (value == null)
		return false;
	var stripped = value.replace(/[\(\)\.\-\+\\\/\' ']/g, '');
	if (stripped.length > 20)
		return false;
	if (isNaN(parseInt(stripped)))
		return false;
	return true;
}

function ValidateEMailAddressField(value) {
	if (value == null)
		return false;
	var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (value.match(pattern))
		return true;
	return false;
}

$(function() {
	// Get the form.
	var form = $('#form_contact');
	// Attach a submit handler to the form
	$(form).submit(function(event) {

		// Stop form from submitting normally
		event.preventDefault();
		console.log('after preventDefault');
		
		if (!UICheck(this))
			return;

		// Get some values from elements on the page:
		var $form = $(this);
		
		var formData = {
			'salutation' : $('select[name=salutation] option:selected').text(),
			'prename' : $('input[name=prename]').val(),
			'surname' : $('input[name=surname]').val(),
			'phone' : $('input[name=phone]').val(),
			'mailFrom' : $('input[name=email]').val(),
			'remarks' : $('textarea[name=remarks]').val()
		};
		console.log('Posting data to server: %O', formData);

		// Send the data using post
		var url = $form.attr("action");
		var posting = $.post(url, formData);

		// Put the results in a div
		posting.done(function(data) {
			console.log('Result of posting: %0', data);
			$("input[name=sendData]").css("visibility", "hidden");
			$("#errmsg").css('display', 'none');
			$("#resultRow").css('display', 'table-row');
			$("#result").empty().append(data);
		});
		
		posting.fail(function(data) {
			console.log('Result of posting: %0', data);
			$("#errmsg").css('display', 'none');
			$("#resultRow").css('display', 'table-row');
			$("#resultRow").css('color', 'red');
			$("#result").empty().append(data);
		});
	});
});