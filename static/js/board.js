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

function search_focus() {
	$("#pc_search_recommend_box").removeClass("display_none");
	if ($("#pc_search_input").val() == "")
		$("#pc_search_recommend_box").addClass("display_none");
	console.log($("#pc_search_input").val());
}
function search_blur() {
	$("#pc_search_recommend_box").addClass("display_none");
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