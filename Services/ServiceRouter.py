from webob import Request, Response
from Services.Routes import *
import Configuration
from Services import Routes
from Services.Instance.GetUnixTime import *

class ServiceRouter:
    def __init__(self, request):
        self.request = request
        
    def __call__(self):
        serviceRoute = routes[self.request.path[21:]]
        response = Response()
        response.status = 200
        
        if serviceRoute == routes['GetUnixTime']:
            time = GetUnixTimeService.getTime()
            response.body = self.wrapInJSON(time)
        else :
            response.body = "[0]"        
        return response;
    
    def wrapInJSON(self, var):
        return '[' + str(var) + ']'