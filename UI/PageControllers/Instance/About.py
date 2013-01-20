from UI.PageControllers.BaseController import *

class AboutController(BaseController):
    
    def ViewAbout(self, request, route):        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['about'])
        m = Model()
        return template.render(futureQuote=self.getFutureQuote(), 
                               serverVersion=self.getServerVersion(),
                               url=self.url)