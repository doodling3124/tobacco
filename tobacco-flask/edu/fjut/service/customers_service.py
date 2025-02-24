from sqlalchemy import text
from edu.fjut.db import db


class Customers_Service:
    @staticmethod
    def all_customers():
        sql = text("""
            select * from customers;
        """)
        result = db.session.execute(sql)
        data = result.fetchall()
        result = [{"key": int(row[0]), "customer_name": row[1], "address": row[2], "telephone": row[3], "level": row[4]} for
                   row in data]
        return result

    @staticmethod
    def customers_details(id):
        sql = text(f"""
            select 
            s.pack_type, s.diameter, s.taste, c.date, c.main_selling_spec_id, c.order_full_rate 
            from customers_details c join specifications s on c.main_selling_spec_id=s.spec_id 
            where customer_id = {id};
        """)
        result = db.session.execute(sql)
        data = result.fetchall()
        count_dict = {}
        for item in data:
            fifth_num = item[4]
            count_dict[fifth_num] = count_dict.get(fifth_num, 0) + 1
        # 主销规格次数
        main_spec_count = [count_dict[item[4]] for item in data]
        main_spec_count = [round(main_spec_count[i] * 100 /sum(main_spec_count)) for i in range(len(main_spec_count))]
        result = {
            "main_selling_spec" : [{"specification" : f"{row[0]}/{row[1]}/{row[2]}", "value": main_spec_count[i]} for i, row in enumerate(data)],
            "order_full_rate": [{"date": row[3].strftime("%Y-%m"), "value": row[5]} for row in data]
        }
        return result