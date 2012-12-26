from UI.PageControllers.BaseController import *

class RedirectController(BaseController):
    @staticmethod
    def redirect(request, route, redirectUrl):
        BaseController.importBaseController()
        
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['redirect'])
        
        return template.render(url=redirectUrl)
    
    @staticmethod
    def ViewData(request, route):
        return RedirectController.redirect(request, route, '/ViewData')
    
    @staticmethod
    def searchLetterIndex(request, route):
        return RedirectController.redirect(request, route, '/index/' + route['searchLetter'] + '/')        