import random

class FutureQuote:
    @staticmethod
    def getRandomQuote():
        f = open('Administration//Website/resources/futureQuotes.txt', 'r')
        l = list()
        listSize = 0;
        for line in f:
            l.append(line)
            listSize = listSize + 1

        return l[random.randint(0, (listSize-1))]