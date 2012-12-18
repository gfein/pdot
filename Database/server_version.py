import MySQLdb

conn = MySQLdb.connect (host = "localhost",
                        user = "pdot",
                        passwd = "pdot",
                        db = "test")
cursor = conn.cursor ()
cursor.execute ("SELECT VERSION()")
row = cursor.fetchone ()
print "server version:", row[0]
cursor.close ()
conn.close ()