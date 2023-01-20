const cate_arr = ['giftset', 'living', 'bath', 'kitchen', 'vegan']; 

function get_url_info(key){
    let url = location.href;
    url = url.split("?");

    if(url.length > 1){
        url = url[1];           // "cate=0&item_no=1"
        url = url.split('&');   // [cate=0  ,  item_no=1]

        for(let i=0; i<url.length; i++) {
            let tmp_url = url[i].split("="); // cate=0  =>  [cate  , 0]

            if(tmp_url[0] == key) {
                return tmp_url[1]
            }
        }
        return -1;
    }
};

function load_list(cate_idx, start_idx, show_qty){
    let rs = ITEM_LIST[cate_idx];

    let tmp_qty = start_idx+show_qty;
    if(tmp_qty > rs.length) {
        tmp_qty = rs.length
    }

    for(let i = 0; i < rs.length; i++){
        let list = `<div class="item_box">
                        <a href="./deal.html?cate=${cate_idx}&item=${i+1}">
                            <div class="item_img">
                                <img src="${rs[i].src}" class="item_main_img" alt="">
                                <img src="${rs[i].covered_src}" class="item_cover_img" alt="">
                            </div>
                            <div class="item_title_box">
                                <div class="item_title">${rs[i].title}</div>
                                <div class="item_price">`
                    if(rs[i].s_price){
                        list += `<p class="s_price">${rs[i].s_price.toLocaleString('kr')}원</p>` 
                         $('.o_price').addClass('del')
                    }
                        list += `<p class="o_price">${rs[i].o_price.toLocaleString('kr')}원</p>
                                </div>
                            </div>
                        </a>
                    </div>`
        

        $('.item_list_box').append(list);
    }
}
//모든 제품 로드하기
function load_all_list(){
    for(let i = 0; i < ITEM_LIST.length; i++){
        load_list(i,0,10);
    }
}

$(document).ready(function(){

    //상단으로 이동시켜주는 버튼 이미지 폴더에 아이콘 있음
    $(window).scroll(function(){
        if ($(this).scrollTop() > 500){
            $('.btn_gotop').css({
                display : 'block'
            });
            $('.btn_gobottom').css({
                display : 'block'
            });
        }
        else{
            $('.btn_gotop').css({
                display : 'none'
            });
            $('.btn_gobottom').css({
                display : 'none'
            });
        }
    });
    let w_height = $(window).outerHeight();
    $('.btn_gotop').click(function(){
        $('html, body').animate({scrollTop:0},400);
    });
    $('.btn_gobottom').click(function(){
        $('html, body').animate({scrollTop:$(document).height()},400);
    });
});

////////////////////////////////////////////////////////////////////////////////
/* 스크롤 fadeInUp 이벤트 */
$(document).ready(function(){
    $(window).scroll(function(){
        $('.fadein_up').each(function(i){
            let top_of_this = $(this).offset().top;
            let bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > top_of_this ){
                $(this).animate({'opacity':'1','margin-top':'50px'},800);
            } 
        })
    })
})

