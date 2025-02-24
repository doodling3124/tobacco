# coding : utf-8
from edu.fjut.db import db
from sqlalchemy import text

class SalesDataPredictions_Service(object):
    @staticmethod
    def get_predictions_data(brand, pack_type, diameter, taste, region):
        past_sql = text(f"""
                        SELECT s.date, s.sales from sales_data s
                        join (brands b join specifications s2 on b.spec_id = s2.spec_id) 
                        on s.brand_id = b.brand_id
                        join regions r on s.region_id = r.region_id
                        where b.brand_name= '{brand}' 
                        and s2.pack_type = '{pack_type}' 
                        and s2.diameter = '{diameter}' 
                        and s2.taste = '{taste}' 
                        and r.region_name = '{region}'
                        order by s.date
                        """)
        future_sql = text(f"""
                        SELECT s.future_date, s.future_sales from sales_data_predictions s
                        join (brands b join specifications s2 on b.spec_id = s2.spec_id) 
                        on s.brand_id = b.brand_id
                        join regions r on s.region_id = r.region_id
                        where b.brand_name= '{brand}' 
                        and s2.pack_type = '{pack_type}' 
                        and s2.diameter = '{diameter}' 
                        and s2.taste = '{taste}' 
                        and r.region_name = '{region}'
                        order by s.future_date
                        """)
        past_result = db.session.execute(past_sql)
        future_result = db.session.execute(future_sql)
        past_data = past_result.fetchall()
        future_data = future_result.fetchall()
        result = [{"date": row[0].strftime("%Y-%m"), "sales": row[1]} for row in past_data] \
                 + [{"date": f"{row[0].strftime('%Y-%m')} (预测)", "sales": row[1], "lastet": "true"} for row in future_data]
        return result