// Mobile Device Checked
// mobilecheck()
window.mobilecheck = function() {
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    isMobile = true;
	}
    return isMobile;
};
// now state
let now_state = "";
// Greetings Array
let greetings = ["반갑습니다!", "환영합니다!", "좋은 하루입니다.", "세종대학교."];
// Error Imoticon
let imoticons = ["ᵒ̌ ᴥ ᵒ̌ ", "(。・_・。)", "˚ᆺ˚", "( ˃̣̣̥᷄⌓˂̣̣̥᷅ )"];
// Loading Modal
let is_loading = 1;
window.onkeydown = function(e) { 
  if (is_loading == 1)
 	return !(e.keyCode == 32);
};
window.setTimeout(function() {
	is_loading = 0;
}, 1000);
let filter = "win16|win32|win64|mac|macintel";
/*
// 좋아요 마우스 hover
if (filter.indexOf(navigator.platform.toLowerCase()) < 0) { // mobile
	
} else { // pc
	
}*/

function Goboard() {
	window.location.href = "/board";
}
// 초기 setting
$(document).ready( function() {
	auto_login();
	setTimeout(function() {scroll(0,0);}, 500);
});

// Grid modal on off function
let grid_open = 0;
function grid_modal_onoff() {
	let w = $(document).width();
	//if (w < 1200) {
	if (mobilecheck()) {
		if (menu_open == 1) menu_modal_onoff();
	}
	if (grid_open == 0) {
		$("#grid").css("background-color", "rgba(0,0,0,.1)");
		$("body").css({"overflow": "hidden"});
		$("#grid_modal").addClass("fadeInUp animated");
		$("#grid_modal").removeClass("display_none");
		setTimeout(function() {
			$("#grid_modal").removeClass("fadeInUp animated");
		}, 400);
		grid_open = 1;
	} else {
		$("#grid").removeAttr("style");
		$("body").removeAttr("style");
		$("#grid_modal").addClass("fadeOutDown");
		$("#mobile_modal_close").addClass("display_none");
		setTimeout(function() {
			$("#grid_modal").removeClass("fadeOutDown animated");
			$("#grid_modal").addClass("display_none");
		}, 400);
		grid_open = 0;
	}
}
function grid_modal_off() {
	let w = $(document).width();
	//if (w < 1200){
	if (mobilecheck()) {
		$("#grid").removeAttr("style");
		$("body").removeAttr("style");
		$("#grid_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#grid_modal").removeClass("fadeOutDown animated");
			$("#grid_modal").addClass("display_none");
		}, 400);
		$("#mobile_modal_close").addClass("display_none");
		grid_open = 0;
	}
}


// Menu modal on off function
var menu_open = 0;
function menu_modal_onoff(is_menu_open = menu_open) {
	menu_open = is_menu_open;
	if (menu_open == 2) {
		menu_open = 0;
		return;
	}
	let w = $(document).width();
	//if (w < 1200) {
	if (mobilecheck()) {
		if (grid_open == 1) grid_modal_onoff();
	}
	if (menu_open == 0) {
		$("body").css({"overflow": "hidden"});
		$("#menu_modal").addClass("fadeInUp animated");
		$("#menu_modal").removeClass("display_none");
		setTimeout(function() {
			$("#menu_modal").removeClass("fadeInUp animated");
		}, 400);
		menu_open = 1;
	} else {
		$("body").removeAttr("style");
		$("#menu_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#menu_modal").removeClass("fadeOutDown animated");
			$("#menu_modal").addClass("display_none");
		}, 400);
		menu_open = 0;
	}
}
function menu_modal_off() {
	let w = $(document).width();
	//if (w < 1200){
	if (mobilecheck()) {
		$("body").removeAttr("style");
		$("#menu_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#menu_modal").removeClass("fadeOutDown animated");
			$("#menu_modal").addClass("display_none");
		}, 400);
		menu_open = 0;
	}
}

// Login modal on off function
let login_open = 0;
function login_modal_onoff() {
	$("#user_id").val("");
	$("#user_pw").val("");
	let formInputs = $('#user_id,#user_pw');
	formInputs.focusout();
	let w = $(document).width();
	if (login_open == 0) {
		$("body").css({"overflow": "hidden"});
		$("#login_modal").removeClass("display_none");
		$("#login_modal").addClass("fadeInUp animated");
		$("#user_id").focus();
		setTimeout(function() {
			$("#login_modal").removeClass("fadeInUp animated");
		}, 400);
		login_open = 1;
	} else {
		$("body").removeAttr("style");
		$("#login_modal").addClass("fadeOutDown");
		setTimeout(function() {
			$("#login_modal").removeClass("fadeOutDown animated");
			$("#login_modal").addClass("display_none");
		}, 400);
		login_open = 0;
	}
}
function open_login_or_setting() {
	let token = sessionStorage.getItem('sj-state');
	if (token == null || token == undefined || token == 'undefined') {
		login_modal_onoff();
	} else {
		menu_open = 1;
		Go_setting();
	}
}

// Frist Auto Login function
async function auto_login() {
	let token = sessionStorage.getItem('sj-state');
	if (token == null || token == undefined || token == 'undefined') {
		sessionStorage.removeItem('sj-state');
		token = localStorage.getItem('sj-state');
		if (token == null || token == undefined || token == 'undefined') {
			localStorage.removeItem('sj-state');
			// 메인에서 검색을 했다면 검색 결과 호출
			if (window.location.href.search("#search?") != -1) {
				// 로딩 모달 제거
				$("#mobile_controller_none").addClass("display_none");
				$("#board_loading_modal").addClass("board_loading_modal_unvisible");
				$(".mobile_controller").removeAttr("style");
				$("#none_click").addClass("display_none");
				let text = decodeURI(window.location.href);
				text = text.split("#search?")[1];
				//cwindow.location.href = "/board#";
				text = text.split("/")[0];
				text = text.replace(/"+"/g, " ");
				await search_text(text);
			} else if (window.location.href.search("#") != -1) {
				await URL_Detection();
			} else { // 메인에서 검색을 하지않았다면 추천 뉴스피드 호출
				get_recommend_posts(1);
			}
			return;
		} else {
			sessionStorage.setItem('sj-state', localStorage.getItem('sj-state'));
		}
	}
	a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
	$.when(a_jax).done(function () {
		if (a_jax.responseJSON['result'] == 'success') {
			After_login(a_jax.responseJSON);
		} else if (a_jax['status'].toString().startswith('4')) {
			Snackbar("올바르지 않은 접근입니다.");
			sessionStorage.removeItem('sj-state');
			localStorage.removeItem('sj-state');
		} else {
			Snackbar("통신이 원활하지 않습니다.");
		}
	});
}
// Login fucntion
function Sign_in(){
	let user_id = $("#user_id").val();
	let user_pw = $("#user_pw").val();
	if ($("#user_id").val() == "") {
		Snackbar("학번 또는 교번을 입력해주세요.");
		$("#user_id").focus();
		return;
	} else if ($("#user_pw").val() == "") {
		Snackbar("비밀번호를 입력해주세요.");
		$("#user_pw").focus();
		return;
	}
	let send_data = {id: user_id, pw: user_pw};
	$("#loading_modal").removeClass("loading_modal_unvisible");
	let a_jax = A_JAX("http://"+host_ip+"/sign_in_up", "POST", null, send_data);
	$.when(a_jax).done(function () {
		$("#loading_modal").addClass("loading_modal_unvisible");
		if (a_jax.responseJSON['result'] == 'success') {
			let token = a_jax.responseJSON['access_token'];
			sessionStorage.setItem('sj-state', token);
			a_jax = A_JAX("http://"+host_ip+"/get_userinfo", "GET", null, null);
			$.when(a_jax).done(function () {
				if (a_jax.responseJSON['result'] == 'success') {
					Snackbar("맞춤 서비스를 시작합니다.");
					$("#user_id").val("");
					$("#user_pw").val("");
					if (a_jax.responseJSON['auto_login'] == 1)
						localStorage.setItem("sj-state", sessionStorage.getItem('sj-state'));
					After_login(a_jax.responseJSON);
					login_modal_onoff();
				} else if (a_jax.responseJSON['result'] == 'not found') {
					Snackbar("비정상적인 접근입니다.");
					localStorage.removeItem('sj-state');
					sessionStorage.removeItem('sj-state');
				} else if (a_jax['status'].toString().startswith('4')) {
					Snackbar("올바르지 않은 접근입니다.");
					sessionStorage.removeItem('sj-state');
					localStorage.removeItem('sj-state');
				} else {
					Snackbar("통신이 원활하지 않습니다.");
				}
			});
		} else if (a_jax.responseJSON['result'] == 'not sejong') {
			Snackbar("올바르지 않은 계정입니다.");
			localStorage.removeItem('sj-state');
			sessionStorage.removeItem('sj-state');

		} else if (a_jax.responseJSON['result'] == 'incorrect pw') {
			Snackbar("비밀번호를 다시 입력해주세요.");
			localStorage.removeItem('sj-state');
			sessionStorage.removeItem('sj-state');
		} else if (a_jax.responseJSON['result'] == 'api error') {
			Snackbar("세종대학교 전산서비스 오류입니다.");
		} else if (a_jax['status'].toString().startswith('4')) {
			Snackbar("올바르지 않은 접근입니다.");
			sessionStorage.removeItem('sj-state');
			localStorage.removeItem('sj-state');
		} else {
			Snackbar("통신이 원활하지 않습니다.");
		}
	});
}
function Enter_login() {
	if (window.event.keyCode == 13) {
        if ($("#user_id").val() == "") {
        	Snackbar("학번 또는 교번을 입력해주세요.");
        	$("#user_id").focus();
        } else if ($("#user_pw").val() == "") {
        	Snackbar("비밀번호를 다시 입력해주세요.");
        	$("#user_pw").focus();
        } else {
        	Sign_in();
        }
    }
}
// login modal input event
$(document).ready(function(){
	let formInputs = $('#user_id,#user_pw');
	formInputs.focus(function() {
       $(this).parent().children('p.formLabel').addClass('formTop');
	});
	formInputs.focusout(function() {
		if ($.trim($(this).val()).length == 0){
			$(this).parent().children('p.formLabel').removeClass('formTop');
		}
	});
	$('p.formLabel').click(function(){
		 $(this).parent().children('.login_input').focus();
	});
});
// After login, setting user information.
async function After_login(dict) {
	check_manager_qualification();
	$("#login_button").addClass("display_none");
	$("#view_button").removeClass("display_none");
	$("#like_button").removeClass("display_none");
	$("#logout_button").removeClass("display_none");
	let w = $(document).width();
	let id = dict["user_id"];
	let major = dict["user_major"];
	let name = dict["user_name"];
	greetings.push(major + ",");
	let hello = greetings[Math.floor(Math.random() * greetings.length)];
	hello = hello + " " + dict['user_name'] + "님";
	$("#user_info").text(hello);
	$("#user_info_mobile").text(hello);
	//if (w < 1200) {
	if (mobilecheck()) {
		$("#user_login_mobile").addClass("display_none");
		$("#user_info_mobile").removeClass("display_none");
	} else {
		$("#user_login").addClass("display_none");
		$("#user_info").removeClass("display_none");
	}
	// 메인에서 검색을 했다면 검색 결과 호출
	if (window.location.href.search("#search?") != -1) {
		// 로딩 모달 제거
		$("#mobile_controller_none").addClass("display_none");
		$("#board_loading_modal").addClass("board_loading_modal_unvisible");
		$(".mobile_controller").removeAttr("style");
		$("#none_click").addClass("display_none");
		let text = decodeURI(window.location.href);
		text = text.split("#search?")[1];
		//window.location.href = "/board#";
		text = text.split("/")[0];
		text = text.replace(/\+/g, " ");
		await search_text(text);
	} else if (window.location.href.search("#") != -1) {
		await URL_Detection();
	} else { // 메인에서 검색을 하지않았다면 추천 뉴스피드 호출
		//get_recommend_posts(1);
		location.replace("/board#recommend");
	}
}

// button click ripple event
$("html").on("click", ".ripple", function(evt) {
	let ripple = $(evt.currentTarget);
	let x = evt.pageX - ripple.offset().left;
	let y = evt.pageY - ripple.offset().top;
	let duration = 1000;
	let animationFrame, animationStart;
	let animationStep = function(timestamp) {
		if (!animationStart) {
			animationStart = timestamp;
		}
		let frame = timestamp - animationStart;
		if (frame < duration) {
			let easing = (frame/duration) * (2 - (frame/duration));
			let circle = "circle at " + x + "px " + y + "px";
			let color = "rgba(0, 0, 0, " + (0.3 * (1 - easing)) + ")";
			let stop = 90 * easing + "%";
			ripple.css({
				"background-image": "radial-gradient(" + circle + ", " + color + " " + stop + ", transparent " + stop + ")"
			});
			animationFrame = window.requestAnimationFrame(animationStep);
		} else {
			$(ripple).css({
				"background-image": "none"
			});
			window.cancelAnimationFrame(animationFrame);
		}
	};
	animationFrame = window.requestAnimationFrame(animationStep);
});


function Go_home() {
	window.location.href = "/";
}

function Login() {
	menu_modal_onoff();
	login_modal_onoff();
}
function Logout() {
	localStorage.removeItem("sj-state");
	sessionStorage.removeItem("sj-state");
	location.reload();
}
function pageUp() {
	scroll(0,0);
	$("#pc_search_input").focus();
}



/*
let service_key = ``;
let base_date = `1231`;
let base_time = `0230`;
let nx = `62`;
let ny = `126`;
let _type = `json`;
$.when(A_JAX_CORS(`http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?
ServiceKey=${service_key}
$base_date=${base_date}
&base_time=${base_time}
&nx=${nx}
&ny=${ny}
&_type=${_type}`, "GET"
)).done(function (data) {
	console.log(data);
});
*/


/*
xml2jsonCurrentWth(62, 126);
function xml2jsonCurrentWth(nx, ny){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();

    if(minutes < 30){
        // 30분보다 작으면 한시간 전 값
        hours = hours - 1;
        if(hours < 0){
            // 자정 이전은 전날로 계산
            today.setDate(today.getDate() - 1);
            dd = today.getDate();
            mm = today.getMonth()+1;
            yyyy = today.getFullYear();
            hours = 23;
        }
    }
    if(hours<10) {
        hours='0'+hours
    }
    if(mm<10) {
        mm='0'+mm
    }
    if(dd<10) {
        dd='0'+dd
    } 

    var _nx = nx,
    _ny = ny,
    apikey = "",
    today = yyyy+""+mm+""+dd,
    basetime = hours + "00",
    fileName = "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData";
    fileName += "?ServiceKey=" + apikey;
    fileName += "&base_date=" + today;
    fileName += "&base_time=" + basetime;
    fileName += "&nx=" + _nx + "&ny=" + _ny;
    fileName += "&pageNo=1&numOfRows=6";
    fileName += "&_type=json";

    console.log(fileName);
    $.ajax({
    	jsonpCallback: 'jsonCallback',
    	crossOrigin : true,
        url: fileName,
        type: 'GET',
        cache: false,
        dataType: "jsonp",
        success: function(data) {
        	console.log(data);
            var myXML = rplLine(data.responseText);
            var indexS = myXML.indexOf('"body":{"items":{'),
                indexE = myXML.indexOf("}]}"),
                result = myXML;
//                result = myXML.substring(indexS, indexE);
            var jsonObj = $.parseJSON('[' + result + ']'),
                rainsnow = jsonObj[0].response.body.items.item[0].obsrValue,
                sky = jsonObj[0].response.body.items.item[4].obsrValue,
                temp = jsonObj[0].response.body.items.item[5].obsrValue;
            console.log("하늘 상태 : " + sky + " / 눈 비 상태 : " + rainsnow + " / 온도 : " + temp)
        },
        error:function(request,status,error){
        	console.log(request);
            alert("다시 시도해주세요.\n" + "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
        });

}
// xml2jsonCurrentWth

function rplLine(value){
    if (value != null && value != "") {
        return value.replace(/\n/g, "\\n");
    }else{
        return value;
    }
}
// rplLine
*/