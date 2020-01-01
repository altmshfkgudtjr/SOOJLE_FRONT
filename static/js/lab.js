function Go_lab() {
	out_of_search();
	now_topic = "Lab";
	where_topic = "Lab";
	now_state = "Lab";
	$("#board_info_board").text("수즐 연구소");
	$("#board_info_text").text("Lab");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);
	menu_modal_onoff();
	set_lab();
}

function set_lab() {
	let div = 	`<div class="lab_title_wrap">
					<div class="lab_title noselect">수즐 연구소에 오신 것을 환영합니다.</div>
					<div class="lab_subtitle noselect">
						세종대학교 여러분에게 새로운 경험을 드리겠습니다.
					</div>
				</div>`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
}