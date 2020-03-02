// 공지사항 클릭
function Click_dvnote() {
	location.href = "/board#dvnote";
	menu_modal_onoff();
}
// 공지사항으로 이동
function Go_dvnote() {
	let url_target = window.location.href.split("#")[1];
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
	if (url_target.startsWith("dvnote?")) {
		let notice_id = url_target.split("dvnote?")[1];
		insert_notice_one(notice_id);
	} else {
		insert_notice();
	}
}
// 존재하지 않는 공지사항
function Fail_notice_postOne() {
	Snackbar("존재하지않는 게시글입니다.");
	insert_notice();
}
// 공지사항 단일 포스트 반환 API
function Get_notice_postOne(id, callback) {
	a_jax = A_JAX("http://"+host_ip+"/get_notice/"+id, "GET", null, null);
	$.when(a_jax).done(function () {
		if (a_jax.responseJSON['result'] == 'success') {
			output =  JSON.parse(a_jax.responseJSON['notice']);
			// 콜백함수, 인자로 User Information을 넣어준다.
			if (output == null) {
				Fail_notice_postOne();
			}
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
	}).catch(function() {
		Fail_notice_postOne();
	});
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
// 공지사항 Components 구성
function insert_notice() {
	let target = $("#posts_target");
	//No_posts($("#posts_target"));	// 임시파일
	Get_notice_posts(function(result) {
		if (result) {
			let oid, title, phara, date, tag, activation = 0, activation_tag = ``;
			result = JSON.parse(result['notice_list']);
			for (let post of result) {
				oid = post['_id']['$oid'];
				title = post['title'];
				phara = post['post'];
				date = change_date_realative(post['date']['$date']);
				activation = post['activation'];
				if (activation == 1) {
					activation_tag = `<span class="notice_post_activation noselect">[활성화] </span>`;
				}
				tag =	`
							<div class="notice_post_container pointer" data-id=${oid} onclick="Click_post($(this))">
								<div class="notice_post_title_cont">
									<div class="notice_post_icon"></div>
									<div class="notice_post_title">${activation_tag} ${title}</div>
								</div>
								<div class="notice_post_date"><i class="far fa-clock"></i> ${date}</div>
								<div class="notice_post_post">${phara}</div>
							</div>
						`;
				target.append(tag);
			}
		} else {
			// 에러 난 경우
			No_posts($("#posts_target"));
		}
		$("#mobile_controller_none").addClass("display_none");
		$("#board_loading_modal").addClass("board_loading_modal_unvisible");
		$(".mobile_controller").removeAttr("style");
		$("#none_click").addClass("display_none");

		$("#menu_container").removeClass("menu_container_fixed");
		$("#posts_creating_loading").addClass("display_none");
		$("#board_container").removeClass("board_container_fixed");
	});
}

// 공지사항 포스트 클릭
function Click_post(tag) {
	let target = tag.attr('data-id');
	location.href = "/board#dvnote?"+target;
}
// 공지사항 목록보기
function Notice_menu_btn() {
	location.href = "/board#dvnote";
}

// 단일 공지사항 표시
function insert_notice_one(id) {
	let target = $("#posts_target");
	target.empty();
	Get_notice_postOne(id, function(result) {
		if (result) {
			let oid, title, phara, date, view, tag, activation = 0, activation_tag = ``;
			oid = result['_id']['$oid'];
			title = result['title'];
			phara = result['post'];
			view = result['view'];
			date = change_date_absolute(result['date']['$date']);
			activation = result['activation'];
			if (activation == 1) {
				activation_tag = `<span class="notice_post_activation noselect">[활성화] </span>`;
			}
			tag =	`
						<div class="notice_page_container" data-id=${oid}>
							<div class="notice_page_upper_cont">
								<div class="notice_page_icon"></div>
								<div class="notice_page_title_cont">
									<div class="notice_page_title">${activation_tag} ${title}</div>
									<div class="notice_page_date"><i class="far fa-clock"></i> ${date} 작성됨</div>
								</div>
							</div>
							<div class="notice_page_view noselect">
							VIEW ${view}</div>
							<div class="notice_page_post"><span style="font-weight:bold; font-size:22px;">${title}</span>

${phara}</div>
							<div class="notice_menu_btn pointer" onclick="Notice_menu_btn()"><i class="fas fa-bars"></i> 목록보기</div>
						</div>
					`;
			target.append(tag);
		} else {
			No_posts($("#posts_target"));
		}
		$("#mobile_controller_none").addClass("display_none");
		$("#board_loading_modal").addClass("board_loading_modal_unvisible");
		$(".mobile_controller").removeAttr("style");
		$("#none_click").addClass("display_none");

		$("#menu_container").removeClass("menu_container_fixed");
		$("#posts_creating_loading").addClass("display_none");
		$("#board_container").removeClass("board_container_fixed");
	});
}

