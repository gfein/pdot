import shlex

class SQLUtil:
    
    @staticmethod
    def checkNameForSQL(val, part):
        name =  str(val.get_text()).strip('\*').replace('\'', '\'\'').strip()
        nameparts = name.split()
        
        if part == 0 or len(nameparts) == 2:
            return nameparts[part].encode('utf-8')
        else:
            fullName = ''
            index = 0
            for part in nameparts:
                if index > 0:
                    fullName += part
                    if (index + 1) != len(nameparts):
                        fullName += ' '                
                index = index + 1
            return fullName.encode('utf-8')
            
    
    @staticmethod
    def checkStringForSQL(val):
        retStr = ''
        
        try:
            retStr = val.string.strip().encode('utf-8')
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
            
        return retStr.encode('utf-8')
    
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
            return str(day)
        
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
            