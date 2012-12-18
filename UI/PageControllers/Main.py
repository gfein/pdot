from BaseController import *
from Database.Instance.Model import *

class MainController(BaseController):
    @staticmethod
    def Index(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['master'])
        
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion())