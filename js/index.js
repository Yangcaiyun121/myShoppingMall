window.addEventListener('load', function () {
    var arrow_l = this.document.querySelector('.arrow_l');
    var arrow_r = this.document.querySelector('.arrow_r');
    var focus = this.document.querySelector('.focus');
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击右箭头事件
            arrow_r.click();
        }, 2000);
    });
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var focuswidth = focus.offsetWidth;
    // 根据图片数量动态创建小圆圈
    for (var i = 0; i < ul.children.length - 1; i++) {
        var li = this.document.createElement('li');
        // 点击小圆圈 图片跳转

        li.addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index - 1;
            animate(ul, -focuswidth * index);
        });
        ol.appendChild(li);
        li.setAttribute('index', i);
    }
    ol.children[0].className = 'current';
    // 点击右侧箭头，图片滚动一张
    var num = 0;
    // 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag == true) {
            flag = false;
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;

                // ul.style.transform = 'translateX(0px)' ;
            }
            num += 1;
            animate(ul, -num * focuswidth, function () {
                flag = true;
            });

            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            /* if(num == ol.children.length){
                num = 0;
            } */
            ol.children[num].className = 'current';
        }
    });
    arrow_l.addEventListener('click', function () {
        if (flag) {
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focuswidth + 'px';
                num = ul.children.length - 1;
            }
            num -= 1;
            animate(ul, -num * focuswidth, function () {
                flag = true;
            });
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            ol.children[num].className = 'current';
        }
    });

    // 自动播放轮播图
    var timer = this.setInterval(function () {
        // 手动调用点击右箭头事件
        arrow_r.click();
    }, 2000);
})


//电梯导航
$(function(){
    //显示隐藏电梯导航模块
    var toolTop = $(".recom ").offset().top;
    toggleTool();
    function toggleTool() {
        if($(document).scrollTop() >= toolTop){
            $(".fixedtool").fadeIn();
        }else{
            $(".fixedtool").fadeOut();
        }
    }
    var flag = true;   //节流阀 （互斥锁）
    $(window).scroll(function(){
        toggleTool();
        // 滑动页面电梯导航自动添加current类
        if(flag){
            $(".floor .w").each(function(i,ele){
                if($(window).scrollTop() >= $(ele).offset().top){
                    $(".fixedtool li").eq(i).addClass("current").siblings("li").removeClass("current");
                }
            });
        }
    });
    // 点击导航模块跳转到相应模块
    $(".fixedtool li").click(function(){
        flag = false;
        var index = $(this).index();
       var top = $(".floor .w").eq(index).offset().top;
        // $(document).scrollTop(top);
        $("body,html").stop().animate({
            scrollTop: top
        },function(){
            flag = true;  //动画执行完毕后的回调函数
        });
       // 点击当前li添加current类 兄弟删除类名
       $(this).addClass("current").siblings("li").removeClass("current");
       
    });
    
})