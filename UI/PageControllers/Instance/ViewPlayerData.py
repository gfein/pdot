from UI.PageControllers.BaseController import *

class ViewPlayerDataController(BaseController):
    
    def ViewMain(self, request, route):        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['viewData'])
        
        return template.render(route=route, futureQuote=self.getFutureQuote(), serverVersion=DatabaseUtility.getVersion(),
                               url=self.url)
    
    
    def ViewType(self, request, route):
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['viewData'])
        
        return template.render(route=route, futureQuote=self.getFutureQuote(), serverVersion=DatabaseUtility.getVersion(),
                               url=self.url)