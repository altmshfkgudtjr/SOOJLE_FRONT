const ABORT_ID = ['admin', '관리자', 'soojle', '수즐'];
let agreement_open = 0;



function agreement() {
	if (agreement_open == 0) {
		agreement_open = !agreement_open;
		$("body").css({"overflow": "hidden"});
		$("#user_agreement_modal").removeClass("display_none");
		$("#user_agreement_modal").addClass("fadeInUp animated");
		$("#license_block").append(privacy_1);
	} else {
		agreement_open = !agreement_open;
		//$("body").removeAttr("style");
		$("#user_agreement_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#user_agreement_modal").removeClass("fadeOutDown animated");
			$("#user_agreement_modal").addClass("display_none");
			$("#license_block").empty();
		}, 400);
	}
}

$("#privacy_ok_btn").on({
	"click": function() {
		Snackbar("맞춤 서비스를 시작합니다.");
		Sign_Up_Cancel();	// 회원가입 창 닫기
		// 보내기 동의한다는 AJAX 날리기
		a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
		$.when(a_jax).done(function () {
			if (a_jax.responseJSON['result'] == 'success') {
				login_modal_onoff();
				$("#user_id").val("");
				$("#user_pw").val("");
				if (a_jax.responseJSON['auto_login'] == 1)
					localStorage.setItem("sj-state", sessionStorage.getItem('sj-state'));
				After_login(a_jax.responseJSON);
			} else if (a_jax.responseJSON['result'] == 'not found') {
				Snackbar("비정상적인 접근입니다.");
				localStorage.removeItem('sj-state');
				sessionStorage.removeItem('sj-state');
			} else if (a_jax['status'].toString().startsWith('4')) {
				Snackbar("올바르지 않은 접근입니다.");
				sessionStorage.removeItem('sj-state');
				localStorage.removeItem('sj-state');
			} else {
				Snackbar("통신이 원활하지 않습니다.");
			}
		});
		agreement();	// 개인정보처리방침 동의모달 닫기
	}
});
$("#privacy_no_btn").on({
	"click": function() {
		agreement();	// 개인정보처리방침 동의모달 닫기
	}
});

// 입력 폼 Animation==============================================================
$(document).ready(function(){
	let formInputs = $('#user_id,#user_pw,#signup_id,#signup_nickname,#signup_pw,#signup_pw_check');
	formInputs.focus(function() {
       $(this).parent().children('p.formLabel').addClass('formTop');
	});
	formInputs.focusout(function() {
		if ($.trim($(this).val()).length == 0){
			$(this).parent().children('p.formLabel').removeClass('formTop');
		}
	});
	$('p.formLabel').click(function(){
		 $(this).parent().children('.login_input').focus();
	});
});

// 로그인/회원가입 선택=============================================================
$("#select_login_form").on({	// 로그인 폼 선택 
	"click": function() {
		$("#select_signup_form").removeClass("login_title_select");
		$("#select_login_form").addClass("login_title_select");
		$("#LoginTab").removeClass("display_none");
		$("#SignUpTab").addClass("display_none");
		$("#user_id").focus();
	}
});
$("#select_signup_form").on({	// 회원가입 폼 선택
	"click": function() {
		$("#select_login_form").removeClass("login_title_select");
		$("#select_signup_form").addClass("login_title_select");
		$("#SignUpTab").removeClass("display_none");
		$("#LoginTab").addClass("display_none");
		$("#signup_id").focus();
	}
});
function Login_open() {
	$("#LoginTab").removeClass("display_none");
	$("#SignUpTab").addClass("display_none");
	$("#select_login_form").addClass("login_title_select");
	$("#select_signup_form").removeClass("login_title_select");
	login_modal_onoff(function() {
		$("#user_id").focus();
	});
}
function SignUp_open() {
	$("#LoginTab").addClass("display_none");
	$("#SignUpTab").removeClass("display_none");
	$("#select_login_form").removeClass("login_title_select");
	$("#select_signup_form").addClass("login_title_select");
	login_modal_onoff(function() {
		$("#signup_id").focus();
	});
}


// 회원가입=========================================================================
function SignUp_blank_Check() {					// 회원가입란 공백 검사
	if ($("#signup_id").val() == '') {
		Snackbar("아이디를 입력해주세요.");
		$("#signup_id").focus();
		return false;
	} else if ($("#signup_nickname").val() == '') {
		Snackbar("닉네임을 입력해주세요.");
		$("#signup_nickname").focus();
		return false;
	} else if ($("#signup_pw").val() == '') {
		Snackbar("비밀번호를 입력해주세요.");
		$("#signup_pw").focus();
		return false;
	} else if ($("#signup_pw_check").val() == '') {
		Snackbar("비밀번호를 다시 입력해주세요.");
		$("#signup_pw_check").focus();
		return false;
	}
	return true;
}
function SignUp_id_Check(tag) {					// 회원가입 ID 검사
	// ID 길이는 6~30자 사이
	if ($(tag).val().length >= 6
	 && $(tag).val().length <= 30
	 && ABORT_ID.indexOf($(tag).val().toLowerCase()) == -1) {
		$(tag).css("border", "2px solid #22bf06");
		$($(tag).next()[0]).css("color", "#22bf06");
		return true;
	} else {
		$(tag).removeAttr("style");
		$($(tag).next()[0]).removeAttr("style");
	}
	return false;
}
function SignUp_nickname_Check(tag) {			// 회원가입 닉네임 검사
	if ($(tag).val().length >= 2
	 && $(tag).val().length <= 30
	 && ABORT_ID.indexOf($(tag).val().toLowerCase()) == -1) {
		$(tag).css("border", "2px solid #22bf06");
		$($(tag).next()[0]).css("color", "#22bf06");
		return true;
	} else {
		$(tag).removeAttr("style");
		$($(tag).next()[0]).removeAttr("style");
	}
	return false;
}
function SignUp_pw_Check(tag) {					// 회원가입 PW 검사
	let check_num = 0;
	// 공백 확인
	if($(tag).val().search(/\s/) != -1) {
		$(tag).removeAttr("style");
		$($(tag).next()[0]).removeAttr("style");
		return false;
	}
	// 최소 8자리 확인
	if ($(tag).val().length >= 8) {
		check_num += 1;
		$("#pwleast").css("color", "#22bf06");
	} else {
		$("#pwleast").removeAttr("style");
	}
	// 문자와 숫자포함 확인
	let pw_guideline = /(?=.*\d)(?=.*[a-z])/;
	if (pw_guideline.test($(tag).val().toLowerCase())) {
		check_num += 1;
		$("#pwletternum").css("color", "#22bf06");
	} else {
		$("#pwletternum").removeAttr("style");
	}
	// 특수기호 포함 확인
	pw_guideline = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
	if (pw_guideline.test($(tag).val().toLowerCase())) {
		check_num += 1;
		$("#pwsymbol").css("color", "#22bf06");
	} else {
		$("#pwsymbol").removeAttr("style");
	}
	// 모든 조건 포함
	if (check_num == 3) {
		$(tag).css("border", "2px solid #22bf06");
		$($(tag).next()[0]).css("color", "#22bf06");
		return true;
	} else {
		$(tag).removeAttr("style");
		$($(tag).next()[0]).removeAttr("style");
	}
	return false;
}
function SignUp_pw_same_Check(pw_tag, tag) {	// 회원가입 PW 재확인 검사
	let pw_before = $(pw_tag).val();
	if ($(tag).val() === pw_before && $(tag).val() != '') {
		$(tag).css("border", "2px solid #22bf06");
		$($(tag).next()[0]).css("color", "#22bf06");
		return true;
	} else {
		$(tag).removeAttr("style");
		$($(tag).next()[0]).removeAttr("style");
	}
	return false;
}

function Key_Signup() {		// 회원가입 키 입력
	if (window.event.keyCode == 13) {
		if (!SignUp_blank_Check()) Sign_Up();
	} else {
		let now_tag = window.event.target;
		if (now_tag.id == "signup_id") {
			SignUp_id_Check(now_tag);
		} else if (now_tag.id == "signup_nickname") {
			SignUp_nickname_Check(now_tag);
		} else if (now_tag.id == "signup_pw") {
			SignUp_pw_Check(now_tag);
		} else if (now_tag.id == "signup_pw_check") {
			SignUp_pw_same_Check(document.querySelector('#signup_pw'), now_tag);
		}
	}
}
function Sign_Up() {		// 회원가입 완료 버튼
	if (!SignUp_blank_Check()) return;	// 빈 칸 확인
	if (!SignUp_id_Check(document.querySelector('#signup_id'))) {
		Snackbar("아이디를 다시 입력해주세요.");
		$("#signup_id").focus();
		return;
	}
	if (!SignUp_nickname_Check(document.querySelector('#signup_nickname'))) {
		Snackbar("닉네임을 다시 입력해주세요.");
		$("#signup_nickname").focus();
		return;
	}
	if (!SignUp_pw_Check(document.querySelector('#signup_pw'))) {
		Snackbar("비밀번호를 다시 입력해주세요.");
		$("#signup_pw").focus();
		return;
	}
	if (!SignUp_pw_same_Check(document.querySelector('#signup_pw'), document.querySelector('#signup_pw_check'))) {
		Snackbar("동일한 비밀번호를 입력해주세요.");
		$("#signup_pw_check").focus();
		return;
	}
	let sendData = {};
	sendData['id'] = $("#signup_id").val();
	sendData['nickname'] = $("#signup_nickname").val();
	sendData['pw'] = $("#signup_pw").val();
	return;	// 임시 Code
	$.when(A_JAX("http://"+host_ip+"/<회원가입 API>", "GET", null, null)).done(function () {
		if (a_jax.responseJSON['result'] == 'success') {
			let token = a_jax.responseJSON['access-token'];
			sessionStorage.setItem('sj-state', token);
			localStorage.setItem('sj-state', token);
			login_modal_onoff();
		} else {
			Snackbar("서버와의 통신에 실패하였습니다.");
			return;
		}
	});
}



// 회원정보찾기=====================================================================
function Find_ID() {
	login_modal_onoff();	// Off Login Modal
}

function Find_PW() {
	login_modal_onoff();	// Off Login Modal
}