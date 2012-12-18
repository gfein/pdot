import importlib
from webob import Request, Response
from Routes import map

class PageRouter:
    def __init__(self, request):
        self.request = request
        
    def __call__(self):
        route = map.match(self.request.path)
        print route
        
        try:
            module = importlib.import_module("Website.PageControllers" + "." + route["controller"])
            controllerClass = getattr(module, route['controller'] + 'Controller')
            method = getattr(controllerClass, route['action'])
            
            # Resources will create their own response object
            if(route['controller'] == u'Resource'):
                return method(self.request, route)
            else:
                return Response(method(self.request, route))
            
        except Exception, e:
            print 'PageRouter Exception: ' + repr(e)
            response = Response()
            response.status = 404
            response.body = "Page Not Found"
            return response;