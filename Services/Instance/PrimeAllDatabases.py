from Services.AjaxServiceResult import *
from Database.Instance.CareerTotals import CareerTotalsDbLayer
from Database.Instance.Players import PlayersDbLayer

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
            
        return result                
                
    @staticmethod
    def createPersonTable():
        players = PlayersDbLayer()
        return players.dropAndRecreateTable()
    
    @staticmethod
    def createCareerTotals():
        careerTotals = CareerTotalsDbLayer()
        return careerTotals.dropAndRecreateTable()