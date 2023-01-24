
$(document).ready(function(){
    onepage_set();
    quickClick();
    indiClick();
    // text_event();
});

function onepage_set(){
    let page_cnt = $('.fullpage .fullsection').size();
    console.log(page_cnt)

    for(let i = 1; i <= page_cnt; i++){
        $('.indi_ul').append("<li></li>");
    }
    
    $('.indi_ul li:first-child').addClass('in');// 첫 화면의 인디케이터 효과 넣어놓기
    $('.navi_ul li:first-child').addClass('on');// 첫 화면의 메뉴 효과 넣어놓기

    //마우스 휠 이벤트
    $(window).on("mousewheel",function(event){
        let page = $('.navi_li.on'); //현재 on 되어 있는 페이지

        //현재 애니메이션이 작동 하고 있으면 빠져나가기
        if($("body").find(".fullpage:animated").length >= 1) return false;
        // if($(".fullpage:animated")) return false;

        //마우스 휠을 아래로 - 음수
        if(event.originalEvent.wheelDelta < 0){
            let next_page = page.index() + 1;
        
            if(next_page < page_cnt){ //마지막 페이지가 아닐때만 animate !
				let page_h =0;
				for(let i = 1; i<= next_page; i++){ 
					//총 페이지 길이 구하기
					//ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
					page_h += $(".page"+i).height();
				}
				$(".fullpage").animate({"top": -page_h + "px"},1000, "swing");

                //메뉴랑 인디버튼옮기기
                page.next().addClass("on").siblings().removeClass("on");
                $('.indi_ul li').eq(next_page).addClass('in').siblings().removeClass('in');
			}
        }
        //마우스 휠을 위로 - 양수
        else if(event.originalEvent.wheelDelta >= 0){
            let prev_page = page.index() - 1;
            if(page.index() > 0){
                
                let page_h = 0;
                for(let i = 1; i <= prev_page; i++){
                    page_h += $('.page'+i).height();
                }
                $(".fullpage").animate({"top": -page_h + "px"},1000, "swing");

                page.prev().addClass("on").siblings().removeClass("on");
                $('.indi_ul li').eq(prev_page).addClass('in').siblings().removeClass('in');
            }
        }
    });
    
    $(window).resize(function(){
        win_resize();
    })
    // text_event();
}
function win_resize(){
    let resize_idx = $('.navi_li.on').index() + 1;
    let page_h = 0;
    for(var i = 1; i<resize_idx; i++){ 
        //총 페이지 길이 구하기
        //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
        page_h += $(".page"+i).height();
    }

    $(".fullpage").css({
        "top": -page_h + "px"
    });
}
// 사이드 퀵버튼 클릭 이동

function quickClick(){
	$(".navi_li").click(function(){
		let click_idx = $(this).index();
		let length=0;
		for(let i=1; i <= click_idx; i++)
		{
			length+=$(".page"+i).height();
		}
		if($("body").find(".fullpage:animated").length >= 1) return false;
        
		$(this).addClass("on").siblings().removeClass("on");
        $('.indi_ul li').eq(click_idx).addClass('in').siblings().removeClass('in');
		
		$(".fullpage").animate({"top": -length + "px"},800, "swing");
		return false;
    }
)};
function indiClick(){
   $(document).on('click','.indi_ul li',function(){
    let click_idx = $(this).index();
    console.log(click_idx);
    $('.navi_li').eq(click_idx).trigger('click')

   });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
function text_event(){
    $('.intro_text').animate({
        left : '50%'
    },1000)
    let text_cnt = $('.text_area p').length;
    
    for(let i = 0; i < text_cnt; i++)
    $('.text_area p').delay(i*200).animate({
        opacity : '1'
    },1000)
}
