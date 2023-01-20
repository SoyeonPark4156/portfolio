$(document).ready(function(){
    $('.header').css({
        paddingTop : 0
    })

    // //카테고리 메뉴들 스크롤 따라다니게
    // $(window).scroll(function(){
    //     let window_top = $(window).scrollTop();
    //     let header_height = $('.header').height();
    //     if(window_top >= header_height)
    //     {
    //         $('.cate_box').css({
    //             top : header_height
    //         })
    //     }
    //     else if(window_top < header_height){
    //         $('.cate_box').css({
    //             top : '210px'
    //         })
    //     }
    //     console.log(window_top,header_height)
    // })

    let cate_href = $('.cate_menu_li a').href;
    console.log(cate_href);
    
});

function make_cate_page(){
    let url = location.href;
    url = url.split("?");
    let cate_no = get_url_info("cate");
    if(url.length > 1){
        load_list(cate_no, 0, 10);
        load_list(cate_no, 0, 10);
    }
    else{load_all_list();}
}
make_cate_page();
