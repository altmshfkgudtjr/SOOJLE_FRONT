// 공지사항으로 이동
function Go_dvnote() {
	location.href = "/board#dvnote";
	out_of_search();
	now_topic = "개발자노트";
	where_topic = "개발자노트";
	now_state = "개발자노트";
	$("#board_info_board").text("SOOJLE");
	$("#board_info_text").text("개발자노트");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);
	menu_modal_onoff();
	insert_notice();
}
// 공지사항 포스트 요청 API
function Get_notice_posts(callback) {
	a_jax = A_JAX("http://"+host_ip+"/get_all_notice", "GET", null, null);
	$.when(a_jax).done(function () {
		if (a_jax.responseJSON['result'] == 'success') {
			output = a_jax.responseJSON;
			// 콜백함수, 인자로 User Information을 넣어준다.
			if (typeof(callback) == 'function') {
				callback(output);
			}
		} else if (a_jax['status'].toString().startsWith('4')) {
			Snackbar("통신이 원활하지 않습니다.");
			return false;
		} else {
			Snackbar("통신이 원활하지 않습니다.");
			return false;
		}
	});
}
// 공지사항 Component 구성
function insert_notice() {
	let target = $("#posts_target");
	No_posts($("#posts_target"));	// 임시파일
	return;
	Get_notice_posts(function(result) {
		if (result) {
			let oid, title, phara, date, tag;
			result = JSON.parse(result['notice_list']);
			for (let post of result) {
				oid = post['_id']['$oid'];
				title = post['title'];
				phara = post['post'];
				date = change_date_realative(post['date']['$date']);
				tag =	`
							<div class="notice_post_container">
								
							</div>
						`;
				target.append(tag);
			}
			$("#mobile_controller_none").addClass("display_none");
			$("#board_loading_modal").addClass("board_loading_modal_unvisible");
			$(".mobile_controller").removeAttr("style");
			$("#none_click").addClass("display_none");

			$("#menu_container").removeClass("menu_container_fixed");
			$("#posts_creating_loading").addClass("display_none");
			$("#board_container").removeClass("board_container_fixed");
		} else {
			// 에러 난 경우
			No_posts($("#posts_target"));
		}
	});
}