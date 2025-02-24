drop database if exists tobacco;
create database tobacco;

use tobacco;

# 用户表（users）
CREATE TABLE users
(
    user_id  INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一标识，自增主键',
    username VARCHAR(50)  NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '用户密码',
    role     VARCHAR(20)  NOT NULL COMMENT '用户角色，["管理员","分析员"]'
);

# 规格表（specifications）
CREATE TABLE specifications
(
    spec_id   INT AUTO_INCREMENT PRIMARY KEY COMMENT '规格唯一标识，自增主键',
    pack_type CHAR(2) COMMENT '包装类型，硬包/软包',
    diameter  CHAR(2) COMMENT '烟支直径, 粗支/中支/细支',
    taste     CHAR(3) COMMENT '口味, 烤烟型/雪茄型/薄荷型'
);

# 品牌表（brands）
CREATE TABLE brands
(
    brand_id   INT AUTO_INCREMENT PRIMARY KEY COMMENT '品牌唯一标识，自增主键',
    brand_name VARCHAR(50) NOT NULL COMMENT '品牌名称，["中华", "和天下", "黄鹤楼", "苏烟", "芙蓉王", "云烟", "利群", "红塔山", "双喜烟", "南京", "娇子", "黄山", "黄金叶", "泰山", "贵烟", "七匹狼", "真龙", "好猫", "钻石", "金圣"]',
    spec_id    INT         NOT NULL COMMENT '关联规格表的规格标识，外键指向specifications(spec_id)，表明该品牌有哪些规格',
    price      INT         NOT NULL COMMENT '建议市场单价, 元/包',
    level      INT         NOT NULL COMMENT '123, 低端中端高端'
# #     FOREIGN KEY (spec_id) REFERENCES specifications(spec_id)
);

# 区域表（regions）
CREATE TABLE regions
(
    region_id   INT AUTO_INCREMENT PRIMARY KEY COMMENT '区域唯一标识，自增主键',
    region_name VARCHAR(50) NOT NULL COMMENT '区域名称'
);

# 销售数据表（sales_data）
CREATE TABLE sales_data
(
    sales_id  INT AUTO_INCREMENT PRIMARY KEY COMMENT '销售记录唯一标识，自增主键',
    brand_id  INT  NOT NULL COMMENT '关联品牌表的品牌标识，外键指向brands(brand_id)，表明销售的是哪个品牌的产品',
    region_id INT  NOT NULL COMMENT '关联区域表的区域标识，外键指向regions(region_id)，表明销售发生的区域',
    date      DATE NOT NULL COMMENT '销售日期, 存储年月, YYYY-MM-01',
    sales  INT  NOT NULL COMMENT '销售数量, 包'
#     FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
#     FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

# 零售客户表（customers）
CREATE TABLE customers
(
    customer_id          INT AUTO_INCREMENT PRIMARY KEY COMMENT '零售客户唯一标识，自增主键',
    customer_name        VARCHAR(100)  NOT NULL COMMENT '零售客户名称',
    address              VARCHAR(200)  NOT NULL COMMENT '客户地址',
    telephone            VARCHAR(30)   NOT NULL COMMENT '电话号码',
    customer_level       INT COMMENT '客户等级, [1,2,3,4,5] 重要性等级, 数字越大越重要'
#     FOREIGN KEY (main_selling_spec_id) REFERENCES specifications(spec_id)
);

# 零售客户详细信息表（customers_details）
create table customers_details
(
    detail_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '客户详细信息唯一标识，自增主键',
    customer_id INT NOT NULL COMMENT '关联零售客户表的客户标识，外键指向customers(customer_id)，表明该客户详细信息属于哪个客户',
    date DATE NOT NULL COMMENT '日期, YYYY-MM-01',
    main_selling_spec_id INT COMMENT '关联规格表的规格标识，外键指向specifications(spec_id)，表明该零售客户的主销规格',
    order_full_rate      DECIMAL(5, 2) NOT NULL COMMENT '订足率, 实际订购量/分配的量, 以月份为单位'
);

# 实际价格表（actual_price）
CREATE TABLE actual_price
(
    actual_price_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '实际价格记录唯一标识，自增主键',
    brand_id INT NOT NULL COMMENT '关联品牌表的品牌标识，外键指向brands(brand_id)',
    region_id INT NOT NULL COMMENT '关联区域表的区域标识，外键指向regions(region_id)',
    date DATE NOT NULL COMMENT '日期, YYYY-MM-01',
    actual_price DECIMAL(10, 2) NOT NULL COMMENT '实际价格, 元/包'
);

# 销量预测数据表 （sales_data_predictions）
CREATE TABLE sales_data_predictions
(
    prediction_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '销量预测记录唯一标识，自增主键',
    brand_id INT NOT NULL COMMENT '关联品牌表的品牌标识，外键指向brands(brand_id)，表明预测的是哪个品牌的产品',
    region_id INT NOT NULL COMMENT '关联区域表的区域标识，外键指向regions(region_id)，表明预测发生的区域',
    future_date DATE NOT NULL COMMENT '预测的日期, 存储年月, YYYY-MM-01',
    future_sales INT NOT NULL COMMENT '预测销量, 包'
);

# 库存表（inventory）
CREATE TABLE inventory
(
    inventory_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '库存记录唯一标识，自增主键',
    brand_id     INT NOT NULL COMMENT '关联品牌表的品牌标识，外键指向brands(brand_id)，表明库存产品所属品牌',
    region_id    INT NOT NULL COMMENT '库存所在区域，外键指向regions(region_id)，表明库存所在区域',
    current_inventory     INT NOT NULL COMMENT '当前库存数量, 单位包',
    cost         int NOT NULL COMMENT '单位库存成本, 元/包'
#     FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
#     FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

# 营销建议表（marketing_suggestions）
CREATE TABLE marketing_suggestions
(
    suggestion_id      INT AUTO_INCREMENT PRIMARY KEY COMMENT '营销建议唯一标识，自增主键',
    brand_id           INT  NOT NULL COMMENT '关联品牌表的品牌标识，外键指向brands(brand_id)，表明建议针对的品牌',
    region_id          INT  NOT NULL COMMENT '关联区域表的区域标识，外键指向regions(region_id)，表明建议适用的区域',
    suggestion_content TEXT NOT NULL COMMENT '营销建议的详细内容'
);

# 活动表（activity）
CREATE TABLE activity
(
    activity_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '活动唯一标识，自增主键',
    activity_name VARCHAR(100) NOT NULL COMMENT '活动名称',
    start_date DATE NOT NULL COMMENT '活动开始日期',
    end_date DATE NOT NULL COMMENT '活动结束日期',
    participants INT NOT NULL COMMENT '活动参与人数',
    sales INT NOT NULL COMMENT '销售额, 元',
    new_customers INT NOT NULL COMMENT '新增客户数',
    activity_cost INT NOT NULL COMMENT '活动成本, 元',
    roi DECIMAL(10, 2) NOT NULL COMMENT 'Return on Investment, 收益率'
);

# 定期清除预测表中的过期数据
CREATE EVENT clean_expired_predictions
ON SCHEDULE EVERY 1 MONTH
STARTS DATE_ADD(LAST_DAY(NOW()), INTERVAL 1 DAY)
DO
DELETE FROM sales_data_predictions WHERE future_date < NOW();

select * from inventory i join
                        (brands b join specifications s on s.spec_id=b.spec_id)
                        on b.brand_id = i.brand_id join regions r on i.region_id = r.region_id
                        join (
                            select brand_id, region_id, future_sales from sales_data_predictions asp
                            where asp.future_date=DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
                        )  fsp on fsp.brand_id=i.brand_id and fsp.region_id=i.region_id