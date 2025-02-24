from sqlalchemy import text
from edu.fjut.db import db

class Users_Service(object):
    @staticmethod
    def login(username, password):
        sql = text(f"""
                select * from users where username = '{username}' and password = '{password}'
                    """)
        result = db.session.execute(sql)
        data = result.fetchone()
        return "false" if data is None else "true"