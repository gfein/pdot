import importlib
from webob import Request, Response
import Configuration
from Routes import *

class PageRouter:
    def __init__(self, request):
        self.request = request
        
    def __call__(self):
        route = map.match(self.request.path)
        print route
        
        try:             
            # Not the most elegant code, but necessary due to differing root directories of pages vs resources           
            module = None
            controllerClass = None
            method = None
            
            # Resources will create their own response object
            if(route['controller'] == u'Resource'):
                module = importlib.import_module(Configuration.resourceControllerRoot + "." + route["controller"])            
                controllerClass = getattr(module, route['controller'] + 'Controller')            
                method = getattr(controllerClass, route['action'])
                return method(self.request, route)
            else:
                module = importlib.import_module(Configuration.pageControllersRoot + "." + route["controller"])            
                controllerClass = getattr(module, route['controller'] + 'Controller')            
                method = getattr(controllerClass, route['action'])
                return Response(method(self.request, route))
            
            if Configuration.debugMode:
                print 'Module: ' + repr(module)
                print 'Controller: ' + repr(controllerClass)
                print 'Method: ' + repr(method)
            
        except Exception, e:
            print 'PageRouter Exception: ' + repr(e)
            response = Response()
            response.status = 404
            response.body = "Page Not Found"
            return response;