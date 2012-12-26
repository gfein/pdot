from Database.Queryable import *

class CareerTotalsDbLayer(Queryable):
    
    def __init__(self):
        Queryable.__init__(self)   
        self.mTableName = Database.Constants.K_CAREER_TOTALS_TABLE
        
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
                            "(Id INT PRIMARY KEY AUTO_INCREMENT, " + 
                            "Name VARCHAR(25) " +
                            ")")                                
                str_list.append(self.getSuccessfulCreateTableString(self.mTableName))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return str_list
    
    def dropTable(self):
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()
                cur.execute("DROP TABLE IF EXISTS " + self.mTableName)                                                                
                str_list.append(self.getSuccessfulDropTableString(self.mTableName))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureDropTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return str_list