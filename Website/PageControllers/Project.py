from BaseController import *

class ProjectController:
    @staticmethod
    def View(request, route):
        return route['projectId']