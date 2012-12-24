from routes import Mapper
map = Mapper()

# Resources
map.connect(None, '/css/{filename:.*}', controller='Resource', action='Load', base='css', conditions={'method' : 'GET'})
map.connect(None, '/js/{filename:.*}', controller='Resource', action='Load', base='js', conditions={'method' : 'GET'})
map.connect(None, '/img/{filename:.*}', controller='Resource', action='Load', base='img', conditions={'method' : 'GET'})
map.connect(None, '/favicon.ico', controller='Resource', action='Load', base=None, filename='favicon.ico', conditions={'method' : 'GET'})

# Pages from root of MainController
map.connect('home', '/', controller='Main', action='Home')
map.connect('error', '/error', controller='Main', action='Error')
map.connect('debug', '/Debug', controller='Main', action='Debug')

# Pages from root of AboutController
map.connect('about', '/About', controller='About', action='About')

# Pages from root of ViewDataController
map.connect('view', '/ViewData', controller='ViewData', action='Main')
map.connect('viewType', '/ViewData/{viewType}', controller='ViewData', action='Type')

# Pages from Player Profiles
map.connect('playerprofile', '/profile/{playerId}', controller='PlayerProfile', action='Profile')

# Search Results
map.connect('searchLetterIndex', '/index/{searchLetter}/', controller='SearchResults', action='Display', requirements={'searchLetter':'[A-Za-z]'})
map.connect('deepSearch', 
            '/search/{fnSearch}/{firstName}/{lnSearch}/{lastName}/{fySearch}/{fromYear}/{tySearch}/{toYear}/{wSearch}/{weight}/{hSearch}/{height}/{bdaySearch}/{birthDate}/',
            controller='SearchResults', 
            action='ByPlayerSearch',
             requirements= {'fnSearch':'(fN_[f,l,b]){1}',
                            'lnSearch':'(lN_[f,l,b]){1}',
                            'fySearch':'(fY_[e,d]){1}',
                            'tySearch':'(tY_[e,d]){1}',
                            'wSearch':'(w_[e,l,h]){1}',
                            'hSearch':'(h_[e,s,t]){1}',
                            'bdaySearch':'(bday_[e,b,a]){1}'})


# AJAX Requests
map.connect('HandleJQueryRequest', '', controller='AJAX', action='AJAX')

# Redirects
map.connect('indexRedirect', '/index', controller='Redirect', action='ViewData')
map.connect('indexRedirect', '/index/', controller='Redirect', action='ViewData')
map.connect('indexRedirect', '/index/{searchLetter}/{junk}', controller='Redirect', action='searchLetterIndex', requirements={'searchLetter':R'\w'})