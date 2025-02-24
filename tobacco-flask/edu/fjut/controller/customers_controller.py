from edu.fjut.base.R import R
from flask import Blueprint, request
from edu.fjut.service.customers_service import Customers_Service

customers = Blueprint("customers", __name__)

@customers.route('/', methods=['GET'])
def all_customers():
    result = Customers_Service.all_customers()
    return R.ok(result)


@customers.route('/details', methods=['POST'])
def customers_details():
    data = request.get_json()
    id = data.get('id')
    result = Customers_Service.customers_details(id)
    return R.ok(result)