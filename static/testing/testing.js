function search_focus(keyCode) {
	if (keyCode == 13) {
		search_button();
	}
}


function search_button() {	// 검색작업 data = 글자
	let data;
	data = $("#pc_search_input").val();
	$("#pc_search_input").blur();
	search_text(data);	// 검색 함수 실행
	/*search 클릭 작업============================================================*/
}

let is_searching = 0;
function search_text(text) {
	// 현재 검색 중이면 차단
	if (is_searching == 1) return;
	is_searching = 1;

	is_posts_there.a = 0;
	is_posts_done.a = 0;
	if (text == ""){
		Snackbar("검색어를 입력해주세요.");
		return;
	} else {
		text = text.toLowerCase();
	}
	$("#posts_creating_loading").removeClass("display_none");
	$("#posts_target").empty();
	let send_data = {search: text};
	let a_jax_wordanalysis = A_JAX("http://"+host_ip+"/simulation_tokenizer", "POST", null, send_data);
	let a_jax_recommend = A_JAX("http://"+host_ip+"/get_similarity_words", "POST", null, send_data);
	let a_jax0 = A_JAX("http://"+host_ip+"/priority_search/200", "POST", null, send_data);
	let a_jax1 = A_JAX("http://"+host_ip+"/category_search/1/200", "POST", null, send_data);
	let a_jax2 = A_JAX("http://"+host_ip+"/category_search/2/200", "POST", null, send_data);
	let a_jax3 = A_JAX("http://"+host_ip+"/category_search/3/200", "POST", null, send_data);
	let a_jax4 = A_JAX("http://"+host_ip+"/category_search/4/200", "POST", null, send_data);
	$.when(a_jax_wordanalysis).done(function () {
		let json = a_jax_wordanalysis.responseJSON;
		if (json['result'] == 'success') {
			word_tokenizer_display(json["simulation"]);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax_recommend).done(function () {
		let json = a_jax_recommend.responseJSON;
		if (json['result'] == 'success') {
			word_similarity_display(json["similarity_words"]);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax0).done(function () {
		let json = a_jax0.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(0, json["search_result"]);
			insert_search_post(0, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax1).done(function () {
		let json = a_jax1.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(1, json["search_result"]);
			insert_search_post(1, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax2).done(function () {
		let json = a_jax2.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(2, json["search_result"]);
			insert_search_post(2, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax3).done(function () {
		let json = a_jax3.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(3, json["search_result"]);
			insert_search_post(3, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax4).done(function () {
		let json = a_jax4.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(4, json["search_result"]);
			insert_search_post(4, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
}


function remove_duplicated(target, posts) {
	let output = [], index = [], post_one, i, j, posts_len = posts.length;
	for (i = 0; i < posts_len; i++) index.push(0);
	for (i = posts_len - 1; i >= 0; i--) {
		for (j = i - 1; j >= 0; j--) {
			if (posts[i]["_id"] == posts[j]["_id"]) {
				index[i] = 1;
				break;
			} else if (posts[i]["similarity"] != posts[j]['similarity']){
				break;
			}
		}
	}
	for (i = 0; i < posts_len; i++) {
		if (index[i] == 1) continue;
		output.push(posts[i]);
	}
	return output;
}
function insert_search_post(target, posts) {
	
}


let is_posts_done = {
	aInternal: 0,
	aListener: function(val) {},
	set a(val) {
		this.aInternal = val;
		this.aListener(val);
	},
	get a() {
		return this.aInternal;
	},
	registerListener: function(listener) {
		this.aListener = listener;
	}
}
let is_posts_there = {
	aInternal: 0,
	aListener: function(val) {},
	set a(val) {
		this.aInternal = val;
		this.aListener(val);
	},
	get a() {
		return this.aInternal;
	},
	registerListener: function(listener) {
		this.aListener = listener;
	}
}
is_posts_done.registerListener(function(val) {
	if (val == 5) {
		// 로딩 제거
		is_searching = 0;
		let token = localStorage.getItem('sj-state');
		if (token == null || token == undefined || token == 'undefined') {} 
		else {
			a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
			$.when(a_jax).done(function () {
				if (a_jax.responseJSON['result'] == 'success') {
					let posts = $(".post_block");
					let post_one;
					for (post_one of posts) {
						for (let fav_post of a_jax.responseJSON["user_fav_list"]) {
							if ($(post_one).attr("p-id") == fav_post["_id"]) {
								$(post_one).children('div').children('div.post_like').css("color", "#f00730");
								$(post_one).children('div').children('div.post_like').attr("ch", "1");
							}
						}
					}
				} else {
					localStorage.removeItem('sj-state');
				}
			});
		}
		$("#posts_creating_loading").addClass("display_none");
	}
});
is_posts_there.registerListener(function(val) {
	if (val == 6) {
		$("#posts_creating_loading").addClass("display_none");
		Snackbar("포스트가 존재하지 않습니다.");
	}
});


// Recommend words inserting
function insert_recommend_words(words_dict) {
	let recommends = [];
	let output = [];
	let words_key, words_list, word;
	for (words_key in words_dict) {
		words_list = words_dict[words_key];
		for (word of words_list) {
			recommends.push(word);
		}
	}
	recommends.sort(compare);
	recommends = recommends.slice(0, 10);
	for (word of recommends) {
		//output.push(Object.keys(word)[0]);
		output.push(word);
	}
	if (output.length == 0) {
		return;
	}
	return output;
}
function compare( a, b ) {
  if ( Object.values(a)[0] > Object.values(b)[0] ){
    return -1;
  }
  if ( Object.values(a)[0] < Object.values(b)[0] ){
    return 1;
  }
  return 0;
}

function word_tokenizer_display(token_array) {
	let target = $("#words_token_cont"), tag;
	target.empty();
	target.append(`<div class="words_token_title noselect">Token 분류</div>`);
	for (let i = 1; i <= token_array.length; i++) {
		if (i == 7) break;
		setTimeout(function() {
			tag = `<div class="words_token noselect wow animated fadeInLeft" data-wow-duration="1s" style="margin-left:${i * 3}vw">${token_array[i - 1]}</div>`;
			target.append(tag);
		}, i*300);
	}
}

let chart_title = [], chart_number = [];
function word_similarity_display(words_array) {
	let output = insert_recommend_words(words_array);
	let target = $("#word_fasttext_cont"), tag;
	target.empty();
	target.append(`<div class="words_token_title noselect">연관 단어 추출</div>`);
	if (output == undefined) return;
	for (let i = 1; i <= output.length; i++) {
		if (i == 7) break;
		setTimeout(function() {
			tag = `<div class="words_fasttext_title noselect wow animated fadeInLeft" data-wow-duration="1s" style="margin-left:${i * 3}vw">${Object.keys(output[i - 1])[0]}</div>`;
			target.append(tag);
		}, i*100);
	}
	for (let i = 0; i < output.length; i ++) {
		if (i == 7) break;
		chart_title.push(Object.keys(output[i])[0]);
		chart_number.push(Object.values(output[i])[0]*100);
	}
	que_id = "_bar";
	target2 = $("#words__similarity_chart");
	target2.empty().append('<canvas id="hist'+que_id+'"" width="auto" height="auto"></canvas>');
	hist(
		"hist"+que_id, //해당 캔버스 아이디
		"", // 없으면 ""
		chart_title, //레이블
		chart_number,               // 각 레이블의 값
		"#222222",
		30,  // 제목폰트
		20,  // 라벨 폰트
		"#00000" // 모든 글씨 색깔
	);
	polar_area("area"+vector_id);
}
// Input chart
let que_id = "_bar", vector_id = "_vector";
let target2 = $("#words__similarity_chart"), target3 = $("#words__vector_chart");
target2.append('<canvas id="hist'+que_id+'"" width="auto" height="auto"></canvas>');
target3.append('<canvas id="area'+vector_id+'"" width="auto" height="auto"></canvas>');
// chart js
var myChart1, myChart2;
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontFamily = "'AppleSdNeo'";
function hist(id_, title_, labels_, data_, bgcolor_, tfsize_, lfsize_, fcolor_) {
    var ctx = document.getElementById(id_);
    myChart1 = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels_,
            datasets: [{
                label: ' ',
                data: data_,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderColor: "white",
                borderWidth: 3,
                barThickness: 30,
                minBarLength: 50
            }]
        },
        options:{
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
        		titleFontSize: 24,
        		bodyFontSize: 20
        	},
        	legend: {
        		display: false
        	},
        	title: {
        		display: false
        	},
        	scales: {
        		yAxes: [{
        			fontSize: 20,
        			fontColor: "white",
        			barThickness: 30
        		}],
        		xAxes: [{
        			fontSize: 20,
        			fontColor: "white",
        			barThickness: 30
        		}]
        	}
        }
    });
}
var randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};
function polar_area(id_) {
	var ctx2 = document.getElementById(id_);
	myChart2 = new Chart(ctx2, {
		type: "polarArea",
		data: {
			datasets: [{
				label: ' ',
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
				],
				backgroundColor: [
					'#ed0202',
					'#ff6600',
					'#ffd000',
					'#a6ff00',
					'#00ffaa',
					'#00f2ff',
					'#0051ff',
					'#5900ff',
					'#c300ff',
					'#ff00c8',
					'#ed0202',
					'#ff6600',
					'#ffd000',
					'#a6ff00',
					'#00ffaa',
					'#00f2ff',
					'#0051ff',
					'#5900ff',
					'#c300ff',
					'#ff00c8',
					'#ed0202',
					'#ff6600',
					'#ffd000',
					'#a6ff00',
					'#00ffaa',
					'#00f2ff',
					'#0051ff',
					'#5900ff',
					'#c300ff',
					'#ff00c8'
					/*
					'#ffa6a6',
					'#fab055',
					'#f7eda8',
					'#92d687',
					'#4edcf2',
					'#6998ff',
					'#aa80ff',
					'#f0adea',
					'#e8dce2',
					'#9dfcdc',
					'#ffa6a6',
					'#fab055',
					'#f7eda8',
					'#92d687',
					'#4edcf2',
					'#6998ff',
					'#aa80ff',
					'#f0adea',
					'#e8dce2',
					'#9dfcdc',
					'#ffa6a6',
					'#fab055',
					'#f7eda8',
					'#92d687',
					'#4edcf2',
					'#6998ff',
					'#aa80ff',
					'#f0adea',
					'#e8dce2',
					'#9dfcdc'*/
				],
				borderColor: 'rgba(0,0,0,1)'
			}],
			labels: [
				'v1',
				'v2',
				'v3',
				'v4',
				'v5',
				'v6',
				'v7',
				'v8',
				'v9',
				'v10',
				'v11',
				'v12',
				'v13',
				'v14',
				'v15',
				'v16',
				'v17',
				'v18',
				'v19',
				'v20',
				'v21',
				'v22',
				'v23',
				'v24',
				'v25',
				'v26',
				'v27',
				'v28',
				'v29',
				'v30',
			]
		},
		options: {
			responsive: true,
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
        		titleFontSize: 24,
        		bodyFontSize: 20
        	},
        	legend: {
        		position: 'left'
        	},
        	title: {
        		display: false
        	},
        	scale: {
				ticks: {
					beginAtZero: true,
					backdropColor: 'rgba(0,0,0,0)',
					showLabelBackdrop: true
				},
				reverse: false
			},
			animation: {
				animateRotate: false,
				animateScale: true
			}
		}
	});
}
