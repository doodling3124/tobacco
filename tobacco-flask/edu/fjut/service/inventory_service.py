from edu.fjut.db import db
from sqlalchemy import text

class Inventory_Service(object):
    @staticmethod
    def get_all_inventory():
        sql = text(f"""
                        select 
                            i.inventory_id, 
                            b.brand_name, 
                            s.pack_type,
                            s.diameter,
                            s.taste, 
                            r.region_name, 
                            i.current_inventory,
                            fsp.future_sales,
                            i.cost
                        from inventory i join 
                        (brands b join specifications s on s.spec_id=b.spec_id)
                        on b.brand_id = i.brand_id join regions r on i.region_id = r.region_id
                        join (
                            select brand_id, region_id, future_sales from sales_data_predictions asp 
                            where asp.future_date=DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
                        )  fsp on fsp.brand_id=i.brand_id and fsp.region_id=i.region_id
                    """)
        result = db.session.execute(sql)
        data = result.fetchall()
        result = [
            {
                "key": row[0],
                "brand": row[1],
                "specification": f"{row[2]}/{row[3]}/{row[4]}",
                "region": row[5],
                "current_inventory": row[6],
                "forecast_sales": row[7],
                "recommended_purchase_quantity": row[7] - row[6],
                "out_of_stock_rate": round((row[7] - row[6]) / row[7], 2) if row[7] > 0 else 0,
                "estimated_cost": row[8] * (row[7] - row[6]),
            }
            for row in data
        ]
        return result