from routes import Mapper
map = Mapper()

# Resources
map.connect(None, '/css/{filename:.*}', controller='Resource', action='Load', base='css', conditions={'method' : 'GET'})
map.connect(None, '/js/{filename:.*}', controller='Resource', action='Load', base='js', conditions={'method' : 'GET'})
map.connect(None, '/img/{filename:.*}', controller='Resource', action='Load', base='img', conditions={'method' : 'GET'})
map.connect(None, '/favicon.ico', controller='Resource', action='Load', base=None, filename='favicon.ico', conditions={'method' : 'GET'})

# Pages from root of MainController
map.connect('home', '/', controller='Main', action='ViewHome')
map.connect('error', '/error', controller='Main', action='ViewError')
map.connect('databaseUtilities', '/DatabaseUtilities', controller='Main', action='ViewDatabaseUtilities')

# Pages from root of AboutController
map.connect('about', '/About', controller='About', action='ViewAbout')

# Pages from root of ViewDataController
map.connect('viewPlayerData', '/PlayerData', controller='ViewPlayerData', action='ViewMain')
map.connect('viewType', '/PlayerData/{viewType}', controller='ViewPlayerData', action='ViewType')

# Pages from Player Profiles
map.connect('playerprofile', '/profile/{playerId}', controller='PlayerProfile', action='ViewProfile')

# Search Results
map.connect('searchLetterIndex', '/index/{searchLetter}/', controller='SearchResults', action='ViewDisplay', requirements={'searchLetter':'[A-Za-z]'})
map.connect('deepSearch', 
            '/search/{fnSearch}/{firstName}/{lnSearch}/{lastName}/{fySearch}/{fromYear}/{tySearch}/{toYear}/{wSearch}/{weight}/{hSearch}/{height}/{bdaySearch}/{birthDate}/',
            controller='SearchResults', 
            action='ViewByPlayerSearch',
             requirements= {'fnSearch':'(fN_[f,l,b]){1}',
                            'lnSearch':'(lN_[f,l,b]){1}',
                            'fySearch':'(fY_[e,d]){1}',
                            'tySearch':'(tY_[e,d]){1}',
                            'wSearch':'(w_[e,l,h]){1}',
                            'hSearch':'(h_[e,s,t]){1}',
                            'bdaySearch':'(bday_[e,b,a]){1}'})


# DOM Window Controller
#map.connect('/dom/{filename:.*}', controller='DOM', action='Filter')
map.connect(None, '/dom/{filename:.*}', controller='Resource', action='Load', base='dom', conditions={'method':'GET'})

# Redirects
map.connect('indexRedirect', '/index', controller='Redirect', action='ViewData')
map.connect('indexRedirect', '/index/', controller='Redirect', action='ViewData')
map.connect('indexRedirect', '/index/{searchLetter}/{junk}', controller='Redirect', action='searchLetterIndex', requirements={'searchLetter':R'\w'})