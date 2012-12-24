from UI.PageControllers.BaseController import *
from Database.Instance.Model import *
from Database.Instance.Players import PlayersDbLayer

class SearchResultsController(BaseController):
    @staticmethod
    def Display(request, route):
        BaseController.importBaseController()
        dbLayer = PlayersDbLayer()
        foundPlayers = dbLayer.queryByLetter(route['searchLetter'])
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['searchResults'])
        
        
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion(),
                               queryDescription = 'Last Name of ' + route['searchLetter'] + '*',
                               playerResult=foundPlayers)
        
        
    @staticmethod
    def ByPlayerSearch(request, route):
        BaseController.importBaseController()
        dbLayer = PlayersDbLayer()            
        
        firstName = route['firstName']
        fnType = route ['fnSearch']
        
        lastName = route['lastName']
        lnType = route['lnSearch']
        
        fromYear = route['fromYear']
        fyType = route['fySearch']
        
        toYear = route['toYear']
        tyType = route['tySearch']
        
        weight = route['weight']
        wType = route['wSearch']
        
        height = route['height']
        hType = route['hSearch']
        
        birthDate = route['birthDate']
        bdayType = route['bdaySearch']
        
        foundPlayers = dbLayer.queryByDeepSearch(fnType, firstName, lnType, lastName, fyType, fromYear, tyType, toYear, wType, weight, hType, height, bdayType, birthDate)
        '''
        foundPlayers = 'FN: ' + firstName + '<br>'
        foundPlayers += 'LN: ' + lastName + '<br>'
        foundPlayers += 'FY: ' + fromYear + '<br>'
        foundPlayers += 'TY: ' + toYear + '<br>'
        foundPlayers += 'W: ' + weight + '<br>'
        foundPlayers += 'H: ' + height + '<br>'
        foundPlayers += 'BDAY: ' + birthDate
        '''
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['searchResults'])  
        
        searchParameter = '<ul>'
        for item in SearchResultsController.getDeepQueryString(route):
            searchParameter += '<li>' + item + '</li>'
        searchParameter += '</ul><br>'
                           
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion(),
                               queryDescription = 'Deep Query',
                               playerResult=foundPlayers,
                               deepQueryParameters=searchParameter)
        
    @staticmethod
    def getDeepQueryString(route):
        firstName = route['firstName']
        fnType = route ['fnSearch']
        
        lastName = route['lastName']
        lnType = route['lnSearch']
        
        fromYear = route['fromYear']
        fyType = route['fySearch']
        
        toYear = route['toYear']
        tyType = route['tySearch']
        
        weight = route['weight']
        wType = route['wSearch']
        
        height = route['height']
        hType = route['hSearch']
        
        birthDate = route['birthDate']
        bdayType = route['bdaySearch']
        
        searchDescription = []
        if not firstName == 'NULL':
            if fnType[-1:] == 'f' or fnType[-1:] == 'b':
                searchDescription.append('First name starts with ' + firstName)
                                
        if not lastName == 'NULL':
            if lnType[-1:] == 'l' or lnType[-1:] == 'b':
                searchDescription.append('Last name starts with ' + lastName)                
                
        if not fromYear == 'NULL':
            if fyType[-1:] == 'e':
                searchDescription.append('Played exactly from ' + fromYear)
            elif fyType[-1:] == 'd':
                searchDescription.append('Played during period beginning with ' + fromYear)
                
        if not toYear == 'NULL':
            if tyType[-1:] == 'e':
                searchDescription.append('Played exactly to ' + toYear)
            elif tyType[-1:] == 'd':
                searchDescription.append('Played during period ending with ' + toYear)
                
        if not weight == 'NULL':
            if wType[-1:] == 'e':
                searchDescription.append('Weighed exactly ' + weight)
            elif wType[-1:] == 'l':
                searchDescription.append('Weighed less than ' + weight)                
            elif wType[-1:] == 'h':
                searchDescription.append('Weighed more than ' + weight)
                
        if not height == 'NULL':
            if hType[-1:] == 'e':
                searchDescription.append('Stood exactly ' + height + ' inches')
            elif hType[-1:] == 's':
                searchDescription.append('Stood shorter than ' + height + ' inches')                
            elif hType[-1:] == 't':
                searchDescription.append('Stood taller than ' + height + ' inches')
                
        if not birthDate == 'NULL':
            if bdayType[-1:] == 'e':
                searchDescription.append('Was born exactly on ' + birthDate)
            elif bdayType[-1:] == 'b':
                searchDescription.append('Was born before ' + birthDate)                
            elif bdayType[-1:] == 'a':
                searchDescription.append('Was born after ' + birthDate)
                
        return searchDescription