# coding : utf-8
import math

import mysql.connector
from faker import Faker
from faker.providers import BaseProvider
import random
import datetime
import hashlib # 密码加密
import itertools # 排列组合


# 连接到数据库
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123",
    database="tobacco"
)

cursor = db.cursor()

# 创建Faker实例并设置为中文
faker = Faker('zh_CN')

roles = ["管理员", "分析员"]
pack_type = ["硬盒", "软盒"]
diameter = ["粗支", "细支", "中支"]
taste = ["烤烟型", "雪茄型", "薄荷型"]
# 规格组合, [('硬盒', '粗支', '烤烟型'), ('硬盒', '粗支', '雪茄型'),...]
specs = list(itertools.product(pack_type, diameter, taste))
brands = ["中华", "和天下", "黄鹤楼", "苏烟", "芙蓉王", "云烟", "利群", "红塔山", "双喜烟", "南京", "娇子", "黄山", "黄金叶", "泰山", "贵烟", "七匹狼", "真龙", "好猫", "钻石", "金圣"]
# 品牌和规格id的组合, [('中华', 1), ('中华', 2),...]
brand_spec = list(itertools.product(brands, list(range(1, len(specs) + 1))))
regions = ["西北地区", "华北地区", "东北地区", "华中地区", "华东地区", "华南地区", "西南地区"]
dates = ["2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01", "2024-11-01", "2024-12-01"]
future_dates = ["2025-01-01", "2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01", "2025-08-01", "2025-09-01", "2025-10-01", "2025-11-01","2025-12-01"]
activity_info = {
    "元旦促销": {"start_date": "2024-01-01", "end_date": "2024-01-03"},
    "618促销活动": {"start_date": "2024-06-01", "end_date": "2024-06-20"},
    "双十一促销": {"start_date": "2024-11-01", "end_date": "2024-11-11"},
    "春节促销": {"start_date": "2024-02-10", "end_date": "2024-02-24"},
    "中秋节促销": {"start_date": "2024-09-10", "end_date": "2024-09-18"},
    "国庆节促销": {"start_date": "2024-10-01", "end_date": "2024-10-07"},
    "会员日促销": {"start_date": "2024-02-10", "end_date": "2024-02-10"}
}

# 向users表插入数据
for _ in range(10):
    username = faker.name()
    password = faker.password(length=8)
    role = random.choice(roles)
    sql = "INSERT INTO users (username, password, role) VALUES (%s, %s, %s)"
    val = (username, password, role)
    cursor.execute(sql, val)

# 向specifications表插入数据
for c in specs:
    pack_type = c[0]
    diameter = c[1]
    taste = c[2]
    sql = "INSERT INTO specifications (pack_type, diameter, taste) VALUES (%s, %s, %s)"
    val = (pack_type, diameter, taste)
    cursor.execute(sql, val)


# 向brands表插入数据
for brand in brand_spec:
    brand_name = brand[0]
    spec_id = brand[1]
    price = random.randint(3, 70)
    level = random.randint(1, 3) # 等级, 低端中端高端
    sql = "INSERT INTO brands (brand_name, spec_id, price, level) VALUES (%s, %s, %s, %s)"
    val = (brand_name, spec_id, price, level)
    cursor.execute(sql, val)


# 向regions表插入数据
for region_name in regions:
    sql = "INSERT INTO regions (region_name) VALUES (%s)"
    val = (region_name,)
    cursor.execute(sql, val)


# 向sales_data表插入数据
for date in dates:
    for region_id in range(1, len(regions) + 1):
        for brand_id in range(1, len(brand_spec) + 1):
            sales = random.randint(30000, 50000)
            sql = "INSERT INTO sales_data (brand_id, region_id, date, sales) VALUES (%s, %s, %s, %s)"
            val = (brand_id, region_id, date, sales)
            cursor.execute(sql, val)

# 向customers表插入数据
for i in range(50):
    customer_name = faker.name()
    address = faker.address()
    telephone = faker.phone_number()
    customer_level = random.randint(1, 5)
    sql = "INSERT INTO customers (customer_name, address, telephone, customer_level) VALUES (%s, %s, %s, %s)"
    val = (customer_name, address, telephone, customer_level)
    cursor.execute(sql, val)

# 向customers_details表插入数据
for customer_id in range(1, 51):
    for date in dates:
        main_selling_spec_id = random.randint(1, len(specs))
        order_full_rate = random.random()
        sql = "INSERT INTO customers_details (customer_id, date, main_selling_spec_id, order_full_rate) VALUES (%s, %s, %s, %s)"
        val = (customer_id, date, main_selling_spec_id, order_full_rate)
        cursor.execute(sql, val)

# 向price_actual表插入数据
for brand_id in range(1, len(brand_spec) + 1):
    for region_id in range(1, len(regions) + 1):
        for date in dates:
            # 获取建议市场价
            sql = "SELECT price FROM brands where brand_id = %s"
            val = (brand_id,)
            cursor.execute(sql, val)
            price = cursor.fetchone()[0]
            # 真实价格在建议市场价 ± 30% 之间
            actual_price = random.randint(round(price - 0.3 * price), round(price + 0.3 * price))
            sql = "INSERT INTO actual_price (brand_id, region_id, date, actual_price) VALUES (%s, %s, %s, %s)"
            val = (brand_id, region_id, date, actual_price)
            cursor.execute(sql, val)

# sales_data_predictions
for brand_id in range(1, len(brand_spec) + 1):
    for region_id in range(1, len(regions) + 1):
        for future_date in future_dates:
            future_sales = random.randint(30000, 80000)
            sql = "INSERT INTO sales_data_predictions (brand_id, region_id, future_date, future_sales) VALUES (%s, %s, %s, %s)"
            val = (brand_id, region_id, future_date, future_sales)
            cursor.execute(sql, val)

# 向inventory表插入数据
for brand_id in range(1, len(brand_spec) + 1):
    for region_id in range(1, len(regions) + 1):
        current_inventory = random.randint(20000, 30000)
        cost = random.randint(1, 5)
        sql = "INSERT INTO inventory (brand_id, region_id, current_inventory, cost) VALUES (%s, %s, %s, %s)"
        val = (brand_id, region_id, current_inventory, cost)
        cursor.execute(sql, val)

for activity in activity_info:
    activity_name = activity
    start_date = activity_info[activity]["start_date"]
    end_date = activity_info[activity]["end_date"]
    participants = random.randint(100, 500)
    sales = random.randint(50000, 200000)
    new_customers = random.randint(20, 100)
    activity_cost = random.randint(10000, 50000)
    roi = (sales - activity_cost) / activity_cost * 100
    sql = "INSERT INTO activity (activity_name, start_date, end_date, participants, sales, new_customers, activity_cost, roi) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    val = (activity_name, start_date, end_date, participants, sales, new_customers, activity_cost, roi)
    cursor.execute(sql, val)

# 提交事务，使数据插入生效
db.commit()

# 关闭游标和连接
cursor.close()
db.close()