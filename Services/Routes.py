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

routes = { "GetUnixTime" : GetUnixTimeRoute, 
          "PrimeAllDatabases" : PrimeAllDatabasesRoute,
          "ScrapePlayersFromBBR" : ScrapePlayersFromBBRRoute }