from Services.AjaxServiceResult import *
from Database.Instance.CareerTotals import CareerTotalsDbLayer
from Database.Instance.Players import PlayersDbLayer

class GetPlayerSearchCriteria(AjaxResult):
    @staticmethod
    def getPlayerSearchHTML():
        result = []
        path = Configuration.subviewFolder + '\\' + Configuration.subviewPageDirectory['subview_playerSearchCriteria']           
        file = open(path, 'r')
        html = file.read()
        return html                       