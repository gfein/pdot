import mimetypes
from webob import Response

class ResourceController:
    @staticmethod
    def Load(request, route):
        response = Response()
        response.status = 200
        response.content_type = mimetypes.guess_type(route['filename'])[0]
        if(route['base'] == None):
           filename = 'Administration/Website/' + route['filename']
        else:
            filename = 'Administration/Website/' + route['base'] + '/' + route['filename']
               
        print('Route Filename: ' + route['filename'] + '\n' + 'Filename: ' + filename)
               
        response.body = open(filename, 'rb').read()
        return response