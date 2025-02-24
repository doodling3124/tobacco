from edu.fjut.base.R import R
from edu.fjut.service.inventory_service import Inventory_Service
from flask import Blueprint

inventory = Blueprint("inventory", __name__)

@inventory.route('/', methods=['GET'])
def get_all_inventory():
    result = Inventory_Service.get_all_inventory()
    return R.ok(result)