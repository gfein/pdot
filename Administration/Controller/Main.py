from jinja import Environment, PackageLoader
from Database.DatabaseUtility import *
from Util.FutureQuote import *
import random

class MainController:
    @staticmethod
    def Index(request, route):
        env = Environment(loader=PackageLoader('PDOT', 'Administration/Website/pages'))
        template = env.get_template('master.html')
        
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion())