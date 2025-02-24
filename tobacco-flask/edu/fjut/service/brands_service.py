from sqlalchemy import text
from edu.fjut.db import db

class Brands_Service(object):
    @staticmethod
    def brands_structure():
        sql = text(f"""
            SELECT 
                level,
                COUNT(*) AS count
            FROM 
                brands
            GROUP BY 
                level
        """)
        result = db.session.execute(sql)
        data = result.fetchall()
        # 计算所有第二个值的和
        total = sum(t[1] for t in data)
        # 生成新的列表，将每个元组的第二个值替换为比例
        data = [(t[0], round(t[1]*100 / total if total > 0 else 0, 1)) for t in data]
        level_mapping = {1: "低端", 2: "中端", 3: "高端"}
        result = [
            {"level": level_mapping.get(row[0]), "value": row[1]}
            for row in data
        ]
        return result