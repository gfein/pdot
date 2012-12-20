from bs4 import BeautifulSoup
import urllib

class BaseScraper(object):
    mUrl  = None
    mHtml = None
    mSoup = None   
        
    def getWebpage(self):
        if self.checkIfValid() is True:
            opener = urllib.FancyURLopener({})
            self.mHtml = str(opener.open(self.mUrl).read()).encode('utf-8')
            self.mSoup = BeautifulSoup(self.mHtml)             
        
    def checkIfValid(self):
        if self.mUrl is not None:
            return True
        else:
            return False                       