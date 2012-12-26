import MySQLdb
import Configuration

class DatabaseUtility:
    user = 'pdot'
    pword = 'pdot'
    host = '127.0.0.1'
    port = 9002
    db = 'pdot'
    
    @staticmethod
    def getConnection():
        return MySQLdb.Connect(host=DatabaseUtility.host, 
                               port=DatabaseUtility.port, 
                               user=DatabaseUtility.user, 
                               passwd=DatabaseUtility.pword, 
                               db=DatabaseUtility.db)
        
    @staticmethod
    def getVersion():
        con = None        
        try:        
            con = DatabaseUtility.getConnection()
                
            con.query("SELECT VERSION()")
            result = con.use_result()
            
            return "MySQL version: %s" % \
                result.fetch_row()[0]
                            
        except MySQLdb.Error, e:
            print "Error %d: %s" % (e.args[0], e.args[1])
            return 'Error fetching database version'
        finally:            
            if con:
                con.close()      
        
    @staticmethod
    def stripReturnedString(str):
        return str[2:-3]       