
$(document).ready(function(){
    onepage_set();
    quickClick();
    indiClick();
    text_event();

    //게이지 차는거
    $('.page3').mouseenter(function(){
        $('.ninety').css({
            width : 0
        }).animate({
            width : "90%"
        },2000)
        $('.seventy').css({
            width : 0
        }).animate({
            width : "70%"
        },2000)
    })
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

        //해당페이지의 총 높이 구하고
		for(let i=1; i <= click_idx; i++)
		{
			length+=$(".page"+i).height();
		}

        //작동중일 땐 안되게
		if($("body").find(".fullpage:animated").length >= 1) return false;
        
        //css 효과 주는거
		$(this).addClass("on").siblings().removeClass("on");
        $('.indi_ul li').eq(click_idx).addClass('in').siblings().removeClass('in');
		
        //총 높이 구해준만큼 움직이게
		$(".fullpage").animate({"top": -length + "px"},800, "swing");
		return false;
    })
};
function indiClick(){
   $(document).on('click','.indi_ul li',function(){
    let click_idx = $(this).index();
    console.log(click_idx);
    $('.navi_li').eq(click_idx).trigger('click')

   });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
function text_event(){

    let text_cnt = $('.intro_text p').length;
    
    for(let i = 0; i < text_cnt; i++)
    $('.intro_text p').eq(i).delay(i*300).animate({
        top:'0',
        opacity : '1'
    },1000)
}
