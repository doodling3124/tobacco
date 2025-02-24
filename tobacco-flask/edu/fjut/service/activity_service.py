from sqlalchemy import text
from edu.fjut.db import db

class Activity_Service(object):
    @staticmethod
    def get_all_activity():
        sql = text(f"""
            select * from activity
        """)
        result = db.session.execute(sql)
        data = result.fetchall()
        result = [
            {
                "key": row[0],
                "activity_name": row[1],
                "activity_date": f"{row[2].strftime('%Y-%m-%d')} 至 {row[3].strftime('%Y-%m-%d')}",
                "participants": row[4],
                "sales_amount": row[5],
                "new_customers": row[6],
                "activity_cost": row[7],
                "roi": row[8]
            }
            for row in data
        ]
        return result

    @staticmethod
    def get_all_activity_roi():
        sql = text(f"""
                select activity_name, activity_cost from activity
            """)
        result = db.session.execute(sql)
        data = result.fetchall()
        value = [
            {
                "x": row[0],
                "type": "实际投入成本",
                "y": row[1]
            }
            for row in data
        ]
        sql = text(f"""
                        select activity_name, sales from activity
                    """)
        result = db.session.execute(sql)
        data = result.fetchall()
        value = value + [
            {
                "x": row[0],
                "type": "总销售额",
                "y": row[1]
            }
            for row in data
        ]
        result = [
            {
                "id": "acticity",
                "values": value
            }
        ]
        sql = text(f"""
                        select activity_name, roi from activity
                    """)
        result1 = db.session.execute(sql)
        data = result1.fetchall()
        value = [
            {
                "x": row[0],
                "type": "ROI",
                "y": row[1]
            }
            for row in data
        ]
        result.append({
            "id": "ROI",
            "values": value
        })
        return result

    @staticmethod
    def get_card_data():
        sql = text(f"""
                select sum(activity_cost), sum(sales), avg(roi), sum(new_customers) from activity
            """)
        result = db.session.execute(sql)
        data = result.fetchall()
        # 遍历最外层列表，再遍历元组，将 Decimal 类型转换为 float 类型（如果需要整数也可以转换为 int 类型）
        new_data = [[float(x) for x in tup] for tup in data]
        # 由于原数据只有一个元组，这里取第一个元素就是最终结果
        result = new_data[0]
        result = [int(result[0]), int(result[1]), round(result[2], 2), int(result[3])]
        return result