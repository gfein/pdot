from bs4 import BeautifulSoup
import urllib

url = 'http://www.basketball-reference.com/players/b/bryanko01.html'
opener = urllib.FancyURLopener({})
html = str(opener.open(url).read()).encode('utf-8')
soup = BeautifulSoup(html)

print' Finding Totals for 1997...'
print soup.findAll(id="players")