from flask import *
from bson.json_util import dumps
from db_management import *
from global_func import *
from datetime import datetime
import operator

BP = Blueprint('feedback', __name__)

#로그인 및 회원가입(토큰발행) (OK)
@BP.route('/send_feedback', methods=['POST'])
@jwt_required
def sign_in_up():
	user = find_user(g.db, get_jwt_identity())
	if user is None: abort(400)

	FEEDBACK_TYPE = request.form['type']
	FEEDBACK_POST = request.form['post']
	FEEDBACK_TIME = datetime.now()
	FEEDBACK_AUTHOR = user['user_id']

	feedback_data = {
		'type': FEEDBACK_TYPE,
		'time': FEEDBACK_TIME,
		'post': FEEDBACK_POST,
		'author': FEEDBACK_AUTHOR
	}

	if (send_user_feedback(g.db, feedback_data) == "success"):
		return jsonify(result = "success")
	else:
		return jsonify(result = "fail")