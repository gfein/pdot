from UI.PageControllers.BaseController import *
import Database.Instance.Players
from Database.Instance.Players import PlayersDbLayer
from Database.Instance.PlayerAlias import AliasDbLayer
from Database.Instance.StatLine import StatLineDbLayer

class PlayerProfileController(BaseController):
    @staticmethod
    def Profile(request, route):
        BaseController.importBaseController()
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        dbLayer = PlayersDbLayer()
        foundPlayer = dbLayer.queryById(route['playerId'])
        
        aliasLayer = AliasDbLayer()
        knownAliases = aliasLayer.getAliasesForOfficialName(foundPlayer.firstName, foundPlayer.lastName)
        
        statLineLayer = StatLineDbLayer()
        statsArray = statLineLayer.queryStatsForId(foundPlayer.uniqueId)
        
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
                                   playedTo=foundPlayer.playedTo,
                                   aliases=knownAliases,
                                   statsResults=statsArray )
        else:
            template = env.get_template(Configuration.webpageDirectory['playerProfileError'])                        
            return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion(),
                                   uniqueId=route['playerId'])