from UI.PageControllers.BaseController import *
from Database.Instance.Model import *

class AboutController(BaseController):
    @staticmethod
    def About(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['about'])
        m = Model()
        return template.render(futureQuote=BaseController.getFutureQuote(), 
                               serverVersion=BaseController.getServerVersion())