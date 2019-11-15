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
	search_text(data);	// 검색 함수 실행

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

// 검색 api 실행 함수
function search_text(text) {
	let send_data = {search: text};
	let a_jax1 = A_JAX("http://"+host_ip+"/search", "POST", null, send_data);
	$.when(a_jax1).done(function () {
		let json = a_jax1.responseJSON;
		if (json['result'] == 'success') {
			/* 검색 성공 */
		} else {
			Snackbar("다시 접속해주세요!");
		}
	});
	/* 정민이 구현 중... */
}