from webob import Response
from Services.Routes import *
import json
from Util.Switch import *

class ServiceRouter:
    K_RESULT = 'result'
    
    def __init__(self, request):
        self.request = request
        
    def __call__(self):
        serviceName = self.request.path[21:]
        serviceRoute = routes[serviceName]
        response = Response()
        response.status = 200        
        
        for case in Switch(serviceRoute):
            if case(GetUnixTimeRoute):
                response = self.handleUnixTimeService(response)
                break
            if case(PrimeAllDatabasesRoute):
                response = self.handlePrimeAllDatabasesService(response)
                break
            if case(ScrapePlayersFromBBRRoute):
                response = self.handleScrapeAllPlayersFromBBRService(response)
                break
            if case(GetPlayerSearchCriteriaRoute):
                response = self.handleGetPlayerSearchCriteria(response)
                break;
            if case(SearchPlayerByLetterRoute):
                response = self.handleSearchPlayerByLetter(response)
                break;
            if case(ScrapeESPNScoringSummariesRoute):
                response = self.handleScrapeESPNScoringSummaries(response)
                break;
            if case(LoadFromBackupRoute):
                response = self.handleLoadFromBackup(response)
                break;
            if case(): # default, could also just omit condition or 'if True'
                response.body = json.dumps( { self.K_RESULT : "Error: Could not understand the AJAX request in the handler." } )
        
        return response;
    
    def handleLoadFromBackup(self, response):
        response.body = json.dumps({ self.K_RESULT : LoadFromBackup.load() })
        return response
    
    def handleScrapeESPNScoringSummaries(self, response):
        response.body = json.dumps({ self.K_RESULT : ScrapeESPN.scrapeScoringSummaries() })
        return response
    
    def handleSearchPlayerByLetter(self, response):
        response.body = json.dumps( { self.K_RESULT : SearchPlayerByLetter.getPlayerSearchHTML() } )
        return response;
    
    def handleGetPlayerSearchCriteria(self, response):
        response.body = json.dumps( { self.K_RESULT : GetPlayerSearchCriteria.getPlayerSearchHTML() } )
        return response;
    
    def handleScrapeAllPlayersFromBBRService(self, response):
        response.body = json.dumps( { self.K_RESULT : ScrapePlayers.scrapePlayersFromBBR() } )      
        return response
    
    def handleUnixTimeService(self, response):
        time = GetUnixTimeService.getTime()
        response.body = json.dumps(time)
        return response
    
    def handlePrimeAllDatabasesService(self, response):
        response.body = json.dumps( { self.K_RESULT : PrimeAllDatabasesResult.executePrimeAllDatabases() } )      
        return response