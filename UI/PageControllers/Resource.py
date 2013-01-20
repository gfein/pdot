from BaseController import *
import mimetypes
from webob import Response

class ResourceController(BaseController):
    def Load(self, request, route):        
        response = Response()
        response.status = 200
        response.content_type = mimetypes.guess_type(route['filename'])[0]
        if(route['base'] == None):
           filename = Configuration.rootFolder + route['filename']
        else:
            filename = Configuration.rootFolder + route['base'] + '/' + route['filename']
               
        if Configuration.debugMode:
            print('Route Filename: ' + route['filename'] + '\n' + 'Filename: ' + filename)
               
        response.body = open(filename, 'rb').read()
        return response