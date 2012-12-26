from DatabaseUtility import *
from time import time
import Database.Constants

class Queryable(object):
	mConnection = None
	mStartTime = None
	mTableName = None

	def __init__(self):
		self.mStartTime = time()
		
	def openConnection(self):
		self.mConnection = DatabaseUtility.getConnection()
		
	def getConnection(self):
		if self.mConnection:
			return self.mConnection
				
	def closeConnection(self):		
		if self.mConnection:
			self.mConnection.close()	
	def dropTable(self):
		self.openConnection()
		str_list = []

		try:
			with self.getConnection():
				cur = self.getConnection().cursor()
				cur.execute("DROP TABLE IF EXISTS " + self.mTableName)
				str_list.append(self.getSuccessfulDropTableString(self.mTableName))
		except Exception, e:
			print 'Exception: %s' % (e)
			str_list.append(self.getFailureDropTableString(self.mTableName))
		finally:
			self.closeConnection()           

		return str_list       

	def getSuccessfulCreateTableString(self, table):
		return 'Successfully created table: ' + table
	
	def getFailureCreateTableString(self, table):
		return 'Failure to create table: ' + table
	
	def getSuccessfulDropTableString(self, table):
		return 'Successfully dropped table: ' + table
	
	def getFailureDropTableString(self, table):
		return 'Failure to drop table: ' + table
	
	def getSuccessfulInsertString(self, table, uniqueId):
		return 'Successfully inserted \"' + uniqueId + '\" into ' + table + '.'
	
	def getFailureInsertString(self, table, uniqueId, reason):
		return 'Failed to insert \"' + uniqueId + '\" into ' + table + ': ' + reason	

	def __del__(self):
		if Configuration.debugMode:
			print 'Execution time: %s' % (time() - self.mStartTime)