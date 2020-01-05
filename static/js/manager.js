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

function insert_management() {
	let div = 	`<div class="setting_subject_wrap">
					<div class="setting_title noselect">관리자 도구</div>
					<div class="setting_title_info noselect">
						SOOJLE 관리자님, 관리자 모드에 오신 것을 환영합니다.
					</div>
				</div>
				<div class="setting_subtitle noselect">블랙리스트</div>
				<div class="setting_subtitle_info">SOOJLE 이용자의 학번 또는 IP를 블랙합니다.</div>
				`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
}
