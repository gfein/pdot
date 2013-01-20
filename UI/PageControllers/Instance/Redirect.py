from UI.PageControllers.BaseController import *

class RedirectController(BaseController):

    def redirect(self, request, route, redirectUrl):        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['redirect'])
        
        return template.render(url=redirectUrl)
    
    def ViewData(self, request, route):
        return self.redirect(request, route, '/ViewData')
    
    def searchLetterIndex(self, request, route):
        return self.redirect(request, route, '/index/' + route['searchLetter'] + '/')        