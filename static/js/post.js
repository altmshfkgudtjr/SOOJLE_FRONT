// 추천 뉴스피드 불러오기 함수
function get_recommend_posts() {
	let a_jax = A_JAX("http://"+host_ip+"/get_recommendation_newsfeed", "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			creating_post(json["newsfeed"]);
		} else {s
			Snackbar("다시 접속해주세요!");

		}
	});
}
// 인기 뉴스피드 불러오기 함수
function get_popularity_posts() {
	let a_jax = A_JAX("http://"+host_ip+"/get_popularity_newsfeed", "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			creating_post(json["newsfeed"]);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}
// 토픽별 뉴스피드 불러오기 함수
function get_topic_posts(tag) {
	let topic = tag.text();
	let a_jax = A_JAX("http://"+host_ip+"/get_topic_newsfeed/"+topic, "GET", null, null);
	$.when(a_jax).done(function () {
		let json = a_jax.responseJSON;
		if (json['result'] == 'success') {
			creating_post(json["newsfeed"]);
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
}


// 좋아요 버튼 함수
function post_like_button(tag) {
	let id = tag.attr("p-id");	// 다시 재지정해주기
	let is_like = tag.attr("ch");
	if (Number(is_like) == 0) {
		post_like(id);
	} else {
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
	$(".post_container").mousedown(function(e) {
		mouse_which = e.which; // 1:좌클릭, 2:휠클릭, 3:우클릭
	});
});
function post_view(tag) {
	let id = tag.attr("p-id");	// 다시 재지정해주기
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
}


// 게시글 제작 함수
function creating_post(posts) {
	for (let post_one of posts) {
		let id = post_one['id'];
		let view = post_one['view'];
		let fav_cnt = post_one['fav_cnt'];
		let title = post_one['title'];
		let url = post_one['url'];
		let img = post_one['img'];
		let tag = $(document.createElement('div'));
		/* tag 에다가 레이아웃 배치할 것 */
		console.log(post_one);
	}
}
/*{
"_id":<obi>,
"topic":<list>,
"tag":"<list>,
"view":<int>,
"fav_cnt":<int>,
"title":<string>,
"post":<string>,
"url":<string>,
"img":<json_array:string>
}*/