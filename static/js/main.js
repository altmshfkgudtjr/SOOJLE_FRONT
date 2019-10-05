// 메인페이지 화면 이동 버튼 위치 setting
function set_introduce_butotn_position() {
	let browser_height = $(window).height();
	let browser_width = $(window).width();
	$("#SJ_main_introduce_button").css({"top": browser_height - 50, "left": browser_width / 2 - 25});	
}
$(window).ready(function() {set_introduce_butotn_position();});
$(window).resize(function() {set_introduce_butotn_position();});
