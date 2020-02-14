let modal_target = $("#user_agreement_modal");
let agreement_open = 0;
let agreement = undefined;
function first_login(data) {
	if (agreement_open == 0) {
		agreement_open = !agreement_open;
		$("body").css({"overflow": "hidden"});
		$("#user_agreement_modal").removeClass("display_none");
		$("#user_agreement_modal").addClass("fadeInUp animated");
		$("#license_block").append(privacy_1);
		agreement = data['access_token'];
	} else {
		agreement_open = !agreement_open;
		$("body").removeAttr("style");
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
		// 보내기 동의한다는 AJAX 날리기
		sessionStorage.setItem('sj-state', agreement);
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
		first_login();
	}
})
$("#privacy_no_btn").on({
	"click": function() {
		agreement = undefined;
		Snackbar("맞춤 서비스를 중단합니다.");
		first_login();
		// 보내기 동의하지않는다는 AJAX 날리기
	}
})