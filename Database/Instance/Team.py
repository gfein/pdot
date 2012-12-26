from Database.Queryable import *

class Team():
    mCity = None
    mName = None
    mFullName = '%s %s' % (mCity, mName)
    mAbbreviation = None
    
    COLUMN_ID = 'TeamId'
    COLUMN_CITY = 'City'
    COLUMN_NAME = 'Name'
    COLUMN_ABBREVIATION = 'Abbreviation'
    
class TeamDbLayer(Queryable):
    
    def __init__(self):
        Queryable.__init__(self)
        self.mTableName = Database.Constants.K_TEAM_TABLE   
             
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
                            "(" + Team.COLUMN_ID + " INT PRIMARY KEY AUTO_INCREMENT, " + 
                            Team.COLUMN_CITY + " VARCHAR(50), " +
                            Team.COLUMN_NAME + " VARCHAR(50), " +
                            Team.COLUMN_ABBREVIATION + " VARCHAR(3)" +
                            ")")
                str_list.append(self.getSuccessfulCreateTableString(self.mTableName))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return str_list      
    