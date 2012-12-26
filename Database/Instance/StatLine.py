from Database.Queryable import *

class StatLine():	
	mPlayer = None
	mYear = None
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
	
	COLUMN_PLAYER = 'PlayerId' # FK to Player Table
	COLUMN_YEAR = 'SeasonId' # FK to Season Table
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

	def dropAndRecreateTable(self): 
		retStr = [] 
		retStr.append(self.dropTable()) 
		retStr.append(self.createTable()) 
		return retStr   

	def createTable(self):
		return 'StatLineDbLayer.createTable() : Not Implemented Yet'