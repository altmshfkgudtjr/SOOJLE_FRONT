// Greetings Array
let greetings = ["반갑습니다!", "환영합니다!", "좋은 하루입니다.", "세종대학교."];
// Loading Modal
let is_loading = 1;
window.onkeydown = function(e) { 
  if (is_loading == 1)
 	return !(e.keyCode == 32);
};
window.setTimeout(function() {
	is_loading = 0;
}, 1000);
let filter = "win16|win32|win64|mac|macintel";
/*
// 좋아요 마우스 hover
if (filter.indexOf(navigator.platform.toLowerCase()) < 0) { // mobile
	
} else { // pc
	
}*/

function Goboard() {
	window.location.href = "/board";
}
// 초기 setting
$(document).ready( function() {
	auto_login();
	setTimeout(function() {scroll(0,0);}, 500);
});

// Grid modal on off function
let grid_open = 0;
function grid_modal_onoff() {
	let w = $(document).width();
	if (w < 1200) {
		if (menu_open == 1) menu_modal_onoff();
	}
	if (grid_open == 0) {
		$("#grid").css("background-color", "rgba(0,0,0,.1)");
		$("body").css({"position": "fixed", "overflow": "hidden"});
		$("#grid_modal").addClass("fadeInUp animated");
		$("#grid_modal").removeClass("display_none");
		setTimeout(function() {
			$("#grid_modal").removeClass("fadeInUp animated");
		}, 400);
		grid_open = 1;
	} else {
		$("#grid").removeAttr("style");
		$("body").removeAttr("style");
		$("#grid_modal").addClass("fadeOutDown");
		$("#mobile_modal_close").addClass("display_none");
		setTimeout(function() {
			$("#grid_modal").removeClass("fadeOutDown animated");
			$("#grid_modal").addClass("display_none");
		}, 400);
		grid_open = 0;
	}
}
function grid_modal_off() {
	let w = $(document).width();
	if (w < 1200){
		$("#grid").removeAttr("style");
		$("body").removeAttr("style");
		$("#grid_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#grid_modal").removeClass("fadeOutDown animated");
			$("#grid_modal").addClass("display_none");
		}, 400);
		$("#mobile_modal_close").addClass("display_none");
		grid_open = 0;
	}
}


// Menu modal on off function
var menu_open = 0;
function menu_modal_onoff(is_menu_open = menu_open) {
	menu_open = is_menu_open;
	if (menu_open == 2) {
		menu_open = 0;
		return;
	}
	let w = $(document).width();
	if (w < 1200) {
		if (grid_open == 1) grid_modal_onoff();
	}
	if (menu_open == 0) {
		$("body").css({"position": "fixed", "overflow": "hidden"});
		$("#menu_modal").addClass("fadeInUp animated");
		$("#menu_modal").removeClass("display_none");
		setTimeout(function() {
			$("#menu_modal").removeClass("fadeInUp animated");
		}, 400);
		menu_open = 1;
	} else {
		$("body").removeAttr("style");
		$("#menu_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#menu_modal").removeClass("fadeOutDown animated");
			$("#menu_modal").addClass("display_none");
		}, 400);
		menu_open = 0;
	}
}
function menu_modal_off() {
	let w = $(document).width();
	if (w < 1200){
		$("body").removeAttr("style");
		$("#menu_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#menu_modal").removeClass("fadeOutDown animated");
			$("#menu_modal").addClass("display_none");
		}, 400);
		menu_open = 0;
	}
}

// Login modal on off function
let login_open = 0;
function login_modal_onoff() {
	let token = localStorage.getItem("sj-state");
	if (token == null || token == undefined || token == 'undefined') {

	} else {
		return;
	}
	$("#user_id").val("");
	$("#user_pw").val("");
	let formInputs = $('#user_id,#user_pw');
	formInputs.focusout();
	let w = $(document).width();
	if (login_open == 0) {
		$("body").css({"position": "fixed", "overflow": "hidden"});
		$("#login_modal").removeClass("display_none");
		$("#login_modal").addClass("fadeInUp animated");
		$("#user_id").focus();
		setTimeout(function() {
			$("#login_modal").removeClass("fadeInUp animated");
		}, 400);
		login_open = 1;
	} else {
		$("body").removeAttr("style");
		$("#login_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#login_modal").removeClass("fadeOutDown animated");
			$("#login_modal").addClass("display_none");
		}, 400);
		login_open = 0;
	}
}

// Frist Auto Login function
function auto_login() {
	let token = localStorage.getItem('sj-state');
	if (token == null || token == undefined || token == 'undefined') {
		get_recommend_posts(1);
		return;
	} else {
		a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
		$.when(a_jax).done(function () {
			if (a_jax.responseJSON['result'] == 'success') {
				Snackbar("맞춤 서비스를 시작합니다.");
				After_login(a_jax.responseJSON);
			} else {
				localStorage.removeItem('sj-state');
			}
		});
	}
}
// Login fucntion
function Sign_in(){
	let user_id = $("#user_id").val();
	let user_pw = $("#user_pw").val();
	if ($("#user_id").val() == "") {
		Snackbar("학번 또는 교번을 입력해주세요.");
		$("#user_id").focus();
		return;
	} else if ($("#user_pw").val() == "") {
		Snackbar("비밀번호를 입력해주세요.");
		$("#user_pw").focus();
		return;
	}
	let send_data = {id: user_id, pw: user_pw};
	$("#loading_modal").removeClass("loading_modal_unvisible");
	let a_jax = A_JAX("http://"+host_ip+"/sign_in_up", "POST", null, send_data);
	$.when(a_jax).done(function () {
		$("#loading_modal").addClass("loading_modal_unvisible");
		if (a_jax.responseJSON['result'] == 'success') {
			let token = a_jax.responseJSON['access_token'];
			localStorage.setItem('sj-state', token);
			a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
			$.when(a_jax).done(function () {
				if (a_jax.responseJSON['result'] == 'success') {
					Snackbar("맞춤 서비스를 시작합니다.");
					$("#user_id").val("");
					$("#user_pw").val("");
					After_login(a_jax.responseJSON);
					login_modal_onoff();
				} else if (a_jax.responseJSON['result'] == 'not found') {
					Snackbar("비정상적인 접근입니다.");
					localStorage.removeItem('sj-state');
				}
			});
		} else if (a_jax.responseJSON['result'] == 'not sejong') {
			Snackbar("올바르지않은 계정입니다.");
			localStorage.removeItem('sj-state');

		} else if (a_jax.responseJSON['result'] == 'incorrect pw') {
			Snackbar("비밀번호를 다시 입력해주세요.");
			localStorage.removeItem('sj-state');
		} else if (a_jax.responseJSON['result'] == 'api error') {
			Snackbar("세종대학교 전산서비스 오류입니다.");
			localStorage.removeItem('sj-state');
		}
		else {
			Snackbar("계정을 확인해주세요.");
			localStorage.removeItem('sj-state');
		}
	});
}
function Enter_login() {
	if (window.event.keyCode == 13) {
        if ($("#user_id").val() == "") {
        	Snackbar("학번 또는 교번을 입력해주세요.");
        	$("#user_id").focus();
        } else if ($("#user_pw").val() == "") {
        	Snackbar("비밀번호를 다시 입력해주세요.");
        	$("#user_pw").focus();
        } else {
        	Sign_in();
        }
    }
}
// login modal input event
$(document).ready(function(){
	let formInputs = $('#user_id,#user_pw');
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
// After login, setting user information.
function After_login(dict) {
	$("#logout_button").removeClass("display_none");
	let w = $(document).width();
	let id = dict["user_id"];
	let major = dict["user_major"];
	let name = dict["user_name"];
	greetings.push(major + ",");
	let hello = greetings[Math.floor(Math.random() * greetings.length)];
	hello = hello + " " + dict['user_name'] + "님";
	$("#user_info").text(hello);
	$("#user_info_mobile").text(hello);
	if (w < 1200) {
		$("#user_login_mobile").addClass("display_none");
		$("#user_info_mobile").removeClass("display_none");
	} else {
		$("#user_login").addClass("display_none");
		$("#user_info").removeClass("display_none");
	}
	get_recommend_posts(1);
}

// button click ripple event
$("html").on("click", ".ripple", function(evt) {
	let ripple = $(evt.currentTarget);
	let x = evt.pageX - ripple.offset().left;
	let y = evt.pageY - ripple.offset().top;
	let duration = 1000;
	let animationFrame, animationStart;
	let animationStep = function(timestamp) {
		if (!animationStart) {
			animationStart = timestamp;
		}
		let frame = timestamp - animationStart;
		if (frame < duration) {
			let easing = (frame/duration) * (2 - (frame/duration));
			let circle = "circle at " + x + "px " + y + "px";
			let color = "rgba(0, 0, 0, " + (0.3 * (1 - easing)) + ")";
			let stop = 90 * easing + "%";
			ripple.css({
				"background-image": "radial-gradient(" + circle + ", " + color + " " + stop + ", transparent " + stop + ")"
			});
			animationFrame = window.requestAnimationFrame(animationStep);
		} else {
			$(ripple).css({
				"background-image": "none"
			});
			window.cancelAnimationFrame(animationFrame);
		}
	};
	animationFrame = window.requestAnimationFrame(animationStep);
});


function Go_home() {
	window.location.href = "/";
}
function Go_analysistics() {
	window.location.href = "/analysistics";
}

function Logout() {
	localStorage.removeItem("sj-state");
	location.reload();
}