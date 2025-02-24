from flask import Blueprint, request
from edu.fjut.base.R import R
from edu.fjut.service.brands_service import Brands_Service

brands = Blueprint("brands", __name__)


@brands.route("structure", methods=["GET"])
def brands_structure():
    result = Brands_Service.brands_structure()
    return R.ok(result)