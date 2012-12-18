import importlib
from webob import Request, Response
from Routes import *
import Configuration

class PageRouter:
    def __init__(self, request):
        self.request = request
        
    def __call__(self):
        route = map.match(self.request.path)
        print route
        
        try:
            module = importlib.import_module(Configuration.pageControllersRoot + "." + route["controller"])            
            controllerClass = getattr(module, route['controller'] + 'Controller')            
            method = getattr(controllerClass, route['action'])
            
            if Configuration.debugMode:
                print 'Module: ' + repr(module)
                print 'Controller: ' + repr(controllerClass)
                print 'Method: ' + repr(method)
            
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