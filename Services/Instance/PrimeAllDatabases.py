from Services.AjaxServiceResult import *
from Database.Instance.CareerTotals import CareerTotalsDbLayer
from Database.Instance.Players import PlayersDbLayer
from Database.Instance.Team import TeamDbLayer
from Database.Instance.Season import SeasonDbLayer

class PrimeAllDatabasesResult(AjaxResult):
    @staticmethod
    def executePrimeAllDatabases():
        result = []   
        
        personsResult = PrimeAllDatabasesResult.createPersonTable()
        for operation in personsResult:   
            result.append(operation)
            
        careerTotalsResult = PrimeAllDatabasesResult.createCareerTotals() 
        for operations in careerTotalsResult: 
            result.append(operations)
            
        teamsResult = PrimeAllDatabasesResult.createTeamsTable()
        for operation in teamsResult:
            result.append(operation)
           
        seasonResult = PrimeAllDatabasesResult.createSeasonTable()
        for operation in seasonResult:
            result.append(operation) 
            
        return result                
                
    @staticmethod
    def createPersonTable():
        players = PlayersDbLayer()
        return players.dropAndRecreateTable()
    
    @staticmethod
    def createCareerTotals():
        careerTotals = CareerTotalsDbLayer()
        return careerTotals.dropAndRecreateTable()
    
    @staticmethod
    def createTeamsTable():
        teams = TeamDbLayer()
        return teams.dropAndRecreateTable()
    
    @staticmethod
    def createSeasonTable():
        season = SeasonDbLayer()
        return season.dropAndRecreateTable()