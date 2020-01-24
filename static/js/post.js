let now_w = $(document).width();
/*
$(window).resize(function() {
	let w = $(document).width();
	if (w < 1200 && now_w >= 1200) {
		location.reload();
	} else if (w >= 1200 && now_w < 1200) {
		location.reload();
	}
	now_w = w;
});*/
let save_posts = [];
let posts_update = 1;
var now_topic;
var where_topic;


// 추천 뉴스피드 불러오기 함수
function get_recommend_posts(is_first = 0) {
	out_of_search();
	window.scrollTo(0,0);
	now_topic = "추천";
	where_topic = "뉴스피드";
	posts_update = 0;
	now_state = now_topic;	// now state changing
	location.replace("/board#recommend");
	// 좌측 메뉴 버그 수정 fixed
	$("#menu_container").addClass("menu_container_fixed");
	$("#posts_creating_loading").removeClass("display_none");
	$("#board_container").addClass("board_container_fixed");
	$("#posts_target").empty();
	$("#pc_search_input").val("");
	$("#mobile_search_input").val("");
	$("#board_info_text").text("SOOJLE의 추천");
	$("#board_info_board").text("뉴스피드");
	if (is_first == 1)
		menu_modal_onoff(2);
	else
		menu_modal_onoff();
	let a_jax = A_JAX("http://"+host_ip+"/get_recommendation_newsfeed", "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			let output = JSON.parse(json["newsfeed"]);
			save_posts = output.slice(30);
			output = output.slice(0, 30);
			creating_post(output, "추천");
			$("html, body").animate({scrollTop: 0}, 400);
			// Modal Remove
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 인기 뉴스피드 불러오기 함수
function get_popularity_posts() {
	out_of_search();
	window.scrollTo(0,0);
	now_topic = "인기";
	where_topic = "뉴스피드";
	posts_update = 0;
	now_state = now_topic;	// now state changing
	location.replace("/board#popularity");
	// 좌측 메뉴 버그 수정 fixed
	$("#menu_container").addClass("menu_container_fixed");
	$("#posts_creating_loading").removeClass("display_none");
	$("#board_container").addClass("board_container_fixed");
	$("#posts_target").empty();
	$("#pc_search_input").val("");
	$("#mobile_search_input").val("");
	$("#board_info_text").empty();
	$("#board_info_text").text("인기");
	$("#board_info_board").empty();
	$("#board_info_board").text("뉴스피드");
	menu_modal_onoff();
	let a_jax = A_JAX("http://"+host_ip+"/get_popularity_newsfeed", "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			let output = JSON.parse(json["newsfeed"]);
			save_posts = output.slice(30);
			output = output.slice(0, 30);
			creating_post(output, "인기");
			$("html, body").animate({scrollTop: 0}, 400);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 토픽별 뉴스피드 불러오기 함수
function get_topic_posts(tag) {
	out_of_search();
	window.scrollTo(0,0);
	where_topic = "뉴스피드";
	posts_update = 0;
	let topic;
	if (typeof(tag) == String || typeof(tag) == "string") topic = tag;
	else topic = tag.children('div').text();
	now_topic = topic;
	now_state = now_topic;	// now state changing
	location.replace(`/board#topic?${now_topic}`);
	// 좌측 메뉴 버그 수정 fixed
	$("#menu_container").addClass("menu_container_fixed");
	$("#posts_creating_loading").removeClass("display_none");
	$("#board_container").addClass("board_container_fixed");
	$("#posts_target").empty();
	$("#pc_search_input").val("");
	$("#mobile_search_input").val("");
	$("#board_info_text").empty();
	$("#board_info_text").text(topic);
	$("#board_info_board").empty();
	$("#board_info_board").text("뉴스피드");
	menu_modal_onoff();
	let a_jax = A_JAX("http://"+host_ip+"/get_newsfeed_of_topic/"+topic, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			let output = JSON.parse(json["newsfeed"]);
			save_posts = output.slice(30);
			output = output.slice(0, 30);
			creating_post(output, topic);
			$("html, body").animate({scrollTop: 0}, 400);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
let now_creating = 0;
let header_scrolling = 0;
$(document).scroll(function() {
	let w = $(document).width();
	//if (w > 1200 && $(window).scrollTop() > 60) {
	if (!mobilecheck() && $(window).scrollTop() == 0) {
		$("#menu_container").removeAttr("style").css("transition", "0s ease-in-out");
	} else if (!mobilecheck() && $(window).scrollTop() > 60) {
		$("#menu_container").css("top", "30px");
		if (header_scrolling == 0) {
			$("#menu_container").css("transition", ".2s ease-in-out");	
			header_scrolling = 1;
		}
		setTimeout(function() {$("#menu_container").css("transition", "0s ease-in-out")}, 400);
	} //else if (w > 1200 && $(window).scrollTop() < 60) {
	else if (!mobilecheck() && $(window).scrollTop() < 60) {
		$("#menu_container").removeAttr("style").css("transition", ".2s ease-in-out");
		header_scrolling = 0;
	}
	if (where_topic == "뉴스피드"){
		if ($(window).scrollTop() + $(window).height() >= $(document).height()- 400){
			if (save_posts.length == 0) return;
			if (now_creating == 0) {
				now_creating = 1;
				$("#posts_creating_loading").removeClass("display_none");
				//$("#board_container").addClass("board_container_fixed");
				setTimeout(function() {
					get_posts_more(now_state);
					setTimeout(function() {
						now_creating = 0;
					}, 200);
				}, 600);
			}
		}
	}
});
// 포스트 더보기
function get_posts_more(before_state) {
	if (save_posts.length == 0) return;
	setTimeout(function() {
		let output = save_posts.slice(0,30);
		save_posts = save_posts.slice(30);
		creating_post(output, before_state);
	}, 500);
}


// 포스트 메뉴 열기
function post_menu_open(tag) {
	let id = tag.parent('div').parent('div').attr("p-id");
	let url = tag.parent('div').children('a').attr("href");
	$("body").css("overflow", "hidden");
	$("#post_menu_modal_container").attr("p-id", id);
	$("#post_menu_modal_container").attr("p-url", url);
	$("#post_menu_modal_container").removeClass("display_none");
	$("#post_menu_modal").removeClass("display_none");
	$("#post_menu_modal").addClass('fadeIn');
	setTimeout(function() {
		$("#post_menu_modal").removeClass('fadeIn');
	}, 1000);
}
// 포스트 메뉴 닫기
function post_menu_close() {
	$("body").removeAttr("style");
	$("#post_menu_modal_container").addClass("display_none");
	$("#post_menu_modal").addClass("display_none");
}

// 포스트 url 복사
function post_url_copy(tag) {
	Snackbar("URL 복사가 완료되었습니다!");
	let url = tag.parent('div').parent('div').attr("p-url");
	let output = $(`<input type="text" class="copy_input" value="${url}">`)
	$("body").append(output);
	output.select();
	document.execCommand('Copy');
	output.remove();
	post_menu_close();
}


// 좋아요 애니메이션 동작함수
function post_like_animation(tag) {
	tag = tag.parent('div').parent('div');
	let box = $(document.createElement("div"));
	box.addClass("like_animation wow animated bounceIn");
	box.attr("data-wow-duration", "0.6s");
	let icon = $(document.createElement("i"));
	icon.addClass("fas fa-heart");
	box.append(icon);
	tag.append(box);
	setTimeout(function() {
		box.removeClass("wow bounceIn");
		box.removeAttr("style");
		box.addClass("bounceOut");
		setTimeout(function() {
			box.remove();
		}, 800);
	}, 1000);
}
// 좋아요 버튼 함수
function post_like_button(tag) {
	let id = tag.parent('div').parent('div').attr("p-id");	// 다시 재지정해주기
	let is_like = tag.attr("ch");
	if (Number(is_like) == 0) {
		tag.attr("ch", "1");
		post_like_animation(tag);
		post_like(id, tag);
	} else {
		tag.attr("ch", "0");
		tag.removeAttr("style");
		post_dislike(id, tag);
	}
}
// 좋아요 실행 함수
function post_like(id, tag) {
	let token = sessionStorage.getItem('sj-state');
	if (token == null){
		Snackbar("로그인이 필요합니다.");
		return;
	}
	let a_jax = A_JAX("http://"+host_ip+"/post_like/"+id, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			tag.css("color", "#f00730");
			let cnt = Number(tag.next('div').text());
			cnt += 1;
			tag.next('div').empty();
			tag.next('div').text(cnt.toString());
		} else if (json['result'] == 'bad request') {
			Snackbar("새로 로그인해주세요!");
		} else if (json['result'] == 'fail') {
			Snackbar("잘못된 접근입니다.");
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 좋아요 취소 함수
function post_dislike(id, tag) {
	let token = sessionStorage.getItem('sj-state');
	if (token == null){
		Snackbar("로그인이 필요합니다.");
		return;
	}
	let a_jax = A_JAX("http://"+host_ip+"/post_unlike/"+id, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			tag.removeAttr("style");
			let cnt = Number(tag.next('div').text());
			cnt -= 1;
			tag.next('div').empty();
			tag.next('div').text(cnt.toString());
		} else if (json['result'] == 'bad request') {
			Snackbar("새로 로그인해주세요!");
		} else if (json['result'] == 'fail') {
			Snackbar("잘못된 접근입니다.");
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}


// 포스트 링크 클릭 함수
let mouse_which = 1;
$(document).ready(function(){
	$(".post_block").mousedown(function(e) {
		mouse_which = e.which; // 1:좌클릭, 2:휠클릭, 3:우클릭
	});
});
function post_view(tag) {
	if (mobilecheck() && tag.parent('a').attr("href").indexOf("educe") != -1) {
		alert("해당 사이트는 모바일에서 정상적인 접속이 되지않을 수도 있습니다.")
			window.open(tag.parent('a').attr("href"), '_blank');	
	}
	// 위의 document ready 함수의 속도를 위해서 지연시간 400 설정
	setTimeout(function() {
		if (mouse_which == 3) return;
		let id = tag.parent('a').parent('div').attr("p-id");
		let e = mouse_which;
		if (e == 1 || e == 2) {
			let a_jax = A_JAX("http://"+host_ip+"/post_view/"+id, "GET", null, null);
		}
	}, 400);
}

// 몇일전 몇분전 표기
function change_date_realative(dt) {
	let min = 60 * 1000;
	let c = new Date()
	let d = new Date(dt);
	d.setHours(d.getHours() - 9);
	let minsAgo = Math.floor((c - d) / (min));
	let result = {
		'raw': d.getFullYear() + '-' + 
		(d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + 
		(d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + 
		(d.getHours() > 9 ? '' : '0') +  d.getHours() + ':' + 
		(d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  + 
		(d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
		'formatted': '',
		'string_raw': d.getFullYear() + '년 ' + 
		(d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '월 ' + 
		(d.getDate() > 9 ? '' : '0') +  d.getDate() + '일'
	};
	if (minsAgo < 60 && minsAgo >= 0) { // 1시간 내
		result.formatted = minsAgo + '분 전';
	} else if (minsAgo < 60 * 24 && minsAgo >= 0) { // 하루 내
		result.formatted = Math.floor(minsAgo / 60) + '시간 전';
	} else if (minsAgo < 60 * 25 * 7 && minsAgo >= 0) {
		result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
	} else if (minsAgo < 60 * 25 * 7 * 4 && minsAgo >= 0) {
		result.formatted = Math.floor(minsAgo / 60 / 24 / 7) + '주 전';
	} else if (minsAgo < 60 * 25 * 7 * 4 * 13 && minsAgo >= 0) {
		result.formatted = Math.floor(minsAgo / 60 / 24 / 7 / 4) + '달 전';
	} else if (minsAgo >= 0) { // 한달 이상
		result.formatted = Math.floor(minsAgo / 60 / 24 / 7 / 4 / 12) + '년 전';
	} else {
		result.formatted = result.string_raw + "까지";
	}
	return result.formatted;
}
// yyyyMMddHHmmss 형태로 포멧팅하여 날짜 반환
Date.prototype.SetTime = function()
{
    let yyyy = this.getFullYear().toString();
    let MM = (this.getMonth() + 1).toString();
    let dd = this.getDate().toString();
    this.setHours(this.getHours() - 9);
    let HH = this.getHours().toString();
    let mm = this.getMinutes().toString();
    let ss = this.getSeconds().toString();
    return yyyy + "." + 
    		(MM[1] ? MM : '0'+ MM[0]) + "." + 
    		(dd[1] ? dd : '0'+ dd[0]) + " " +
    		(HH[1] ? HH : '0'+ HH[0]) + ":" + 
    		(mm[1] ? mm : '0'+ mm[0]) + ":" + 
    		(ss[1] ? ss : '0'+ ss[0]);
}
// 게시글 제작 함수
function creating_post(posts, now_creating_state = "", is_fav_cnt = 1) {
	let target = $("#posts_target");
	let w = $(document).width();
	// 속도향상을 위한 선언
	let check;
	let id, fav_cnt, title, date, url, domain, img, subimg, tag, post_one, fav_cnt_block;
	//if (w < 1200) {
	if (mobilecheck()) {
		for (post_one of posts) {
			check = 0;
			if (is_fav_cnt == 0)
				id = post_one["_id"];
			else
				id = post_one["_id"].$oid;	
			fav_cnt = post_one['fav_cnt'];
			title = post_one['title'];
			date = post_one['date'].$date;
			//date = new Date(date).SetTime();
			date = change_date_realative(date);
			if (post_one['end_date']) {
				date = post_one['end_date'].$date;
				date = date.toString + "까지";
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
							<div class="post_block_img_cont" onmousedown="post_view($(this))" style="background-image: url(${img})"></div>
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
			check_image(tag);
		}
	} else {
		for (post_one of posts) {
			check = 0;
			if (is_fav_cnt == 0)
				id = post_one["_id"];
			else
				id = post_one["_id"].$oid;
			fav_cnt = post_one['fav_cnt'];
			title = post_one['title'];
			date = post_one['date'].$date;
			//date = new Date(date).SetTime();
			date = change_date_realative(date);
			if (post_one['end_date']) {
				date = post_one['end_date'].$date;
				date = date.toString + " 까지";
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
							<div class="post_block_img_cont" onmousedown="post_view($(this))" style="background-image: url(${img})"></div>
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
			check_image(tag);
		}
	}
	// 로딩 모달 제거
	window.setTimeout(function() {
		$("#mobile_controller_none").addClass("display_none");
		$("#board_loading_modal").addClass("board_loading_modal_unvisible");
		$(".mobile_controller").removeAttr("style");
		$("#none_click").addClass("display_none");
	}, 200);
	// 로딩 제거
	let token = sessionStorage.getItem('sj-state');
	if (token == null || token == undefined || token == 'undefined') {} 
	else {
		let a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
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
			} else if (a_jax['status'].toString().startswith('4')) {
				Snackbar("올바르지 않은 접근입니다.");
				sessionStorage.removeItem('sj-state');
				localStorage.removeItem('sj-state');
			} else {
				Snackbar("통신이 원활하지 않습니다.");
			}
		});
	}
	$("#menu_container").removeClass("menu_container_fixed");
	//$("#menu_container").removeAttr("style");
	$("#posts_creating_loading").addClass("display_none");
	$("#board_container").removeClass("board_container_fixed");
}
	
/*{
"_id":<obi>,
"fav_cnt":<int>,
"date":<int>,
"title":<string>,
"url":<string>,
"img":<json_array:string>
}*/

/* 
0 : 좋아요, 뷰, 검색
1 : 좋아요
2 : 뷰
3 : 검색
*/
// 좋아요 게시물 보기
function click_user_like_posts() {
	menu_modal_onoff();
	location.replace("/board#userlike");
}
function get_user_like_posts() {
	out_of_search();
	window.scroll(0,0);
	$("#menu_container").addClass("menu_container_fixed");
	$("#posts_creating_loading").removeClass("display_none");
	$("#board_container").addClass("board_container_fixed");
	$("#posts_target").empty();
	now_topic = "관심 게시글";
	where_topic = "내 정보";
	now_state = now_topic;
	let now_creating_state = now_state;
	posts_update = 0;
	menu_modal_onoff();
	$("#board_info_text").empty();
	$("#board_info_text").text("관심 게시글");
	$("#board_info_board").empty();
	$("#board_info_board").text("내 정보");
	let a_jax = A_JAX("http://"+host_ip+"/get_specific_userinfo/"+1, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			let output = JSON.parse(json["user"]);
			if (output["fav_list"].length == 0) {
				$("#menu_container").addClass("menu_container_searching");
				$("#menu_container").removeAttr("style");
				let target = $("#posts_target");
				let imoticon = imoticons[Math.floor(Math.random() * imoticons.length)];
				//<img src="./static/image/none_posts.png" class="sr_none_posts_img">
				let no_posts_tag = `
					<div class="sr_none_posts_cont">
						<div class="sr_none_posts_img noselect">${imoticon}</div>
						<div class="sr_none_posts_text">관심있는 게시글이 없네요!</div>
					</div>`;
				if (now_creating_state == now_state)
					target.append(no_posts_tag);
				$("#posts_creating_loading").addClass('display_none');
				$("#board_container").removeClass("board_container_fixed");
				$("#menu_container").removeClass('menu_container_searching');
				$("#menu_container").removeClass('menu_container_fixed');
			} else {
				output = output["fav_list"].reverse();
				save_posts = output.slice(30);
				output = output.slice(0, 30);
				creating_post(output, now_creating_state, 0);
			}
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 최근 본 게시물 보기
function click_user_view_posts() {
	menu_modal_onoff();
	location.replace("/board#userview");
}
function get_user_view_posts() {
	out_of_search();
	window.scroll(0,0);
	$("#menu_container").addClass("menu_container_fixed");
	$("#posts_creating_loading").removeClass("display_none");
	$("#board_container").addClass("board_container_fixed");
	$("#posts_target").empty();
	now_topic = "최근 본 게시글";
	where_topic = "내 정보";
	now_state = now_topic;
	let now_creating_state = now_state;
	posts_update = 0;
	menu_modal_onoff();
	$("#board_info_text").empty();
	$("#board_info_text").text("최근 본 게시글");
	$("#board_info_board").empty();
	$("#board_info_board").text("내 정보");
	let a_jax = A_JAX("http://"+host_ip+"/get_specific_userinfo/"+2, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			let output = JSON.parse(json["user"]);
			if (output["view_list"].length == 0) {
				$("#menu_container").addClass("menu_container_searching");
				$("#menu_container").removeAttr("style");
				let target = $("#posts_target");
				//<img src="./static/image/none_posts.png" class="sr_none_posts_img">
				let imoticon = imoticons[Math.floor(Math.random() * imoticons.length)];
				let no_posts_tag = `
					<div class="sr_none_posts_cont">
						<div class="sr_none_posts_img noselect">${imoticon}</div>
						<div class="sr_none_posts_text">최근 본 글이 존재하지 않아요!</div>
					</div>`;
				if (now_creating_state == now_state)
					target.append(no_posts_tag);
				$("#posts_creating_loading").addClass('display_none');
				$("#board_container").removeClass("board_container_fixed");
				$("#menu_container").removeClass('menu_container_searching');
				$("#menu_container").removeClass('menu_container_fixed');
			} else {
				output = output["view_list"].reverse();
				save_posts = output.slice(30);
				output = output.slice(0, 30);
				creating_post(output, now_creating_state, 0);
			}
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}

function check_image(tag) {
	let onerror = `./static/image/shortcut_black_mobile.png`;
	if ($(tag).find("div.post_block_img_cont") == undefined) return false;
	if ($(tag).find("div.post_block_img_cont").css("background-image") == undefined) return false;
	let img_url = $(tag).find("div.post_block_img_cont").css("background-image").slice(5, -2);
	let checkimg = new Image();
	let p_id = $(tag).attr("p-id");
	checkimg.onerror = function() {
		$("#posts_target").find(`div[p-id=${p_id}]`).find("div.post_block_img_cont").css("background-image", `url(${onerror})`);
	}
	checkimg.onload = function() {
		// Image Loading Success
	}
	checkimg.src = img_url;
}