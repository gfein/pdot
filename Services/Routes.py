# Ugly automation of incrementation

index = 0

from Services.Instance.GetUnixTime import *
GetUnixTimeRoute = index
index = index + 1

from Services.Instance.PrimeAllDatabases import *
PrimeAllDatabasesRoute = index
index = index + 1

from Services.Instance.ScrapePlayers import *
ScrapePlayersFromBBRRoute = index
index = index + 1

from Services.Instance.GetPlayerSearchCriteria import *
GetPlayerSearchCriteriaRoute = index
index = index + 1

from Services.Instance.SearchPlayerByLetter import *
SearchPlayerByLetterRoute = index
index = index + 1

# The below strings should match the name of the service being called from the UI.

routes = { "GetUnixTime" : GetUnixTimeRoute, 
          "PrimeAllDatabases" : PrimeAllDatabasesRoute,
          "ScrapePlayersFromBBR" : ScrapePlayersFromBBRRoute,
          "GetPlayerSearchCriteria" :  GetPlayerSearchCriteriaRoute,
          "SearchPlayerByLetter" : SearchPlayerByLetterRoute }