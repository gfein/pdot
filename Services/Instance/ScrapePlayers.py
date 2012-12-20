from Services.AjaxServiceResult import *
from Scrape.Instance.ScrapeBBRPlayerByLetter import *

class ScrapePlayers(AjaxResult):
    @staticmethod
    def scrapePlayersFromBBR():
        str_list = []
        beginNum = ord('a')
        endNum = ord('z')
        
        for number in xrange(beginNum, endNum+1):
            str_list.append(ScrapePlayers.scrapePlayersFromBBRWithName(chr(number)))
            str_list.append('<br><br>')

        return str_list            
        
    @staticmethod
    def scrapePlayersFromBBRWithName(letter):
        scraper = ScrapeBBRPlayerByLetter()
        scraper.mUrl = ScrapePlayers.getUrl(letter)
        scraper.getWebpage()
        retList = scraper.scrapeIntoDatabase()
        print 'Scrape for %s:\n Finished' % (letter)
        ScrapePlayers.printLine()
        return retList
        
    @staticmethod
    def getUrl(letter):
        return 'http://www.basketball-reference.com/players/%s/' % (letter)
    
    @staticmethod
    def printLine():
        print '---------------------------------------------------------'