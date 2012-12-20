from Scrape.BaseScraper import *
from Database.Instance.Players import PlayersDbLayer
import shlex

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
                    name = self.checkName(col[0])                                        
                    fromYear = self.checkString(col[1])                                        
                    toYear = self.checkString(col[2])                    
                    position = self.checkString(col[3]) # Unused                                       
                    height = self.checkString(col[4])                                        
                    weight = self.checkString(col[5])                                        
                    birthDate = self.convertDate(col[6])                                                                        
                    university = self.checkString(col[7]) # Unused
                    
                    '''
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 0, name) # Name
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 1, fromYear) # From Year
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 2, toYear) # To Year
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 3, position) # Position
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 4, height) # height
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 5, weight) # Weight
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 6, birthDate) # Birth date
                    print'Row #%s: Column #%s: %s' % (str(rowCounter), 7, university) # Birth date
                    '''                    
                    
                    bulkPlayers.append([name, height, weight, birthDate, fromYear, toYear])
                    rowCounter = rowCounter + 1
            return playersDbLayer.bulkInsert(bulkPlayers)
        
    def checkName(self, val):
        return str(val.get_text()).strip('\*').replace('\'', '\'\'').strip().encode('utf-8')
    
    def checkString(self, val):
        retStr = ''
        
        try:
            retStr = val.string.strip().encode('utf-8')
        except Exception:
            retStr = 'None'.encode('utf-8')
            
        return retStr
    
    def convertDate(self, val):
        # Expected to be converting from December 7, 1954 to 12/07/1954
        retStr = ''
        
        try:
            dateArray = shlex.split(val.string.strip())
            #retStr = self.getNumberForMonth(dateArray[0]) + "-" + self.getNumberForDay(dateArray[1])+ "-" + dateArray[2]
            retStr = dateArray[2] + "-" + self.getNumberForMonth(dateArray[0]) + "-" + self.getNumberForDay(dateArray[1]) 
        except Exception:
            retStr = 'NULL'.encode('utf-8')
            
        return retStr
    
    def getNumberForMonth(self, val):
        if val == 'January':
            return '1'
        elif val == 'February':
            return '2'
        elif val == 'March':
            return '3'
        elif val == 'April':
            return '4'
        elif val == 'May':
            return '5'
        elif val == 'June':
            return '6'
        elif val == 'July':
            return '7'
        elif val == 'August':
            return '8'
        elif val == 'September':
            return '9'
        elif val == 'October':
            return '10'
        elif val == 'November':
            return '11'
        elif val == 'December':
            return '12'
        
    def getNumberForDay(self, val):
        day = int(val.strip(','))
        if day < 10:
            return '0%d' % (day)
        else:
            return str(day)
        