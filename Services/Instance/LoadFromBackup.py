import Configuration, os, sys
from Database.Queryable import *
 
class LoadFromBackup:
    @staticmethod
    def load():
        query = Queryable()
        path = os.listdir(Configuration.backupDirectory+ Configuration.backupFolder)
        query.openConnection()
        str_list = []
        try:                
            for f in path:
                filename = str(f)
                file = open(Configuration.backupDirectory+ Configuration.backupFolder + filename, 'r')
                l = list()
                for line in file:
                    l.append(line)                                            
                with query.getConnection():
                    cur = query.getConnection().cursor()                
                    cur.execute(''.join(l))
                    str_list.append('Executed: %s' % (filename))
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            query.closeConnection()                                            

        return ''.join(str_list)