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
    
    # ------------------------------------------
    # Below are just test methods.  Do not use!    
    # ------------------------------------------
    '''
    @staticmethod
    def createWriters():
        con = DatabaseUtility.getConnection()
        with con:
            cur = con.cursor()
            cur.execute("CREATE TABLE IF NOT EXISTS \
            Writers(Id INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(25))")
            cur.execute("INSERT INTO Writers(Name) VALUES('Jack London')")
            cur.execute("INSERT INTO Writers(Name) VALUES('Honore de Balzac')")
            cur.execute("INSERT INTO Writers(Name) VALUES('Lion Feuchtwanger')")
            cur.execute("INSERT INTO Writers(Name) VALUES('Emile Zola')")
            cur.execute("INSERT INTO Writers(Name) VALUES('Truman Capote')")

        con = MySQLdb.Connect(host=Model.host, port=Model.port, user=Model.user, passwd=Model.pword, db=Model.db)
        with con: 

            cur = con.cursor()
            cur.execute("SELECT * FROM Writers")

            rows = cur.fetchall()
            
            for row in rows:
                print row
    '''