from Database.Queryable import *

class Model(Queryable):
    
    def __init__(self):
        Queryable.__init__(self)

    def getWriters(self):
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()
                cur.execute("SELECT name FROM Writers")                
                rows = cur.fetchall()
                                                
                for row in rows:
                    str_list.append(DatabaseUtility.stripReturnedString(`row`))
                    str_list.append(', ')
                    
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            self.closeConnection()           
            
        return ''.join(str_list)            