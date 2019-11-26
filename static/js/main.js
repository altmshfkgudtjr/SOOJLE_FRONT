$(window).ready(function() {
	$("#loading").css({"top": $(document).scrollTop()});
});


// Mobile Device Checked
window.mobilecheck = function() {
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    isMobile = true;
	}
    return isMobile;
};
/*
let before_width = $(window).width();
function fixed_size(width) {
	if (mobilecheck()) {
		let target1 = $("#SJ_main_background");
		let target2 = $("#SJ_main_page1_hyper_button_box");
		let width1 = target1.width();
		if (width <= 1400) {
			width1 = width = $(window).width();
		}
		let height1 = target1.height();
		let top1 = target1.css("top");
		let top2 = target2.css("top");
		target1.css({"width": width1, "height": height1, "top": top1});
		target2.css({"top": top2});
	}
}
fixed_size(before_width);
$(window).resize(function() {
	let after_width = $(window).width();
	if (Math.abs(after_width - before_width) >= 200) {
		before_width = after_width;
		fixed_size(before_width);
	}
});
*/
// 메인페이지 검색 focus 함수
function search_focus() {
	$("#SJ_main_page1_search_bar").addClass("SJ_main_page1_search_bar_checked");
	$("#SJ_main_page1_search_list_box").css({"width": $("#SJ_main_page1_search_box").width()});
	$("#SJ_main_page1_search_list_box").removeClass("display_none");
	if (mobilecheck()) {
		$("#SJ_main_page1_search_box").css({"border-radius": "25px 25px 0 0"});
		let top = $("#SJ_main_page1_search_container").position().top;
		$("html, body").scrollTop(top);
	} else {
		$("#SJ_main_page1_search_box").css({"border-radius": "25px 25px 0 0"});
	}
}
function search_blur() {
	$("#SJ_main_page1_search_bar").removeClass("SJ_main_page1_search_bar_checked");
	$("#SJ_main_page1_search_list_box").addClass("display_none");
	$("#SJ_main_page1_search_box").removeAttr("style");
	if (mobilecheck()) {
		$("html, body").scrollTop(0);
	}
}
let search_cache = "";	// 이전 검색어
let search_target = "";	// 목표 검색어
let now = 0;	// 현재 화살표로 선택한 div 위치
let all = 0;	// 검색결과 수
function search_focus(keyCode, tag) {
	let w = $(document).width();
	if (w < 1200) {
		mobile_search_modal_open();
		return;
	}
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
		let target;
		if (w < 1200) {
			target = $(`#mobile_search_recommend_box > .search_result:nth-child(${now})`).text().trim();
		} else {
			target = $(`#search_recommend_box > .search_result:nth-child(${now})`).text().trim();
		}
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
			if (all != 0){
				if (w < 1200){
					$("#mobile_search_recommend_box").removeClass("display_none");
				} else {
					$("#search_recommend_box").removeClass("display_none");
				}
			}
		} else if (tag.val() == "") {
			search_target = "";
			if (w < 1200){
				//$("#mobile_search_recommend_box").addClass("display_none");
				$(".search_result").remove();
			} else {
				$("#search_recommend_box").addClass("display_none");
				$(".search_result").remove();
			}
			
			let line = '<div id="search_loading" class="search_loading pointer noselect">\
							<i class="fas fa-grip-lines"></i>\
						</div>';
			$("#mobile_search_recommend_box").append(line);
			search_cache = "";
		}
	}
}
let search_open = 0;
function mobile_search_modal_open() {
	let w = $(document).width();
	if (search_open == 0) {
		if (w < 1200) {
			scroll(0,0);
			$("#mobile_search_modal").removeClass("display_none");
			$("#board_logo").css({"left": "10px",
								"transform": "translate(0, 0)",
								"-webkit-transform": "translate(0, 0)"})
			$("body").css("overflow", "hidden");
			$("#mobile_search_input").focus();
			search_open = 1;
		}
	} else {
		if (w < 1200) {
			search_blur();
		}
	}
}
function search_button() {	// 검색작업 data = 글자
	let data;
	let w = $(document).width();
	if (w < 1200) {
		data = $("#mobile_search_input").val();
		$("#mobile_search_input").blur();
		search_blur();
		$("body").removeAttr("style");
		//$("#board_logo").removeAttr("style");
		//$("#mobile_search").addClass("display_none");
		search_open = 0;
	} else {
		data = $("#pc_search_input").val();
		$("#pc_search_input").blur();
	}
	//mobile_search_modal_close();

	search_text(data);	// 검색 함수 실행

	/*search 클릭 작업============================================================*/
}
function search_result_click(tag) {
	let data = tag.children("span").text().trim();
	let w = $(document).width();
	if (w < 1200) {
		$("#mobile_search_input").val(data);
	} else {
		$("#pc_search_input").val(data);
	}
	search_button();
}
function search_blur() {
	let w = $(document).width();
	if (all != 0){
		if (w < 1200){
			$("#mobile_search_modal").addClass("display_none");
		} else {
			$("#search_recommend_box").addClass("display_none");
		}
	}
}



function search_text(text) {
	if (text == "") {
		Snackbar("검색어를 입력해주세요.");
		return;
	}
	console.log(text);
}


function Gohome(){
	window.location.href = "/";
}
function Goboard() {
	window.location.href = "/board";
}

// Loading Setting
setTimeout(function() {
	$("body").removeAttr("style");
	$("#loading").addClass("display_none");
}, 0);	// setting time

function next_page(n) {
	let target = $(`.page_section:nth-child(${n})`).offset().top;
	$('html,body').animate({scrollTop: target}, 10);
}
function last_page() {
	let target = $("#last_blank").offset().top;
	$('html,body').animate({scrollTop: target}, 10);
}