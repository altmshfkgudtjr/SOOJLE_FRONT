function search_focus(keyCode) {
	if (keyCode == 13) {
		search_button();
	}
}


function search_button() {	// 검색작업 data = 글자
	let data;
	data = $("#pc_search_input").val();
	$("#pc_search_input").blur();
	search_text(data);	// 검색 함수 실행
	/*search 클릭 작업============================================================*/
}

let is_searching = 0;
function search_text(text) {
	// 현재 검색 중이면 차단
	if (is_searching == 1) return;
	is_searching = 1;

	is_posts_there.a = 0;
	is_posts_done.a = 0;
	if (text == ""){
		Snackbar("검색어를 입력해주세요.");
		return;
	} else {
		text = text.toLowerCase();
	}
	$("#posts_creating_loading").removeClass("display_none");
	$("#posts_target").empty();
	let send_data = {search: text};
	let a_jax0 = A_JAX("http://"+host_ip+"/priority_search/200", "POST", null, send_data);
	let a_jax1 = A_JAX("http://"+host_ip+"/category_search/1/200", "POST", null, send_data);
	let a_jax2 = A_JAX("http://"+host_ip+"/category_search/2/200", "POST", null, send_data);
	let a_jax3 = A_JAX("http://"+host_ip+"/category_search/3/200", "POST", null, send_data);
	let a_jax4 = A_JAX("http://"+host_ip+"/category_search/4/200", "POST", null, send_data);
	$.when(a_jax0).done(function () {
		let json = a_jax0.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(0, json["search_result"]);
			insert_search_post(0, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax1).done(function () {
		let json = a_jax1.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(1, json["search_result"]);
			insert_search_post(1, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax2).done(function () {
		let json = a_jax2.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(2, json["search_result"]);
			insert_search_post(2, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax3).done(function () {
		let json = a_jax3.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(3, json["search_result"]);
			insert_search_post(3, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
	$.when(a_jax4).done(function () {
		let json = a_jax4.responseJSON;
		if (json['result'] == 'success') {
			let output = remove_duplicated(4, json["search_result"]);
			insert_search_post(4, output);
			is_posts_done.a += 1;
		} else {
			is_posts_done.a += 1;
			Snackbar("다시 접속해주세요!");
		}
	});
}


function remove_duplicated(target, posts) {
	let output = [], index = [], post_one, i, j, posts_len = posts.length;
	for (i = 0; i < posts_len; i++) index.push(0);
	for (i = posts_len - 1; i >= 0; i--) {
		for (j = i - 1; j >= 0; j--) {
			if (posts[i]["_id"] == posts[j]["_id"]) {
				index[i] = 1;
				break;
			} else if (posts[i]["similarity"] != posts[j]['similarity']){
				break;
			}
		}
	}
	for (i = 0; i < posts_len; i++) {
		if (index[i] == 1) continue;
		output.push(posts[i]);
	}
	return output;
}
function insert_search_post(target, posts) {
	
}


let is_posts_done = {
	aInternal: 0,
	aListener: function(val) {},
	set a(val) {
		this.aInternal = val;
		this.aListener(val);
	},
	get a() {
		return this.aInternal;
	},
	registerListener: function(listener) {
		this.aListener = listener;
	}
}
let is_posts_there = {
	aInternal: 0,
	aListener: function(val) {},
	set a(val) {
		this.aInternal = val;
		this.aListener(val);
	},
	get a() {
		return this.aInternal;
	},
	registerListener: function(listener) {
		this.aListener = listener;
	}
}
is_posts_done.registerListener(function(val) {
	if (val == 5) {
		// 로딩 제거
		is_searching = 0;
		let token = localStorage.getItem('sj-state');
		if (token == null || token == undefined || token == 'undefined') {} 
		else {
			a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
			$.when(a_jax).done(function () {
				if (a_jax.responseJSON['result'] == 'success') {
					let posts = $(".post_block");
					let post_one;
					for (post_one of posts) {
						for (let fav_post of a_jax.responseJSON["user_fav_list"]) {
							if ($(post_one).attr("p-id") == fav_post["_id"]) {
								$(post_one).children('div').children('div.post_like').css("color", "#f00730");
								$(post_one).children('div').children('div.post_like').attr("ch", "1");
							}
						}
					}
				} else {
					localStorage.removeItem('sj-state');
				}
			});
		}
		$("#posts_creating_loading").addClass("display_none");
	}
});
is_posts_there.registerListener(function(val) {
	if (val == 6) {
		$("#posts_creating_loading").addClass("display_none");
		Snackbar("포스트가 존재하지 않습니다.");
	}
});