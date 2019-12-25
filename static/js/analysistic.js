function Go_analysistic() {
	now_topic = "통계";
	where_topic = "통계";
	$("#board_info_board").text("SOOJLE 애널리틱스");
	$("#board_info_text").text("통계");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);
	menu_modal_onoff();
	set_analysistic();
}

function set_analysistic() {
	let div = `<div id="anlt_time_weather_wrap" class="anlt_time_weather_wrap"></div>`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
	insert_time_div();
	insert_weather_div();
	insert_realtimesearch_div();
	insert_visitor_div();
}

// 시각 div Insert
var time_event = {
					'1225': `<span style="color: green">행복한</span> <span style="color:red">메리크리스마스!</span>`,
					'11': `새해<span style="font-weight:bold; color:red;">복</span> 많이 받으세요!`,
					'1224': `<span style="color:red">크리스마스</span>를 <span style="color:green">준비</span>하세요!`,
					'1111': `11월 11일은 <span sytle="font-weight:bold">'가래떡데이'</span>랍니다.`,
					'55': `<span style="color:green">동심</span>으로 돌아가볼까요?`,
					'214': `달콤한 <span color="green">초콜릿</span>을 드셔보세요!`,
					'31': `3.1절의 정식명칭은 <span style="font-weight:bold">독립선언일</span>이라는거 알고계셨나요?`,
					'66': `애국선열과 국군장병들의 충절을 추모합니다`,
					'815': `<span style="font-weight:bold">광복절.</span> 대한민국 독립일`,
					'103': `단군이 고조선을 처음 건국한 날입니다.`,
					'109': `한국어는 자랑스러운 <span style="color:red">대한민국</span>의 언어입니다.`
				}
function insert_time_div() {
	let div = `
				<div class="anlt_time_wrap">
					<div id="anlt_time_yymmdd" class="anlt_time_yymmdd noselect"></div>
					<div id="anlt_time_ampm" class="anlt_time_ampm noselect"></div>
					<div id="anlt_time_hhmmss" class="anlt_time_hhmmss noselect"></div>
					<div id="anlt_time_event" class="anlt_time_event noselect"></div>
				</div>
			`;
	$("#anlt_time_weather_wrap").append(div);
	set_analysistic_time();
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
						<div class="anlt_reatime_words_wrap">
							<div id="anlt_reatime_word_1to5" class="anlt_reatime_word_elements">\
							</div><div id="anlt_reatime_word_6to10" class="anlt_reatime_word_elements"></div>
						</div>
						<div id="anlt_realtime_standard" class="anlt_realtime_standard noselect"></div>
					</div>
				`;
	$("#posts_target").append(div);
	set_realtimesearch();
}
function set_realtimesearch() {
	let realtime_words_list;
	let realtime_ajax = A_JAX("http://"+host_ip+"/get_search_realtime", "GET", null, null);
	$.when(realtime_ajax).done(function () {
		let json = realtime_ajax.responseJSON;
		if (json['result'] == 'success') {
			realtime_words_list = json['search_realtime'];
			let target, div, i;
			for (i = 1; i <= 10; i++) {
				let word = realtime_words_list[i - 1][0];
				div = `<div class="anlt_realtime_word pointer" onclick="realtime_word_search($(this))">\
							<span style="font-weight:bold">${i}</span>. ${word}\
						</div>`;
				if (i < 6) target = $('#anlt_reatime_word_1to5');
				else target = $("#anlt_reatime_word_6to10");
				target.append(div);
			}
		} else {
			Snackbar("실시간 검색어를 불러오지 못하였습니다.");
		}
	});
	let date = $("#anlt_time_yymmdd").text();
	let ampm = $("#anlt_time_ampm").text();
	let time = $("#anlt_time_hhmmss").text();
	let standard = `${date} ${ampm} ${time} 기준`;
	$("#anlt_realtime_standard").append(standard);
}
function realtime_word_search(tag) {
	let text = tag.text();//.slice(3);
	search_text(text);
	if (mobilecheck()) {
		mobile_search_modal_open();
	}
}

function insert_visitor_div() {
	let div = 	`
					<div id="anlt_visitor_wrap" class="anlt_visitor_wrap">
						<div class="anlt_visitor_title noselect">방문자 분석</div>
						<div id="anlt_today_visitor" class="anlt_visitor_box noselect">
							<div class="anlt_visitor_box_title">오늘 방문자수</div>
							<div id="anlt_visitor_box_data" class="anlt_visitor_box_data">0</div>
						</div>\
						<div id="anlt_all_visitor" class="anlt_visitor_box noselect">
							<div class="anlt_visitor_box_title">총 방문자수</div>
							<div id="anlt_visitor_box_data" class="anlt_visitor_box_data">0</div>
						</div>\
					</div>
				`;
	$("#posts_target").append(div);
	set_visitor_data();
}
function set_visitor_data() {
	let today = 0, all = 0;
	/*let visitor_ajax = A_JAX("http://"+host_ip+"/뿌뿌뿡", "GET", null, null);
	$.when(visitor_ajax).done(function () {
		let json = visitor_ajax.responseJSON;
		if (json['result'] == 'success') {
			console.log(json);
		} else {
			Snackbar("방문자 데이터를 가져오지 못하였습니다.");
		}
	});*/
}