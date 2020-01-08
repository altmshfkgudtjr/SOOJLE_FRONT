// URL Detection
window.addEventListener('hashchange', function() {
	URL_Select();
});
function URL_Detection() {
	$("#menu_container").addClass("menu_container_fixed");
	$("#posts_creating_loading").removeClass("display_none");
	$("#board_container").addClass("board_container_fixed");
	$("#posts_target").empty();
	$("#pc_search_input").val("");
	$("#mobile_search_input").val("");

	$("#mobile_controller_none").addClass("display_none");
	$("#board_loading_modal").addClass("board_loading_modal_unvisible");
	$(".mobile_controller").removeAttr("style");
	$("#none_click").addClass("display_none");

	$("#menu_container").removeClass("menu_container_fixed");
	//$("#menu_container").removeAttr("style");
	$("#posts_creating_loading").addClass("display_none");
	$("#board_container").removeClass("board_container_fixed");

	URL_Select();	
}
async function URL_Select() {
	let url_target = window.location.href.split("#")[1];
	if (url_target == undefined || url_target == "" || url_target == "recommend") get_recommend_posts(1);
	else if (url_target.startsWith("search?")) {
		let text = decodeURI(window.location.href);
		text = text.split("#search?")[1];
		text = text.split("/")[0];
		text = text.replace(/\+/g, " ");
		await search_text(text);
	}
	else if (url_target == "license") Insert_license();
	else if (url_target == "serviceagreement") Insert_serviceaggrement();
	else if (url_target == "privacy") Insert_privacy();
	// Else : Nothing Do.
}
//----------------------------------------------------------------------------------
function Go_introduce() {
	//window.location.href = "/introduce";
	location.replace("/introduce");
}
function Go_programmer() {
	//window.location.href = "/programmer";
	location.replace("/programmer");
}
function Go_advertisement() {
	//window.location.href = "/advertisement";
	location.replace("/advertisement");
}
function Go_privacy() {
	//window.location.href = "/board#privacy";
	location.replace("/board#privacy");
	URL_Select();
}
function Go_serviceagreement() {
	//window.location.href = "/board#serviceagreement";
	location.replace("/board#serviceagreement");
	URL_Select();
}
function Go_license() {
	//window.location.href = "/board#license";
	location.replace("/board#license");
	URL_Select();
}
//----------------------------------------------------------------------------------
function Insert_license() {
	out_of_search();
	now_topic = "License";
	where_topic = "License";
	now_state = "License";
	$("#board_info_board").text("LICENSE");
	$("#board_info_text").text("오픈 라이센스");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);

	let div = 	`<div class="lab_title_wrap">
					<div class="lab_title noselect">라이센스 표기</div>
					<div class="lab_subtitle noselect">
						다음은 SOOJLE의 중요한 부분을 담당하는 소스코드의 라이센스입니다.
					</div>
				</div>`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
}

function Insert_serviceaggrement() {
	out_of_search();
	now_topic = "Serviceagreement";
	where_topic = "Serviceagreement";
	now_state = "Serviceagreement";
	$("#board_info_board").text("SOOJLE");
	$("#board_info_text").text("서비스이용약관");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);

	let div = 	`<div class="lab_title_wrap">
					<div class="lab_title noselect">서비스이용약관</div>
					<div class="lab_subtitle noselect">
						다음은 SOOJLE 서비스이용약관입니다.
					</div>
				</div>`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
}

function Insert_privacy() {
	out_of_search();
	now_topic = "Privacy";
	where_topic = "Privacy";
	now_state = "Privacy";
	$("#board_info_board").text("SOOJLE");
	$("#board_info_text").text("개인정보처리방침");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);

	let div = 	`<div class="lab_title_wrap">
					<div class="lab_title noselect">개인정보처리방침</div>
					<div class="lab_subtitle noselect">
						다음은 SOOJLE 서비스의 개인정보처리방침입니다.
					</div>
				</div>`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
}