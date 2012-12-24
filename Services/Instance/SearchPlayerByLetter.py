from Services.AjaxServiceResult import *
from Database.Instance.CareerTotals import CareerTotalsDbLayer
from Database.Instance.Players import PlayersDbLayer

class SearchPlayerByLetter(AjaxResult):
    @staticmethod
    def getPlayerSearchHTML():
        result = []
        path = Configuration.subviewFolder + '\\' + Configuration.subviewPageDirectory['playerSearchByLetterCriteria']           
        file = open(path, 'r')
        html = file.read()
        return html                             