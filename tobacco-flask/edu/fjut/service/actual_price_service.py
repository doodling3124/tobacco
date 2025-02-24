from sqlalchemy import text
from edu.fjut.db import db


class ActualPricel_Service(object):
    @staticmethod
    def get_actual_price_list():
        sql = text("""
                    select b.brand_name, r.region_name, s.pack_type, s.diameter, s.taste, b.price, a.actual_price 
                    from 
                    actual_price a join (brands b join specifications s on b.spec_id = s.spec_id) 
                    on a.brand_id = b.brand_id
                    join regions r on a.region_id = r.region_id
                    WHERE a.date = (SELECT MAX(date) FROM actual_price);
                """)
        result = db.session.execute(sql)
        data = result.fetchall()
        result = [
            {"brand": row[0], "region": row[1], "specification": f"{row[2]}/{row[3]}/{row[4]}", "advice_price": row[5],
             "actual_price": row[6]}
            for
            row in data]
        return result

    @staticmethod
    def get_actual_price_sequence(brand, pack_type, diameter, taste, region):
        sql = text(f"""
                        select price from brands b 
                        join specifications s on b.spec_id = s.spec_id 
                        where b.brand_name = '{brand}' and s.pack_type = '{pack_type}' and s.diameter = '{diameter}' and s.taste = '{taste}';
                    """)
        result = db.session.execute(sql)
        advice_price = result.fetchone()[0]

        sql = text(f"""
                        select a.date, a.actual_price from actual_price a join 
                        (brands b join specifications s on b.spec_id = s.spec_id) 
                        on a.brand_id = b.brand_id
                        join regions r on a.region_id = r.region_id
                        where b.brand_name = '{brand}' and s.pack_type = '{pack_type}' and s.diameter = '{diameter}' and s.taste = '{taste}' and r.region_name = '{region}';
                    """)
        result = db.session.execute(sql)
        data = result.fetchall()
        print(data)
        result = {
            "advice_price": advice_price,
            "difference_values" : [
                {
                    "date": row[0].strftime("%Y-%m"),
                    "difference": row[1] - advice_price
                }
                for row in data
            ]
        }
        return result
