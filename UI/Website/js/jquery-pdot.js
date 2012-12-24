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

//----------------------------------------------------------------- //
//PRIME DATABASE LOGIC
//----------------------------------------------------------------- //

(function ($) {
	pageLoad_primeAllDatabases = function () {
		$('#primeDatabases_loadingGif').hide();
 }
})(jQuery);

(function ($) {
	primeAllDatabases = function () {
		if(!$('#primeDatabases_loadingGif').is("visible")) {
			$('#primeDatabases_loadingGif').fadeIn("fast");
			window.setTimeout("execute_primeAllDatabases()", 500);
			$('#primeResult').html('');
		}
 }
})(jQuery);

(function ($) {
	execute_primeAllDatabases = function () {				
		 $.ajax({
	            type: "POST",
	            url: "HandleJQueryRequest/PrimeAllDatabases",
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: function (data) {
	            	var items = '';
	            	if(data != null) {
		                $.each(data, function (key, value) {
		                	for (var i=0, len=value.length; i < len; i++) {
		                		items += ' - ' + value[i] + '<br>';
		                    }
		                });
		            	$('#primeResult').html('Priming Databases Results:<br>' + items);
	            	}
	            	$('#primeDatabases_loadingGif').fadeOut("slow");
	            },
	            error: function (request, error) {
	            	$('#primeResult').html('Priming Databases Results:<br>An error occured.  Check the logs: '+ Math.round((new Date()).getTime() / 1000));
	            	$('#primeDatabases_loadingGif').fadeOut("slow");
	            }
	        })	        	       
 }
})(jQuery);

//----------------------------------------------------------------- //
//SCRAPE BASKETBALL REFERENCE PLAYERS LOGIC
//----------------------------------------------------------------- //

(function ($) {
	pageLoad_scrapeBBRPlayers = function () {
		$('#scrapeBBRPlayers_loadingGif').hide();
}
})(jQuery);

(function ($) {
	scrapeBBRPlayers = function () {
		if(!$('#scrapeBBRPlayers_loadingGif').is("visible")) {
			$('#scrapeBBRPlayers_loadingGif').fadeIn("fast");
			window.setTimeout("execute_scrapeBBRPlayers()", 500);
			$('#scrapeBBRPlayersResult').html('');
		}
}
})(jQuery);

(function ($) {
	execute_scrapeBBRPlayers = function () {				
		 $.ajax({
	            type: "POST",
	            url: "HandleJQueryRequest/ScrapePlayersFromBBR",
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: function (data) {
	            	var items = '';
	            	if(data != null) {
	            		 $.each(data, function (key, value) {
			                	for (var i=0, len=value.length; i < len; i++) {
			                		items += value[i];
			                    }
			                });
		            	$('#scrapeBBRPlayersResult').html('<b>Scrape BBR Players Results</b>:<br>' + items);
	            	}
	            	$('#scrapeBBRPlayers_loadingGif').fadeOut("slow");
	            },
	            error: function (request, error) {
	            	$('#scrapeBBRPlayersResult').html('Scraping BBR Players Results:<br>An error occured.  Check the logs: '+ Math.round((new Date()).getTime() / 1000));
	            	$('#scrapeBBRPlayers_loadingGif').fadeOut("slow");
	            }
	        })	        	       
}
})(jQuery);

//----------------------------------------------------------------- //
// VIEW DATABASE SEARCHING
//----------------------------------------------------------------- //

(function ($) {
	pageLoad_viewData = function () {
		
	}
})(jQuery);

(function ($) {
	changeSearchContent = function (content) {
		$('#searchTypeContent').html('<center><img src="/img/gifs/loadingCircle.gif"></center>');
		$('#searchTypeTitle').text(content);		
		timeoutLength = 1000;
		
		if(content == "By Player")
			window.setTimeout('displayContentFor_ByPlayer()', timeoutLength);
		else if(content == 'View All Players By Letter')
			window.setTimeout('displayContentFor_PlayerByLetter()', timeoutLength);
		else
			window.setTimeout('displayContentFor_Default()', timeoutLength);
	}
})(jQuery);

(function ($) {
	displayContentFor_ByPlayer = function () {		
		$.ajax({
            type: "POST",
            url: "HandleJQueryRequest/GetPlayerSearchCriteria",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	var items = '';
            	if(data != null) {
            		 $.each(data, function (key, value) {		                	
		                	items += value;		                    
		                });
            		 $('#searchTypeContent').html(items);
            	}
            },
            error: function (request, error) {
            	$('#searchTypeContent').text('An error occured.  Check the logs: '+ Math.round((new Date()).getTime() / 1000));
            }
        })	        		
	}
})(jQuery);

(function ($) {
	displayContentFor_PlayerByLetter = function () {		
		$.ajax({
            type: "POST",
            url: "HandleJQueryRequest/SearchPlayerByLetter",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	var items = '';
            	if(data != null) {
            		 $.each(data, function (key, value) {		                	
		                	items += value;		                    
		                });
            		 $('#searchTypeContent').html(items);
            	}
            },
            error: function (request, error) {
            	$('#searchTypeContent').text('An error occured.  Check the logs: '+ Math.round((new Date()).getTime() / 1000));
            }
        })	        		
	}
})(jQuery);

(function ($) {
	displayContentFor_Default = function () {
		$('#searchTypeContent').text('Could not find a paradigm to search by this instance.');
	}
})(jQuery);