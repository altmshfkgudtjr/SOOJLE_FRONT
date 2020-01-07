function Go_feedback() {
	out_of_search();
	now_topic = "Feedback";
	where_topic = "Feedback";
	now_state = "Feedback";
	$("#board_info_board").text("SOOJLE");
	$("#board_info_text").text("피드백 보내기");
	$("#posts_target").empty();
	$("#posts_creating_loading").removeClass("display_none");
	window.scrollTo(0,0);
	menu_modal_onoff();
	insert_feedbacl_div();
}

function insert_feedbacl_div() {
	let div =	`<div class="setting_subject_wrap">
					<div class="setting_title noselect">사용자 피드백</div>
					<div class="setting_title_info noselect">
						수즐에게 사용자 의견을 공유할 수 있습니다.
					</div>
				</div>
				<div class="selectbox_container">
					<div class="selectbox_dropdown">
						<div class="selectbox_select">
							<span>구분</span>
							<i class="fa fa-chevron-left"></i>
						</div>
						<input type="hidden" name="gender">
						<ul class="selectbox_dropdown-menu">
							<li id="feedback_pc_bug">데스크탑 버그 및 오류</li>
							<li id="feedback_mobile_bug">모바일/태블릿 버그 및 오류</li>
							<li id="feedback_hack">취약점 및 보안 개선</li>
							<li id="feedback_design">디자인 개선 아이디어</li>
							<li id="feedback_function">기능 개선 아이디어</li>
						</ul>
					</div>
				</div>
				<div></div>
				`;
	$("#posts_target").append(div);
	$("#posts_creating_loading").addClass("display_none");
	selectbox_action();
}

// Select Box JS
function selectbox_action() {
	/*Dropdown Menu*/
	$('.selectbox_dropdown').click(function () {
	        $(this).attr('tabindex', 1).focus();
	        $(this).toggleClass('selectbox_active');
	        $(this).find('.selectbox_dropdown-menu').slideToggle(300);
	    });
	    $('.selectbox_dropdown').focusout(function () {
	        $(this).removeClass('selectbox_active');
	        $(this).find('.selectbox_dropdown-menu').slideUp(300);
	    });
	    $('.selectbox_dropdown .selectbox_dropdown-menu li').click(function () {
	        $(this).parents('.selectbox_dropdown').find('span').text($(this).text());
	        $(this).parents('.selectbox_dropdown').find('input').attr('value', $(this).attr('id'));
	    });
	/*End Dropdown Menu*/
	$('.dropdown-menu li').click(function () {
	  var input = '<strong>' + $(this).parents('.selectbox_dropdown').find('input').val() + '</strong>',
	      msg = '<span class="msg">Hidden input value: ';
	});
}