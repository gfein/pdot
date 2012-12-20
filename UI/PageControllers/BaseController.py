from jinja import Environment, PackageLoader
from Database.DatabaseUtility import *
from Util.FutureQuote import *
import Configuration
import random

class BaseController:
    @staticmethod
    def importBaseController():
        b = BaseController()
        return b;
    
    @staticmethod
    def getFutureQuote():
        return FutureQuote.getRandomQuote()
    
    @staticmethod
    def getServerVersion():
        return DatabaseUtility.getVersion()