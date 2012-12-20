from Database.Queryable import *

class ConfigurationInfoDbLayer(Queryable):
    
    def __init__(self):
        Queryable.__init__(self)   
        
    def dropAndRecreateTable(self):
        retStr = []
        retStr.append(self.dropTable())
        retStr.append(self.createTable())
        return ''.join(retStr)
        
    def createTable(self):
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()                
                cur.execute("CREATE TABLE " + Database.Constants.K_CONFIGURATION_INFO_TABLE + 
                            "(Id INT PRIMARY KEY AUTO_INCREMENT, " + 
                            "Name VARCHAR(25) " +
                            ")")                                
                str_list.append(self.getSuccessfulCreateTableString(Database.Constants.K_CAREER_TOTALS_TABLE))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(Database.Constants.K_CAREER_TOTALS_TABLE))
        finally:
            self.closeConnection()           
            
        return ''.join(str_list)        
    
    def dropTable(self): 
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()
                cur.execute("DROP TABLE IF EXISTS " + Database.Constants.K_CONFIGURATION_INFO_TABLE)                                            
                str_list.append(self.getSuccessfulDropTableString(Database.Constants.K_CONFIGURATION_INFO_TABLE))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureDropTableString(Database.Constants.K_CONFIGURATION_INFO_TABLE))
        finally:
            self.closeConnection()           
            
        return ''.join(str_list)        