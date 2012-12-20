from UI.PageControllers.BaseController import *
from Database.Instance.Model import *

class ViewDataController(BaseController):
    @staticmethod
    def Main(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['viewData'])
        
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion())
    
    
    @staticmethod
    def Type(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['viewData'])
        
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion())