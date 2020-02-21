// Searchbar Task
let is_searching = 0;
let search_cache = "";	// 이전 검색어
let search_target = "";	// 목표 검색어
let now = 0;	// 현재 화살표로 선택한 div 위치
let all = 0;	// 검색결과 수
function search_focus(keyCode, tag) {
	let w = $(document).width();
	//if (w <1200) {
	if (mobilecheck()) {
		$("#mobile_search_recommend_box").removeClass("display_none");
		$("body").css("overflow", "hidden");
	}
	//KeyUp 38 or KeyDown 40
	if (keyCode == 13) {
		search_button();
		search_blur();
	} else if (keyCode == 38 || keyCode == 40) {
		$(`.search_result:nth-child(${now})`).removeClass("search_target");
		if (keyCode == 38) now--;
		else now++;
		if (now > all) {
			now--;
		} else if (now <= 0) {
			now++;
		}
		$(`.search_result:nth-child(${now})`).addClass("search_target");
		let target;
		//if (w < 1200) {
		if (mobilecheck()) {
			target = $(`#mobile_search_recommend_box > .search_result:nth-child(${now})`).text().trim();
		} else {
			target = $(`#search_recommend_box > .search_result:nth-child(${now})`).text().trim();
		}
		tag.val(target);
		search_cache = target;
	} else {
		let now_search = tag.val();
		// 문자열길이!=0, 문자열변화
		if (now_search.length != 0 && search_cache != now_search) {
			$(`.search_result:nth-child(${now})`).removeClass("search_target");
			now = 0;
			search_cache = tag.val();
			search_target = search_cache;
			/*추천검색어 AJAX 요청 공간=========================================*/
			all = 3;	// AJAX로 요청한 추천검색어 수
			if (all != 0){
				//if (w < 1200){
				if (mobilecheck()) {
					$("#mobile_search_recommend_box").removeClass("display_none");
				} else {
					$("#search_recommend_box").removeClass("display_none");
				}
			}
		} else if (tag.val() == "") {
			search_target = "";
			//if (w < 1200){
			if (mobilecheck()) {
				//$("#mobile_search_recommend_box").addClass("display_none");
				$(".search_result").remove();
			} else {
				$("#search_recommend_box").addClass("display_none");
				$(".search_result").remove();
			}
			
			let line = '<div id="search_loading" class="search_loading pointer noselect">\
							<i class="fas fa-grip-lines"></i>\
						</div>';
			$("#mobile_search_recommend_box").append(line);
			search_cache = "";
		}
	}
}
function search_click() {
	let w = $(document).width();
	if (all != 0){
		//if (w < 1200){
		if (mobilecheck()) {
			$("#mobile_search_recommend_box").removeClass("display_none");
		} else {
			$("#search_recommend_box").removeClass("display_none");
		}
	}
}
function search_blur() {
	let w = $(document).width();
	if (all != 0){
		//if (w < 1200){
		if (mobilecheck()) {
			$("#mobile_search_recommend_box").addClass("display_none");
		} else {
			$("#search_recommend_box").addClass("display_none");
		}
	}
}
/*search 클릭 작업============================================================*/
function search_button() {	// 검색작업 data = 글자
	let data;
	let w = $(document).width();
	//if (w < 1200) {
	if (mobilecheck()) {
		data = $("#mobile_search_input").val();
		$("#mobile_search_input").blur();
		search_blur();
		$("body").removeAttr("style");
		//$("#board_logo").removeAttr("style");
		//$("#mobile_search").addClass("display_none");
		search_open = 0;
	} else {
		data = $("#pc_search_input").val();
		$("#pc_search_input").blur();
	}
	$("#mobile_search_recommend_box").addClass("display_none");
	//mobile_search_modal_close();
	//search_text(data);	// 검색 함수 실행

	data = data.replace(/ /g, "+");
	//window.location.href = "/board#search?" + data + '/'
	location.replace("/board#search?" + data + '/')
}
var search_open = 0;
function mobile_search_modal_open() {
	let w = $(document).width();
	if (search_open == 0) {
		if (grid_open == 1)
			grid_modal_off();
		if (menu_open == 1)
			menu_modal_off();
		//if (w < 1200) {
		if (mobilecheck()) {
			scroll(0,0);
			$("#board_logo").css({"left": "10px",
								"transform": "translate(0, 0)",
								"-webkit-transform": "translate(0, 0)"});
			$("body").css({"position": "fixed","overflow": "hidden"});
			$("#mobile_search").removeClass("display_none");
			$("#mobile_search_input").focus();
			search_open = 1;
			$("#mobile_search_recommend_box").removeClass("display_none");
		}
	} else {
		if (mobilecheck() && $("#mobile_search_input").val() != "") {
			$("#mobile_search_input").focus();
			$("#mobile_search_recommend_box").removeClass("display_none");
		}
		else if (mobilecheck()) {
			mobile_search_modal_close();
		}
	}
}
function mobile_search_modal_close() {
	search_open = 0;
	$("body").removeAttr("style");
	$("#mobile_search_recommend_box").addClass("display_none");
	$("#board_logo").removeAttr("style");
	$("#mobile_search").addClass("display_none");
}
function search_result_click(tag) {
	let data = tag.children("span").text().trim();
	let w = $(document).width();
	//if (w < 1200) {
	if (mobilecheck()) {
		$("#mobile_search_input").val(data);
	} else {
		$("#pc_search_input").val(data);
	}
	search_button();
}
$(document).on('touchend', function(e) {
	if (search_open == 1) {
		if ($(e.target.classList)[0]  == 'mobile_search_header' ||	// nothing
			$(e.target.classList)[0] == 'mobile_search_button_modal' ||
			$(e.target.classList)[0] == 'result_target' ||
			$(e.target.classList)[0] == 'mobile_search_input' ||
			$(e.target.classList)[0] == 'mobile_search_icon_modal') {
		} else if (mobilecheck() && $("#mobile_search_input").val() != "") {
			//search_open = 0;
			$("body").removeAttr("style");
			$("#mobile_search_input").blur();
		} else {
			mobile_search_modal_close();
		}
	}
});
/*
0: 최근 트렌드
3: 일반
2: 행사&모임
1: 진로&구인
4: 커뮤니티
*/
// 검색 api 실행 함수
//let is_posts_there = 0, is_posts_done = 0;
let similarity_words;
let domain_posts = [];
let a_jax_posts = [];
function search_text(text) {
	a_jax_posts = [];
	domain_posts = [];
	now_state = text;
	let now_creating_state = now_state;
	// 좌측 메뉴 버그 수정 fixed
	//$("#menu_container").addClass("menu_container_searching");
	$("#menu_container").removeAttr("style");
	$("#menu_container").removeClass("menu_container_fixed");
	// 현재 검색 중이면 차단
	if (is_searching == 1) return;
	is_searching = 1;

	is_posts_there.a = 0;
	is_posts_done.a = 0;
	if (text == ""){
		Snackbar("검색어를 입력해주세요.");
		is_searching = 0;
		return;
	} 
	// search_input box text input
	if (mobilecheck()) {
		$("#mobile_search_input").val(text.replace(/\+/g, " "));
	} else {
		$("#pc_search_input").val(text.replace(/\+/g, " "));
	}
	$("#posts_creating_loading").removeClass("display_none");
	$("#posts_target").empty();
	search_container_set();
	now_topic = "검색 결과입니다!";
	where_topic = "SOOJLE 엔진";
	posts_update = 0;
	$("#board_info_text").empty();
	$("#board_info_text").text("검색 결과입니다!");
	$("#board_info_board").empty();
	$("#board_info_board").text("SOOJLE 엔진");
	let category_tabs = `<div class="category_tabs">
							<div id="category0" class="category_tab pointer category_checked" onclick="category_select($(this))">통합 검색</div>\
							<div id="category1" class="category_tab pointer" onclick="category_select($(this))">최근 트렌드</div>\
							<div id="category2" class="category_tab pointer" onclick="category_select($(this))">진로&구인</div>\
							<div id="category3" class="category_tab pointer" onclick="category_select($(this))">행사&모임</div>\
							<div id="category4" class="category_tab pointer" onclick="category_select($(this))">일반</div>\
							<div id="category5" class="category_tab pointer" onclick="category_select($(this))">커뮤니티</div>\
						</div>`;
	$("#posts_target").append(category_tabs);
	$("#posts_target").append(`<div id="search_posts_target"></div>`);
	let send_data = {search: text.trim().toLowerCase()};
	let a_jax_domain = A_JAX("http://"+host_ip+"/domain_search", "POST", null, send_data);
	let a_jax0 = A_JAX("http://"+host_ip+"/priority_search/200", "POST", null, send_data);
	let a_jax1 = A_JAX("http://"+host_ip+"/category_search/1/200", "POST", null, send_data);
	let a_jax2 = A_JAX("http://"+host_ip+"/category_search/2/200", "POST", null, send_data);
	let a_jax3 = A_JAX("http://"+host_ip+"/category_search/3/200", "POST", null, send_data);
	let a_jax4 = A_JAX("http://"+host_ip+"/category_search/4/200", "POST", null, send_data);
	// 연관검색어 임시 중단
	//let a_jax_recommend = A_JAX("http://"+host_ip+"/get_similarity_words", "POST", null, send_data);
	$.when(a_jax_domain).done(function () {
		let json = a_jax_domain.responseJSON;
		if (json['result'] == 'success') {
			domain_posts = json["search_result"];
			insert_domain_post(json["search_result"], now_creating_state);
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax0).done(function () {
		let json = a_jax0.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(0, json["search_result"]);
			//insert_search_post(0, output, now_creating_state);
			a_jax_posts[0] = output;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax1).done(function () {
		let json = a_jax1.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(1, json["search_result"]);
			//insert_search_post(1, output, now_creating_state);
			a_jax_posts[1] = output;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax2).done(function () {
		let json = a_jax2.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(2, json["search_result"]);
			//insert_search_post(2, output, now_creating_state);
			a_jax_posts[2] = output;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax3).done(function () {
		let json = a_jax3.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(3, json["search_result"]);
			//insert_search_post(3, output, now_creating_state);
			a_jax_posts[3] = output;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax4).done(function () {
		let json = a_jax4.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(4, json["search_result"]);
			//insert_search_post(4, output, now_creating_state);
			a_jax_posts[4] = output;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	// 연관검색어 임시중지
	/*$.when(a_jax_recommend).done(function () {
		let json = a_jax_recommend.responseJSON;
		if (json['result'] == "success") {
			similarity_words = json['similarity_words'];
			insert_recommend_words(json['similarity_words'], now_creating_state);
		} else {
			//is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});*/
}
// 검색 창 구성 함수
function search_container_set() {
	let domain_target = `<div id="sr_dt"></div>`;
	let ajax0_target = `<div id="sr_t0"></div>`;
	let ajax1_target = `<div id="sr_t1"></div>`;
	let ajax2_target = `<div id="sr_t2"></div>`;
	let ajax3_target = `<div id="sr_t3"></div>`;
	let ajax4_target = `<div id="sr_t4"></div>`;
	let search_recommend_target = `<div id="sr_recommend" class="sr_recommend"></div>`;
	let target = $("#search_posts_target");
	// 연관검색어 임시중지
	//target.append(search_recommend_target);
	target.append(domain_target);
	//target.append(ajax0_target);
	//target.append(ajax1_target);
	//target.append(ajax2_target);
	//target.append(ajax3_target);
	//target.append(ajax4_target);
}
// 도메인 검색 결과를 해당 div에 넣어줌
function insert_domain_post(posts, now_creating_state = "") {
	is_posts_done.a += 1;
	let id, title, phara, url, post_one, domain_block;
	let domain_target = `<div id="sr_dt"></div>`;
	$("#search_posts_target").append(domain_target);
	let target = $("#sr_dt");
	let domain_tag = `
		<div class="sr_title">웹사이트</div>`;
	let line = `<div class="sr_line"></div>`;
	posts = posts.slice(0, 5);
	for (post_one of posts) {
		url = post_one["url"];
		title = post_one["title"];
		phara = post_one["post"];
		domain_block = `
			<div class="sr_domain_ct" p-id="0">
				<a href = ${url} target="_blank">
					<div>
						<div class="sr_domain_title">${title}</div>
						<div class="sr_domain_url">${url}</div>
						<div class="sr_domain_post">${phara}</div>
					</div>
				</a>
				<div>
					<div class="post_menu" onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
				</div>
			</div>`;
		domain_tag += domain_block;
	}
	domain_tag += line;
	if (posts.length == 0) {
		target.remove();
		is_posts_there.a += 1;
	}
	else {
		target.append(domain_tag); 
	}
}
/*
0: 최근 트렌드
3: 일반
2: 행사&모임
1: 진로&구인
4: 커뮤니티
*/
// 검색 결과를 해당 div에 넣어줌
function insert_search_post(target_num, posts, now_creating_state = "", is_fav_cnt = 1) {
	is_posts_done.a += 1;
	a_jax_posts[target_num] = posts;	// posts 저장
	let posts_len = 0;
	if (posts == undefined) posts_len = 0;
	else {
		posts_len = posts.length;
		posts = posts.slice(0,5); // 미리보기는 5개까지만 보여줌
	}
	let target = $(`#sr_t${target_num}`), target_name = target_num;
	if (posts_len == 0) {
		target.remove();
		is_posts_there.a += 1;
		return;
	}
	target = $("#search_posts_target");
	if (Number(target_name) == 0) {target_name = "최근 트렌드";}
	else if (Number(target_name) == 1) {target_name = "진로&구인";}
	else if (Number(target_name) == 2) {target_name = "행사&모임";}
	else if (Number(target_name) == 3) {target_name = "일반";}
	else {target_name = "커뮤니티";}
	let w = $(document).width();
	// 속도향상을 위한 선언
	let check;
	let id, fav_cnt, title, date, url, domain, img, subimg, tag, post_one, fav_cnt_block;
	let target_tag = `<div class="sr_title">${target_name}</div>`;
	//if (w < 1200) {
	if (mobilecheck()) {
		for (post_one of posts) {
			check = 0;
			if (is_fav_cnt == 0)
				id = post_one["_id"];
			else
				id = post_one["_id"];
			fav_cnt = post_one['fav_cnt'];
			title = post_one['title'];
			date = post_one['date'];
			date = change_date_realative(date);
			if (post_one['end_date']) {
				date = post_one['end_date'];
				date = change_date_realative(date);
			}
			url = post_one['url'];
			domain = url.split('/');
			domain = domain[0] + '//' + domain[2];
			img = post_one['img'];
			if (is_fav_cnt == 1) {
				fav_cnt_block = `<div class="post_like_cnt">${fav_cnt}</div>`;
			} else {
				fav_cnt_block = ``;
			}
			if (img.toString().indexOf("everytime") != -1) {
				img = "./static/image/everytime.jpg";
				check = 1;
			} else if (img.toString().indexOf("daum") != -1) {
				img = "./static/image/sjstation.png";
				check = 1;
			}
			/* tag 에다가 레이아웃 배치할 것 */
			if (img.length < 10 || img.length == undefined && check == 0) {
					tag = `<div class="post_block" p-id="${id}">
							<a href="${url}" target="_blank">
								<div class="post_title_cont_noimg pointer" onmousedown="post_view($(this))">
									<div class="post_title">${title}</div>
								</div>
							</a>
							<a href="${url}" target="_blank">
								<div class="post_block_cont_noimg pointer" onmousedown="post_view($(this))">
									<div class="post_url">${domain}</div>
									<div class="post_date">${date}</div>
								</div>
							</a>
							<div class="post_block_set_cont_noimg noselect">
								<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
								${fav_cnt_block}
							</div>
							<div class="post_menu noselect" onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
						</div>`
			} else {
					tag = `<div class="post_block" p-id="${id}">
							<a href="${url}" target="_blank">
								<div class="post_title_cont pointer" onmousedown="post_view($(this))">
									<div class="post_title">${title}</div>
								</div>
							</a>
							<a href="${url}" target="_blank">
								<div class="post_block_img_cont" onmousedown="post_view($(this))" style="background-image: url('${img}')"></div>
							</a>
							<a href="${url}" target="_blank">
								<div class="post_block_cont pointer" onmousedown="post_view($(this))">
									<div class="post_url">${domain}</div>
									<div class="post_date">${date}</div>
								</div>
							</a>
							<div class="post_block_set_cont noselect">
								<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
								${fav_cnt_block}
							</div>
							<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
						</div>`
			}
			target_tag += tag;
		}
	} else {
		for (post_one of posts) {
			check = 0;
			if (is_fav_cnt == 0)
				id = post_one["_id"];
			else
				id = post_one["_id"];
			fav_cnt = post_one['fav_cnt'];
			title = post_one['title'];
			date = post_one['date'];
			date = change_date_realative(date);
			if (post_one['end_date']) {
				date = post_one['end_date'];
				date = change_date_realative(date);
			}
			url = post_one['url'];
			domain = url.split('/');
			domain = domain[0] + '//' + domain[2];
			img = post_one['img'];
			if (is_fav_cnt == 1) {
				fav_cnt_block = `<div class="post_like_cnt">${fav_cnt}</div>`;
			} else {
				fav_cnt_block = ``;
			}
			if (img.toString().indexOf("everytime") != -1) {
				img = "./static/image/everytime.jpg";
				check = 1;
			} else if (img.toString().indexOf("daum") != -1) {
				img = "./static/image/sjstation.png";
				check = 1;
			}
			if (img.length < 10 || img.length == undefined && check == 0) {
				tag = `<div class="post_block" p-id="${id}">
						<a href="${url}" target="_blank">
							<div class="post_title_cont_noimg pointer" onmousedown="post_view($(this))">
								<div class="post_title">${title}</div>
							</div>
						</a>
						<a href="${url}" target="_blank">
							<div class="post_block_cont_noimg pointer" onmousedown="post_view($(this))">
								<div class="post_url">${domain}</div>
								<div class="post_date">${date}</div>
							</div>
						</a>
						<div class="post_block_set_cont_noimg noselect">
							<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
							${fav_cnt_block}
						</div>
						<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
					</div>`
			} else {
				tag = `<div class="post_block" p-id="${id}">
						<a href="${url}" target="_blank">
							<div class="post_block_img_cont" onmousedown="post_view($(this))" style="background-image: url('${img}')"></div>
						</a>
						<a href="${url}" target="_blank">
							<div class="post_title_cont pointer" onmousedown="post_view($(this))">
								<div class="post_title">${title}</div>
							</div>
						</a>
						<a href="${url}" target="_blank">
							<div class="post_block_cont pointer" onmousedown="post_view($(this))">
								<div class="post_url">${domain}</div>
								<div class="post_date">${date}</div>
							</div>
						</a>
						<div class="post_block_set_cont noselect">
							<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
							${fav_cnt_block}
						</div>
						<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
					</div>`
			}
			target_tag += tag;
		}
	}
	let line = `<div class="sr_line"></div>`;
	let more;
	if (posts_len == 0) { is_posts_there.a += 1; }
	else if (posts_len < 6) {more = ``;}
	else {more = `<div class="sr_more" onclick="more_posts(${target_num})">더 보기</div>`;}
	target_tag = target_tag + more + line;
	if (now_creating_state == now_state)
		target.append(target_tag);
	//if (w > 1200) {
	if (!mobilecheck()) {
		//$("#menu_container").removeClass("menu_container_searching");
		setTimeout(function() {$("#menu_container").css({"transition": ".2s ease-in-out"});}, 200);
	}
}
// Recommend words inserting
function insert_recommend_words(words_dict, now_creating_state = "") {
	let target = $("#sr_recommend");
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
	recommends = recommends.slice(0, 6);
	for (word of recommends) {
		output.push(Object.keys(word)[0]);
	}
	if (output.length == 0) {
		target.remove();
		return;
	}
	let title = `<div class="sr_recommend_word_title noselect">이런 검색어는 어떤가요?</div>`;
	if (now_creating_state == now_state)
		target.append(title);
	for (word of output) {
		words_key = `<div class="sr_recommend_word" onclick="recommend_word_click($(this))">${word}</div>`;
		if (now_creating_state == now_state)
			target.append(words_key);
	}
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
function recommend_word_click(tag) {
	let text = tag.text();
	if (is_searching == 1) {
		return;
	}
	search_text(text);
	$("#mobile_search_input").val(text);
	$("#pc_search_input").val(text);
}

// a_jax_posts[i] 0, 1, 2, 3, 4
// more posts function
function more_posts(target_num, is_fav_cnt = 1) {
	$(".category_checked").removeClass("category_checked");
	$(`#category${target_num + 1}`).addClass("category_checked");
	let target_name;
	if (Number(target_num) == 0) {target_name = "최근 트렌드";}
	else if (Number(target_num) == 1) {target_name = "진로&구인";}
	else if (Number(target_num) == 2) {target_name = "행사&모임";}
	else if (Number(target_num) == 3) {target_name = "일반";}
	else {target_name = "커뮤니티";}
	let more_left_tag = `<img src="/static/icons/back.png" class="sr_more_to_before noselect" onclick="before_posts(${target_num});">${target_name}`;
	$("#board_info_text").empty();
	$("#board_info_text").append(more_left_tag);
	if (a_jax_posts[target_num].length == 0) return 1;
	let now_creating_state = now_state;
	is_posts_done.a = 1;
	window.scroll(0, 0);
	$("#posts_creating_loading").removeClass("display_none");
	//$("#menu_container").addClass("menu_container_searching");
	$("#menu_container").removeAttr("style");
	let posts = a_jax_posts[target_num];
	$("#search_posts_target").empty();
	let target = $("#search_posts_target");
	let w = $(document).width();
	// 속도향상을 위한 선언
	let check;
	let id, fav_cnt, title, date, url, domain, img, subimg, tag, post_one, fav_cnt_block;
	setTimeout(function() {
		//if (w < 1200) {
		if (mobilecheck()) {
			for (post_one of posts) {
				check = 0;
				if (is_fav_cnt == 0)
					id = post_one["_id"];
				else
					id = post_one["_id"];	
				fav_cnt = post_one['fav_cnt'];
				title = post_one['title'];
				date = post_one['date'];
				date = change_date_realative(date);
				if (post_one['end_date']) {
					date = post_one['end_date'];
					date = change_date_realative(date);
				}
				url = post_one['url'];
				domain = url.split('/');
				domain = domain[0] + '//' + domain[2];
				img = post_one['img'];
				if (is_fav_cnt == 1) {
					fav_cnt_block = `<div class="post_like_cnt">${fav_cnt}</div>`;
				} else {
					fav_cnt_block = ``;
				}
				if (img.toString().indexOf("everytime") != -1) {
					img = "./static/image/everytime.jpg";
					check = 1;
				} else if (img.toString().indexOf("daum") != -1) {
					img = "./static/image/sjstation.png";
					check = 1;
				}
				/* tag 에다가 레이아웃 배치할 것 */
				if (img.length < 10 || img.length == undefined && check == 0) {
						tag = `<div class="post_block" p-id="${id}">
								<a href="${url}" target="_blank">
									<div class="post_title_cont_noimg pointer" onmousedown="post_view($(this))">
										<div class="post_title">${title}</div>
									</div>
								</a>
								<a href="${url}" target="_blank">
									<div class="post_block_cont_noimg pointer" onmousedown="post_view($(this))">
										<div class="post_url">${domain}</div>
										<div class="post_date">${date}</div>
									</div>
								</a>
								<div class="post_block_set_cont_noimg noselect">
									<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
									${fav_cnt_block}
								</div>
								<div class="post_menu noselect" onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
							</div>`
				} else {
						tag = `<div class="post_block" p-id="${id}">
								<a href="${url}" target="_blank">
									<div class="post_title_cont pointer" onmousedown="post_view($(this))">
										<div class="post_title">${title}</div>
									</div>
								</a>
								<a href="${url}" target="_blank">
									<div class="post_block_img_cont" onmousedown="post_view($(this))" style="background-image: url('${img}')"></div>
								</a>
								<a href="${url}" target="_blank">
									<div class="post_block_cont pointer" onmousedown="post_view($(this))">
										<div class="post_url">${domain}</div>
										<div class="post_date">${date}</div>
									</div>
								</a>
								<div class="post_block_set_cont noselect">
									<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
									${fav_cnt_block}
								</div>
								<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
							</div>`
				}
				if (now_creating_state == now_state)
					target.append($(tag));
			}
		} else {
			for (post_one of posts) {
				check = 0;
				if (is_fav_cnt == 0)
					id = post_one["_id"];
				else
					id = post_one["_id"];
				fav_cnt = post_one['fav_cnt'];
				title = post_one['title'];
				date = post_one['date'];
				date = change_date_realative(date);
				if (post_one['end_date']) {
					date = post_one['end_date'];
					date = change_date_realative(date);
				}
				url = post_one['url'];
				domain = url.split('/');
				domain = domain[0] + '//' + domain[2];
				img = post_one['img'];
				if (is_fav_cnt == 1) {
					fav_cnt_block = `<div class="post_like_cnt">${fav_cnt}</div>`;
				} else {
					fav_cnt_block = ``;
				}
				if (img.toString().indexOf("everytime") != -1) {
					img = "./static/image/everytime.jpg";
					check = 1;
				} else if (img.toString().indexOf("daum") != -1) {
					img = "./static/image/sjstation.png";
					check = 1;
				}
				if (img.length < 10 || img.length == undefined && check == 0) {
					tag = `<div class="post_block" p-id="${id}">
							<a href="${url}" target="_blank">
								<div class="post_title_cont_noimg pointer" onmousedown="post_view($(this))">
									<div class="post_title">${title}</div>
								</div>
							</a>
							<a href="${url}" target="_blank">
								<div class="post_block_cont_noimg pointer" onmousedown="post_view($(this))">
									<div class="post_url">${domain}</div>
									<div class="post_date">${date}</div>
								</div>
							</a>
							<div class="post_block_set_cont_noimg noselect">
								<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
								${fav_cnt_block}
							</div>
							<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
						</div>`
				} else {
					tag = `<div class="post_block" p-id="${id}">
							<a href="${url}" target="_blank">
								<div class="post_block_img_cont" onmousedown="post_view($(this))" style="background-image: url('${img}')"></div>
							</a>
							<a href="${url}" target="_blank">
								<div class="post_title_cont pointer" onmousedown="post_view($(this))">
									<div class="post_title">${title}</div>
								</div>
							</a>
							<a href="${url}" target="_blank">
								<div class="post_block_cont pointer" onmousedown="post_view($(this))">
									<div class="post_url">${domain}</div>
									<div class="post_date">${date}</div>
								</div>
							</a>
							<div class="post_block_set_cont noselect">
								<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
								${fav_cnt_block}
							</div>
							<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
						</div>`
				}
				if (now_creating_state == now_state)
					target.append($(tag));
			}
		}
	}, 100);
	setTimeout(function() {
		// 로딩 제거
		let token = sessionStorage.getItem('sj-state');
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
				} else if (a_jax['status'].toString().startsWith('4')) {
					Snackbar("올바르지 않은 접근입니다.");
					sessionStorage.removeItem('sj-state');
					localStorage.removeItem('sj-state');
				} else {
					Snackbar("통신이 원활하지 않습니다.");
				}
			});
		}
	}, 700);
	$("#posts_creating_loading").addClass("display_none");
	setTimeout(function() {
		//if (w > 1200) {
		if (!mobilecheck()) {
			$("#menu_container").removeAttr("style");//.removeClass("menu_container_searching");
		}
	}, 1000);
}
// back to search selection page
function before_posts(target_num, is_fav_cnt = 1) {
	$(".category_checked").removeClass("category_checked");
	$("#category0").addClass("category_checked");
	is_posts_there.a = 0;
	$("#posts_creating_loading").removeClass("display_none");
	$("#search_posts_target").empty();
	// 연관검색어 임시중지
	//$("#search_posts_target").append(`<div id="sr_recommend" class="sr_recommend"></div>`);
	$("#board_info_text").empty();
	$("#board_info_text").text("검색 결과입니다!");
	$("#board_info_board").empty();
	$("#board_info_board").text("SOOJLE 엔진");
	//search_container_set();
	// 연관검색어 임시중지
	//insert_recommend_words(similarity_words, now_state);
	is_posts_done.a -= 1;
	insert_domain_post(domain_posts, now_state);
	for (let i = 0; i< 5; i++) {
		if (sum[i] != 0){
			is_posts_done.a -= 1;
			insert_search_post(index[i], a_jax_posts[index[i]], now_state);
		} else {
			is_posts_there.a += 1;
		}
	}
	// 로딩 제거
	let token = sessionStorage.getItem('sj-state');
	if (token == null || token == undefined || token == 'undefined') {} 
	else {
		a_jax_userinfo = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
		$.when(a_jax_userinfo).done(function () {
			if (a_jax_userinfo.responseJSON['result'] == 'success') {
				let posts = $(".post_block");
				let post_one;
				for (post_one of posts) {
					for (let fav_post of a_jax_userinfo.responseJSON["user_fav_list"]) {
						if ($(post_one).attr("p-id") == fav_post["_id"]) {
							$(post_one).children('div').children('div.post_like').css("color", "#f00730");
							$(post_one).children('div').children('div.post_like').attr("ch", "1");
						}
					}
				}
			} else if (a_jax_userinfo['status'].toString().startsWith('4')) {
				Snackbar("올바르지 않은 접근입니다.");
				sessionStorage.removeItem('sj-state');
				localStorage.removeItem('sj-state');
			} else {
				Snackbar("통신이 원활하지 않습니다.");
			}
		});
	}
	is_searching = 0;
	$("#posts_creating_loading").addClass("display_none");
}
// duplicative posts removed
// 오직 맨 처음 text_search 에서만 실행되어야함 is_posts_done.a += 1 때문에
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
	is_posts_done.a += 1;
	return output;
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
	// fixed 제거 sticky으로 변경
	if (val == 6) {
		setTimeout(function() {
			check_search_results_sort();
		}, 100);
	}
});
is_posts_there.registerListener(function(val) {
	if (val == 6) {
		$("#posts_creating_loading").addClass("display_none");
		let target = $("#search_posts_target");
		let imoticon = imoticons[Math.floor(Math.random() * imoticons.length)];
		//<img src="./static/image/none_posts.png" class="sr_none_posts_img">
		let no_posts_tag = `
			<div class="sr_none_posts_cont">
				<div class="sr_none_posts_img noselect">${imoticon}</div>
				<div class="sr_none_posts_text">포스트가 존재하지 않습니다!</div>
			</div>`;
		target.append(no_posts_tag);
		//$("#menu_container").removeClass('menu_container_searching');
	}
});


function similarity_sort(index, sum) {
	let i, j, max, tmp;
	for (i = 0; i< 5; i++) {
		max = i;
		for (j = i + 1; j< 5; j++)
			if (sum[max] < sum[j])
				max = j;
		if (max != i) {
			tmp = sum[i];
			sum[i] = sum[max];
			sum[max] = tmp;
			tmp = index[i];
			index[i] = index[max];
			index[max] = tmp;
		}
	}
	return index;
}
let index = [0, 1, 2, 3, 4], sum = [0, 0, 0, 0, 0];
function check_search_results_sort() {
	index = [0, 1, 2, 3, 4];
	sum = [0, 0, 0, 0, 0];
	for (let i = 0; i < 5; i++) {
		if (a_jax_posts[i] != undefined){
			for (let j = 0; j<5; j++){
				if (a_jax_posts[i][j] != undefined)
					sum[i] += a_jax_posts[i][j]["similarity"];
			}
		}
	}
	index = similarity_sort(index, sum);
	for (let i = 0; i< 5; i++) {
		insert_search_post(index[i], a_jax_posts[index[i]], now_state);
	}
	// 로딩 제거
	let token = sessionStorage.getItem('sj-state');
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
			} else if (a_jax['status'].toString().startsWith('4')) {
				Snackbar("올바르지 않은 접근입니다.");
				sessionStorage.removeItem('sj-state');
				localStorage.removeItem('sj-state');
			} else {
				Snackbar("통신이 원활하지 않습니다.");
			}
		});
	}
	is_searching = 0;
	$("#posts_creating_loading").addClass("display_none");
}

function category_select(tag) {
	let id = tag.attr('id');
	if (id == 'category0') {
		if (tag.hasClass('category0')) return;
		else before_posts(id.slice(Number(8) - 1));
	} else {
		let ok_post = more_posts(Number(id.slice(8)) - 1);
		if (ok_post == 1) {
			$("#posts_creating_loading").addClass("display_none");
			let target = $("#search_posts_target");
			target.empty();
			let imoticon = imoticons[Math.floor(Math.random() * imoticons.length)];
			//<img src="./static/image/none_posts.png" class="sr_none_posts_img">
			let no_posts_tag = `
				<div class="sr_none_posts_cont">
					<div class="sr_none_posts_img noselect">${imoticon}</div>
					<div class="sr_none_posts_text">포스트가 존재하지 않습니다!</div>
				</div>`;
			target.append(no_posts_tag);
			//$("#menu_container").removeClass('menu_container_searching');
		}
	}
}

// 검색 창 끄기
function out_of_search() {
	search_open = 1;
	$("#mobile_search_input").val("");
	$("#pc_search_input").val("");
	mobile_search_modal_close();
}