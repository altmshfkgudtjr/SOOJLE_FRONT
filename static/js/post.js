let now_w = $(document).width();
$(window).resize(function() {
	let w = $(document).width();
});
let save_posts;
let posts_update = 1;
var now_topic;
var where_topic;

// 추천 뉴스피드 불러오기 함수
function get_recommend_posts() {
	$("#posts_target").empty();
	now_topic = "추천";
	where_topic = "뉴스피드";
	posts_update = 0;
	menu_modal_onoff(2);
	$("#board_info_text").empty();
	$("#board_info_text").text("SOOJLE의 추천");
	$("#board_info_board").empty();
	$("#board_info_board").text("뉴스피드");
	let a_jax = A_JAX("http://"+host_ip+"/get_recommendation_newsfeed", "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			let output = JSON.parse(json["newsfeed"]);
			save_posts = output.slice(50);
			output = output.slice(0, 50);
			creating_post(output);
			// Modal Remove
			$("body").removeAttr("style");
			$("#board_loading_modal").addClass("board_loading_modal_unvisible");
			window.setTimeout(function() {
				$(".mobile_controller").removeAttr("style");
				$("#none_click").addClass("display_none");
			}, 200);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 인기 뉴스피드 불러오기 함수
function get_popularity_posts() {
	$("#posts_target").empty();
	now_topic = "인기";
	where_topic = "뉴스피드";
	posts_update = 0;
	menu_modal_onoff();
	$("#board_info_text").empty();
	$("#board_info_text").text("인기");
	$("#board_info_board").empty();
	$("#board_info_board").text("뉴스피드");
	let a_jax = A_JAX("http://"+host_ip+"/get_popularity_newsfeed", "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON.parse();
		if (json['result'] == 'success') {
			let output = JSON.parse(json["newsfeed"]);
			save_posts = output.slice(50);
			output = output.slice(0, 50);
			creating_post(output);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 토픽별 뉴스피드 불러오기 함수
function get_topic_posts(tag) {
	$("#posts_target").empty();
	where_topic = "뉴스피드";
	posts_update = 0;
	menu_modal_onoff();
	let topic;
	if (typeof(tag) == String) topic = tag;
	else topic = tag.children('div').text();
	now_topic = topic;
	$("#board_info_text").empty();
	$("#board_info_text").text(topic);
	$("#board_info_board").empty();
	$("#board_info_board").text("뉴스피드");
	let a_jax = A_JAX("http://"+host_ip+"/get_newsfeed_of_topic/"+topic, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			let output = JSON.parse(json["newsfeed"]);
			save_posts = output.slice(50);
			output = output.slice(0, 50);
			creating_post(output);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
$(document).scroll(function() {
	if (where_topic == "뉴스피드"){
		if ($(this)[0].scrollHeight - Math.round($(this).scrollTop()) == $(this).outerHeight())
			get_posts_more();
	}
});
// 포스트 더보기
function get_posts_more() {
	let output = save_posts.slice(0,50);
	save_posts = save_posts.slice(50);
	creating_post(output);
}


// 포스트 메뉴 열기
function post_menu_open(tag) {
	let id = tag.parent('div').parent('div').attr("p-id");
	$("body").css("overflow", "hidden");
	$("#post_menu_modal_container").attr("p-id", id);
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
function post_url_copy() {

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
		post_like_animation(tag);
		post_like(id);
	} else {
		tag.attr("ch", "0");
		tag.removeAttr("style");
		post_dislike(id);
	}
}
// 좋아요 실행 함수
function post_like(id) {
	let token = localStorage.getItem('sj-state');
	if (token == null){
		Snackbar("로그인이 필요합니다.");
		return;
	}
	let a_jax = A_JAX("http://"+host_ip+"/post_like/"+id, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			tag.attr("ch", "1");
			tag.css("color", "#f00730");
			console.log(id, "  좋아요!");
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
function post_dislike(id) {
	let token = localStorage.getItem('sj-state');
	if (token == null){
		Snackbar("로그인이 필요합니다.");
		return;
	}
	let a_jax = A_JAX("http://"+host_ip+"/post_unlike/"+id, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			/* 토픽별 뉴스피드 불러오기 성공 */
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
	// 위의 document ready 함수의 속도를 위해서 지연시간 400 설정
	setTimeout(function() {
		if (mouse_which == 3) return;
		let id = tag.parent('div').attr("p-id");
		let e = mouse_which;
		if (e == 1 || e == 2) {
			let a_jax = A_JAX("http://"+host_ip+"/post_view/"+id, "GET", null, null);
			$.when(a_jax).done(function () {
				let json = a_jax.responseJSON;
				if (json['result'] == 'success') {
					/* 토픽별 뉴스피드 불러오기 성공 */
				} else if (json['result'] == 'fail') {
					Snackbar("포스트 조회수 안 올라감."); // 지울 것
				} else {
					Snackbar("포스트 조회수 안 올라감. 다른 이유") // 지울 것
				}
			});
		}
	}, 400);
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
    return yyyy + "." + (MM[1] ? MM : '0'+ MM[0]) + "." + (dd[1] ? dd : '0'+ dd[0]) + " " +
    		(HH[1] ? HH : '0'+ HH[0]) + ":" + (mm[1] ? mm : '0'+mm[0]) + ":" + (ss[1] ? ss : '0'+ss[0]);
}
// 게시글 제작 함수
function creating_post(posts) {
	$("#posts_creating_loading").removeClass("display_none");
	let target = $("#posts_target");
	let w = $(document).width();
	// 속도향상을 위한 선언
	let id, fav_cnt, title, date, url, domain, img, tag, post_one;
	if (w < 1200) {
		for (post_one of posts) {
			id = post_one["_id"].$oid;		
			fav_cnt = post_one['fav_cnt'];
			title = post_one['title'];
			date = post_one['date'].$date;
			date = new Date(date).SetTime(); 
			url = post_one['url'];
			domain = url.split('/');
			domain = domain[0] + '//' + domain[2];
			img = post_one['img'];
			/* tag 에다가 레이아웃 배치할 것 */
			if (img.length < 10 || img.length == undefined) {
					tag = `<div class="post_block" p-id="${id}">
							<a href="${url}">
								<div class="post_title_cont_noimg pointer" onmousedown="post_view($(this))">
									<div class="post_title">${title}</div>
								</div>
							</a>
							<a href="${url}">
								<div class="post_block_cont_noimg pointer" onmousedown="post_view($(this))">
									<div class="post_url">${domain}</div>
									<div class="post_date">${date}</div>
								</div>
							</a>
							<div class="post_block_set_cont_noimg noselect">
								<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
								<div class="post_like_cnt">${fav_cnt}</div>
							</div>
							<div class="post_menu noselect" onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
						</div>`
			} else {
					tag = `<div class="post_block" p-id="${id}">
							<a href="${url}">
								<div class="post_title_cont pointer" onmousedown="post_view($(this))">
									<div class="post_title">${title}</div>
								</div>
							</a>
							<a href="${url}">
								<div class="post_block_img_cont" onmousedown="post_view($(this)" style="background-image: url(${img})"></div>
							</a>
							<a href="${url}">
								<div class="post_block_cont pointer" onmousedown="post_view($(this))">
									<div class="post_url">${domain}</div>
									<div class="post_date">${date}</div>
								</div>
							</a>
							<div class="post_block_set_cont noselect">
								<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
								<div class="post_like_cnt">${fav_cnt}</div>
							</div>
							<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
						</div>`
			}
			target.append($(tag));
		}
	} else {
		for (post_one of posts) {
			id = post_one["_id"].$oid;		
			fav_cnt = post_one['fav_cnt'];
			title = post_one['title'];
			date = post_one['date'].$date;
			date = new Date(date).SetTime(); 
			url = post_one['url'];
			domain = url.split('/');
			domain = domain[0] + '//' + domain[2];
			img = post_one['img'];
			if (img.length < 10 || img.length == undefined) {
				tag = `<div class="post_block" p-id="${id}">
						<a href="${url}">
							<div class="post_title_cont_noimg pointer" onmousedown="post_view($(this))">
								<div class="post_title">${title}</div>
							</div>
						</a>
						<a href="${url}">
							<div class="post_block_cont_noimg pointer" onmousedown="post_view($(this))">
								<div class="post_url">${domain}</div>
								<div class="post_date">${date}</div>
							</div>
						</a>
						<div class="post_block_set_cont_noimg noselect">
							<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
							<div class="post_like_cnt">${fav_cnt}</div>
						</div>
						<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
					</div>`
			} else {
				tag = `<div class="post_block" p-id="${id}">
						<a href="${url}">
							<div class="post_block_img_cont" onmousedown="post_view($(this)" style="background-image: url(${img})"></div>
						</a>
						<a href="${url}">
							<div class="post_title_cont pointer" onmousedown="post_view($(this))">
								<div class="post_title">${title}</div>
							</div>
						</a>
						<a href="${url}">
							<div class="post_block_cont pointer" onmousedown="post_view($(this))">
								<div class="post_url">${domain}</div>
								<div class="post_date">${date}</div>
							</div>
						</a>
						<div class="post_block_set_cont noselect">
							<div class="post_like" ch="0" onclick="post_like_button($(this))"><i class="far fa-heart"></i></div>
							<div class="post_like_cnt">${fav_cnt}</div>
						</div>
						<div class="post_menu " onclick="post_menu_open($(this))"><i class="fas fa-ellipsis-h"></i></div>
					</div>`
			}
			target.append($(tag));
		}
	}
	// 로딩 제거
	$("#posts_creating_loading").addClass("display_none");
}
	
/*{
"_id":<obi>,
"topic":<list>,
"tag":"<list>,
"fav_cnt":<int>,
"date":<int>,
"title":<string>,
"post":<string>,
"url":<string>,
"img":<json_array:string>
}*/