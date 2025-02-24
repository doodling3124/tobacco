from flask import Blueprint, request
from edu.fjut.base.R import R
from edu.fjut.service.sales_data_service import SalesData_Service

sales_data = Blueprint("sales_data", __name__)


@sales_data.route('/', methods=['POST'])
def get_sales_data():
    data = request.get_json()
    brand = data.get('brand')
    pack_type = data.get('pack_type')
    diameter = data.get('diameter')
    taste = data.get('taste')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    result = SalesData_Service.get_sales_data(brand, pack_type, diameter, taste, start_date, end_date)
    return R.ok(result)

@sales_data.route('/price_range', methods=['GET'])
def get_price_range():
    result = SalesData_Service.get_price_range()
    return R.ok(result)

@sales_data.route('/contrast_brand', methods=['POST'])
def contrast_brand():
    data = request.get_json()
    main_brand = data.get('main_brand')
    contrast_brand = data.get('contrast_brand')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    contrast_brand.append(main_brand)
    brands = tuple(contrast_brand)
    result = SalesData_Service.contrast_brand(brands, start_date, end_date)
    return R.ok(result)


@sales_data.route('/main_brand', methods=['POST'])
def main_brand():
    data = request.get_json()
    main_brand = data.get('main_brand')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    result = SalesData_Service.main_brand(main_brand, start_date, end_date)
    return R.ok(result)
