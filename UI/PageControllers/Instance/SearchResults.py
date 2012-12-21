from UI.PageControllers.BaseController import *
from Database.Instance.Model import *
from Database.Instance.Players import PlayersDbLayer

class SearchResultsController(BaseController):
    @staticmethod
    def Display(request, route):
        BaseController.importBaseController()
        dbLayer = PlayersDbLayer()
        foundPlayers = dbLayer.queryByLetter(route['searchLetter'])
        env = Environment(loader=PackageLoader('PDOT', Configuration.pagesFolder))
        template = env.get_template(Configuration.webpageDirectory['searchResults'])
        
        
        return template.render(route=route, futureQuote=FutureQuote.getRandomQuote(), serverVersion=DatabaseUtility.getVersion(),
                               queryDescription = 'Last Name of ' + route['searchLetter'] + '*',
                               playerResult=foundPlayers)