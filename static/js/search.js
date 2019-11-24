// Searchbar Task
let search_cache = "";	// 이전 검색어
let search_target = "";	// 목표 검색어
let now = 0;	// 현재 화살표로 선택한 div 위치
let all = 0;	// 검색결과 수
function search_focus(keyCode, tag) {
	let w = $(document).width();
	//KeyUp 38 or KeyDown 40
	if (keyCode == 13) {
		search_button(tag);
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
		if (w < 1200) {
			target = $(`#mobile_search_recommend_box > .search_result:nth-child(${now})`).text().trim();
		} else {
			target = $(`#search_recommend_box > .search_result:nth-child(${now})`).text().trim();
		}
		tag.val(target);
		search_cache = target;
	} else {
		let now_search = tag.val();
		// 문열길이!=0, 문자열변화
		if (now_search.length != 0 && search_cache != now_search) {
			$(`.search_result:nth-child(${now})`).removeClass("search_target");
			now = 0;
			search_cache = tag.val();
			search_target = search_cache;
			/*추천검색어 AJAX 요청 공간=========================================*/
			all = 3;	// AJAX로 요청한 추천검색어 수
			if (all != 0){
				if (w < 1200){
					$("#mobile_search_recommend_box").removeClass("display_none");
				} else {
					$("#search_recommend_box").removeClass("display_none");
				}
			}
		} else if (tag.val() == "") {
			search_target = "";
			if (w < 1200){
				$("#mobile_search_recommend_box").addClass("display_none");
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
		if (w < 1200){
			$("#mobile_search_recommend_box").removeClass("display_none");
		} else {
			$("#search_recommend_box").removeClass("display_none");
		}
	}
}
function search_blur() {
	let w = $(document).width();
	if (all != 0){
		if (w < 1200){
			$("#mobile_search_recommend_box").addClass("display_none");
		} else {
			$("#search_recommend_box").addClass("display_none");
		}
	}
}
function search_button(tag) {	// 검색작업 data = 글자
	let data;
	let w = $(document).width();
	if (w < 1200) {
		data = $("#mobile_search_input").val();
	} else {
		data = $("#pc_search_input").val();
	}
	$("#mobile_search_recommend_box").addClass("display_none");
	mobile_search_modal_close();
	search_text(data);	// 검색 함수 실행

	/*search 클릭 작업============================================================*/
}
let search_open = 0;
function mobile_search_modal_open() {
	let w = $(document).width();
	if (search_open == 0) {
		if (w < 1200) {
			$("#board_logo").css({"left": "10px",
								"transform": "translate(0, 0)",
								"-webkit-transform": "translate(0, 0)"})
			$("body").css("overflow", "hidden");
			$("#mobile_search").removeClass("display_none");
			$("#mobile_search_input").focus()
			search_open = 1;
		}
	} else {
		if (w < 1200) {
			mobile_search_modal_close();
		}
	}
}
function mobile_search_modal_close() {
	search_blur();
	$("body").removeAttr("style");
	$("#board_logo").removeAttr("style");
	$("#mobile_search").addClass("display_none");
	//$("#mobile_search").addClass("display_none");
	search_open = 0;
}
function search_result_click(tag) {
	let data = tag.children("span").text().trim();
	let w = $(document).width();
	if (w < 1200) {
		$("#mobile_search_input").val(data);
	} else {
		$("#pc_search_input").val(data);
	}
	search_button(data);
}
/*
0: 최근 트렌드
3: 일반
2: 행사&모임
1: 진로&구인
4: 커뮤니티
*/
// 검색 api 실행 함수
//let is_posts_there = 0, is_posts_done = 0;
let domain_posts = [];
let a_jax_posts = [];
function search_text(text) {
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
	search_container_set();
	now_topic = "검색 결과입니다!";
	where_topic = "SOOJLE 엔진";
	posts_update = 0;
	$("#board_info_text").empty();
	$("#board_info_text").text("검색 결과입니다!");
	$("#board_info_board").empty();
	$("#board_info_board").text("SOOJLE 엔진");
	let send_data = {search: text};
	let a_jax_domain = A_JAX("http://"+host_ip+"/domain_search", "POST", null, send_data);
	let a_jax0 = A_JAX("http://"+host_ip+"/priority_search/200", "POST", null, send_data);
	let a_jax1 = A_JAX("http://"+host_ip+"/category_search/1/200", "POST", null, send_data);
	let a_jax2 = A_JAX("http://"+host_ip+"/category_search/2/200", "POST", null, send_data);
	let a_jax3 = A_JAX("http://"+host_ip+"/category_search/3/200", "POST", null, send_data);
	let a_jax4 = A_JAX("http://"+host_ip+"/category_search/4/200", "POST", null, send_data);
	$.when(a_jax_domain).done(function () {
		let json = a_jax_domain.responseJSON;
		if (json['result'] == 'success') {
			domain_posts = json["search_result"];
			insert_domain_post(json["search_result"]);
			is_posts_done.a += 1;
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax0).done(function () {
		let json = a_jax0.responseJSON;
		if (json['result'] == 'success') {
			insert_search_post(0, json["search_result"]);
			is_posts_done.a += 1;
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax1).done(function () {
		let json = a_jax1.responseJSON;
		if (json['result'] == 'success') {
			insert_search_post(1, json["search_result"]);
			is_posts_done.a += 1;
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax2).done(function () {
		let json = a_jax2.responseJSON;
		if (json['result'] == 'success') {
			insert_search_post(2, json["search_result"]);
			is_posts_done.a += 1;
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax3).done(function () {
		let json = a_jax3.responseJSON;
		if (json['result'] == 'success') {
			insert_search_post(3, json["search_result"]);
			is_posts_done.a += 1;
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax4).done(function () {
		let json = a_jax4.responseJSON;
		if (json['result'] == 'success') {
			insert_search_post(4, json["search_result"]);
			is_posts_done.a += 1;
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 검색 창 구성 함수
function search_container_set() {
	let domain_target = `<div id="sr_dt"></div>`;
	let ajax0_target = `<div id="sr_t0"></div>`;
	let ajax1_target = `<div id="sr_t1"></div>`;
	let ajax2_target = `<div id="sr_t2"></div>`;
	let ajax3_target = `<div id="sr_t3"></div>`;
	let ajax4_target = `<div id="sr_t4"></div>`;
	let target = $("#posts_target");
	target.append(domain_target);
	target.append(ajax0_target);
	target.append(ajax1_target);
	target.append(ajax2_target);
	target.append(ajax3_target);
	target.append(ajax4_target);
}
// 도메인 검색 결과를 해당 dive에 넣어줌
function insert_domain_post(posts) {
	let id, title, phara, url, post_one, domain_block;
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
	else { target.append(domain_tag); }
}
/*
0: 최근 트렌드
3: 일반
2: 행사&모임
1: 진로&구인
4: 커뮤니티
*/
// 검색 결과를 해당 div에 넣어줌
function insert_search_post(target_num, posts, is_fav_cnt = 1) {
	a_jax_posts[target_num] = posts;	// posts 저장
	let posts_len = posts.length;
	posts = posts.slice(0,5); // 미리보기는 5개까지만 보여줌
	let target = $(`#sr_t${target_num}`), target_name = target_num;
	if (posts.length == 0) target.remove();
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
	if (w < 1200) {
		for (post_one of posts) {
			check = 0;
			if (is_fav_cnt == 0)
				id = post_one["_id"];
			else
				id = post_one["_id"];
			fav_cnt = post_one['fav_cnt'];
			title = post_one['title'];
			date = post_one['date'];
			date = new Date(date).SetTime(); 
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
								<div class="post_block_img_cont" onmousedown="post_view($(this)" style="background-image: url(${img})"></div>
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
			date = new Date(date).SetTime(); 
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
							<div class="post_block_img_cont" onmousedown="post_view($(this)" style="background-image: url(${img})"></div>
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
	target.append(target_tag);
}

// a_jax_posts[i] 0, 1, 2, 3, 4
// more posts function
function more_posts(target_num, is_fav_cnt = 1) {
	window.scroll(0, 0);
	$("#posts_creating_loading").removeClass("display_none");
	setTimeout(function() {
		let target_name;
		if (Number(target_num) == 0) {target_name = "최근 트렌드";}
		else if (Number(target_num) == 1) {target_name = "진로&구인";}
		else if (Number(target_num) == 2) {target_name = "행사&모임";}
		else if (Number(target_num) == 3) {target_name = "일반";}
		else {target_name = "커뮤니티";}
		let more_left_tag = `<img src="/static/icons/back.png" class="sr_more_to_before noselect" onclick="before_posts(${target_num});">${target_name}`;
		$("#board_info_text").empty();
		$("#board_info_text").append(more_left_tag);
		let posts = a_jax_posts[target_num];
		$("#posts_target").empty();
		let target = $("#posts_target");
		let w = $(document).width();
		// 속도향상을 위한 선언
		let check;
		let id, fav_cnt, title, date, url, domain, img, subimg, tag, post_one, fav_cnt_block;
		setTimeout(function() {
			if (w < 1200) {
				for (post_one of posts) {
					check = 0;
					if (is_fav_cnt == 0)
						id = post_one["_id"];
					else
						id = post_one["_id"];	
					fav_cnt = post_one['fav_cnt'];
					title = post_one['title'];
					date = post_one['date'];
					date = new Date(date).SetTime(); 
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
							tag = `<div class="post_block" p-id="${id}>
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
										<div class="post_block_img_cont" onmousedown="post_view($(this)" style="background-image: url(${img})"></div>
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
					date = new Date(date).SetTime(); 
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
									<div class="post_block_img_cont" onmousedown="post_view($(this)" style="background-image: url(${img})"></div>
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
					target.append($(tag));
				}
			}
		}, 600);
		// 로딩 제거
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
	}, 1000);
}
// back to search selection page
function before_posts(target_num, is_fav_cnt = 1) {
	$("#posts_creating_loading").removeClass("display_none");
	$("#posts_target").empty();
	$("#board_info_text").empty();
	$("#board_info_text").text("검색 결과입니다!");
	$("#board_info_board").empty();
	$("#board_info_board").text("SOOJLE 엔진");
	search_container_set();
	insert_domain_post(domain_posts);
	insert_search_post(0, a_jax_posts[0]);
	insert_search_post(1, a_jax_posts[1]);
	insert_search_post(2, a_jax_posts[2]);
	insert_search_post(3, a_jax_posts[3]);
	insert_search_post(4, a_jax_posts[4]);
	$("#posts_creating_loading").addClass("display_none");
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
	if (val == 6) {
		// 로딩 제거
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
		let target = $("#posts_target");
		let no_posts_tag = `
			<div class="sr_none_posts_cont">
				<img src="./static/image/none_posts.png" class="sr_none_posts_img">
				<div class="sr_none_posts_text">포스트가 존재하지 않습니다!</div>
			</div>`;
		target.append(no_posts_tag);
	}
});