from Database.Queryable import *
from Database.Constants import *
from Database.Instance.Players import *
from Database.Instance.Team import *
from Database.Instance.Season import *
from Util.SQLUtil import *

class StatLine():
	mId= None	
	mPlayer = None
	mSeason = None
	mTeam = None	
	mGamesPlayed = None
	mMinutesPerGame = None
	mPoints = None
	mFieldGoalsMade = None
	mFieldGoalsAttempted= None
	mFieldGoalPercentage = None
	mThreePointsMade = None
	mThreePointsAttempted = None
	mThreePointPercentage = None
	mFreeThrowsMade = None
	mFreeThrowsAttempted = None
	mFreeThrowPercent = None
	
	COLUMN_ID = 'StatId'
	COLUMN_PLAYER = 'PlayerId' # FK to Player Table
	COLUMN_SEASON = 'SeasonId' # FK to Season Table
	COLUMN_TEAM = 'TeamId' # FK to Team Table	
	COLUMN_GAMES_PLAYED = 'GamesPlayed'	
	COLUMN_MINUTES_PER_GAME = 'MinutesPerGame'	
	COLUMN_POINTS = 'Points'
	COLUMN_FIELD_GOALS_MADE = 'FieldGoalsMade'
	COLUMN_FIELD_GOALS_ATTEMPTED = 'FieldGoalsAttempted'
	COLUMN_FIELD_GOAL_PERCENTAGE = 'FieldGoalPercentage'
	COLUMN_THREE_POINTS_MADE = 'ThreePointsMade'	
	COLUMN_THREE_POINTS_ATTEMPTED = 'ThreePointsAttempted'	
	COLUMN_THREE_POINT_PERCENTAGE = 'ThreePointPercentage'		
	COLUMN_FREE_THROWS_MADE = 'FreeThrowsMade'		
	COLUMN_FREE_THROWS_ATTEMPTED = 'FreeThrowsAttempted'	
	COLUMN_FREE_THROWS_PERCENTAGE = 'FreeThrowPercentage'
	
	
class StatLineDbLayer(Queryable):
	def __init__(self):
		Queryable.__init__(self)
		self.mTableName = Database.Constants.K_STAT_LINE_TABLE
		
	def setSeason(self, fromYear, toYear):
		self.mFromYear = fromYear
		self.mToYear = toYear

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
				cur.execute('CREATE TABLE ' + self.mTableName + 
                            '(' + StatLine.COLUMN_ID + ' INT PRIMARY KEY AUTO_INCREMENT, ' +   
                            StatLine.COLUMN_PLAYER + ' INT NOT NULL, ' + 
                            StatLine.COLUMN_TEAM + ' INT NOT NULL, ' + 
                            StatLine.COLUMN_SEASON + ' INT NOT NULL, ' +                           
                            StatLine.COLUMN_GAMES_PLAYED + ' INT, ' +
                            StatLine.COLUMN_MINUTES_PER_GAME + ' FLOAT, ' + 
                            StatLine.COLUMN_POINTS + ' FLOAT, ' + 
                            StatLine.COLUMN_FIELD_GOALS_MADE + ' FLOAT, ' + 
                            StatLine.COLUMN_FIELD_GOALS_ATTEMPTED + ' FLOAT, ' + 
                            StatLine.COLUMN_FIELD_GOAL_PERCENTAGE + ' FLOAT, ' + 
                            StatLine.COLUMN_THREE_POINTS_MADE + ' FLOAT, ' + 
                            StatLine.COLUMN_THREE_POINTS_ATTEMPTED + ' FLOAT, ' + 
                            StatLine.COLUMN_THREE_POINT_PERCENTAGE + ' FLOAT, ' +
                            StatLine.COLUMN_FREE_THROWS_MADE + ' FLOAT, ' +
                            StatLine.COLUMN_FREE_THROWS_ATTEMPTED + ' FLOAT, ' + 
                            StatLine.COLUMN_FREE_THROWS_PERCENTAGE + ' FLOAT, ' +
                            'FOREIGN KEY (' + StatLine.COLUMN_PLAYER + ') REFERENCES ' + K_PLAYERS_TABLE + '(' + Player.COLUMN_ID + '), '
                            'FOREIGN KEY (' + StatLine.COLUMN_TEAM + ') REFERENCES ' + K_TEAM_TABLE + '(' + Team.COLUMN_ID + '), '
                            'FOREIGN KEY (' + StatLine.COLUMN_SEASON + ') REFERENCES ' + K_SEASON_TABLE + '(' + Season.COLUMN_SEASON_ID + ') ' +
                            ')')
				str_list.append(self.getSuccessfulCreateTableString(self.mTableName))
		except Exception, e:
			print 'Exception: %s' % (e)
			str_list.append(self.getFailureCreateTableString(self.mTableName))
		finally:
			self.closeConnection()
		
		return str_list      
	
	def bulkInsert(self, dataList):
		self.openConnection()
		str_list = []
		uniqueId = ''

		try:
			with self.getConnection():
				cur = self.getConnection().cursor()                
				for row in dataList:
					uniqueId = str(row[0] + ' ' + str(row[1]))					
					str_list.append(self.insertFromBulk(cur, row))								
				str_list.append('<br><hr><br>')
		except Exception, e:
			print 'Exception: %s' % (e)
			str_list.append(self.getFailureInsertString(self.mTableName, uniqueId, repr(e)))
		finally:
			self.closeConnection()
			
		return str_list		
	
	def insertFromBulk(self, cursor, row):
		strList = []
		seasonId = None
		playerId = None
		teamId = None		
		
		for team in row[2]:
			firstName = SQLUtil.checkNameForSQL(row[0], 0)
			lastName = SQLUtil.checkLastNameForSQL(row[1], 0)
			
			playersDbLayer = PlayersDbLayer()
			playerId = playersDbLayer.findPlayerIdByName(firstName, lastName)
			
			teamQuery = 'SELECT ' + Team.COLUMN_ID + ' FROM ' + K_TEAM_TABLE + ' WHERE ' + Team.COLUMN_ABBREVIATION+ '=\'' + team + '\''
			cursor.execute(teamQuery)
			teamResult = cursor.fetchone()
			teamId = teamResult[0]
			
			seasonQuery = 'SELECT ' + Season.COLUMN_SEASON_ID + ' FROM ' + K_SEASON_TABLE + ' WHERE ' + Season.COLUMN_FROM_YEAR + '=' + str(self.mFromYear) + ' AND ' + Season.COLUMN_TO_YEAR + '=' + str(self.mToYear)
			cursor.execute(seasonQuery)
			seasonResult = cursor.fetchone()
			seasonId = seasonResult[0]
			
			fullName = '%s %s, %s/%s/%s' % (str(firstName), str(lastName), str(playerId), str(teamId), str(seasonId))
			
			if playerId is not None and teamId is not None and seasonId is not None:
				if not cursor.execute('SELECT (1) FROM ' + self.mTableName +' WHERE ' + StatLine.COLUMN_PLAYER + '=' + str(playerId) + ' AND ' + StatLine.COLUMN_TEAM + '=' + str(teamId) + ' AND ' + StatLine.COLUMN_SEASON + '=' + str(seasonId) + ' LIMIT 1'):
					cursor.execute("INSERT INTO " + self.mTableName + 
							"(" + StatLine.COLUMN_PLAYER + ", " + StatLine.COLUMN_TEAM + ", " + StatLine.COLUMN_SEASON + ", " + 
							StatLine.COLUMN_GAMES_PLAYED + ", " + 
							StatLine.COLUMN_MINUTES_PER_GAME + ", " + 
							StatLine.COLUMN_POINTS + ", " + 
							StatLine.COLUMN_FIELD_GOALS_MADE + ", " + 
							StatLine.COLUMN_FIELD_GOALS_ATTEMPTED + ", " + 
							StatLine.COLUMN_FIELD_GOAL_PERCENTAGE + ", " + 
							StatLine.COLUMN_THREE_POINTS_MADE + ", " + 
							StatLine.COLUMN_THREE_POINTS_ATTEMPTED + ", " + 
							StatLine.COLUMN_THREE_POINT_PERCENTAGE + ", " + 
							StatLine.COLUMN_FREE_THROWS_MADE + ", " + 
							StatLine.COLUMN_FREE_THROWS_ATTEMPTED + ", " + 
							StatLine.COLUMN_FREE_THROWS_PERCENTAGE + " " + 					
							") VALUES(" + 
							"" + str(playerId) + ", " + # Player ID
							"" + str(teamId) + ", " +  # Team ID
							"" + str(seasonId) + ", " +  # Season ID
							"" + str(row[3]) + ", " +  # Games Played
							"" + str(row[4]) + ", " +  # Minutes per game
							"" + str(row[5]) + ", " +  # Points
							"" + str(row[6]) + ", " +  # FGM
							"" + str(row[7]) + ", " +  # FGA
							"" + str(row[8]) + ", " +  # FGP
							"" + str(row[9]) + ", " +  # TPM
							"" + str(row[10]) + ", " +  # TPA
							"" + str(row[11]) + ", " +  # TPP
							"" + str(row[12]) + ", " +  # FTM
							"" + str(row[13]) + ", " +  # FTA
							"" + str(row[14]) + " " +  # FTP                                 
							")")
					strList.append( self.getSuccessfulInsertString(self.mTableName, fullName) + '<br>')
				else:
					strList.append(self.getFailureInsertString(self.mTableName, fullName, 'Duplicate Entry') + '<br>')		
			else:
				strList.append('Could not find full Trifecta of PKs for %s %s' % (str(firstName), str(lastName)) + '<br>')		
		return ''.join(strList)
	
	def queryStatsForId(self, uniqueId):
		self.openConnection()
		str_list = []

		try:
			with self.getConnection():
				cur = self.getConnection().cursor()                
				cur.execute('SELECT ' +  
						StatLine.COLUMN_SEASON + ', ' +
						StatLine.COLUMN_TEAM + ', ' +                                                       
                        StatLine.COLUMN_GAMES_PLAYED + ', ' +
                        StatLine.COLUMN_MINUTES_PER_GAME + ', ' + 
                        StatLine.COLUMN_POINTS + ', ' + 
                        StatLine.COLUMN_FIELD_GOALS_MADE + ', ' + 
                        StatLine.COLUMN_FIELD_GOALS_ATTEMPTED + ', ' + 
                        StatLine.COLUMN_FIELD_GOAL_PERCENTAGE + ', ' + 
                        StatLine.COLUMN_THREE_POINTS_MADE + ', ' + 
                        StatLine.COLUMN_THREE_POINTS_ATTEMPTED + ', ' + 
                        StatLine.COLUMN_THREE_POINT_PERCENTAGE + ', ' +
                        StatLine.COLUMN_FREE_THROWS_MADE + ', ' +
     				    StatLine.COLUMN_FREE_THROWS_ATTEMPTED + ', ' + 
                        StatLine.COLUMN_FREE_THROWS_PERCENTAGE + ' ' + 
                        'FROM ' + str(self.mTableName) + ' ' +
                        'WHERE ' + StatLine.COLUMN_PLAYER + '=' + str(uniqueId))
				rows = cur.fetchall()
				teamDbLayer = TeamDbLayer()
				seasonDbLayer = SeasonDbLayer()
				for row in rows:
					statRowObject = StatRowObject()
					statRowObject.mData = row
					statRowObject.mSeasonName = str(seasonDbLayer.getSeasonNameForId(row[0]))
					statRowObject.mTeamName = str(teamDbLayer.getTeamAbbreviationForId(row[1]))		
					statRowObject.mFGP = '%.1f' %  (row[7] * 100)		
					statRowObject.mTPP = '%.1f' %  (row[10] * 100)
					statRowObject.mFTP = '%.1f' %  (row[13] * 100)
					str_list.append(statRowObject)														
		except Exception, e:
			print 'Exception: %s' % (e)
			str_list.append(self.getFailureCreateTableString(self.mTableName))
		finally:
			self.closeConnection()

		if len(str_list) == 0:
			rowObject = StatRowObject()
			rowObject.mError = "No career data for this player" 
			str_list.append(rowObject)
		return str_list      
	
class StatRowObject():
	mData = None
	mSeasonName = None
	mTeamName = None
	mFGP = None
	mFTP = None
	mTPP = None
	mError = None