from DatabaseUtility import *
from time import time

class Queryable(object):
	mConnection = None
	mStartTime = time()

	def __init__(self):
		print 'Queryable created'
		
	def openConnection(self):
		self.mConnection = DatabaseUtility.getConnection()
		
	def getConnection(self):
		if self.mConnection:
			return self.mConnection
				
	def closeConnection(self):		
		if self.mConnection:
		   	self.mConnection.close()  
		   	
	def __del__(self):
		print 'Execution time: %s' % (time() - self.mStartTime)