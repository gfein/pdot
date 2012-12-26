from Database.Queryable import *
#from Database.Instance.Players.Player import COLUMN_ALIAS_FLAG, COLUMN_FIRST_NAME, COLUMN_LAST_NAME, COLUMN_BIRTHDATE
from Database.Instance.Players import *
from Database.Constants import K_PLAYERS_TABLE, K_ALIAS_TABLE

class Alias():
    mAliasFirstName = None
    mAliasLastName = None
    mOfficialFirstName = None
    mOfficialLastName = None
    mBirthDate = None
    
    COLUMN_ID = 'Id'
    COLUMN_ALIAS_FIRST_NAME = 'AliasFirstName'
    COLUMN_ALIAS_LAST_NAME = 'AliasLastName'
    COLUMN_OFFICIAL_FIRST_NAME = 'OfficialFirstName'
    COLUMN_OFFICIAL_LAST_NAME = 'OfficialLastName' 
    COLUMN_BIRTHDATE = 'BirthDate'    
    
class AliasDbLayer(Queryable):
    def __init__(self):
        Queryable.__init__(self)
        self.mTableName = Database.Constants.K_ALIAS_TABLE   
             
    def dropAndRecreateTable(self): 
        retStr = [] 
        retStr.append(self.dropTable()) 
        retStr.append(self.createTable())        
        return retStr    
    
    def dropAndRecreateAndPrimeTable(self): 
        retStr = [] 
        retStr.append(self.dropTable()) 
        retStr.append(self.createTable())        
        self.primeWithData()
        return retStr       
           
    def createTable(self):
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()                
                cur.execute("CREATE TABLE " + self.mTableName + 
                            "(" + Alias.COLUMN_ID + " INT PRIMARY KEY AUTO_INCREMENT, " + 
                            Alias.COLUMN_ALIAS_FIRST_NAME + " VARCHAR(100), " +
                            Alias.COLUMN_ALIAS_LAST_NAME + " VARCHAR(100), " +
                            Alias.COLUMN_OFFICIAL_FIRST_NAME + " VARCHAR(100), " +
                            Alias.COLUMN_OFFICIAL_LAST_NAME + " VARCHAR(100), " +
                            Alias.COLUMN_BIRTHDATE + " DATE " +
                            ")")
                str_list.append(self.getSuccessfulCreateTableString(self.mTableName))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return str_list      
    
    def insert(self, aliasFirst, aliasLast, officialFirst, officialLast, birthdate):
        self.openConnection()
        str_list = []
        aliasFirst = aliasFirst.encode('utf-8')
        aliasLast = aliasLast.encode('utf-8')
        officialFirst = officialFirst.encode('utf-8')
        officialLast = officialLast.encode('utf-8').replace('\'', '\'\'')
        birthdate = birthdate.encode('utf-8')
        fullName = '%s %s a.k.a. %s %s' % (str(aliasFirst), str(aliasLast), str(officialFirst), str(officialLast))
        try:
            cur = self.getConnection().cursor()
            with self.getConnection():
                if not cur.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' +  
                                   Alias.COLUMN_ALIAS_FIRST_NAME + '=\'' + str(aliasFirst) + '\' AND ' + 
                                   Alias.COLUMN_ALIAS_LAST_NAME+ '=\'' + str(aliasLast) + '\' AND ' + 
                                   Alias.COLUMN_OFFICIAL_FIRST_NAME + '=\'' + str(officialFirst) + '\' AND ' + 
                                   Alias.COLUMN_OFFICIAL_LAST_NAME + '=\'' + str(officialLast) + '\' AND ' +
                                   Alias.COLUMN_BIRTHDATE + '=\'' + str(birthdate) + '\' ' + 
                                   'LIMIT 1'):
                    cur.execute("INSERT INTO " + self.mTableName + 
                                    "(" + Alias.COLUMN_ALIAS_FIRST_NAME + ', ' + 
                                    Alias.COLUMN_ALIAS_LAST_NAME + ', ' + 
                                    Alias.COLUMN_OFFICIAL_FIRST_NAME + ', ' + 
                                    Alias.COLUMN_OFFICIAL_LAST_NAME + ", " +
                                    Alias.COLUMN_BIRTHDATE + " " + ") VALUES(" + 
                                    "'" + str(aliasFirst) + "', " +
                                    "'" + str(aliasLast) + "', " +
                                    "'" + str(officialFirst) + "', " +
                                    "'" + str(officialLast) + "', " +
                                    "'" + str(birthdate) + "' " + 
                                    ")")
                    str_list.append(self.getSuccessfulInsertString(self.mTableName, fullName + '<br>'))
                else:
                    str_list.append(self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>')
                    
                COLUMN_FIRST_NAME = 'FirstName'
                COLUMN_LAST_NAME = 'LastName'
                COLUMN_ALIAS_FLAG = 'Alias'
                COLUMN_BIRTHDATE = 'Born'
    
                updatePlayer = 'UPDATE ' + K_PLAYERS_TABLE + ' SET ' + COLUMN_ALIAS_FLAG + '=1 WHERE ' + COLUMN_BIRTHDATE + '=\'' + str(birthdate) + '\' AND ' + COLUMN_FIRST_NAME  + '=\'' + officialFirst + '\' AND ' + COLUMN_LAST_NAME + '=\'' + officialLast + '\''
                cur.execute(updatePlayer)
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(self.mTableName, fullName, 'Probably an apostrophe'))
        finally:
            self.closeConnection()
        return ''.join(str_list)      
    
    def queryByName(self, first, last):
        self.openConnection()
        try:
            cur = self.getConnection().cursor()
            with self.getConnection():
                cur.execute('select * from ' + K_ALIAS_TABLE + ' where ' + Alias.COLUMN_ALIAS_FIRST_NAME + '=\'' + str(first) + '\' and ' + Alias.COLUMN_ALIAS_LAST_NAME + '=\'' + str(last) + '\'')
                alias = cur.fetchone()
                returnName = str(alias[3]) + ' ' + str(alias[4])
                return returnName                
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            self.closeConnection()
        return None
    
    def primeWithData(self):
        # Real start is 001, but we minus 1
        self.insert("SLAVA", "MEDVEDENKO", "STANISLAV", "MEDVEDENKO", "1979-04-04")
        self.insert("ZHIZHI", "WANG", "WANG", "ZHIZHI", "1977-07-08")
        self.insert("RON", "ARTEST", "METTA", "WORLD PEACE", "1979-11-13")
        self.insert("PENNY", "HARDAWAY", "ANFERNEE", "HARDAWAY", "1971-07-18")
        self.insert("CEDRIC", "E. HENDERSON", "CEDRIC", "HENDERSON", "1975-03-11")
        self.insert("WILL", "AVERY", "WILLIAM", "AVERY", "1979-08-08")
        self.insert("JOSEPH", "CRISPIN", "JOE", "CRISPIN", "1979-07-18")
        self.insert("IKE", "FONTAINE", "ISAAC", "FONTAINE", "1975-04-16")
        self.insert("RUBEN", "BOUMTJE BOUMTJE", "RUBEN", "BOUMTJE-BOUMTJE", "1978-05-20")
        self.insert("AMAR''E", "STOUDEMIRE", "AMARE", "STOUDEMIRE", "1982-11-16")
        self.insert("", "NENE", "NENE", "HILARIO", "1982-09-13")
        self.insert("ROGER", "MASON JR.", "ROGER", "MASON", "1980-09-10")
        self.insert("EFTHIMIOS", "RENTZIAS", "EFTHIMI", "RENTZIAS", "1976-01-11")
        self.insert("MICHAEL", "SWEETNEY", "MIKE", "SWEETNEY", "1982-10-25")
        self.insert("SEUNG", "JIN HA", "HA", "SEUNG-JIN", "1985-08-04")        
        self.insert("IBRAHIM ", "KUTLUAY", "IBO", "KUTLUAY", "1974-07-01")
        self.insert("JOSE", "JUAN BAREA", "JOSE", "BAREA", "1984-06-26")
        self.insert("LOU", "AMUNDSON", "LOUIS", "AMUNDSON", "1982-12-07")
        self.insert("LUC", "RICHARD MBAH A MOUTE", "LUC", "MBAH A MOUTE", "1986-09-09")
        self.insert("PATTY", "MILLS", "PATRICK", "MILLS", "1988-08-11")
        self.insert("POOH", "JETER", "EUGENE", "JETER", "1983-12-02")
        self.insert("ISH", "SMITH", "ISHMAEL", "SMITH", "1988-07-05")
        self.insert("HAMADY", "NDIAYE", "HAMADY", "N'DIAYE", "1987-01-12")
        self.insert("PATRICK", "EWING JR.", "PATRICK", "EWING", "1984-05-20")
        '''
        self.insert('', '', '', '', '')
        self.insert('', '', '', '', '')
        self.insert('', '', '', '', '')
        self.insert('', '', '', '', '')            
        '''
        
    def getAliasesForOfficialName(self, officialFirst, officialLast):
        self.openConnection()
        aliasList = []
        try:
            cur = self.getConnection().cursor()
            with self.getConnection():
                cur.execute('select ' + Alias.COLUMN_ALIAS_FIRST_NAME + ', ' + Alias.COLUMN_ALIAS_LAST_NAME + ' from ' + K_ALIAS_TABLE + ' where ' + Alias.COLUMN_OFFICIAL_FIRST_NAME + '=\'' + str(officialFirst) + '\' and ' + Alias.COLUMN_OFFICIAL_LAST_NAME + '=\'' + str(officialLast) + '\'')
                alias = cur.fetchall()
                for row in alias:
                    aliasList.append(str(row[0]) + ' ' + str(row[1]))
        except Exception, e:
            print 'Exception: %s' % (e)
        finally:
            self.closeConnection()
            
        if len(aliasList) > 0:
            retHtml = ''
            for item in aliasList:
                retHtml = retHtml + item + '<br>'
            return retHtml
        else:
            return 'No known aliases or nicknames'