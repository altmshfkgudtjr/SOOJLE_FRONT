function Go_analysistic() {
	out_of_search();
	now_topic = "통계";
	where_topic = "통계";
	now_state = "통계";
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
	insert_hall();
	insert_visitor_div();
	insert_post_div();
	insert_outlink_div();
}

// 시각 div Insert---------------------------------------------------
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

// 날씨 div Insert-----------------------------------------------------
function insert_weather_div() {
	let div = `<div id="anlt_weather_wrap" class="anlt_weather_wrap"></div>`;
	$("#anlt_time_weather_wrap").append(div);
	//set_weather();
}
function set_weather() {
	let weather_ajax = A_JAX("http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?\
								ServiceKey=0A5sn7QJHavj4KHM7abOIxdnDC7zPEADwdXcrhEuo7%2BILrC1Fb%2Bf4ni0pHcKAKd1gErcsUqqgYUGCqL9cKk7Cg%3D%3D\
								&base_date=20191226\
								&base_time=1430\
								&nx=62\
								&ny=126\
								&_type=json"
							, "Get", null, null);
	$.when(weather_ajax).done(function () {
		let json = weather_ajax.responseJSON;
		console.log(json);
	});
}

// 실시간 검색어 div Insert---------------------------------------------
function insert_realtimesearch_div() {
	let info = `SOOJLE에서 가장 인기있는 검색어를 실시간으로 보여드립니다.`;
	let div = 	`
					<div id="anlt_realtime_wrap" class="anlt_realtime_wrap">
						<div class="anlt_realtime_title noselect">실시간 검색어</div>\
						<div class="anlt_realtime_subtitle noselect">${info}</div>\
						<div class="anlt_reatime_words_wrap">\
							<div id="anlt_reatime_word_1to5" class="anlt_reatime_word_elements">\
							</div><div id="anlt_reatime_word_6to10" class="anlt_reatime_word_elements"></div>\
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
			for (i = 1; i <= realtime_words_list.length; i++) {
				let word;
				if (realtime_words_list[i - 1] != undefined)
					word = realtime_words_list[i - 1][0];
					if (i == 1) {
						div = `<div class="anlt_realtime_word pointer" onclick="realtime_word_search($(this))">\
									<span style="font-weight:bold">${i}.</span> <span style="color:#c30e2e">${word}</span>\
								</div>`;
					}
					else {
						div = `<div class="anlt_realtime_word pointer" onclick="realtime_word_search($(this))">\
									<span style="font-weight:bold">${i}.</span> <span>${word}</span>\
								</div>`;
					}
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
	let text = tag.text().trim().slice(3);
	search_text(text);
	if (mobilecheck()) {
		mobile_search_modal_open();
	}
}

// 방문자 분석 div Insert-----------------------------------------------
function insert_visitor_div() {
	let info = `SOOJLE의 모든 방문자들의 통계를 분석하여 보여드립니다.`;
	let div = 	`
					<div id="anlt_visitor_wrap" class="anlt_visitor_wrap">
						<div class="anlt_visitor_title noselect">방문자 분석</div>\
						<div class="anlt_realtime_subtitle noselect">${info}</div>\
						<div class="anlt_visitor_box noselect">
							<div class="anlt_visitor_box_title">오늘 방문자수</div>
							<div id="anlt_today_visitor_data" class="anlt_visitor_box_data">18</div>
						</div>\
						<div class="anlt_visitor_box noselect">
							<div class="anlt_visitor_box_title">총 방문자수</div>
							<div id="anlt_all_visitor_data" class="anlt_visitor_box_data">238</div>
						</div>\
						<div class="anlt_visitor_box noselect">
							<div class="anlt_visitor_box_title">하루 평균 방문자수</div>
							<div id="anlt_today_visitor_average_data" class="anlt_visitor_box_data">31</div>
						</div>\
						<div class="anlt_visitor_box noselect">
							<div class="anlt_visitor_box_title">하루 최고 방문자수</div>
							<div id="anlt_all_visitor_max_data" class="anlt_visitor_box_data">45</div>
						</div>\
						<div class="anlt_visitor_chart_box">
							<div class="anlt_visitor_box_title_big noselect">사용 시간대 분석</div>
							<canvas id="visitor_distribution" class="anlt_visitor_chart_element" width="auto" height="auto"></canvas>
						</div>\
						<div class="anlt_visitor_chart_box">
							<div class="anlt_visitor_box_title_big noselect">학번별 방문수</div>
							<canvas id="visitor_number_distribution" class="anlt_visitor_chart_element" width="auto" height="auto"></canvas>
						</div>\
						<div class="anlt_visitor_chart_box">
							<div class="anlt_visitor_box_title_big noselect">학과별 방문수</div>
							<canvas id="visitor_major_distribution" class="anlt_visitor_chart_element" width="auto" height="auto"></canvas>
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
	get_line("visitor_distribution",
		['12월 25일', '12월 26일'],
		[
			[1,2,3,4,3,6,2,7,10,3,2,4,1,2,3,1,6,11,8,20,23,10,29,33],
			[12,23,7,1,7,8,10,11,7,8,10,12,13,14,4,26,36,41,38,41,44,45,32,41]
		],
	);
	get_bar("visitor_number_distribution",
		['19', '18', '17', '16', '15', '14', '13', '12'],
		[5, 4, 3, 1, 5, 2, 4, 10]
	);
	get_bar("visitor_major_distribution",
		['컴퓨터공학과', '무용학과', '호텔관광경영학과', '데이터사이언스학과', '지능기전공학부', '물리학과', "패션디자인학과"],
		[5, 4, 10, 8, 1, 3, 9]
	);
}

// 게시글 분석 div Insert------------------------------------------------
function insert_post_div() {
	let info = `게시글에 대한 전체 통계를 분석해 보여드립니다.`;
	let div = 	`
				<div id="anlt_postdata_wrap" class="anlt_visitor_wrap">
					<div class="anlt_visitor_title noselect">게시글 분석</div>\
					<div class="anlt_realtime_subtitle noselect">${info}</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">전체 게시글 조회 수</div>
						<div id="anlt_all_posts_view_data" class="anlt_visitor_box_data">617</div>
					</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">전체 게시글 공감 수</div>
						<div id="anlt_all_posts_like_data" class="anlt_visitor_box_data">78</div>
					</div>\
				</div>
	`;
	$("#posts_target").append(div);
	set_post_data();
}
function set_post_data() {
	
}

// 외부사이트 div Insert--------------------------------------------------
function insert_outlink_div() {
	let div = 	`
				<div id="anlt_postdata_wrap" class="anlt_visitor_wrap">
					<div class="anlt_visitor_title noselect">외부사이트 분석</div>\
					<div class="anlt_realtime_subtitle noselect">${info}</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">외부사이트 총 클릭수</div>
						<div id="anlt_outlink_click_all_data" class="anlt_visitor_box_data">78</div>
					</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">외부사이트 최고 클릭수</div>
						<div id="anlt_outlink_click_max_data" class="anlt_visitor_box_data">21</div>
					</div>\
				</div>
	`;
	$("#posts_target").append(div);
	set_outlink_data();
}
function set_outlink_data() {

}

// 명예의 전당 div Insert-------------------------------------------------
function insert_hall() {
	let info = `사용자들이 SOOJLE에서 최고 기록을 갱신하신 분야에 대해서 분석해드립니다.`;
	let div = 	`
				<div id="anlt_postdata_wrap" class="anlt_visitor_wrap">
					<div class="anlt_visitor_title noselect">명예의 전당</div>\
					<div class="anlt_realtime_subtitle noselect">${info}</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">외부사이트</div>
						<div id="anlt_outlink_text_max_data" class="anlt_top_text_data">대양휴머니티칼리지</div>
					</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">학과/학부</div>
						<div id="anlt_major_text_max_data" class="anlt_top_text_data">컴퓨터공학과</div>
					</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">학번</div>
						<div id="anlt_number_text_max_data" class="anlt_top_text_data">16학번</div>
					</div>\
					<div class="anlt_visitor_box noselect">
						<div class="anlt_visitor_box_title">검색어</div>
						<div id="anlt_search_text_max_data" class="anlt_top_text_data">수강편람</div>
					</div>\
				</div>
	`;
	$("#posts_target").append(div);
	set_hall_data();
}
function set_hall_data() {

}

// Chart JS : Line Type---------------------------------------------------**
function get_line(id_, labels_, datas_) {
	let ctx = document.getElementById(id_);
	let myLineChart  = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
			datasets: [{
				label: labels_[0],
				data: datas_[0],
				borderColor: "#1ad904",
				backgroundColor: "#1ad904",
				lineTension: 0,
				fill: false
			}, {
				label: labels_[1],
				data: datas_[1],
				borderColor: "#03adfc",
				backgroundColor: "#03adfc",
				lineTension: 0,
				fill: false
			}]
		},
		options: {
			response: true,
			layout: {
        		padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                },
                labels: {
                	fontSize: 20
                }
        	},
			tooltips: {
				xPadding: 20,
				ypadding: 15,
				titleFontColor: "rgba(0,0,0,0)",
				titleFontSize: 0,
				titleSpacing: 0,
				bodyFontSize: 16,
				bodySpacing: 5,
				mode: 'index',
				intersect: false,
				cornerRadius: 3,
				caretPadding : 20,
				opacity: 0.7,
				footer: ' ',
				footerFontColor: "rgba(0,0,0,0)",
				footerFontSize: 10,
				footerSpacing: 0,
				footerMarginTop: 10
			},
			legend: {
        		display: true,
        		align: 'end'
        	},
        	title: {
        		display: false
        	},
			scales: {
				xAxes: [{
					display: true
				}],
				yAxes: [{
					display: true
				}]
			},
			hover: {
				mode: 'index',
				axis: 'x',
				intersect: false
			}
		}
	});
}
// Chart JS : Bar Type----------------------------------------------------**
function get_bar(id_, labels_, datas_) {
	let ctx = document.getElementById(id_);
	let myBarChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	    	labels: labels_,
			datasets: [{
				data: datas_,
				barPercentage: 0.9,
				categoryPercentage: 0.5,
        		barThickness: 1,
        		maxBarThickness: 2,
        		maxBarThickness: 1,
        		minBarLength: 10,
				backgroundColor: "#67a7f2",
			}]
	    },
	    options: {
	    	response: true,
			layout: {
        		padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                },
                labels: {
                	fontSize: 20
                }
        	},
			tooltips: {
				enabled: false
			},
			legend: {
        		display: false,
        		align: 'end'
        	},
        	title: {
        		display: false
        	},
			scales: {
				xAxes: [{
					display: true
				}],
				yAxes: [{
					ticks: {
						min: 0,
						fontSize : 14
					}
				}]
			}
	    }
	});
}