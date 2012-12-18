from BaseController import *

class MainController(BaseController):
    @staticmethod
    def Index(request, route):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template('master.html')
        
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion())