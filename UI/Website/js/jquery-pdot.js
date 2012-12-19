(function ($) {
    testAlert = function () {
		alert('Don\'t touch that');
    }
})(jQuery);

(function ($) {
	testAjax = function () {
		var ts = Math.round((new Date()).getTime() / 1000);
		 $.ajax({
	            type: "POST",
	            url: "HandleJQueryRequest/GetUnixTime",
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: function (data) {
	            	var items;
	            	if(data != null) {
		                $.each(data, function (key, value) {
		                    items = value + '';
		                });
		            	$('#pingResult').val('Time taken: ' + (items - ts));
	            	}
		 			else {
		 				alert('Success, but null response');
		 			}
	            },
	            error: function (request, error) {
	            	alert('Ajax Result: Failure');
	            }
	        })	        	       
    }
})(jQuery);