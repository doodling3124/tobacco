from flask import Blueprint
from edu.fjut.base.R import R
from edu.fjut.service.activity_service import Activity_Service

activity = Blueprint("activity", __name__)

@activity.route('/', methods=['GET'])
def get_all_activity():
    result = Activity_Service.get_all_activity()
    return R.ok(result)

@activity.route('/roi', methods=['GET'])
def get_all_activity_roi():
    result = Activity_Service.get_all_activity_roi()
    return R.ok(result)

@activity.route('/card_data', methods=['GET'])
def get_card_data():
    result = Activity_Service.get_card_data()
    return R.ok(result)