let filter = "win16|win32|win64|mac|macintel";
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

if ( $(document).width() < 1200 ) { // mobile
	$("#mobile_search").removeClass("display_none");
} else {
	$("#pc_search").removeClass("display_none");
} // pc

function Goboard() {
	window.location.href = "/board";
}

let search_cache = "";	// 이전 검색어
let search_target = "";	// 목표 검색어
let now = 0;	// 현재 화살표로 선택한 div 위치
let all = 0;	// 검색결과 수
function search_focus(keyCode) {
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
		$("#pc_search_input").val(target);
		search_cache = target;
	} else {
		let now_search = $("#pc_search_input").val();
		// 문열길이!=0, 문자열변화
		if (now_search.length != 0 && search_cache != now_search) {
			$(`.search_result:nth-child(${now})`).removeClass("search_target");
			now = 0;
			search_cache = $("#pc_search_input").val();
			search_target = search_cache;
			$("#pc_search_recommend_box").removeClass("display_none");
			/*추천검색어 AJAX 요청 공간*/
			all = 3;	// AJAX로 요청한 추천검색우 수
		} else if ($("#pc_search_input").val() == "") {
			search_target = "";
			$("#pc_search_recommend_box").addClass("display_none");
			$("#pc_search_recommend_box").empty();
			let line = '<div id="search_loading" class="search_loading pointer noselect">\
							<i class="fas fa-grip-lines"></i>\
						</div>';
			document.getElementById('pc_search_recommend_box').innerHTML = line;
			search_cache = "";
		}
	}
}
function search_click() {
	$("#pc_search_recommend_box").removeClass("display_none");
}
function search_blur() {
	$("#pc_search_recommend_box").addClass("display_none");
}
function search_button() {
	/*search 클릭 작업*/
}

let grid_open = 0;

$('html').click(function(e) { // grid_modal_close
	if (grid_open == 1){
		if(!$(e.target).hasClass("grid_it")){
			$("#grid_modal").addClass("display_none");
			$("#grid").removeAttr("style");
			grid_open = 0;
		}
	}
});
function grid_modal_open(tag) {
	if (grid_open == 0) {
		$("#grid_modal").removeClass("display_none");
		tag.css("background-color", "rgba(0,0,0,.1)");
		grid_open = 1;
	} else {
		$("#grid_modal").addClass("display_none");
		tag.removeAttr("style");
		grid_open = 0;
	}
}