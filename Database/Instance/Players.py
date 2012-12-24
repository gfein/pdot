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
    
    COLUMN_ID = 'Id'
    COLUMN_FIRST_NAME = 'FirstName'
    COLUMN_LAST_NAME = 'LastName'
    COLUMN_FROM_YEAR = 'PlayedFrom'
    COLUMN_TO_YEAR = 'PlayedTo'
    COLUMN_WEIGHT = 'Weight'
    COLUMN_HEIGHT = 'Height'
    COLUMN_BIRTHDATE = 'Born'
    
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
                            "(" + Player.COLUMN_ID + " INT PRIMARY KEY AUTO_INCREMENT, " + 
                            Player.COLUMN_FIRST_NAME + " VARCHAR(100), " +
                            Player.COLUMN_LAST_NAME + " VARCHAR(100), " +
                            Player.COLUMN_FROM_YEAR + " INT not NULL, " +
                            Player.COLUMN_TO_YEAR + " INT not NULL, " +
                            Player.COLUMN_BIRTHDATE + " DATE, " +
                            Player.COLUMN_HEIGHT+ " INT, " +
                            Player.COLUMN_WEIGHT + " INT " +                    
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
                    if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=\'' + birthDate + '\' LIMIT 1'):
                        cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                    "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ") VALUES(" + 
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
                    if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=' + birthDate + ' LIMIT 1'):
                        cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ") VALUES(" + 
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
            if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=\'' + birthDate + '\' LIMIT 1'):
                cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ") VALUES(" + 
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
            if not cur.execute('SELECT (1) FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=' + birthDate + ' LIMIT 1'):
                cur.execute("INSERT INTO " + Database.Constants.K_PLAYERS_TABLE + 
                                "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ") VALUES(" + 
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
    
    def queryByLetter(self, letter):
        playerList = []
        self.openConnection()
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()    
                cur.execute('SELECT ' + Player.COLUMN_ID + ', ' + Player.COLUMN_FIRST_NAME + ', ' + Player.COLUMN_LAST_NAME + ', ' + Player.COLUMN_FROM_YEAR + ', ' + Player.COLUMN_TO_YEAR + ', ' + Player.COLUMN_BIRTHDATE + ' FROM ' + Database.Constants.K_PLAYERS_TABLE +' WHERE ' + Player.COLUMN_LAST_NAME + ' like \'' + str(letter) + '%\';')                
                numrows = int(cur.rowcount)

                for i in range(numrows):
                    dbPlayer = cur.fetchone()
                    l = [ dbPlayer[0], dbPlayer[1], dbPlayer[2], dbPlayer[3], dbPlayer[4], dbPlayer[5] ]
                    playerList.append(l)                                            
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            self.closeConnection()
                
        return playerList
    
    # ------------------------------------------
    # -- DEEP SEARCH
    # ------------------------------------------
    
    def queryByDeepSearch(self, fnType, firstName, lnType, lastName, fyType, fromYear, tyType, toYear, wType, weight, hType, height, bdayType, birthDate):
        playerList = []
        self.openConnection()
        try:
            with self.getConnection():
                whereList = []
                whereList.append(self.getFirstNameQuery(fnType, firstName)) 
                whereList.append(self.getLastNameQuery(lnType, lastName))
                whereList.append(self.getFromYearQuery(fyType, fromYear)) 
                whereList.append(self.getToYearQuery(tyType, toYear)) 
                whereList.append(self.getWeightQuery(wType, weight))
                whereList.append(self.getHeightQuery(hType, height))
                whereList.append(self.getBirthdateQuery(bdayType, birthDate))
                
                whereArgument = ''
                for item in whereList:
                    if item is not None:
                        whereArgument += item + 'AND '
                whereArgument = whereArgument[:-4]
                
                cur = self.getConnection().cursor()    
                query = 'SELECT ' + Player.COLUMN_ID + ', ' + Player.COLUMN_FIRST_NAME + ', ' + Player.COLUMN_LAST_NAME + ', ' + Player.COLUMN_FROM_YEAR + ', ' + Player.COLUMN_TO_YEAR + ', ' + Player.COLUMN_BIRTHDATE + ' FROM ' + Database.Constants.K_PLAYERS_TABLE
                query += ' WHERE ' + whereArgument;                
                print 'Query: %s' % (query)
                cur.execute(query)                
                numrows = int(cur.rowcount)

                for i in range(numrows):
                    dbPlayer = cur.fetchone()
                    l = [ dbPlayer[0], dbPlayer[1], dbPlayer[2], dbPlayer[3], dbPlayer[4], dbPlayer[5] ]
                    playerList.append(l)                                            
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            self.closeConnection()
                
        return playerList  
    
    def getFirstNameQuery(self, fnType, firstName):
        # f,l,b
        searchType = fnType[-1:]
        if not firstName == None and not firstName == 'NULL' and (searchType == 'f' or searchType == 'b'):
            return Player.COLUMN_FIRST_NAME + ' like \'' + str(firstName) + '%\' '
        else:
            return None
        
    def getLastNameQuery(self, lnType, lastName):
        # f,l,b
        searchType = lnType[-1:]
        if not lastName == None and not lastName == 'NULL' and (searchType == 'l' or searchType == 'b'):
            return Player.COLUMN_LAST_NAME + ' like \'' + str(lastName) + '%\' '
        else:
            return None
        
    def getFromYearQuery(self, fyType, fromYear):
        # e,d
        searchType = fyType[-1:]
        if not fromYear == None and not fromYear == 'NULL':
            if searchType == 'e':
                return Player.COLUMN_FROM_YEAR + ' = ' + str(fromYear) + ' '
            elif searchType == 'd':
                return Player.COLUMN_FROM_YEAR + ' >= ' + str(fromYear) + ' '
        else:
            return None
        
    def getToYearQuery(self, tyType, toYear):
        # e,d
        searchType = tyType[-1:]
        if not toYear == None and not toYear == 'NULL':
            if searchType == 'e':
                return Player.COLUMN_TO_YEAR + ' = ' + str(toYear) + ' '
            elif searchType == 'd':
                return Player.COLUMN_TO_YEAR + ' <= ' + str(toYear) + ' '            
        else:
            return None
                
    def getWeightQuery(self, wType, weight):
        # e,l,h
        searchType = wType[-1:]
        if not weight == None and not weight == 'NULL':
            if searchType == 'e':
                return Player.COLUMN_WEIGHT + ' = ' + str(weight) + ' '
            elif searchType == 'l':
                return Player.COLUMN_WEIGHT + ' >= ' + str(weight) + ' '
            elif searchType == 'h':            
                return Player.COLUMN_WEIGHT + ' <= ' + str(weight) + ' '
        else:
            return None
        
    def getHeightQuery(self, hType, height):
        # e,s,t
        searchType = hType[-1:]
        if not height == None and not height == 'NULL':
            if searchType == 'e':
                return Player.COLUMN_HEIGHT + ' = ' + str(height) + ' '
            elif searchType == 's':
                return Player.COLUMN_HEIGHT + ' <= ' + str(height) + ' '
            elif searchType == 't':            
                return Player.COLUMN_HEIGHT + ' >= ' + str(height) + ' '            
        else:
            return None
        
    def getBirthdateQuery(self, bdayType, birthdate):    
        # e,b,a  
        searchType = bdayType[-1:]
        if not birthdate == None and not birthdate == 'NULL':
            if searchType == 'e':
                return Player.COLUMN_BIRTHDATE + ' = \'' + str(birthdate) + '\' '
            elif searchType == 'a':
                return Player.COLUMN_BIRTHDATE + ' >= \'' + str(birthdate) + '\' '
            elif searchType == 'b':            
                return Player.COLUMN_BIRTHDATE + ' <= \'' + str(birthdate) + '\' '            
        else:
            return None
        