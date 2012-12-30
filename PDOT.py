import os
import sys
from webob import Request, Response, exc
from webob.dec import wsgify
from Configuration import config
from UI.PageRouter import PageRouter
from Services.ServiceRouter import ServiceRouter
import Configuration

class PDOTApp:
    def __init__(self):        
        # Need something here... 
        0
        
    @wsgify
    def __call__(self, request):
        response = None                
             
        try:
            hostname = request.host
            #print 'Query String for sessionId: %s' % (request.GET['sessionId'])
            # Is this a page request or a service request?
            if request.path.__len__() > 20 and request.path[1:20] == Configuration.handleJQueryRequest:
                service = ServiceRouter(request)
                response = service()                                
            else :
                if hostname == config['address']['hostname']:                    
                    page = PageRouter(request)
                    response = page()
                else:
                    response = Response("Whoa bro, you seeing this?")
                
        # Return HTTP exception
        except exc.HTTPException, e:
            response = e
            
        # UNhandled exceptions return status 500 with the call stack
        except Exception, e:
            import traceback
            response = Response()
            response.status = 500
            response.body = traceback.format_exc()
            
        # Return response to client
        return response;
        
# Create simple_server for local testing
# This code won't be executed in the wsgi environment
if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    make_server('localhost', 9000, PDOTApp()).serve_forever()
            