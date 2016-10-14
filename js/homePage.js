//首页显示特效
$(document).ready(function () {
    $('.content-img').animate({
        'marginTop':'0',
    },2000, function () {
        $('.content-motto').slideDown(500, function () {
            $('.content-information>p').eq(0).fadeIn(800, function () {
                $(this).next().fadeIn(800, function () {
                    $(this).next().fadeIn(800, function () {
                        $(this).next().fadeIn(800, function () {
                            $('.content-img').children('img').eq(0).css('display','none').next('img').css('display','block').fadeIn(1000)
                        })
                    })
                })
            });
        })
    });
})

$(function () {
    $('.header-left-introduce').on('touchstart', function () {
        $(this).children('p').eq(0).html('Resume').next('p').html('前端工程师');
    })
    $('.header-left-introduce').on('touchend', function () {
        $(this).children('p').eq(0).html('F2E').next('p').html('个人简历');
    })

    //第三页专业技能
    $('.skillList>ul:eq(0)>li>a').val(function (index,a) {
        $('.skillList>ul:eq(0)>li>a').eq(index).on('click', function () {
            $('.skillList-square-content').css('display','none');
            $('.skillList-square-content').eq(index).fadeIn(1000).siblings($('.skillList-square-content')).css('display','none');
        })
    })

    //第五页我的经历
    $('.moreDemo>p:eq(1)>a').on('click', function () {
        $('.model-demo').addClass('bounce');
        $('.model').fadeIn(100);
    })
    $('.model-demo>button').on('click', function () {
        $('.model').fadeOut(1000);
    })
})


