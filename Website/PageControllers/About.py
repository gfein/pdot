from BaseController import *
from Database.Instance.Model import *

class AboutController(BaseController):
    @staticmethod
    def About(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template('master.html')
        m = Model()
        return template.render(route=m.getWriters(), futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion())