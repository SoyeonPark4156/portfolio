/*
let mb_count = $('.main_banner').length;
let curr_mb_idx = 0;
$(document).ready(function(){

    //인디케이터 삽입
    for(let i=0;i<mb_count;i++){
        $('.mb_indicator').append('<div class="mb_indi_dot"></div>');
    };
    //첫번째 배너 들어오기 & 인디케이터 active
    $('.main_banner').eq(curr_mb_idx).css({left: 0});
    $('.mb_indi_dot').eq(curr_mb_idx).addClass('indi_active');

    //다음 버튼 눌렀을 때 
    $(document).on('click','#next_btn', function(){ 
        main_slide(curr_mb_idx % mb_count, '-100%', (curr_mb_idx + 1) % mb_count, '100%', 1000); 
    })
    //이전 버튼 눌렀을 대
    $(document).on('click','#prev_btn', function(){ 
        main_slide(curr_mb_idx % mb_count, '100%', (curr_mb_idx - 1) % mb_count, '-100%', 1000); 
    })

    //main_banner에 마우스 올리면 auto로 돌아가는거 멈추게
    $(document).on('mouseenter','.main_banner',function(){
        clearInterval(inter_mb);
    });
    $(document).on('mouseleave','.main_banner', function(){ 
        clearInterval(inter_mb);
        auto_mb_slide();
    }); 

});

let slide_chk = true;
function main_slide(o_idx,o_pos,c_idx,c_pos,mb_timer){

    //버튼 1초간 막기
    if(slide_chk) {
        slide_chk = !slide_chk;
        setTimeout(function(){  
           slide_chk = !slide_chk; 
        }, 1000);

        //나갈판
        $('.main_banner').eq(o_idx).animate({
            left : o_pos
        },mb_timer)

        //들어올판
        $('.main_banner').eq(c_idx).css({
            left : c_pos
        }).animate({
            left : 0
        },mb_timer)

        curr_mb_idx = c_idx;


        //인디케이터 active
        $('.mb_indi_dot').eq(o_idx).removeClass('indi_active');
        $('.mb_indi_dot').eq(c_idx).addClass('indi_active');
    }   
}

function auto_mb_slide(){
    inter_mb = setInterval(function() {   
        $('#next_btn').trigger('click') 
     }, 2000)
    }

auto_mb_slide();

*/
////////////////////////////////////////////////////////////////////////////////
/* fadeIn, fadeOut 으로 다시 만든거 */
let mb_count = $('.main_banner').length;
let curr_mb_idx = 0;

$(document).ready(function(){

    //인디케이터 삽입
    for(let i=0;i<mb_count;i++){
        $('.mb_indicator').append('<div class="mb_indi_dot"></div>');
    };
    //첫번째 배너 들어오기 & 인디케이터 active
    $('.main_banner').eq(curr_mb_idx).css({display:"block"});
    $('.mb_indi_dot').eq(curr_mb_idx).addClass('indi_active');

    //다음 버튼 눌렀을 때 
    $(document).on('click','#next_btn', function(){ 
        mb_slide(curr_mb_idx % mb_count, (curr_mb_idx + 1) % mb_count); 
    })
    //이전 버튼 눌렀을 대
    $(document).on('click','#prev_btn', function(){ 
        mb_slide(curr_mb_idx % mb_count, (curr_mb_idx - 1 % mb_count)); 
    })

    //main_banner에 마우스 올리면 auto로 돌아가는거 멈추게
    $(document).on('mouseenter','.main_banner',function(){
        clearInterval(inter_mb);
    });
    $(document).on('mouseleave','.main_banner', function(){ 
        clearInterval(inter_mb);
        auto_slide();
    }); 

    //indicator 클릭하는거에 따라
    $(document).on('click', '.mb_indi_dot', function(){
        mb_slide(curr_mb_idx % mb_count, $(this).index()); 
     })

});

let mb_slide_chk = true;
function mb_slide(o_idx, c_idx) {
    //버튼막기
    if(mb_slide_chk) {
        mb_slide_chk = !mb_slide_chk;
        setTimeout(function(){  
            mb_slide_chk = !mb_slide_chk; 
        }, 500);

        // 나갈판(fadeOut)
        // 나갈때 확 나가게 하려고 딜레이 줬다가 fadeout에 시간을 0줌
        $('.main_banner').eq(o_idx).css({zIndex:1}).delay(500).fadeOut(0);

        // 들어올판(fadeIn)
        //들어올때는 서서히
        $('.main_banner').eq(c_idx).css({zIndex:99}).fadeIn(300);

        curr_mb_idx = c_idx;

        //인디케이터 active
        $('.mb_indi_dot').eq(o_idx).removeClass('indi_active');
        $('.mb_indi_dot').eq(c_idx).addClass('indi_active');
    }
};

function auto_slide(){
    inter_mb = setInterval(function(){
        $('#next_btn').trigger('click') 
    },2000);
};

auto_slide();

//광고사진배너 스크롤 이벤트 fadeIn
$(document).ready(function(){
    $(window).scroll(function(){
        let window_bottom = $(window).scrollTop() + $(window).height();
        let ab_top = $('.ad_banner_wrap').offset().top;
        if(window_bottom >= ab_top){
            $('.ad_banner').eq(0).animate({
                left : 0,
                opacity : 1
            },1000)
            $('.ad_banner').eq(1).delay(400).animate({
                right : 0,
                opacity : 1
            },1000)
            $('.ad_banner').eq(2).delay(800).animate({
                left : 0,
                opacity : 1
            },1000)
            $('.ad_banner').eq(3).delay(1200).animate({
                right : 0,
                opacity : 1
            },1000)
            
        }
    });

});




