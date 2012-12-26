import shlex
import unicodedata

class SQLUtil:
    
    @staticmethod
    def checkNameForSQL(val, part):
        try:
            val = val.get_text()
        except Exception:
            0 # Nothing.
            
        name =  str(val).strip('\*').replace('\'', '\'\'').strip()
        nameparts = name.split()
        
        if part == 0 or len(nameparts) == 2:
            return nameparts[part].encode('utf-8').upper()
        else:
            fullName = ''
            index = 0
            for part in nameparts:
                if index > 0:
                    fullName += part
                    if (index + 1) != len(nameparts):
                        fullName += ' '                
                index = index + 1
            return fullName.encode('utf-8').upper()
        
    @staticmethod
    def checkLastNameForSQL(val, part):
        try:
            val = val.get_text()
        except Exception:
            0 # Nothing.
            
        name =  str(val).strip('\*').replace('\'', '\'\'').strip().upper()
        return name.encode('utf-8')        
    
    @staticmethod
    def checkStringForSQL(val):
        retStr = ''
        
        try:
            retStr = val.string.strip().upper()
        except Exception:
            retStr = 'None'
            
        return retStr.encode('utf-8')
    
    @staticmethod
    def convertDateToSQL(val):
        # Expected to be converting from December 7, 1954 to 12/07/1954
        retStr = ''        
        try:
            dateArray = shlex.split(val.string.strip())
            retStr = dateArray[2] + "-" + SQLUtil.getNumberForMonth(dateArray[0]) + "-" + SQLUtil.getNumberForDay(dateArray[1]) 
        except Exception:
            retStr = 'NULL'
            
        return retStr.encode('utf-8').upper()
    
    @staticmethod
    def getNumberForMonth(val):
        if val == 'January':
            return '1'
        elif val == 'February':
            return '2'
        elif val == 'March':
            return '3'
        elif val == 'April':
            return '4'
        elif val == 'May':
            return '5'
        elif val == 'June':
            return '6'
        elif val == 'July':
            return '7'
        elif val == 'August':
            return '8'
        elif val == 'September':
            return '9'
        elif val == 'October':
            return '10'
        elif val == 'November':
            return '11'
        elif val == 'December':
            return '12'
        
    @staticmethod
    def getNumberForDay(val):
        day = int(val.strip(','))
        if day < 10:
            return '0%d' % (day)
        else:
            return str(day).upper()
        
    @staticmethod
    def convertStringToHeight(val):
        stringedHeight = SQLUtil.checkStringForSQL(val)
        if stringedHeight is not 'None':
            parts = stringedHeight.split('-')
            feet = int(parts[0]) * 12
            inches = int(parts[1])
            total = feet + inches
            return total
        else:
            return 0
    
    @staticmethod
    def convertStringToInt(val):
        stringedHeight = SQLUtil.checkStringForSQL(val)
        if stringedHeight == 'None':
            return 0            
        else:
            return int(SQLUtil.checkStringForSQL(val))
        
    @staticmethod
    def ESPN_GetNameFromPositionString(val, pos):
        val = str(val.get_text()).upper().split(',')[0]
        val = val.strip().upper()
        val = SQLUtil.removeAccents(val)
        strList = val.split()
        if pos == 0 or len(strList) == 2:
            return strList[pos].encode('utf-8')
        else:
            fullName = ''
            index = 0
            for part in strList:
                if index > 0:
                    fullName += part
                    if (index + 1) != len(strList):
                        fullName += ' '                
                index = index + 1
            return fullName.encode('utf-8')
    
    @staticmethod
    def splitByHyphen(val, pos):
        val = str(val.get_text()).upper().replace('-', ' ')
        strList = val.split()
        retStr = strList[pos].strip().encode('utf-8')
        return retStr
    
    @staticmethod
    def getValueFromColumn(val):
        val = str(val.get_text()).upper()
        retStr = val.strip().encode('utf-8')
        return retStr
            
    @staticmethod
    def isFinalPageESPN(val):
        val = val.get_text()
        val = val.upper()
        val = val.replace(' OF ', '-')
        val = val.split('-')
        if val[0] == val[1]:
            return True
        else:
            return False
    @staticmethod
    def getTeamFromAbbreviation(val):
        return SQLUtil.getValueFromColumn(val).split('/')
        
    @staticmethod
    def removeAccents(input_str):
        nkfd_form = unicodedata.normalize('NFKD', unicode(input_str))
        only_ascii = nkfd_form.encode('ASCII', 'ignore')
        return only_ascii