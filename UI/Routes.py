from routes import Mapper
map = Mapper()

# Resources
map.connect(None, "/css/{filename:.*}", controller="Resource", action="Load", base="css", conditions={"method" : "GET"})
map.connect(None, "/js/{filename:.*}", controller="Resource", action="Load", base="js", conditions={"method" : "GET"})
map.connect(None, "/img/{filename:.*}", controller="Resource", action="Load", base="img", conditions={"method" : "GET"})
map.connect(None, "/favicon.ico", controller="Resource", action="Load", base=None, filename="favicon.ico", conditions={"method" : "GET"})

# Pages from root of MainController
map.connect("home", "/", controller="Main", action="Home")
map.connect("error", "/error", controller="Main", action="Error")
map.connect("debug", "/Debug", controller="Main", action="Debug")

# Pages from root of AboutController
map.connect("about", "/About", controller="About", action="About")

# Pages from root of ViewDataController
map.connect("view", "/ViewData", controller="ViewData", action="Main")
map.connect("viewType", "/ViewData/{viewType}", controller="ViewData", action="Type")

# Pages from Player Profiles
map.connect("playerprofile", "/profile/{playerId}", controller="PlayerProfile", action="Profile")

# Search Results
map.connect("searchResults", "/search/{searchLetter}", controller="SearchResults", action="Display")

# AJAX Requests
map.connect("HandleJQueryRequest", "", controller="AJAX", action="AJAX")