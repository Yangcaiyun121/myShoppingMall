function animate(obj, target,callback) {
    // 先将原来的定时器清除
    clearInterval(obj.timer);
    // 缓动动画原理 将步长逐渐变小 （目标位置 - 盒子当前位置）/ 10
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;   //正数向上取整 负数向下取整
        step = step>0?Math.ceil(step):Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if(callback){
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px'
    }, 15);
}