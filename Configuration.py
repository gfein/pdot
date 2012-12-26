config = { "address" : {  "hostname" : "localhost:9000"  }  }

rootFolder = "UI\\Website\\"
pagesFolder = rootFolder + 'pages'
cssFolder = rootFolder + "css"
imgFolder = rootFolder + "img"
resourcesFolder = rootFolder + "resources"
subviewFolder = pagesFolder + "\\subviews"

webpageDirectory = {
        "home" : "main.html",
        "about" : "about.html",               
        "debug" : "debug.html",
        "error" : "error.html",
        "viewData" : "viewData.html",
        "playerProfile" : "playerProfile.html",
        "playerProfileError" : "playerProfileError.html",
        "searchResults" : "searchResults.html"           ,
        "redirect" : "redirect.html" 
}

subviewPageDirectory = {
        "playerSearchCriteria" : "playerSearchCriteria.html",
        "playerSearchByLetterCriteria" : "playerByLetterSearchCriteria.html"
}

pageControllersRoot = 'UI.PageControllers.Instance'
resourceControllerRoot = 'UI.PageControllers'

imageDirectory = {"pdotBig" : imgFolder + "pdot_big.png",
                  "pdotSmall" : imgFolder + "pdot_small.png" }

futureQuotesDirectory = 'UI/Website/resources/'
futureQuotesFile = 'futureQuotes.txt'

backupDirectory = 'Dumps/'
backupFolder = 'Recent/'

debugMode = False;
#debugMode = True;

handleJQueryRequest = 'HandleJQueryRequest'