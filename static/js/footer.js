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
	else if (url_target == "recommend") get_recommend_posts(1);
	else if (url_target == "popularity") get_popularity_posts();
	else if (url_target == "userlike") {
		menu_open = 1;
		get_user_like_posts();
	}
	else if (url_target == "userview") {
		menu_open = 1;
		get_user_view_posts();
	}
	else if (url_target.startsWith("topic?")) {
		menu_open = 1;
		let text = decodeURI(window.location.href);
		let target_topic = text.split("topic?")[1];
		get_topic_posts(target_topic);
	}
	else if (url_target == "lab") {
		menu_open = 1;
		Go_lab();
	}
	else if (url_target == "analysistics") {
		menu_open = 1;
		Go_analysistic();
	}
	else if (url_target == "setting") {
		menu_open = 1;
		Go_setting();
	}
	else if (url_target == "feedback") {
		menu_open = 1;
		Go_feedback();
	}
	else if (url_target == "soojle") {
		check_managet_qualification_reload();
	}
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
	let now_creating_state = now_state;		// 이거 중요함. 안 겹치게 함.
	$("#board_info_board").text("LICENSE");
	$("#board_info_text").text("오픈 라이센스");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);

	let div = 	`<div class="lab_title_wrap">
					<div class="lab_title noselect">라이센스</div>
					<div class="lab_subtitle noselect">
						다음은 SOOJLE의 중요한 부분을 담당하는 소스코드의 라이센스입니다.
					</div>
				</div>
				<div class="license_block">${license_1}</div>
				<div class="license_block">${license_2}</div>
				<div class="license_block">${license_3}</div>
				<div class="license_block">${license_4}</div>
				`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
}

function Insert_serviceaggrement() {
	out_of_search();
	now_topic = "Serviceagreement";
	where_topic = "Serviceagreement";
	now_state = "Serviceagreement";
	let now_creating_state = now_state;
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
	let now_creating_state = now_state;
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



/*--------------<License Info>--------------*/
// ChartJS
let license_1 = `The MIT License (MIT)<br>Copyright (c) 2018 Chart.js Contributors<br>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
// Animated CSS
let license_2 = `The MIT License (MIT)<br>Copyright (c) 2019 Daniel Eden<br>Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the "Software"), to dealin the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:<br>The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software.<br>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THESOFTWARE.`;
// FontAwesome
let license_3 = `Font Awesome Free License<br>-------------------------<br>Font Awesome Free is free, open source, and GPL friendly. You can use it forcommercial projects, open source projects, or really almost whatever you want.Full Font Awesome Free license: https://fontawesome.com/license/free.<br># Icons: CC BY 4.0 License (https://creativecommons.org/licenses/by/4.0/)In the Font Awesome Free download, the CC BY 4.0 license applies to all iconspackaged as SVG and JS file types.`;
// JQUERY
let license_4 = `Copyright JS Foundation and other contributors, https://js.foundation/<br>Permission is hereby granted, free of charge, to any person obtaininga copy of this software and associated documentation files (the"Software"), to deal in the Software without restriction, includingwithout limitation the rights to use, copy, modify, merge, publish,distribute, sublicense, and/or sell copies of the Software, and topermit persons to whom the Software is furnished to do so, subject tothe following conditions:<br>The above copyright notice and this permission notice shall beincluded in all copies or substantial portions of the Software.<br>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OFMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE ANDNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BELIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTIONOF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIONWITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

