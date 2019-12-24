function Go_analysistic() {
	now_topic = "통계";
	where_topic = "통계";
	$("#board_info_board").text("SOOJLE 애널리틱스");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	menu_modal_onoff();
	set_analysistic();
}

function set_analysistic() {
	let div = `<div id="anlt_time_weather_wrap" class="anlt_time_weather_wrap"></div>`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
	insert_time_div();
	set_analysistic_time();
	insert_weather_div();
	insert_realtimesearch_div();
}

// 시각 div Insert
var time_event = {
					'1225': `솔로천국 커플지옥 <span style="color:red">메리크리스마스!</span>`,
					'11': `새해<span style="font-weight:bold; color:red;">복</span> 많이 받으세요!`,
					'1224': `<span style="color:red">크리스마스</span>를 준비하세요!`,
					'1111': `11월 11일은 <span sytle="font-weight:bold">'가래떡데이'</span>랍니다.`,
					'55': `<span style="color:green">동심</span>으로 돌아가볼까요?`
				}
function insert_time_div() {
	let div = `
				<div class="anlt_time_wrap">
					<div id="anlt_time_yymmdd" class="anlt_time_yymmdd noselect"></div>
					<div id="anlt_time_hhmmss" class="anlt_time_hhmmss noselect"></div>
					<div id="anlt_time_ampm" class="anlt_time_ampm noselect"></div>
					<div id="anlt_time_event" class="anlt_time_event noselect"></div>
				</div>
			`;
	$("#anlt_time_weather_wrap").append(div);
}
function addZeros(num, digit) { // 자릿수 맞춰주기
	let zero = '';
	num = num.toString();
	if (num.length < digit) {
		for (i = 0; i < digit - num.length; i++) {
			zero += '0';
		}
	}
	return zero + num;
}
function set_analysistic_time() {
	let day_name = ["일", "월", "화", "수", "목", "금", "토"];
	if (now_topic != "통계") return;
	let time = new Date();
	let year = time.getFullYear();
	let month = time.getMonth() + 1;
	let date = time.getDate();
	let day = time.getDay();
	let hour = addZeros(time.getHours(),2); 
	let minute = addZeros(time.getMinutes(),2);
	let second = addZeros(time.getSeconds(),2);
	let ampm = "AM";
	set_analysistic_time_event(month, date);
	if (hour > 12) {
		hour -= 12;
		ampm = "PM";
	}
	else ampm = "AM";
	let now_date = year + '-' + month + '-' + date + " " + day_name[day] + "요일";
	let now_time = hour + ':' + minute + ':' + second;
	$("#anlt_time_yymmdd").text(now_date);
	$("#anlt_time_hhmmss").text(now_time);
	$("#anlt_time_ampm").text(ampm);
	setTimeout(function() {set_analysistic_time()}, 1000);
}
function set_analysistic_time_event(month, date) {
	let event = time_event[month.toString()+date.toString()];
	if (event != null){
		$("#anlt_time_event").empty();
		$("#anlt_time_event").append(event);
	}
	else
		$("#anlt_time_event").empty();
}

// 날씨 div Insert
function insert_weather_div() {
	let div = `<div id="anlt_weather_wrap" class="anlt_weather_wrap"></div>`;
	$("#anlt_time_weather_wrap").append(div);
}

// 실시간 검색어 div Insert
function insert_realtimesearch_div() {
	let div = 	`
					<div id="anlt_realtime_wrap" class="anlt_realtime_wrap">
						<div class="anlt_realtime_title noselect">실시간 검색어</div>
						<div></div>
						<div id="anlt_realtime_standard" class="anlt_realtime_standard"></div>
					</div>
				`;
	$("#anlt_time_weather_wrap").append(div);
}