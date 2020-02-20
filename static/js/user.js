let modal_target = $("#user_agreement_modal");
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


// 회원가입=========================================================================
let SignUp_open = false;
function Sign_Up() {		// 회원가입 완료 버튼
	let id;
	let pw;
	let nickname;
}

function Sign_Up_Cancel() {	// 회원가입 취소 버튼
	// 쓴거 다 비우고
	Sign_Up_Modal_Onoff();
}

function Sign_Up_Modal_Onoff() {
	if (SignUp_open == false) {	// Now : Close
		menu_modal_onoff();
		SignUp_open = !SignUp_open;
		$("body").css({"overflow": "hidden"});
		$("#signup_modal").removeClass("display_none");
		$("#signup_modal").addClass("fadeInUp animated");
			setTimeout(function() {
				$("#signup_modal").removeClass("fadeInUp animated");
			}, 400);
	} else {					// Now : Open
		SignUp_open = !SignUp_open;
		$("body").removeAttr("style");
		$("#signup_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#signup_modal").removeClass("fadeOutDown animated");
			$("#signup_modal").addClass("display_none");
		}, 400);
	}
}


// 회원정보찾기=====================================================================
function Find_ID() {
	login_modal_onoff();	// Off Login Modal
}

function Find_PW() {
	login_modal_onoff();	// Off Login Modal
}