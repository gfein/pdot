from Services.AjaxServiceResult import *

class GetUnixTimeService(AjaxResult):
    @staticmethod
    def getTime():
        AjaxResult.importAjaxResult()
        return int(time.time())            