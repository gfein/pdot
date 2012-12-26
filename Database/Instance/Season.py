from Database.Queryable import *

class Season():
    mSeasonId = None
    mFromYear = None
    mToYear = None
    mShortenedSeason = None
    
    COLUMN_SEASON_ID = 'SeasonId'
    COLUMN_FROM_YEAR = 'FromYear'
    COLUMN_TO_YEAR = 'ToYear'
    COLUMN_SHORTENED_SEASON = 'ShortenedSeason'
    
class SeasonDbLayer(Queryable):
    def __init__(self):
        Queryable.__init__(self)
        self.mTableName = Database.Constants.K_SEASON_TABLE   
             
    def dropAndRecreateTable(self): 
        retStr = [] 
        retStr.append(self.dropTable()) 
        retStr.append(self.createTable()) 
        return retStr       
           
    def createTable(self):
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()                
                cur.execute("CREATE TABLE " + self.mTableName + 
                            "(" + Season.COLUMN_SEASON_ID + " INT PRIMARY KEY AUTO_INCREMENT, " + 
                            Season.COLUMN_FROM_YEAR + " INT, " +
                            Season.COLUMN_TO_YEAR + " INT, " +
                            Season.COLUMN_SHORTENED_SEASON + " VARCHAR(100)" +
                            ")")
                str_list.append(self.getSuccessfulCreateTableString(self.mTableName))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return str_list      