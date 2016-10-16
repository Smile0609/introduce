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
        //需求：鼠标放到a上,当前位置切换到指定的图片。
        //步骤：
        //1.获取相关元素。
        //2.循环为a绑定事件。
        //3.图片切换到指定位置（移动ul，因为所有的li都在ul中）

        //1.获取相关元素。
        var slider = document.getElementById("sliderR");
        var workE = document.getElementsByClassName('workExperience')[0];
        var liWidth = workE.offsetWidth;
        var timeline = document.getElementById('timeline');
        var aArr = timeline.children;
        //2.循环为a绑定事件。
        for(var i=0;i<aArr.length;i++){
            //属性绑定，获取索引值
            aArr[i].index = i;
            //aArr[i].onclick = function () {
            //    animate(-liWidth*this.index,slider);
            //}
            aArr[i].addEventListener('touchstart', function () {
                animate(-liWidth*this.index,slider);
            })
        }
    }
//匀速框架
    function animate(target,obj){
        clearInterval(obj.timer);
        var speed = target-obj.offsetLeft>0?10:-10;
        obj.timer = setInterval(function () {
            obj.style.left = obj.offsetLeft+speed+"px";
            if(Math.abs(target-obj.offsetLeft) <= Math.abs(speed)){
                obj.style.left = target+"px";
                clearInterval(obj.timer);
            }
        },20);
}
