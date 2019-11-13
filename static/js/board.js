// Loading Modal
let is_loading = 1;
window.onkeydown = function(e) { 
  if (is_loading == 1)
 	return !(e.keyCode == 32);
};
$("body").css({"overflow": "hidden"});
window.setTimeout(function() {
	is_loading = 0;
	$("body").removeAttr("style");
	$("#board_loading_modal").addClass("board_loading_modal_unvisible");
	window.setTimeout(function() {
		$(".mobile_controller").removeAttr("style");
		$("#none_click").addClass("display_none");
	}, 1000);
}, 100);
let filter = "win16|win32|win64|mac|macintel";

function Goboard() {
	window.location.href = "/board";
}

// Searchbar Task
let search_cache = "";	// 이전 검색어
let search_target = "";	// 목표 검색어
let now = 0;	// 현재 화살표로 선택한 div 위치
let all = 0;	// 검색결과 수
function search_focus(keyCode, tag) {
	//KeyUp 38 or KeyDown 40
	if (keyCode == 13) {
		search_button();
		search_blur();
	} else if (keyCode == 38 || keyCode == 40) {
		$(`.search_result:nth-child(${now})`).removeClass("search_target");
		if (keyCode == 38) now--;
		else now++;
		if (now > all) {
			now--;
		} else if (now <= 0) {
			now++;
		}
		$(`.search_result:nth-child(${now})`).addClass("search_target");
		let target = $(`.search_result:nth-child(${now})`).text().trim();
		tag.val(target);
		search_cache = target;
	} else {
		let now_search = tag.val();
		// 문열길이!=0, 문자열변화
		if (now_search.length != 0 && search_cache != now_search) {
			$(`.search_result:nth-child(${now})`).removeClass("search_target");
			now = 0;
			search_cache = tag.val();
			search_target = search_cache;
			/*추천검색어 AJAX 요청 공간=========================================*/
			all = 3;	// AJAX로 요청한 추천검색어 수
			if (all != 0)
				$("#search_recommend_box").removeClass("display_none");
		} else if (tag.val() == "") {
			search_target = "";
			$("#search_recommend_box").addClass("display_none");
			$("#search_recommend_box").empty();
			let line = '<div id="search_loading" class="search_loading pointer noselect">\
							<i class="fas fa-grip-lines"></i>\
						</div>';
			document.getElementById('search_recommend_box').innerHTML = line;
			search_cache = "";
		}
	}
}
function search_click() {
	if (all != 0)
		$("#search_recommend_box").removeClass("display_none");
}
function search_blur() {
	$("#search_recommend_box").addClass("display_none");
}
function search_button(data = "") {	// 검색작업 data = 글자
	let w = $(document).width();
	if (w < 1200) {
		if (data == "")
			data = $("#mobile_search_input").val();
	} else {
		if (data == "")
			data = $("#pc_search_input").val();
	}
	alert(data);
	/*search 클릭 작업============================================================*/
}
function mobile_search_modal_open() {
	$("body").css("overflow", "hidden");
	$("#mobile_search_modal").removeClass("display_none");
	$("#mobile_search_input").focus()
}
function mobile_search_modal_close() {
	search_blur();
	$("body").removeAttr("style");
	$("#mobile_search_modal").addClass("display_none");
	$("#mobile_search_input").val("");
}
function search_result_click(tag) {
	let data = tag.children("span").text().trim();
	let w = $(document).width();
	if (w < 1200) {
		$("#mobile_search_input").val(data);
	} else {
		$("#pc_search_input").val(data);
	}
	search_button(data);
}

// Grid Task
let grid_open = 0;
function grid_modal_onoff() {
	if (menu_open == 1) {
		menu_modal_off();
		menu_modal_onoff();
		menu_open = 0;
	}
	let w = $(document).width();
	if (grid_open == 0) {
		$("#grid").css("background-color", "rgba(0,0,0,.1)");
		$("body").css({"position": "fixed", "overflow": "hidden"});
		$("#grid_modal").addClass("grid_modal_visible");
		if (w < 1200)
			$("#mobile_modal_close").removeClass("display_none");
		grid_open = 1;
	} else {
		$("#grid").removeAttr("style");
		$("body").removeAttr("style");
		$("#grid_modal").removeClass("grid_modal_visible");
		grid_open = 0;
	}
}
function grid_modal_off() {
	let w = $(document).width();
	if (w < 1200){
		$("#grid").removeAttr("style");
		$("body").removeAttr("style");
		$("#grid_modal").removeClass("grid_modal_visible");
		$("#mobile_modal_close").addClass("display_none");
		grid_open = 0;
	}
}


// Menu Task
let menu_open = 0;
function menu_modal_onoff() {
	let w = $(document).width();
	if (menu_open == 0) {
		$("body").css({"position": "fixed", "overflow": "hidden"});
		$("#menu_modal").addClass("menu_modal_visible");
		menu_open = 1;
	} else {
		$("body").removeAttr("style");
		$("#menu_modal").removeClass("menu_modal_visible");
		menu_open = 0;
	}
}
function menu_modal_off() {
	let w = $(document).width();
	if (w < 1200){
		$("body").removeAttr("style");
		$("#menu_modal").removeClass("menu_modal_visible");
		menu_open = 0;
	}
}


let login_open = 0;
function login_modal_onoff() {
	let w = $(document).width();
	if (login_open == 0) {
		$("body").css({"position": "fixed", "overflow": "hidden"});
		$("#login_modal").addClass("login_modal_visible");
		$("#login_modal").addClass("fadeInUp animated");
		setTimeout(function() {
			$("#login_modal").removeClass("fadeInUp animated");
		}, 400);
		login_open = 1;
	} else {
		$("body").removeAttr("style");
		$("#login_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#login_modal").removeClass("fadeOutDown animated");
			$("#login_modal").removeClass("login_modal_visible");
		}, 400);
		login_open = 0;
	}
}

// 로그인 함수
function Sign_in(){
	let user_id = $("#user_id").val();
	let user_pw = $("#user_pw").val();
	let send_data = {id: user_id, pw: user_pw};
	let a_jax = A_JAX("http://"+host_ip+"/sign_in_up", "POST", null, send_data);
	$.when(a_jax).done(function () {
		if (a_jax.responseJSON['result'] == 'success') {
			let token = a_jax.responseJSON['access_token']
			localStorage.setItem('sj-state', token);
			a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
			$.when(a_jax).done(function () {
				if (a_jax.responseJSON['result'] == 'success') {
					console.log(a_jax.responseJSON);
				} else if (a_jax.responseJSON['result'] == 'not found') {
					console.log("알수 없어요")
				}
			});
		} else if (a_jax.responseJSON['result'] == 'not sejong') {
			console.log("세종인이 아님")
		} else if (a_jax.responseJSON['result'] == 'incorrect pw') {
			console.log("패스워드를 다시 입력해주십시");
		} else {
			console.log("꺼져시발");
		}
	});
}
function Enter_login() {
	if (window.event.keyCode == 13) {
        if ($("#user_id").val() == "") {
        	console.log("학번입력좀");
        } else if ($("#user_pw").val() == "") {
        	console.log("비번입력좀");
        } else {
        	Sign_in();
        }
    }
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


// login modal input event
$(document).ready(function(){
	var formInputs = $('#user_id,#user_pw');
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