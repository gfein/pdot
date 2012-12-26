from Scrape.BaseScraper import *
from Database.Instance.StatLine import *

class ScrapeESPNScoringSummaryBySeason(BaseScraper):
        
    def __init__(self):
        BaseScraper.__init__(self)
        
    def setSeason(self, season):
        self.mFromYear = (season - 1)
        self.mToYear = season
        
    def scrapeIntoDatabase(self):
        statLineDbLayer = StatLineDbLayer()        
        statLineDbLayer.setSeason(self.mFromYear, self.mToYear)
        
        statTable = self.mSoup.find(id="my-players-table")        
        bulkStats = []
        if statTable is not None:
            rowCounter = 0
            for row in statTable.findAll('tr'):
                
                if rowCounter == 43:
                    print 'debug'
                    
                if not rowCounter == 0:
                    col = row.findAll('td')                    
                    if len(col) > 0 and not SQLUtil.getValueFromColumn(col[0]) == 'RK':
                        playerFirstName = SQLUtil.ESPN_GetNameFromPositionString(col[1], 0) # Split this, before comma and then by space, index 0
                        playerLastName = SQLUtil.ESPN_GetNameFromPositionString(col[1], 1) # Split this, before comma and then by space, index 1
                        team = SQLUtil.getTeamFromAbbreviation(col[2])
                        gamesPlayed = SQLUtil.getValueFromColumn(col[3])
                        minutesPerGame = SQLUtil.getValueFromColumn(col[4])
                        points = SQLUtil.getValueFromColumn(col[5])
                        fieldGoalsMade = SQLUtil.splitByHyphen(col[6], 0) # split this by -, index 0
                        fieldGoalsAttempted = SQLUtil.splitByHyphen(col[6], 1) # split this by -, index 1
                        fieldGoalPercentage = SQLUtil.getValueFromColumn(col[7])
                        threePointsMade = SQLUtil.splitByHyphen(col[8], 0) # split this by -, index 0
                        threePointsAttempted = SQLUtil.splitByHyphen(col[8], 1) # split this by -, index 1
                        threePointPercentage = SQLUtil.getValueFromColumn(col[9])
                        freeThrowsMade = SQLUtil.splitByHyphen(col[10], 0) # split this by -, index 0
                        freeThrowsAttempted = SQLUtil.splitByHyphen(col[10], 1) # split this by -, index 1
                        freeThrowPercentage = SQLUtil.getValueFromColumn(col[11])
                                                
                        bulkStats.append([playerFirstName, 
                                          playerLastName, 
                                          team , 
                                          gamesPlayed, 
                                          minutesPerGame, 
                                          points, 
                                          fieldGoalsMade, 
                                          fieldGoalsAttempted, 
                                          fieldGoalPercentage, 
                                          threePointsMade, 
                                          threePointsAttempted, 
                                          threePointPercentage, 
                                          freeThrowsMade, 
                                          freeThrowsAttempted, 
                                          freeThrowPercentage])
                rowCounter = rowCounter + 1
            return statLineDbLayer.bulkInsert(bulkStats)
    
    
    
    
        