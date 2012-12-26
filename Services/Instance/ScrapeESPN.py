from Services.AjaxServiceResult import *
from Scrape.Instance.ScrapeESPNScoringSummaryBySeason import *

class ScrapeESPN(AjaxResult):
    @staticmethod
    def scrapeScoringSummaries():
        str_list = []
        beginNum = 2001
        endNum = 2013
        
        for number in range(beginNum, endNum):
            url = 'http://espn.go.com/nba/statistics/player/_/stat/scoring-per-game/sort/avgPoints/year/%s/qualified/false' % (number)
            str_list.append(ScrapeESPN.scrapeESPN_ScoringSummaryBySeason(url, number))
            str_list.append('<br><br>')

        return str_list            
        
    @staticmethod
    def scrapeESPN_ScoringSummaryBySeason(url, number):
        scraper = ScrapeESPNScoringSummaryBySeason()
        scraper.setSeason(number)
        finished = False
        retList = []
        spread = 0
        while not finished:
            scraper.mUrl = url
            scraper.getWebpage()
            retList.append(scraper.scrapeIntoDatabase())
            finished = SQLUtil.isFinalPageESPN(scraper.mSoup.find('div', 'page-numbers'))
            if not 'count' in url:
                spread = 41
                url = url + '/count/' + str(spread)
            else:
                spread = spread + 40
                negativeIndex = -2
                if (spread - 40) > 100:
                    negativeIndex = -3
                url = url[:negativeIndex] + str(spread)
            print 'New URL: %s' % (url)
        print 'Scrape for Season (%s):\n Finished' % (str(number-1) + ' - ' + str(number))
        AjaxResult.printLine()
        
        finalList = []
        for strList in retList:
            for subItem in strList:
                finalList.append(subItem)
        return finalList