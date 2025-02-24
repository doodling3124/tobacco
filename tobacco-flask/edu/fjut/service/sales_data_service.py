from edu.fjut.db import db
from sqlalchemy import text

class SalesData_Service(object):
    @staticmethod
    def get_sales_data(brand, pack_type, diameter, taste, start_date, end_date):
        sql = text(f"""
                SELECT sd.date, r.region_name, sd.sales
                FROM sales_data sd
                JOIN (brands b JOIN specifications s ON b.spec_id = s.spec_id) ON sd.brand_id = b.brand_id
                JOIN regions r ON sd.region_id = r.region_id
                WHERE b.brand_name = '{brand}' 
                  AND s.pack_type = '{pack_type}' 
                  AND s.diameter = '{diameter}' 
                  AND s.taste = '{taste}' 
                  AND sd.date BETWEEN '{start_date}' AND '{end_date}'
            """)
        result = db.session.execute(sql)
        data = result.fetchall()
        result = [{"date": item[0].strftime("%Y-%m"), "region": item[1], "value": item[2]} for item in data]
        return result

    @staticmethod
    def get_price_range():
        sql = text("""
            SELECT 
                CASE
                    WHEN b.price < 5 THEN '每盒 5元以下'
                    WHEN b.price >= 5 AND b.price < 10 THEN '每盒 5元-10元'
                    WHEN b.price >= 10 AND b.price < 30 THEN '每盒 10元到30元'
                    WHEN b.price >= 30 AND b.price < 50 THEN '每盒 30元-50元'
                    ELSE '每盒 50元及以上'
                END AS price_scope,
                SUM(s.sales) AS total_sales
            FROM 
                brands b
            JOIN 
                sales_data s ON b.brand_id = s.brand_id
            GROUP BY 
                price_scope
        """)
        result = db.session.execute(sql)
        data = result.fetchall()
        result = [
            {"scope": "每盒 5元以下", "value": 0},
            {"scope": "每盒 5元-10元", "value": 0},
            {"scope": "每盒 10元到30元", "value": 0},
            {"scope": "每盒 30元-50元", "value": 0},
            {"scope": "每盒 50元及以上", "value": 0}
        ]
        for row in data:
            for item in result:
                if item["scope"] == row[0]:
                    item["value"] = row[1]
                    break
        return result

    @staticmethod
    def contrast_brand(brands, start_date, end_date):
        sql = text(f"""
                       SELECT 
                        b.brand_name, 
                        SUM(s.sales) AS total_sales
                    FROM 
                        sales_data s
                    JOIN 
                        brands b ON s.brand_id = b.brand_id
                    WHERE 
                        b.brand_name IN {brands}
                        AND s.date BETWEEN '{start_date}' AND '{end_date}'
                    GROUP BY 
                        b.brand_name;
                """)
        result = db.session.execute(sql)
        data = result.fetchall()
        result = [{"brand": row[0], "value": row[1]} for row in data]
        return result


    @staticmethod
    def main_brand(main_brand, start_date, end_date):
        pack_type_sql = text(f"""
                    SELECT
                        s.date,
                        s2.pack_type,
                        SUM(s.sales) AS total_sales
                    FROM
                        sales_data s
                    -- 连接 brands 表和 specifications 表
                    JOIN (
                        brands b
                        JOIN specifications s2 ON b.spec_id = s2.spec_id
                    ) ON s.brand_id = b.brand_id
                    where b.brand_name = '{main_brand}'
                    and s.date BETWEEN '{start_date}' AND '{end_date}'
                    -- 按包装类型和品牌名称分组
                    GROUP BY
                        s.date, s2.pack_type;
                        """)
        diameter_sql = text(f"""
                    SELECT
                        s.date,
                        s2.diameter,
                        SUM(s.sales) AS total_sales
                    FROM
                        sales_data s
                    -- 连接 brands 表和 specifications 表
                    JOIN (
                        brands b
                        JOIN specifications s2 ON b.spec_id = s2.spec_id
                    ) ON s.brand_id = b.brand_id
                    where b.brand_name = '{main_brand}'
                    and s.date BETWEEN '{start_date}' AND '{end_date}'
                    -- 按包装类型和品牌名称分组
                    GROUP BY
                        s.date, s2.diameter;
                        """)
        taste_sql = text(f"""
                            SELECT
                                s.date,
                                s2.taste,
                                SUM(s.sales) AS total_sales
                            FROM
                                sales_data s
                            -- 连接 brands 表和 specifications 表
                            JOIN (
                                brands b
                                JOIN specifications s2 ON b.spec_id = s2.spec_id
                            ) ON s.brand_id = b.brand_id
                            where b.brand_name = '{main_brand}'
                            and s.date BETWEEN '{start_date}' AND '{end_date}'
                            -- 按包装类型和品牌名称分组
                            GROUP BY
                                s.date, s2.taste;
                                """)
        pack_type_result = db.session.execute(pack_type_sql)
        diameter_result = db.session.execute(diameter_sql)
        taste_result = db.session.execute(taste_sql)
        pack_type_data = pack_type_result.fetchall()
        diameter_data = diameter_result.fetchall()
        taste_data = taste_result.fetchall()
        pack_type = [{"date": row[0].strftime("%Y-%m"), "specification": row[1], "value": row[2] // 10000} for row in pack_type_data]
        diameter = [{"date": row[0].strftime("%Y-%m"), "specification": row[1], "value": row[2] // 10000} for row in diameter_data]
        taste = [{"date": row[0].strftime("%Y-%m"), "specification": row[1], "value": row[2] // 10000} for row in taste_data]
        pack_type_total = {'硬盒': 0, '软盒': 0}
        diameter_total = {'粗支': 0, '中支': 0, '细支': 0}
        taste_total = {'烤烟型': 0, '雪茄型': 0, '薄荷型': 0}

        for item in pack_type:
            spec = item['specification']
            value = item['value']
            pack_type_total[spec] += value
        pack_type_total_total = sum(pack_type_total.values())
        for item in diameter:
            spec = item['specification']
            value = item['value']
            diameter_total[spec] += value
        diameter_total_total = sum(diameter_total.values())
        for item in taste:
            spec = item['specification']
            value = item['value']
            taste_total[spec] += value
        taste_total_total = sum(taste_total.values())
        pack_type_ratios = {spec: round((amount / pack_type_total_total) * 100) for spec, amount in pack_type_total.items()}
        diameter_ratios = {spec: round((amount / diameter_total_total) * 100) for spec, amount in diameter_total.items()}
        taste_ratios = {spec: round((amount / taste_total_total) * 100) for spec, amount in taste_total.items()}
        result = {
            "Line": {
                "pack_type": pack_type,
                "diameter": diameter,
                "taste": taste
            },
            "Pie": {
                "pack_type": [{"pack_type": key, "value": value} for key, value in pack_type_ratios.items()],
                "diameter": [{"diameter": key, "value": value} for key, value in diameter_ratios.items()],
                "taste": [{"taste": key, "value": value} for key, value in taste_ratios.items()]
            }
        }
        return result
