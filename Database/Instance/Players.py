from Database.Queryable import *
from Database.Instance.PlayerAlias import *

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
    COLUMN_ALIAS_FLAG = 'Alias'
    
class PlayersDbLayer(Queryable):
    
    def __init__(self):
        Queryable.__init__(self)
        self.mTableName = Database.Constants.K_PLAYERS_TABLE
        
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
                            "(" + Player.COLUMN_ID + " INT PRIMARY KEY AUTO_INCREMENT, " + 
                            Player.COLUMN_FIRST_NAME + " VARCHAR(100), " +
                            Player.COLUMN_LAST_NAME + " VARCHAR(100), " +
                            Player.COLUMN_FROM_YEAR + " INT not NULL, " +
                            Player.COLUMN_TO_YEAR + " INT not NULL, " +
                            Player.COLUMN_BIRTHDATE + " DATE, " +
                            Player.COLUMN_HEIGHT+ " INT, " +
                            Player.COLUMN_WEIGHT + " INT, " +
                            Player.COLUMN_ALIAS_FLAG + " BIT(1) "                    
                            ")")
                str_list.append(self.getSuccessfulCreateTableString(self.mTableName))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return str_list      
        
    def insert(self, firstName, lastName, fromYear, toYear, height, weight, birthDate, alias):
        self.openConnection()
        str_list = []
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()                            
                fullName = str(firstName + ' ' + lastName)
                if birthDate != 'NULL':                        
                    if not cur.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=\'' + birthDate + '\' LIMIT 1'):
                        cur.execute("INSERT INTO " + self.mTableName + 
                                    "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ", " + Player.COLUMN_ALIAS_FLAG + ") VALUES(" + 
                                    "'" + firstName + "', " + # First Name
                                    "'" + lastName + "', " + # Last Name
                                    "'" + height + "', " + # Height
                                    "'" + weight + "', " + # Weight
                                    "'" + birthDate + "', " + # Birthdate
                                    "" + fromYear + ", " + # From Year
                                    "" + toYear + ", " + # To Year
                                    "b\'" + str(alias) + "\' " +                                      
                                    ")")
                        str_list.append(self.getSuccessfulInsertString(self.mTableName, fullName + '<br>'))
                    else:
                        str_list.append(self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>')
                else:                        
                    if not cur.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=' + birthDate + ' LIMIT 1'):
                        cur.execute("INSERT INTO " + self.mTableName + 
                                "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ") VALUES(" + 
                                "'" + firstName + "', " + # First Name
                                "'" + lastName + "', " + # Last Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "" + birthDate + ", " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + ", " + # To Year
                                "b\'" + str(alias) + "\' " +                                                    
                                ")")
                        str_list.append(self.getSuccessfulInsertString(self.mTableName, fullName + '<br>'))
                    else:                    
                        str_list.append(self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>')
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(self.mTableName))
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
                        str_list.append(self.insertWithCursor(cur, firstName, lastName, fromYear, toYear, height, weight, birthDate, 0))
                    except Exception:
                        print 'Error inserting for player: ' + firstName + ' ' + lastName                                                    
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(self.mTableName))
        finally:
            self.closeConnection()
        return ''.join(str_list)  
    
    def insertWithCursor(self, cur, firstName, lastName, fromYear, toYear, height, weight, birthDate, alias):
        fullName = str(firstName + ' ' + lastName)
        if birthDate != 'NULL':                                 
            if not cur.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=\'' + birthDate + '\' LIMIT 1'):
                cur.execute("INSERT INTO " + self.mTableName + 
                                "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ", " + Player.COLUMN_ALIAS_FLAG + ") VALUES(" + 
                                "'" + firstName + "', " + # First Name
                                "'" + lastName + "', " + # Last Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "'" + birthDate + "', " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + ", " + # To Year
                                "b\'" + str(alias) + "\' " +                                                    
                                ")")
                return self.getSuccessfulInsertString(self.mTableName, fullName) + '<br>'
            else:
                return self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>'
        else:                        
            if not cur.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + firstName + '\'' +' AND ' + Player.COLUMN_LAST_NAME + '=\'' + lastName + '\'' + ' AND ' + Player.COLUMN_BIRTHDATE + '=' + birthDate + ' LIMIT 1'):
                cur.execute("INSERT INTO " + self.mTableName + 
                                "(" + Player.COLUMN_FIRST_NAME + ", " + Player.COLUMN_LAST_NAME + ", " + Player.COLUMN_HEIGHT + ", " + Player.COLUMN_WEIGHT + ", " + Player.COLUMN_BIRTHDATE + ", " + Player.COLUMN_FROM_YEAR + ", " + Player.COLUMN_TO_YEAR + ", " + Player.COLUMN_ALIAS_FLAG + ") VALUES(" + 
                                "'" + firstName + "', " + # First Name
                                "'" + lastName + "', " + # Last Name
                                "'" + height + "', " + # Height
                                "'" + weight + "', " + # Weight
                                "" + birthDate + ", " + # Birthdate
                                "" + fromYear + ", " + # From Year
                                "" + toYear + ", " + # To Year
                                "b\'" + str(alias) + "\' " +                                             
                                ")")
                return self.getSuccessfulInsertString(self.mTableName, fullName) + '<br>'
            else:                    
                return self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>'
            
            
    def queryById(self, playerId):
        player = Player()
        self.openConnection()
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()    
                cur.execute('SELECT * FROM ' + self.mTableName +' WHERE Id=' + str(playerId))
                dbPlayer = cur.fetchone()
                player.uniqueId = dbPlayer[0] # Should be same as the one passed in
                player.firstName = dbPlayer[1]
                player.lastName = dbPlayer[2]
                player.height = dbPlayer[6]
                player.weight = dbPlayer[7]
                player.born = dbPlayer[5]
                player.playedFrom = dbPlayer[3]
                player.playedTo = dbPlayer[4]                                            
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
                cur.execute('SELECT ' + Player.COLUMN_ID + ', ' + Player.COLUMN_FIRST_NAME + ', ' + Player.COLUMN_LAST_NAME + ', ' + Player.COLUMN_FROM_YEAR + ', ' + Player.COLUMN_TO_YEAR + ', ' + Player.COLUMN_BIRTHDATE + ' FROM ' + self.mTableName +' WHERE ' + Player.COLUMN_LAST_NAME + ' like \'' + str(letter) + '%\';')                
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
                query = 'SELECT ' + Player.COLUMN_ID + ', ' + Player.COLUMN_FIRST_NAME + ', ' + Player.COLUMN_LAST_NAME + ', ' + Player.COLUMN_FROM_YEAR + ', ' + Player.COLUMN_TO_YEAR + ', ' + Player.COLUMN_BIRTHDATE + ' FROM ' + self.mTableName
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
    
    # ------------------------------------------
    # -- ESPN SCRAPE/ OTHER NAMES QUERY
    # ------------------------------------------
    
    def findPlayerIdByName(self, firstName, lastName):
        self.openConnection()
        uniqueId = None
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()    
                cur.execute('SELECT ' + Player.COLUMN_ID + ' FROM ' + self.mTableName +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + str(firstName) + '\' AND ' + Player.COLUMN_LAST_NAME + '=\'' + str(lastName) + '\'')
                dbPlayer = cur.fetchone()
                if dbPlayer is not None:
                    uniqueId = dbPlayer[0] # Should be same as the one passed in
                else:                                
                    aliasLayer = AliasDbLayer()
                    foundName = aliasLayer.queryByName(str(firstName), str(lastName))
                    firstName = foundName.split()[0]
                    lastName = foundName.split()[1]
                    cur = self.getConnection().cursor()    
                    cur.execute('SELECT ' + Player.COLUMN_ID + ' FROM ' + self.mTableName +' WHERE ' + Player.COLUMN_FIRST_NAME + '=\'' + str(firstName) + '\' AND ' + Player.COLUMN_LAST_NAME + '=\'' + str(lastName) + '\'')
                    dbPlayer = cur.fetchone()
                    uniqueId = dbPlayer[0]                  
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            self.closeConnection()                
        return uniqueId