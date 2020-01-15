from flask import *
from db_management import *
from global_func import *

BP = Blueprint('main', __name__)

#######################################################
#페이지 URL#############################################
@BP.route('/')
@BP.route('/home')
def main_home():
	return render_template('home/main.html')

@BP.route('/introduce')
def go_introduce():
	return render_template('etc/introduce.html')

@BP.route('/programmers')
def go_programmers():
	return render_template('etc/programmers.html')

@BP.route('/advertisement')
def go_advertisement():
	return render_template('etc/advertiesement.html')