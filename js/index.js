window.onload = function() {
    slide();
    slider();
};

function slide () {
    var slide = document.querySelector('#slide');
    var layout = document.querySelector('#layout');
    var slideHeight = layout.offsetHeight;
    var index = 0;
    var slideLi = slide.querySelectorAll('li[class="clearfix"]');
    /**
     * 1.得知道滑动的距离 如果是正值就切换到 切换到上一张
     * 2.如果是负值就切换到下一张
     * 3.添加2个事件 touchstart touchend  获取开始和结束的位置相减
     */
    var startY = 0;
    var endY = 0;
    var moveY = 0;
    var distanceY = 0; //滑动中的距离

    slide.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
    slide.addEventListener('touchend', function (e) {
        endY = e.changedTouches[0].clientY;
        if (endY - startY > 0 && Math.abs(endY - startY) > 1 / 3 * slideHeight) {
            // 切换到上一张
            index--;
            if (index < 0) {
                index = 0;
            }
        } else if (endY - startY < 0 && Math.abs(endY - startY) > 1 / 3 * slideHeight) {
            // 切换到下一张
            index++;
            if (index > 5) {
                index = 5;
            }
        }
        addTransition();
        setTranslateY(-slideHeight * index);


        for (var i = 0;i<slideLi.length;i++){
            slideLi[i].className ='clearfix';
        }
        slideLi[index].className +=" "+'current';
    });
    //1.得知道滑动过程中 滑动的距离
    //2.获取到了这个距离 设置到当前的定位位置
    //3. 从上一次最后的位置加上这个距离
    slide.addEventListener('touchmove', function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        removeTransition();
        setTranslateY(-slideHeight * index + distanceY);
    });

    function setTranslateY(y) {
        slide.style.transform = "translateY(" + y + "px)";
    }

    function removeTransition() {
        slide.style.transition = "none";
    }

    function addTransition() {
        slide.style.transition = "all 1s";
    }
}

//第四页我的经历
function slider() {
    /**
     * 1.轮播图可以自动播放
     * 2.无缝轮播图
     * 3.轮播图要支持滑动 从左往右滑  切换到上一张 从右往左滑要换到 下一张
     * 4.滑动中要能预览上一张或者下一张
     * 5.滑动距离超过轮播图的1/3的时候才切换 如果不超过 吸附回去
     *
     */

        //1.获取相关元素。
        var slider = document.getElementById("sliderR");
        var workE = document.getElementsByClassName('workExperience')[0];
        var liWidth = workE.offsetWidth;
    // 定义一个计数的变量也就是轮播图的下标（索引）
    var index = 1;
    // 轮播图可以自动播放要有定时器
    var timer;
    var startX = 0;
    var endX = 0;
    var moveX = 0;
    var distanceX = 0; //滑动中的距离

    function timerr() {
        timer = setInterval(function() {
            index++;
            addTransition();
            setTranslateX(-liWidth * index);
        }, 2000);
    }
    timerr();
    // 添加一个过渡完成事件
    slider.addEventListener('transitionend', function() {
        //过渡完成事件
        if (index >= 4) {
            index = 1;
            removeTransition()
            setTranslateX(-liWidth * index);
        } else if (index <= 0) {
            index = 8;
            removeTransition()
            setTranslateX(-liWidth * index);
        }
    });
    /**
     * 1.得知道滑动的距离 如果是正值就切换到 切换到上一张
     * 2.如果是负值就切换到下一张
     * 3.添加2个事件 touchstart touchend  获取开始和结束的位置相减
     */
    slider.addEventListener('touchstart', function(e) {
        // 滑动的时候就不要自动播清除定时器
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        console.log(endX - startX);
        if (endX - startX > 0 && Math.abs(endX - startX) > 1 / 3 * liWidth) {
            // 切换到上一张
            index--;
        } else if (endX - startX < 0 && Math.abs(endX - startX) > 1 / 3 * liWidth) {
            // 切换到下一张
            index++;
        }
        addTransition();
        setTranslateX(-slideWidth * index);
        clearInterval(timer);
        timerr();
    });
    //1.得知道滑动过程中 滑动的距离
    //2.获取到了这个距离 设置到当前的定位位置
    //3. 从上一次最后的位置加上这个距离
    slider.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(-liWidth * index + distanceX);
    });

    function setTranslateX(x) {
        slider.style.transform = "translateX(" + x + "px)";
    }

    function removeTransition() {
        slider.style.transition = "none";
    }

    function addTransition() {
        slider.style.transition = "all 1s";
    }
}
