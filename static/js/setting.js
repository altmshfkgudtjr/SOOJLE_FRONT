// Setting Page 구성 함수
function Go_setting() {
	//window.scroll(0,0);
	$('body,html').animate({ scrollTop: 0, }, 0);
	$("#menu_container").removeClass("menu_container_fixed");
	$("#posts_creating_loading").addClass("display_none");
	let token = sessionStorage.getItem('sj-state');
	$("#posts_target").empty();
	$("#posts_target").append(`<div id="setting_box" class="setting_box"></div>`)
	$("#board_info_text").text("설정");
	$("#board_info_board").text("SOOJLE");
	insert_user_custom_setting();
	insert_user_information_setting();
	now_topic = "설정";
	where_topic = "SOOJLE";
	now_state = now_topic;
	if (token == null || token == undefined || token == 'undefined') {
	} else {
		a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
		$.when(a_jax).done(function () {
			if (a_jax.responseJSON['result'] == 'success') {
				let json = a_jax.responseJSON;
				if (json['auto_login'] == 1){
					$("#autologin_toggle").prop("checked", true);
				}
				else {
					localStorage.removeItem('sj-state');
					$("#autologin_toggle").prop("checked", false);
				}
			} else if (a_jax['status'].toString().startswith('4')) {
				sessionStorage.removeItem('sj-state');
				localStorage.removeItem('sj-state');
			} else {
				Snackbar("통신이 원활하지 않습니다.");
			}
		});
	}
	menu_modal_onoff();
}

// 사용자 맞춤 설정 관련
function insert_user_custom_setting() {
	let title_info_1 = "각 사용자에게 맞는 SOOJLE 서비스 환경설정";
	let st_1 = "자동로그인"
	let st_info_1 = "로그인을 자동화해 SOOJLE 서비스 이용을 간편하게 합니다.";
	let title_info_2 = "사용자 계정에 대한 정보 관리 및 설정";
	let st_2 = "계정삭제";
	let st_info_2 = "사용자의 정보를 SOOJLE 데이터베이스에서 완전 삭제합니다.";
	let st_3 = "전체화면";
	let st_info_3 = "전체화면을 통하여 보다 넓은 화면에서 SOOJLE을 사용합니다."

	let div = `	<div class="setting_subject_wrap">
					<div class="setting_title noselect">사용자 맞춤</div>
					<div class="setting_title_info noselect">${title_info_1}</div>
					<div>
						<div class="setting_subtitle noselect">${st_1}</div>
						<input type="checkbox" id="autologin_toggle" onchange="change_autologin_st()" name="autologin_toggle">
						<div class="setting_toggle">
							<label for="autologin_toggle"></label>
						</div>
						<div class="setting_subtitle_info noselect">${st_info_1}</div>
					</div>
					<div>
						<div class="setting_subtitle noselect">${st_3}</div>
						<input type="checkbox" id="fullscreen_toggle" onchange="change_fullscreen_st()" name="fullscreen_toggle">
						<div class="setting_toggle">
							<label for="fullscreen_toggle"></label>
						</div>
						<div class="setting_subtitle_info noselect">${st_info_3}</div>
					</div>
				</div>
				<div class="setting_subject_wrap">
					<div class="setting_title noselect">개인정보 설정</div>
					<div class="setting_title_info noselect">${title_info_2}</div>
					<div class="setting_subtitle noselect">${st_2}</div>
					<input type="checkbox" id="user_data_delete">
					<div class="setting_toggle">
						<label for="user_data_delete"></label>
					</div>
					<div class="setting_subtitle_info noselect">${st_info_2}</div>
				</div>
			`;
	$("#setting_box").append(div);
}

// 사용자 정보 설정 관련
function insert_user_information_setting() {

}


// 자동로그인 옵션화
function change_autologin_st(){
	if($("#autologin_toggle").is(":checked")) {
		localStorage.setItem("sj-state", sessionStorage.getItem('sj-state'));
		a_jax = A_JAX("http://"+host_ip+"/update_auto_login/" + 1, "GET", null, null);
	} else {
		localStorage.removeItem('sj-state');
		a_jax = A_JAX("http://"+host_ip+"/update_auto_login/" + 0, "GET", null, null);
	}
}

// 전체화면 옵션화
function change_fullscreen_st() {
	if($("#fullscreen_toggle").is(":checked")) {
		startFS();
	} else {
		exitFS();
	}
}
function startFS() {
	if(document.requestFullScreen) {
		document.requestFullScreen();
	} else if(document.webkitRequestFullScreen) {
		document.webkitRequestFullScreen();
	} else if(document.mozRequestFullScreen) {
		document.mozRequestFullScreen();
	} else if (document.msRequestFullscreen) {
		document.msRequestFullscreen();
	}
}
function exitFS() {
	if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}