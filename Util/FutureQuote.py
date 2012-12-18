import random
import Configuration

class FutureQuote:
    @staticmethod
    def getRandomQuote():
        f = open(Configuration.futureQuotesDirectory + Configuration.futureQuotesFile, 'r')
        l = list()
        listSize = 0;
        for line in f:
            l.append(line)
            listSize = listSize + 1

        return l[random.randint(0, (listSize-1))]