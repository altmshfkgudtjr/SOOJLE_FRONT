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
						SOOJLE 관리자님, 관리자 모드에 오신 것을 환영합니다.
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
}
// 블랙리스트 Div 생성
function insert_blacklist_div() {
	let target = $("#setting_blacklist_wrapper");
	let div =	`<input type="text" id="setting_blacklist_input" class="setting_blacklist_input" autocomplete="off">
				`;
}
// 게시글 작성 Div 생성
function insert_wrting_div() {
	let target = $("#setting_writing_post_wrapper");

}