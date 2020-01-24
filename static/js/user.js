let modal_target = $("#user_agreement_modal");
let agreement_open = 0;
let agreement;
function first_login(data) {
	if (agreement_open == 0) {
		agreement_open = !agreement_open;
		$("body").css({"overflow": "hidden"});
		$("#user_agreement_modal").removeClass("display_none");
		$("#user_agreement_modal").addClass("fadeInUp animated");
		$("#license_block").append(privacy_1);
		agreement = data;
	} else {
		agreement_open = !agreement_open;
		$("body").removeAttr("style");
		$("#user_agreement_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#user_agreement_modal").removeClass("fadeOutDown animated");
			$("#user_agreement_modal").addClass("display_none");
			$("#license_block").empty();
		}, 400);
		agreement = undefined;
	}
}

$("#privacy_ok_btn").on({
	"click": function() {
		Snackbar("맞춤 서비스를 시작합니다.");
		// ajax 보내기 동의한다는
		localStorage.setItem("sj-state", sessionStorage.getItem('sj-state'));
		After_login(agreement);
		first_login();
	}
})
$("#privacy_no_btn").on({
	"click": function() {
		Snackbar("맞춤 서비스를 중단합니다.");
		first_login();
		// ajax 보내기 동의하지않는다는
	}
})