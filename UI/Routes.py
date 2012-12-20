from routes import Mapper
map = Mapper()

# Resources
map.connect(None, "/css/{filename:.*}", controller="Resource", action="Load", base="css", conditions={"method" : "GET"})
map.connect(None, "/js/{filename:.*}", controller="Resource", action="Load", base="js", conditions={"method" : "GET"})
map.connect(None, "/img/{filename:.*}", controller="Resource", action="Load", base="img", conditions={"method" : "GET"})
map.connect(None, "/favicon.ico", controller="Resource", action="Load", base=None, filename="favicon.ico", conditions={"method" : "GET"})

# Home Page
map.connect("home", "/", controller="Main", action="Home")
map.connect("home", "/debug", controller="Main", action="Debug")
map.connect("about", "/About", controller="About", action="About")
map.connect("view", "/ViewData", controller="ViewData", action="Main")
map.connect("viewType", "/ViewData/{viewType}", controller="ViewData", action="Type")

# AJAX Requests
map.connect("HandleJQueryRequest", "", controller="AJAX", action="AJAX")