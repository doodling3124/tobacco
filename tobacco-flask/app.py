import pymysql
from flask import Flask
from edu.fjut import config
from edu.fjut.controller.brands_controller import brands
from edu.fjut.controller.customers_controller import customers
from edu.fjut.controller.inventory_controller import inventory
from edu.fjut.controller.actual_price_controller import actual_price
from edu.fjut.controller.sales_data_controller import sales_data
from edu.fjut.controller.sales_data_predictoins_controller import sales_data_predictions
from edu.fjut.controller.users_controller import users
from edu.fjut.controller.activity_controller import activity


from edu.fjut.db import db
from flask import make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.secret_key = "fjut"

app.config.from_object(config)
db.init_app(app)

jwt = JWTManager(app)


@app.after_request
def after(resp):
    resp = make_response(resp)
    resp.headers['Access-Control-Allow-Origin'] = '*'  # 允许跨域地址
    resp.headers['Access-Control-Allow-Methods'] = '*'  # 请求 ‘*’ 就是全部
    resp.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type,Authorization'  # 头部
    resp.headers['Access-Control-Allow-Credentials'] = 'True'
    return resp


# r'/*' 是通配符，让本服务器所有的 URL 都允许跨域请求
CORS(app, resources=r'/*', supports_credentials=True)


app.register_blueprint(brands, url_prefix='/brands')
app.register_blueprint(customers, url_prefix='/customers')
app.register_blueprint(inventory, url_prefix='/inventory')
app.register_blueprint(actual_price, url_prefix='/actual_price')
app.register_blueprint(sales_data, url_prefix='/sales_data')
app.register_blueprint(sales_data_predictions, url_prefix='/sales_data_predictions')
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(activity, url_prefix='/activity')


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
