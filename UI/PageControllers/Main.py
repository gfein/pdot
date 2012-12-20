from BaseController import *
from Database.Instance.Model import *

class MainController(BaseController):
    @staticmethod
    def Home(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['home'])
        
        return template.render(futureQuote=BaseController.getFutureQuote(), 
                               serverVersion=BaseController.getServerVersion())
        
    @staticmethod
    def Debug(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['debug'])
        
        return template.render(futureQuote=BaseController.getFutureQuote(), 
                               serverVersion=BaseController.getServerVersion())        