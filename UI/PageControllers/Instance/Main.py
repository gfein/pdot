from UI.PageControllers.BaseController import *

class MainController(BaseController):
    
    def setup(self):        
        return Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        
    def ViewHome(self, request, route):
        env = self.setup()
        template = env.get_template(Configuration.webpageDirectory['home'])
        
        return template.render(futureQuote=self.getFutureQuote(), 
                               serverVersion=self.getServerVersion(),
                               url=self.url)
    
    def ViewError(self, request, route):
        env = self.setup()
        template = env.get_template(Configuration.webpageDirectory['error'])
        
        return template.render(futureQuote=self.getFutureQuote(), 
                               serverVersion=self.getServerVersion(),
                               url=self.url)        
    
    def ViewDatabaseUtilities(self, request, route):
        env = self.setup()
        template = env.get_template(Configuration.webpageDirectory['debug'])
        
        return template.render(futureQuote=self.getFutureQuote(), 
                               serverVersion=self.getServerVersion(),
                               url=self.url)        