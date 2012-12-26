from Database.Queryable import *

class Team():
    mCity = None
    mName = None
    mFullName = '%s %s' % (mCity, mName)
    mAbbreviation = None
    
    COLUMN_ID = 'TeamId'
    COLUMN_CITY = 'City'
    COLUMN_NAME = 'Name'
    COLUMN_ABBREVIATION = 'Abbreviation'
    COLUMN_DIVISION = 'Division'
    
class TeamDbLayer(Queryable):
    
    def __init__(self):
        Queryable.__init__(self)
        self.mTableName = Database.Constants.K_TEAM_TABLE   
             
    def dropAndRecreateTable(self): 
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
                            "(" + Team.COLUMN_ID + " INT PRIMARY KEY AUTO_INCREMENT, " + 
                            Team.COLUMN_CITY + " VARCHAR(50), " +
                            Team.COLUMN_NAME + " VARCHAR(50), " +
                            Team.COLUMN_ABBREVIATION + " VARCHAR(4), " +
                            Team.COLUMN_DIVISION + " VARCHAR(50) " +
                            ")")
                str_list.append(self.getSuccessfulCreateTableString(self.mTableName))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return str_list      
    
    def insert(self, city, name, abbreviation, division):
        self.openConnection()
        str_list = []
        try:
            cur = self.getConnection().cursor()
            fullName = str(city) + ' - ' + str(name)
            with self.getConnection():
                if not cur.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' +  
                                   Team.COLUMN_CITY + '=\'' + str(city) + '\' AND ' + Team.COLUMN_NAME + '=\'' + str(name) + '\' LIMIT 1'):
                    cur.execute("INSERT INTO " + self.mTableName + 
                                    "(" + Team.COLUMN_CITY + ', ' + Team.COLUMN_NAME + ', ' + Team.COLUMN_ABBREVIATION + ", " + Team.COLUMN_DIVISION + ") VALUES(" + 
                                    "'" + str(city) + "', " +
                                    "'" + str(name) + "', " +
                                    "'" + str(abbreviation) + "', " + 
                                    "'" + str(division) + "' )")
                    str_list.append(self.getSuccessfulInsertString(self.mTableName, fullName + '<br>'))
                else:
                    str_list.append(self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>')                
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureInsertString(self.mTableName))
        finally:
            self.closeConnection()
        return ''.join(str_list)  
    
    def getTeamAbbreviationForId(self, uniqueId):
        self.openConnection()
        str_list = []
        
        try:
            with self.getConnection():
                cur = self.getConnection().cursor()                
                cur.execute("SELECT " +  
                            Team.COLUMN_ABBREVIATION + " " +
                            "FROM " + self.mTableName + " " + 
                            "WHERE " + Team.COLUMN_ID + "=" + str(uniqueId))
                teamObj = cur.fetchone()
                str_list.append(str(teamObj[0]))
        except Exception, e:
            print 'Exception: %s' % (e)
            str_list.append(self.getFailureCreateTableString(self.mTableName))
        finally:
            self.closeConnection()           
            
        return ''.join(str_list)
          
    def primeWithData(self):
        self.insert('Boston', 'Celtics', 'BOS', 'Atlantic')
        self.insert('Brooklyn', 'Nets', 'BKN', 'Atlantic')
        self.insert('New York', 'Knicks', 'NY', 'Atlantic')
        self.insert('Philadelphia', '76ers', 'PHI', 'Atlantic')
        self.insert('Toronto', 'Raptors', 'TOR', 'Atlantic')
        
        self.insert('Golden State', 'Warriors', 'GS', 'Pacific')
        self.insert('Los Angeles', 'Clippers', 'LAC', 'Pacific')
        self.insert('Los Angeles', 'Lakers', 'LAL', 'Pacific')
        self.insert('Phoenix', 'Suns', 'PHX', 'Pacific')
        self.insert('Sacramento', 'Kings', 'SAC', 'Pacific')
        
        self.insert('Chicago', 'Bulls', 'CHI', 'Central')
        self.insert('Cleveland', 'Cavaliers', 'CLE', 'Central')
        self.insert('Detroit', 'Pistons', 'DET', 'Central')
        self.insert('Indiana', 'Pacers', 'IND', 'Central')
        self.insert('Milwaukee', 'Bucks', 'MIL', 'Central')
        
        self.insert('Dallas', 'Mavericks', 'DAL', 'Southwest')
        self.insert('Houston', 'Rockets', 'HOU', 'Southwest')
        self.insert('Memphis', 'Grizzlies', 'MEM', 'Southwest')
        self.insert('New Orleans', 'Hornets', 'NO', 'Southwest')
        self.insert('San Antonio', 'Spurs', 'SA', 'Southwest')
        
        self.insert('Atlanta', 'Hawks', 'ATL', 'Southeast')
        self.insert('Charlotte', 'Bobcats', 'CHA', 'Southeast')
        self.insert('Miami', 'Heat', 'MIA', 'Southeast')
        self.insert('Orlando', 'Magic', 'ORL', 'Southeast')
        self.insert('Washington', 'Wizards', 'WSH', 'Southeast')
        
        self.insert('Denver', 'Nuggets', 'DEN', 'Northwest')
        self.insert('Minnesota', 'Timberwolves', 'MIN', 'Northwest')
        self.insert('Oklahoma City', 'Thunder', 'OKC', 'Northwest')
        self.insert('Portland', 'Trail Blazers', 'POR', 'Northwest')
        self.insert('Utah', 'Jazz', 'UTAH', 'Northwest')
        
        # DEFUNCT TEAMS
        self.insert('Seattle', 'Supersonics', 'SEA', 'Northwest')
        self.insert('New Jersey', 'Nets', 'NJ', 'Atlantic') 
        self.insert('Vancouver', 'Grizzlies', 'VAN', 'Central')
                
               
    