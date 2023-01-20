$(document).ready(function(){
    let cate_no = get_url_info("cate");
    let item_no = get_url_info("item"); 
    load_data(cate_no, item_no);
    total()

    //옵션박스클릭시 옵션 보이게
    $(document).on('click','.show_opt_btn',function(){
        $('.option_list').toggleClass('option_show')
        $(this).toggleClass('btn_rotate');
        if($('.option_list').hasClass('option_show')){
            $('.select_option').css({
                borderBottom : 'none'
            })
        }
        else{
            $('.select_option').css({
                borderBottom : '1px solid #97B38B'
            })
        }
    });
    //옵션선택시 옵션들 중복체크하고 선택한 옵션 보이게
    $(document).on('click','.option',function(){
        $('.show_opt_btn').trigger('click');

        let tmp_value = $(this).text();
        let list_count = $('.option_list').children().length;
        $('.select_option span').text(tmp_value);

        if(list_count > 0){ //이미 있을때-true, 없으면-false
            
            let chk = false; //중복체크

            for(let i = 0; i < list_count; i++ ){
                chk = $('.opt_name').eq(i).text() == tmp_value;
                console.log(chk)
                if(chk) break;
            }
            if(chk){
                alert("이미 선택한 옵션입니다.");
            }
            else{
                make_opt_list(tmp_value);  
            }
        }
        else{
              make_opt_list(tmp_value);  
            }
            
        total();
    })

    //옵션박스 지우는 리무브 함수
    $(document).on('click','.opt_del_btn',function(){
        $(this).parents('.option_selected_box').remove();
        total();
    });

    //수량 및 총금액 변경
    $(document).on('click','.btn_qty',function(){
        qty_change($(this));
        total();
    });

    //구매하기,장바구니 메세지 띄우는거
    $(document).on('click','.buy_btn',function(){
        alert("구매가 완료되었습니다.")
        location.reload();
    });
    $(document).on('click','.shopbag_btn',function(){
        alert("상품이 장바구니에 담겼습니다.")
        location.reload();
    });

});


//옵션 리스트 만들어줄 함수
function make_opt_list(tmp_value){

    let opt_list = `<div class="option_selected_box">
                        <div class="qty_select_wrap">
                            <span class="opt_name">${tmp_value}</span>
                            <span class="opt_del_btn">x</span>
                        </div>
                        <div class="qty_select_wrap">
                            <div class="opt_qty_box">
                                <input type="button" class="btn_qty txt_minus" value="-">
                                <input type="text" class="txt_qty" id="qty_num" value="1" readonly>
                                <input type="button" class="btn_qty txt_plus" value="+">
                            </div>
                            <div class="opt_price">${rs.o_price.toLocaleString('kr')}원</div>
                        </div>
                    </div>`
    
    $('.option_selected_sec').append(opt_list);

}

//상품별로 정보 가져다줄 함수
let qty_box = document.getElementById('qty_select_box'); //수량 선택 섹션, 옵션이 없는 경우에만 보여진다.
let rs = "";
function load_data(cate, item){

    rs = ITEM_LIST[cate][item-1]

    $('.item_img_sec img').attr('src',rs.src);
    $('.item_name').text(rs.title);
    $('.item_o_price').text(rs.o_price.toLocaleString('kr') + "원");
    $('.item_desc_img').attr('src',rs.desc_src);

    if(rs.s_price){
        // let list = `<span class = "s_price">${rs.s_price}원</sapn>` 
        $('.item_s_price').text(rs.s_price.toLocaleString('kr') + "원");
        $('.item_o_price').addClass('del')
    }

    if(rs.opt){
        let opt = rs.opt.split(',');
        
        let list = `<div class="item_option_sec">
                        <div class="detail_title">선택사항</div>
                        <div class="item_option">
                            <div class="select_option">
                            <span>선택하세요.</span>
                            <div class="show_opt_btn"></div>
                            </div>
                            <div class="option_list">
                                <div class="option" style ="pointer-events:none;">선택하세요.</div>
                            </div>
                        </div>
                    </div>`

        $('.item_select_sec').append(list); 
        
        for(let i = 0; i <opt.length; i++){
            let opt_list = `<div class="option">${opt[i]}</div>`
            $('.option_list').append(opt_list);       
        }

        qty_box.style.display = "none";
    }
};

function qty_change(el){
    let cur_tmp= 0;
    if(el.val() == "+"){
        cur_tmp = +el.prev().val();
        el.prev().val(++cur_tmp)
    }
    else if(el.val() == "-"){
        cur_tmp = +el.next().val();
        if(cur_tmp <= 1){
            alert('1개 이상 선택해야 합니다!')
        }
        else{
            el.next().val(--cur_tmp)
        }
    }
};

function total(){
    let final_qty = 0;
    let final_total = 0;
    // 클릭할 당시의 리스트 알맹이 개수
    let list_count = $('.option_selected_sec').children().length;

    console.log(list_count);
    if(list_count > 0){
        for(let i = 0; i < list_count; i++){
            let qty_count = +$('.option_selected_box').eq(i).find('#qty_num').val();
            console.log(qty_count)
            final_qty += qty_count;
            final_total += final_qty * rs.o_price;
        }
    }
    //옵션이 없는 경우에는 qty_box가 diplay:none 이 아니여서 토탈 수량을 1로 시작.
    if(qty_box.style.display != "none"){
        final_qty = 1;
        final_qty = +$('#qty_num').val();
        final_total = final_qty * rs.o_price;
    }

    $('.total_qty').text(final_qty + "개");
    $('.total_price').text(final_total.toLocaleString('kr') + "원");

}