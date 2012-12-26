from UI.PageControllers.BaseController import *

class MainController(BaseController):
    
    @staticmethod
    def setup():
        BaseController.importBaseController()        
        return Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        
    @staticmethod
    def Home(request, route):
        env = MainController.setup()
        template = env.get_template(Configuration.webpageDirectory['home'])
        
        return template.render(futureQuote=BaseController.getFutureQuote(), 
                               serverVersion=BaseController.getServerVersion())
    
    @staticmethod
    def Error(request, route):
        env = MainController.setup()
        template = env.get_template(Configuration.webpageDirectory['error'])
        
        return template.render(futureQuote=BaseController.getFutureQuote(), 
                               serverVersion=BaseController.getServerVersion())        
                
    @staticmethod
    def Debug(request, route):
        env = MainController.setup()
        template = env.get_template(Configuration.webpageDirectory['debug'])
        
        return template.render(futureQuote=BaseController.getFutureQuote(), 
                               serverVersion=BaseController.getServerVersion())        