from Database.Queryable import *

class Player():
    uniqueId = None
    firstName = None
    lastName = None
    height = None
    weight = None
    born = None
    playedFrom = None
    playedTo = None
    
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
                            "FirstName VARCHAR(100), " +
                            "LastName VARCHAR(100), " +
                            "Height INT not NULL, " +
                            "Weight INT not NULL, " +
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
    
    def insert(self, firstName, lastName, fromYear, toYear, height, weight, birthDate):
        self.openConnection()
        str_list = []
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()                            
                fullName = str(firstName + ' ' + lastName)
                if birthDate != 'NULL':                        
                    if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE FirstName=\'' + firstName + '\'' +' AND LastName=\'' + lastName + '\'' + ' AND Born=\'' + birthDate + '\' LIMIT 1'):
                        cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                    "(FirstName, LastName, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                                    "'" + firstName + "', " + # First Name
                                    "'" + lastName + "', " + # Last Name
                                    "'" + height + "', " + # Height
                                    "'" + weight + "', " + # Weight
                                    "'" + birthDate + "', " + # Birthdate
                                    "" + fromYear + ", " + # From Year
                                    "" + toYear + " " + # To Year                                                    
                                    ")")
                        str_list.append(self.getSuccessfulInsertString(Database.Constants.K_PLAYERS_TABLE, fullName + '<br>'))
                    else:
                        str_list.append(self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE, fullName, 'Duplicate Entry') + '<br>')
                else:                        
                    if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE FirstName=\'' + firstName + '\'' +' AND LastName=\'' + lastName + '\'' + ' AND Born=' + birthDate + ' LIMIT 1'):
                        cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(FirstName, LastName, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                                "'" + firstName + "', " + # First Name
                                "'" + lastName + "', " + # Last Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "" + birthDate + ", " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + " " + # To Year                                                    
                                ")")
                        str_list.append(self.getSuccessfulInsertString(Database.Constants.K_PLAYERS_TABLE, fullName + '<br>'))
                    else:                    
                        str_list.append(self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE, fullName, 'Duplicate Entry') + '<br>')
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
                    
                    firstName = playerDetails[0]
                    lastName = playerDetails[1]
                    height = playerDetails[2]
                    weight = playerDetails[3]
                    birthDate = playerDetails[4]
                    fromYear = playerDetails[5]
                    toYear = playerDetails[6]
                           
                    try:
                        str_list.append(self.insertWithCursor(cur, firstName, lastName, fromYear, toYear, height, weight, birthDate))
                    except Exception:
                        print 'Error inserting for player: ' + firstName + ' ' + lastName                                                    
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE))
        finally:
            self.closeConnection()
        return ''.join(str_list)  
    
    def insertWithCursor(self, cur, firstName, lastName, fromYear, toYear, height, weight, birthDate):
        fullName = str(firstName + ' ' + lastName)
        if birthDate != 'NULL':                                 
            if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE FirstName=\'' + firstName + '\'' +' AND LastName=\'' + lastName + '\'' + ' AND Born=\'' + birthDate + '\' LIMIT 1'):
                cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(FirstName, LastName, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                                "'" + firstName + "', " + # First Name
                                "'" + lastName + "', " + # Last Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "'" + birthDate + "', " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + " " + # To Year                                                    
                                ")")
                return self.getSuccessfulInsertString(Database.Constants.K_PLAYERS_TABLE, fullName) + '<br>'
            else:
                return self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE, fullName, 'Duplicate Entry') + '<br>'
        else:                        
            if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE FirstName=\'' + firstName + '\'' +' AND LastName=\'' + lastName + '\'' + ' AND Born=' + birthDate + ' LIMIT 1'):
                cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(FirstName, LastName, Height, Weight, Born, PlayedFrom, PlayedTo) VALUES(" + 
                                "'" + firstName + "', " + # First Name
                                "'" + lastName + "', " + # Last Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "" + birthDate + ", " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + " " + # To Year                                                    
                                ")")
                return self.getSuccessfulInsertString(Database.Constants.K_PLAYERS_TABLE, fullName) + '<br>'
            else:                    
                return self.getFailureInsertString(Database.Constants.K_PLAYERS_TABLE, fullName, 'Duplicate Entry') + '<br>'
            
            
    def queryById(self, playerId):
        player = Player()
        self.openConnection()
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()    
                cur.execute('SELECT * FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE Id=' + str(playerId))
                dbPlayer = cur.fetchone()
                player.uniqueId = dbPlayer[0] # Should be same as the one passed in
                player.firstName = dbPlayer[1]
                player.lastName = dbPlayer[2]
                player.height = dbPlayer[3]
                player.weight = dbPlayer[4]
                player.born = dbPlayer[5]
                player.playedFrom = dbPlayer[6]
                player.playedTo = dbPlayer[7]                                            
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            self.closeConnection()
                
        return player         