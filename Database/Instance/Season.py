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
        self.primeWithData() 
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
    
    def insert(self, fromYear, toYear, shortened):
        self.openConnection()
        str_list = []
        try:
            cur = self.getConnection().cursor()
            fullName = str(fromYear) + ' - ' + str(toYear)
            with self.getConnection():
                if not cur.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' +  Season.COLUMN_FROM_YEAR + '=' + str(fromYear) + ' AND ' + Season.COLUMN_TO_YEAR + '=' + str(toYear) + ' LIMIT 1'):
                    cur.execute("INSERT INTO " + self.mTableName + 
                                    "(" + Season.COLUMN_FROM_YEAR + ', ' + Season.COLUMN_TO_YEAR + ', ' + Season.COLUMN_SHORTENED_SEASON + ") VALUES(" + 
                                    "" + str(fromYear) + ", " +
                                    "" + str(toYear) + ", " +
                                    "'" + shortened + "')")
                    str_list.append(self.getSuccessfulInsertString(self.mTableName, fullName + '<br>'))
                else:
                    str_list.append(self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>')                
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(self.mTableName))
        finally:
            self.closeConnection()
        return ''.join(str_list)      
    
    def primeWithData(self):
        # Real start is 001, but we minus 1
        for x in range(2002, 2014):
            if x == 2012:
                shortened = 'True'
            else:
                shortened = 'False'
            self.insert((x-1), x, shortened)