from flask import Blueprint, request
from edu.fjut.base.R import R
from edu.fjut.service.users_service import Users_Service
from flask_jwt_extended import create_access_token

users = Blueprint("users", __name__)

@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    result = Users_Service.login(username, password)
    return R.ok(result)