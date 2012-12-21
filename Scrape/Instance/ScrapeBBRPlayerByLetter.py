from Scrape.BaseScraper import *
from Database.Instance.Players import PlayersDbLayer

class ScrapeBBRPlayerByLetter(BaseScraper):
    
    def __init__(self):
        BaseScraper.__init__(self)
        
    def scrapeIntoDatabase(self):
        playersDbLayer = PlayersDbLayer()        
        playerTable = self.mSoup.find(id="players")
        bulkPlayers = []
        if playerTable is not None:
            rowCounter = 0
            for row in playerTable.findAll('tr'):
                col = row.findAll('td')
                if len(col) > 0:                    
                    firstName = SQLUtil.checkNameForSQL(col[0], 0)
                    lastName = SQLUtil.checkNameForSQL(col[0], 1)                                   
                    fromYear = SQLUtil.checkStringForSQL(col[1])                                        
                    toYear = SQLUtil.checkStringForSQL(col[2])                    
                    position = SQLUtil.checkStringForSQL(col[3]) # Unused                                       
                    height = SQLUtil.convertStringToHeight(col[4])                                        
                    weight = SQLUtil.convertStringToInt(col[5])                                        
                    birthDate = SQLUtil.convertDateToSQL(col[6])                                                                        
                    university = SQLUtil.checkStringForSQL(col[7]) # Unused                                    
                    
                    if Configuration.debugMode:
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 0, firstName) # Name
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 1, lastName) # Name
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 2, fromYear) # From Year
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 3, toYear) # To Year
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 4, position) # Position
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 5, height) # height
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 6, weight) # Weight
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 7, birthDate) # Birth date
                        print'Row #%s: Column #%s: %s' % (str(rowCounter), 8, university) # Birth date                                    
                    
                    bulkPlayers.append([firstName, lastName, str(height), str(weight), birthDate, fromYear, toYear])
                    rowCounter = rowCounter + 1
            return playersDbLayer.bulkInsert(bulkPlayers)
    
    
    
    
        