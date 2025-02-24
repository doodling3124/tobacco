SQLALCHEMY_DATABASE_URI = 'mysql://root:123@localhost:3306/tobacco'
# 是否追踪数据库修改，一般不开启, 会影响性能
SQLALCHEMY_TRACK_MODIFICATIONS = False
# 是否显示底层执行的SQL语句
SQLALCHEMY_ECHO = True
# 解决浏览器浏览器访问输出乱码问题
JSON_AS_ASCII = False