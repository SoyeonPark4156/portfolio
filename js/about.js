$(document).ready(function(){

    $(window).scroll(function(){
        let bottom_of_window = $(window).scrollTop() + $(window).height();
        let info_sec_top = $('.shop_info_sec').offset().top;

        if(bottom_of_window >= info_sec_top){
            $('.info_img_box').animate({
                opacity : '1',
                left : 0
            },1500)

            $('.info_ment_box').animate({
                opacity : '1',
                right : 0
            },1500)
        }

        // let slogan_sec_top = $('.shop_slogan_sec').offset().top + ($('.shop_slogan_sec').height() / 2);
        let slogan_sec_top = $('.shop_slogan_sec').offset().top;
        if(bottom_of_window >= slogan_sec_top){
            $('.slogan_box').eq(0).animate({
                top: 0,
                opacity : '1'
            },500)
            $('.slogan_box').eq(1).delay(250).animate({
                top: 0,
                opacity : '1'
            },500)
            $('.slogan_box').eq(2).delay(750).animate({
                top: 0,
                opacity : '1'
            },500)

        }
        
    })
})