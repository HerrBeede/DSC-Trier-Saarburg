// global.js

function GetBrowser() {
	if (navigator.appName.indexOf("Internet Explorer") != -1)
		browser = "ie";
	else if (navigator.userAgent.indexOf("Firefox") != -1)
		browser = "ff";
	else if (navigator.userAgent.indexOf("Netscape") != -1)
		browser = "ns";
	else if (navigator.userAgent.indexOf("Opera") != -1)
		browser = "op";
	else if (navigator.userAgent.indexOf("Safari") != -1)
		browser = "sf";
	else
		browser = "?";

	return browser;
}

function setErrFocus() {
	if (id = $("#errFocus").val()) {
		$("#" + id).focus().select();
	}
}

function setErrHighlight() {
	if (ids = $("#errHighlight").val()) {
		var idsArray = ids.split(",");
		for ( var i = 0; i < idsArray.length; i++) {
			$("#" + idsArray[i]).addClass("errHighlight");
		}
	}
}

// check if element is (vertical) on screen 
$.fn.isOnScreen = function() {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

function setPageFocus() {
	if ($("input.focus:visible:enabled").length) {
		$("input.focus:visible:enabled:first").focus().select();
	} else {
		$("input:text,input:password,textarea")
				.filter(":visible:enabled:first").focus().select();
	}
}

// input key validation: onkeypress
function getKeyCode(e) {
	var keyCode = window.event ? event.keyCode : e.which ? e.which
			: e.keyCode ? e.keyCode : e.charCode;

	return keyCode;
}

function isNumericChar(e) {
	var charCode = getKeyCode(e);

	// only accept numeric characters
	if (charCode >= 32 && charCode < 48)
		return false;
	else if (charCode > 57)
		return false;

	return true;
}

function isDoubleUnsignedChar(e) {
	var charCode = getKeyCode(e);

	// only accept valid real number characters, excluding negative sign
	if (isNumericChar(e) || charCode == 44 || charCode == 46)
		return true;

	return false;
}

function isDoubleChar(e) {
	var charCode = getKeyCode(e);

	// only accept valid real number characters
	if (isDoubleUnsignedChar(e) || charCode == 45)
		return true;

	return false;
}

function isAlphaNumericChar(e) {
	var charCode = getKeyCode(e);

	// only accept alphanumeric characters
	if (charCode >= 32 && charCode < 48)
		return false;
	else if (charCode > 57 && charCode < 65)
		return false;
	else if (charCode > 90 && charCode < 97)
		return false;
	else if (charCode > 122)
		return false;

	return true;
}

function isDateChar(e) {
	var charCode = getKeyCode(e);

	// only accept valid date characters
	if (isNumericChar(e) || charCode == 45 || charCode == 46 || charCode == 47)
		return true;

	return false;
}

function showSize() {
	var w = $(window).width();
	var h = $(window).height();
	alert("w*h: " + w + " * " +h);
}

function cancelEventBubble(evt) {
	if (evt && evt.stopPropagation)
		evt.stopPropagation();
	else if (window.event)
		window.event.cancelBubble = true; // for IE
}

function saveScrollPosition() {
	if($("#formOrder\\:scrollPosition").length) {
		$("#formOrder\\:scrollPosition").val($(window).scrollTop());
	}
}

function setScrollPosition() {
	if($("#formOrder\\:scrollPosition").length) {
		var pos = $("#formOrder\\:scrollPosition").val();
		if(pos.length) {
			//window.scrollTo(0,pos);
			$('html, body').animate({scrollTop: pos}, 'slow');
		}
	}
}

$(function() {
	$('a[href*=#]').click(
			function() {
				if (location.pathname.replace(/^\//, '') == this.pathname
						.replace(/^\//, '')
						&& location.hostname == this.hostname) {
					var $target = $(this.hash);
					$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
					if ($target.length) {
						var targetOffset = $target.offset().top;
						$('html,body').animate({
							scrollTop : targetOffset
						}, 1000);
						return false;
					}
				}
			});
});


var maxWidth = 9999;

function checkWidth() {
	var toggle = false;
	
	if (window.matchMedia("(max-device-width: 762px) and (orientation: landscape)").matches) {
		if (maxWidth != 950) {
			toggle = true;
			maxWidth = 950;
		}
		console.log('1. landscape in checkWidth()->maxWidth: ' + maxWidth);
	}
	else if (window.matchMedia("(max-device-width: 480px) and (orientation: portrait)").matches) {
		if (maxWidth != 574) {
			toggle = true;
			maxWidth = 574;
		}
		console.log('2. portrait in checkWidth()->maxWidth: ' + maxWidth);
	}	
	else if (window.matchMedia("(max-width: 574px)").matches) {
		if (maxWidth != 574) {
			toggle = true;
			maxWidth = 574;
		}
	}	
	else if (window.matchMedia("(max-width: 762px)").matches) {
		if (maxWidth != 762) {
			toggle = true;
			maxWidth = 762;
		}
	}
	else if (window.matchMedia("(max-width: 950px)").matches) {
		if (maxWidth != 950) {
			toggle = true;
			maxWidth = 950;
		}
	}
	else if (window.matchMedia("(max-width: 1138px)").matches) {
		if (maxWidth != 1138) {
			toggle = true;
			maxWidth = 1138;
		}
	}
	else {
		if (maxWidth != 9999) {
			toggle = true;
			maxWidth = 9999;
		}
	}
	
	if (toggle) {
		console.log('3. toggle in checkWidth()->maxWidth: ' + maxWidth);
		if (typeof contentSliderChangeWidth == 'function') {
			contentSliderChangeWidth(maxWidth);
		}
		if (typeof horizontalSliderChangeWidth == 'function') {
			horizontalSliderChangeWidth(maxWidth);
		}
	}
	
	return maxWidth;
}

$(window).load(function() {
	setScrollPosition();
	
	console.log('in load()->maxWidth: ' + maxWidth);
	checkWidth();
	
	window.addEventListener("orientationchange", function() {
		checkWidth();
	}, true);	
	
	window.addEventListener('resize', function() {
		checkWidth();
    }, true);
	
	
	var e = $(document).scrollTop();
	var t = $('#div_menu').outerHeight();
	
	$(window).scroll(function () {
		var n = $(document).scrollTop();

		if (n > t) {
	        $('#div_menu').addClass('hide');
	        $('#div_menu').removeClass('show');
	    } else {
	        $('#div_menu').removeClass('hide');
	    }
	
	    if (n > e) {
	        $('#div_menu').removeClass('show');
	    } else {
	        $('#div_menu').addClass('show');
	        $('#div_menu').removeClass('hide');
	    }
	
	    e = $(document).scrollTop();
	  });
	
});



