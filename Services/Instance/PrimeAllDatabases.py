from Services.AjaxServiceResult import *
from Database.Instance.CareerTotals import CareerTotalsDbLayer
from Database.Instance.Players import PlayersDbLayer
from Database.Instance.Team import TeamDbLayer
from Database.Instance.Season import SeasonDbLayer
from Database.Instance.StatLine import StatLineDbLayer
from Database.Instance.PlayerAlias import AliasDbLayer

class PrimeAllDatabasesResult(AjaxResult):
    @staticmethod
    def executePrimeAllDatabases():
        result = []   
        
        stats = StatLineDbLayer()
        result.append(stats.dropTable())
        
        careerTotalsResult = PrimeAllDatabasesResult.createCareerTotals() 
        for operations in careerTotalsResult: 
            result.append(operations)
            
        # FK Constraints -- must go last
        
        personsResult = PrimeAllDatabasesResult.createPersonTable()
        for operation in personsResult:   
            result.append(operation)\
        
        teamsResult = PrimeAllDatabasesResult.createTeamsTable()
        for operation in teamsResult:
            result.append(operation)
           
        seasonResult = PrimeAllDatabasesResult.createSeasonTable()
        for operation in seasonResult:
            result.append(operation)
            
        aliasResult = PrimeAllDatabasesResult.createAliasTable()
        for operation in aliasResult:
            result.append(operation)
                                
        result.append(stats.createTable())
            
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
    
    @staticmethod
    def createAliasTable():
        alias = AliasDbLayer()
        return alias.dropAndRecreateTable()
        