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
// Header setting
/*
if ( navigator.platform ) { //mobile
	if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
		$(".SJ_board_header").css("position", "fixed");
		let didScroll;
		let lastScrollTop = 0;
		let delta = 5;
		let navbarHeight = $('.SJ_board_header').outerHeight();
		$(window).scroll(function(event){
		    didScroll = true;
		});
		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 250);
		function hasScrolled() {
		    let st = $(this).scrollTop();
		    if(Math.abs(lastScrollTop - st) <= delta)
		        return;
		    if (st > lastScrollTop && st > navbarHeight){
		        $('.SJ_board_header').removeClass('header_down').addClass('header_up');
		    } else {
		        if(st + $(window).height() < $(document).height()) {
		            $('.SJ_board_header').removeClass('header_up').addClass('header_down');
		        }
		    }
		    lastScrollTop = st;
		}
		let lastScroll = 0;
		window.onscroll = function() {
			let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
			if (currentScroll > 0 && lastScroll <= currentScroll){
				lastScroll = currentScroll;
				$('.SJ_board_header').removeClass('header_down').addClass('header_up');
			} else {
				lastScroll = currentScroll;
				$('.SJ_board_header').removeClass('header_up').addClass('header_down');
			}
		};
	} else {} // pc
}
*/

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
function grid_modal_onoff(tag) {
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