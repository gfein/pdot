from jinja import Environment, PackageLoader
from Util.FutureQuote import *
from Database.Model import *
import random

class AboutController:
    @staticmethod
    def About(request, route):
        env = Environment(loader=PackageLoader('PDOT', 'Administration/Website/pages'))
        template = env.get_template('master.html')
        m = Model()
        return template.render(route='This is the about page, bitch.', futureQuote=FutureQuote.getRandomQuote(), serverVersion=m.getWriters())