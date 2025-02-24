# coding : utf-8
from flask import Blueprint, request
from edu.fjut.base.R import R
from edu.fjut.service.sales_data_predictions_service import SalesDataPredictions_Service

sales_data_predictions = Blueprint("sales_data_predictions", __name__)

@sales_data_predictions.route('/', methods=['POST'])
def get_predictions_data():
    data = request.get_json()
    brand = data.get('brand')
    pack_type = data.get('pack_type')
    diameter = data.get('diameter')
    taste = data.get('taste')
    region = data.get('region')
    result = SalesDataPredictions_Service.get_predictions_data(brand, pack_type, diameter, taste, region)
    return R.ok(result)
