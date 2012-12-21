from UI.PageControllers.BaseController import *
from Database.Instance.Model import *
import Database.Instance.Players
from Database.Instance.Players import PlayersDbLayer

class PlayerProfileController(BaseController):
    @staticmethod
    def Profile(request, route):
        BaseController.importBaseController()
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        dbLayer = PlayersDbLayer()
        foundPlayer = dbLayer.queryById(route['playerId'])
        
        if foundPlayer.uniqueId is not None:                            
            template = env.get_template(Configuration.webpageDirectory['playerProfile'])                        
            return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion(),
                                   playerName=foundPlayer.firstName + ' ' + foundPlayer.lastName,
                                   uniqueId=foundPlayer.uniqueId,
                                   firstName=foundPlayer.firstName,
                                   lastName=foundPlayer.lastName,
                                   height=foundPlayer.height,
                                   weight=foundPlayer.weight,
                                   born=foundPlayer.born,
                                   playedFrom=foundPlayer.playedFrom,
                                   playedTo=foundPlayer.playedTo)
        else:
            template = env.get_template(Configuration.webpageDirectory['playerProfileError'])                        
            return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion(),
                                   uniqueId=route['playerId'])