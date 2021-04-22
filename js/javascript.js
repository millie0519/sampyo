//헤더 메뉴
$(function(){
    const $gnb = $('header>nav>.gnb>li');
    const $sub = $gnb.find('.sub');
    let nowIdx = 0;

    //메인메뉴에 포인터 진입
    $gnb.on('mouseenter', function(){
        nowIdx = $gnb.index(this);
        $sub.eq(nowIdx).fadeIn(500);
    });

    //메인메뉴에서 포인터 떠남
    $gnb.on('mouseleave', function(){
        $sub.hide();    
    });
});

//메인배너 슬라이드
$(function(){
    const $slide = $('section.banner>.banner-container');
    const $pagination = $('section.banner>.button>.pagination>li');
    let nowIdx = 0;
    let intervalKey = null;

    //슬라이드 실행함수
    const slidemove = function(){
        $slide.stop().animate({
            left:-940*nowIdx
        },1000);
        $pagination.eq(nowIdx).addClass('on').siblings().removeClass('on');
    };

    //자동실행 멈춤 함수
    const autoOff = function(){
        clearInterval(intervalKey);
        $('.auto-play').removeClass('pause');
    };

    $pagination.on('click', function(evt){
        evt.preventDefault();
        nowIdx = $pagination.index(this);

        slidemove();
        autoOff();
    });

    $('.banner').on('mouseenter', function(){
        $('.prev').animate({
            left:0
        });
        $('.next').animate({
            right:0
        });
    });
    $('.banner').on('mouseleave', function(){
        $('.prev').animate({
            left:-42
        });
        $('.next').animate({
            right:-42
        });
    });


    $('.prev').on('click',function(evt){
        evt.preventDefault();

        if(nowIdx>0){
            nowIdx--;
        }else{
            nowIdx=2;
        }
        slidemove();
        autoOff();
    });
    $('.next').on('click',function(evt){
        evt.preventDefault();

        if(nowIdx<2){
            nowIdx++;
        }else{
            nowIdx=0;
        }
        slidemove();
        autoOff();
    });


    //자동실행
    $(window).on('load',function(){
        intervalKey = setInterval(function(){
            if(nowIdx<2){
                nowIdx++;
            }else{
                nowIdx=0;
            }
            slidemove();
        },3000);
    });
    
    $('.auto-play').on('click', function(evt){
        evt.preventDefault();

        if($(this).hasClass('pause')){ // 재생중
            autoOff();
        }else{
            intervalKey = setInterval(function(){
                if(nowIdx<2){
                    nowIdx++;
                }else{
                    nowIdx=0;
                }
                slidemove();
            },3000);
            $(this).addClass('pause');
        }

    });

});

// Recruit fade슬라이드
$(function(){
    const $slide = $('section.content>.part2>.recruit-slide>ul>li');
    const $slide_sampyo = $('section.content>.part2>.recruit-slide>ul>li.sampyo-people');
    const $slide_interv = $('section.content>.part2>.recruit-slide>ul>li.interviewer');

    const $btn_play = $('section.content>.part2>.recruit-slide>.auto-play>.play');
    const $btn_pause = $('section.content>.part2>.recruit-slide>.auto-play>.pause');
    let intervalKey = null;

    let nowIdx = 0;
    let oldIdx = null;

    const autoPlay = function(){
        intervalKey = setInterval(function(){
            oldIdx = nowIdx;

            if(nowIdx<1){
                nowIdx++;
            }else{
                nowIdx=0;
            }

            $slide.eq(oldIdx).fadeOut(1000);
            $slide.eq(nowIdx).fadeIn(1000);
        },4000);
    };

    $slide_sampyo.find('h2>a').on('click',function(evt){
        evt.preventDefault();
        clearInterval(intervalKey);

        $slide_sampyo.fadeOut(1000);
        $slide_interv.fadeIn(1000);

        $btn_pause.addClass('on');
        $btn_play.removeClass('on');

    });
    $slide_interv.find('h2>a').on('click',function(evt){
        evt.preventDefault();
        clearInterval(intervalKey);

        $slide_interv.fadeOut(1000);
        $slide_sampyo.fadeIn(1000);

        $btn_pause.addClass('on');
        $btn_play.removeClass('on');
    });

    $(window).on('load', function(){
        autoPlay();
    });

    $btn_play.on('click', function(evt){
        evt.preventDefault();
        autoPlay();

        $(this).addClass('on');
        $btn_pause.removeClass('on');
    });
    $btn_pause.on('click', function(evt){
        evt.preventDefault();
        clearInterval(intervalKey);

        $(this).addClass('on');
        $btn_play.removeClass('on');
    });
});

//옵션박스
$(function(){
    const $select_group = $('section.content>.part3>.findway .group>.selct');
    const $select_area = $('section.content>.part3>.findway .area>.selct');

    const $group_list = $('section.content>.part3 .group>.list>ul');
    const $area_list = $('section.content>.part3 .area>.list>ul');

    $select_group.on('click', function(){
        $group_list.toggle();
    });
    $select_area.on('click', function(){
        $area_list.toggle();
    });

    $select_group.parent().on('mouseleave',function(){$group_list.hide();});
    $select_area.parent().on('mouseleave',function(){$area_list.hide();});


    $group_list.find('a').on('click', function(evt){
        evt.preventDefault();

        const name = $(this).text();

        $select_group.find('input').val(name);
        $group_list.hide();
    });
    $area_list.find('a').on('click', function(evt){
        evt.preventDefault();

        const name = $(this).text();

        $select_area.find('input').val(name);
        $area_list.css({display:'none'})
    });

});

