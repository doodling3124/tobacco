from flask import Blueprint, request
from edu.fjut.base.R import R
from edu.fjut.service.actual_price_service import ActualPricel_Service

actual_price = Blueprint("actual_price", __name__)

@actual_price.route('/', methods=['GET'])
def get_actual_price_list():
    result = ActualPricel_Service.get_actual_price_list()
    return R.ok(result)

@actual_price.route('/', methods=['POST'])
def get_actual_price_sequence():
    data = request.get_json()
    brand = data.get('brand')
    pack_type = data.get('pack_type')
    diameter = data.get('diameter')
    taste = data.get('taste')
    region = data.get('region')
    result = ActualPricel_Service.get_actual_price_sequence(brand, pack_type, diameter, taste, region)
    return R.ok(result)