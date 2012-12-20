from Database.Queryable import *

class PlayersDbLayer(Queryable):
    
    def __init__(self):
        Queryable.__init__(self)
        
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
                cur.execute("CREATE TABLE " + Database.Constants.K_PLAYERS_TABLE + 
                            "(Id INT PRIMARY KEY AUTO_INCREMENT, " + 
                            "Name VARCHAR(100), " +
                            "Height VARCHAR(25), " +
                            "Weight VARCHAR(25), " +
                            "Born DATE, " +
                            "PlayedFrom INT, " +
                            "PlayedTo INT " +                    
                            ")")
                str_list.append(self.getSuccessfulCreateTableString(Database.Constants.K_PLAYERS_TABLE))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(Database.Constants.K_PLAYERS_TABLE))
        finally:
            self.closeConnection()           
            
        return str_list      
    
    def dropTable(self):
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()
                cur.execute("DROP TABLE IF EXISTS " + Database.Constants.K_PLAYERS_TABLE)                                
                str_list.append(self.getSuccessfulDropTableString(Database.Constants.K_PLAYERS_TABLE))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureDropTableString(Database.Constants.K_PLAYERS_TABLE))
        finally:
            self.closeConnection()           
            
        return str_list      
    
    def insert(self, name, fromYear, toYear, height, weight, birthDate):
        self.openConnection()
        str_list = []
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()                            
                
                if birthDate != 'NULL':
                    if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE Name=\'' + name + '\' AND Born=\'' + birthDate + '\' LIMIT 1'):
                        cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(Name, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                                "'" + name + "', " + # Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "'" + birthDate + "', " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + " " + # To Year                                                    
                                ")")
                else:
                    if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE Name=\'' + name + '\' AND Born=' + birthDate + ' LIMIT 1'):
                        cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                            "(Name, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                            "'" + name + "', " + # Name
                            "'" + height + "', " + # Height
                            "'" + weight + "', " + # Weight
                            "" + birthDate + ", " + # Birthdate
                            "" + fromYear + ", " + # From Year
                            "" + toYear + " " + # To Year                                                    
                            ")")
                str_list.append(self.getSuccessfulInsertString(Database.Constants.K_PLAYERS_TABLE, name))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE))
        finally:
            self.closeConnection()
        return ''.join(str_list)      
    
    def bulkInsert(self, bulkPlayers):  
        self.openConnection()
        str_list = []
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()
                for playerDetails in bulkPlayers:
                    
                    name = playerDetails[0]
                    height = playerDetails[1]
                    weight = playerDetails[2]
                    birthDate = playerDetails[3]
                    fromYear = playerDetails[4]
                    toYear = playerDetails[5]
                    
                    if name == 'Bill Allen':
                        print 'debug'
                    
                    if birthDate != 'NULL':                        
                        if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE Name=\'' + name + '\' AND Born=\'' + birthDate + '\' LIMIT 1'):
                            cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(Name, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                                "'" + name + "', " + # Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "'" + birthDate + "', " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + " " + # To Year                                                    
                                ")")
                            str_list.append(self.getSuccessfulInsertString(Database.Constants.K_PLAYERS_TABLE, name) + '<br>')
                        else:
                            str_list.append(self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE, name, 'Duplicate Entry') + '<br>')
                    else:                        
                        if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE Name=\'' + name + '\' AND Born=' + birthDate + ' LIMIT 1'):
                            cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(Name, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                                "'" + name + "', " + # Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "" + birthDate + ", " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + " " + # To Year                                                    
                                ")")
                            str_list.append(self.getSuccessfulInsertString(Database.Constants.K_PLAYERS_TABLE, name) + '<br>')
                        else:                    
                            str_list.append(self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE, name, 'Duplicate Entry') + '<br>')
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE))
        finally:
            self.closeConnection()
        return ''.join(str_list)  
        