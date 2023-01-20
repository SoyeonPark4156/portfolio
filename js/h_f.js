$(document).ready(function(){
    // top_banner 0 번째거 위치 초기화
    $('.tb_item').eq(0).css({top: 0});
 
    let inter_tb = "";
    let inter_tb_timer = 2000;
    let inter_tb_idx = 0;
 
    inter_tb = setInterval(() => {
       // 나갈거
       $('.tb_item').eq((inter_tb_idx) % 3).animate({
          top: '-100%'
       }, 500)
 
       // 들어올거
       $('.tb_item').eq((inter_tb_idx + 1) % 3).css({
          top: '100%'
       }).animate({
          top: '0'
       }, 500)
       
       inter_tb_idx+=1;
       
    }, inter_tb_timer);
    
    //탑배너 "X" 버튼 클릭하면 사라지게
    $(document).on('click','.tb_delete',function(){
        $(".top_banner").remove();
        $('.header').animate({
            paddingTop : 0
        },300)
        
    });

    //반응형 햄버거 버튼
    let ham_chk = true;
    $(document).on('click','.side_ham_box',function(){
        $(".side_menu_box").toggleClass('side_menu_show')
        $('.side_menu_bg').toggleClass('side_bg_show')

        if(ham_chk){
            ham_chk = false;
            
            $('.side_menu_wrap').css({
                zIndex: '9999'
            });
            $('.side_ham_line:nth-child(1)').css({
                transform: 'translateY(9px)'
            });
            setTimeout(() => {
                $('.side_ham_line:nth-child(1)').css({
                    transform: 'translateY(9px) rotate(45deg)',
                    background: '#fff'
                })
            }, 300);

            setTimeout(() => {
                $('.side_ham_line:nth-child(2)').css({ opacity: '0' })
            }, 300);

            $('.side_ham_line:nth-child(3)').css({
                transform: 'translateY(-9px)',
                transition: 'all 0.3s'
            });
            setTimeout(() => {
                $('.side_ham_line:nth-child(3)').css({
                    transform: 'translateY(-9px) rotate(-45deg)',
                    background: '#fff'
                })
            }, 300);
        }
        else{
            ham_chk = true;
            setTimeout(() => {
                $('.side_menu_wrap').css({
                    zIndex: '0'
                })
            }, 500);

            $('.side_ham_line:nth-child(1)').css({
                transform: 'translateY(8px) rotate(0)'
            });
            setTimeout(() => {
                $('.side_ham_line:nth-child(1)').css({
                    transform: 'translateY(0px) rotate(0)',
                    background: '#737373'
                })
            }, 300);

            setTimeout(() => {
                $('.side_ham_line:nth-child(2)').css({ opacity: '1' })
            }, 300);

            $('.side_ham_line:nth-child(3)').css({
                transform: 'translateY(-8px) rotate(0)',
                transition: 'all 0.3s'
            });
            setTimeout(() => {
                $('.side_ham_line:nth-child(3)').css({
                    transform: 'translateY(0) rotate(0)',
                    background: '#737373'
                })
            }, 300);
        }
    });
    
    //사이드바 안에 있는 SHOP메뉴 클릭이벤트
    let sub_chk = true;
    $(document).on('click','.show_li_btn',function(){
        if(sub_chk){
            sub_chk = false;
            $('.sub_ul').slideDown(300);
            $('.show_li_btn').css({
                transform : 'rotateX(180deg)'
            })
        }
        else {
            sub_chk = true;
            $('.sub_ul').slideUp(300);
            $('.show_li_btn').css({
                transform : 'rotateX(0)'
            })
        }
    });

    //헤더 사이즈 바꾸고 따라다니게 스크롤이벤트
    let header_height = $('.header').height();
    let main_o_top = $('.main').offset().top;
    $(window).scroll(function(){
        let header_bot = $(window).scrollTop();

        if(header_bot >= main_o_top){
            $('.tb_delete').trigger('click')
            $('.header').addClass('header_event');
            $("#wrap").css({
                paddingTop: header_height
            })
            $('.header_logo').css({
                width : '10vw',
                padding: '5px'
            })

        }
        else{
            $('.header').removeClass('header_event');
            $("#wrap").css({
                paddingTop: 0
            })
            $('.header_logo').css({
                width : '25vw',
                padding: '10px'
            })
        };

    });

 });      
 
   