// 관리자 Check
function check_manager_qualification() {
	let lst = sessionStorage.getItem('sj-state');
	$.when(
		A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null)
	).done(function(data) {
		if (data["result"] == 'success') {
			if ("user_admin" in data 
				|| data['user_id'] == '16011075'
				|| data['user_id'] == '16011089'
				|| data['user_id'] == '16011092') {
				let menu =	`<div class="menu_container_button pointer" onclick="Go_management()">
								<img src="/static/image/shortcut_mobile.png" class="menu_container_button_icon noselect">
								<div class="menu_container_button_text noselect">관리자 도구</div>
							</div>`;
				$("#sm_target").before(menu);
			}
		} 
	});
}
// 관리자 도구 이동
function Go_management() {
	location.replace("/board#soojle");
	out_of_search();
	now_topic = "Admin";
	where_topic = "Admin";
	now_state = "Admin";
	$("#board_info_board").text("SOOJLE");
	$("#board_info_text").text("관리자 도구");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);
	menu_modal_onoff();
	insert_management();
}
// 동적 생성
function insert_management() {
	let div = 	`<div class="setting_subject_wrap">
					<div class="setting_title noselect">관리자 도구</div>
					<div class="setting_title_info noselect">
						이 곳은 SOOJLE 서비스의 관리를 담당하는 곳입니다.
					</div>
				</div>
				<div class="setting_subtitle noselect">블랙리스트</div>
				<div class="setting_subtitle_info noselect">SOOJLE 이용자의 학번 또는 IP를 블랙합니다.</div>
				<div id="setting_blacklist_wrapper" class="setting_blacklist_wrapper"></div>
				<div class="setting_subtitle noselect">게시글 작성</div>
				<div class="setting_subtitle_info noselect">공지사항 및 일반 게시글을 작성합니다.</div>
				<div id="setting_writing_post_wrapper" class="setting_writing_post_wrapper"></div>
				`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
	insert_blacklist_div();
	insert_wrting_div();
}
// 블랙리스트 Div 생성
function insert_blacklist_div() {
	let target = $("#setting_blacklist_wrapper");
	let div =	`<input type="text" id="setting_blacklist_input" class="setting_blacklist_input" autocomplete="off" placeholder="입력">\
				<div class="setting_blacklist_btn_ok pointer" onclick="write_blacklist();">추가</div>
				<div class="setting_blacklist_btn_cancel pointer" onclick="cancel_blacklist();">삭제</div>
				<div class="setting_blacklist_box">
					<div id="setting_blacklist_black_box" class="setting_blacklist_black_box"></div>
				</div>
				`;
	target.append(div);
	set_blacklist();
}
function set_blacklist() {
	let user =	`<div class="setting_blacklist_user pointer" onclick="click_blacklist(this)">16011075</div>
	<div class="setting_blacklist_user pointer" onclick="click_blacklist(this)">16011089</div>
	<div class="setting_blacklist_user pointer" onclick="click_blacklist(this)">16011092</div>`;
	$("#setting_blacklist_black_box").append(user);
}
function click_blacklist(tag) {
	let text = $(tag).text().trim();
	$("#setting_blacklist_input").val(text);
}
// 블랙리스트 추가 API
function write_blacklist() {
	let target = $("#setting_blacklist_input").val();
	if (target == "") {
		Snackbar("대상을 입력해주세요.");
		$("#setting_blacklist_input").focus();
		return;
	}

}
// 블랙리스트 취소 API
function cancel_blacklist() {
	let target = $("#setting_blacklist_input").val();
	if (target == "") {
		Snackbar("대상을 입력해주세요.");
		$("#setting_blacklist_input").focus();
		return;
	}

}

// 게시글 작성 Div 생성
function insert_wrting_div() {
	let pharagh_placeholder = 
`\
내용을 입력해주세요.

만약 공지사항으로 올리고 싶으면 아래 공지사항 버튼을 클릭해주세요.
게시글을 올릴 시, 다음 규칙을 확인하고 올려주세요.

[게시글 작성 유의사항]
1. 욕설, 비하, 음란물, 개인정보가 포함된 게시물 게시.
2. 특정인이나 단체/지역을 비방하는 행위.
3. 기타 현행법에 어긋나는 행위.
`;
	let target = $("#setting_writing_post_wrapper");
	let div =	`<input type="text" id="setting_writing_post_title" class="setting_writing_post_title" placeholder="제목을 입력해주세요.">
				<textarea id="setting_writing_post_pharagh" class="setting_writing_post_pharagh" placeholder="${pharagh_placeholder}"></textarea>
				<input type="checkbox" id="post_notice_checkbox" name="post_notice_checkbox">
				<div class="setting_toggle">
					<label for="post_notice_checkbox"></label>
				</div>
				<div class="setting_writing_post_checkbox_info noselect">공지사항</div>
				<div class="setting_writing_post_btn_ok pointer" onclick="writing_post_admin()">작성하기</div>
				`;
	target.append(div);
}
function writing_post_admin() {
	let title = $("#setting_writing_post_title").val();
	if (title == "") {
		Snackbar("제목을 입력해주세요.");
		$("#setting_writing_post_title").focus();
		return;
	}
	let pharagh = $("#setting_writing_post_pharagh").val();
	if (title == "") {
		Snackbar("내용을 입력해주세요.");
		$("#setting_writing_post_pharagh").focus();
		return;
	}
	let notice = 0;
	if($("#post_notice_checkbox").is(":checked")) notice = 1;
	else notice = 0;
	let send_data = {
						"title": title, 
						"post": pharagh,
						"notice": notice
					};
	// 여기 에이작스
}