from jinja import Environment, PackageLoader
from Database.DatabaseUtility import *
from Util.FutureQuote import *
from routes import URLGenerator
import Configuration
import random

class BaseController:
    
    def __init__(self, request, map, route):
        self.url = URLGenerator(map, request.environ)
        self.route = route
        self.request = request 
    
    def getFutureQuote(self):
        return FutureQuote.getRandomQuote()

    def getServerVersion(self):
        return DatabaseUtility.getVersion()