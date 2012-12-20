from DatabaseUtility import *
from time import time
import Database.Constants

class Queryable(object):
	mConnection = None
	mStartTime = None

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
		   	
	def getSuccessfulCreateTableString(self, table):
		return 'Successfully created table: ' + table
	
	def getFailureCreateTableString(self, table):
		return 'Failure to create table: ' + table
	
	def getSuccessfulDropTableString(self, table):
		return 'Successfully dropped table: ' + table
	
	def getFailureDropTableString(self, table):
		return 'Failure to drop table: ' + table
	
	def getSuccessfulInsertString(self, table, id):
		return 'Successfully inserted \"' + id + '\" into ' + table + '.'
	
	def getFailureInsertString(self, table, id, reason):
		return 'Failed to insert \"' + id + '\" into ' + table + ': ' + reason	
		   	
	def __del__(self):
		print 'Execution time: %s' % (time() - self.mStartTime)