import * as $Var from './variable.js';

$(function() {
    toTop();
    initCopyAction();
    clickHeart1();
    // clickHeart2();
    // bgc();
})

// 快速回到顶部
function toTop() {
    $.goup({
        location: 'right', //default right
        trigger: 100,//在向下滚动多少像素后，必须显示按钮(绕过alwaysVisible)
        bottomOffset: 52, // 按钮与屏幕底部边缘相距多少像素
        locationOffset: 32,// 根据设置的位置，按钮距屏幕边缘多少像素
        containerSize: 40, // 按钮的宽度和高度（最小为20）
        containerRadius: 33,// 让您将正方形变换成圆形
        // containerColor: '#525252',// 容器的颜色（十六进制格式）
        arrowColor: '#42b983',//箭头的颜色（十六进制格式）
        // alwaysVisible: true,//始终可见
        title: '回到顶部',
        // titleAsText: true,//如果为true，则悬停标题将变为按钮下的真实文本
    });
}

// 拷贝监听
function initCopyAction() {

    var prevent = $Var.COPY_PREVENT;

    if (prevent) {
        // 禁止内容复制，清空剪切板
        document.body.onbeforecopy = function () {
            document.getSelection().empty();
        }
    }
    // 复制完成提示信息
    document.body.oncopy = function () {
        // 禁止内容复制，弹窗提示
        if (prevent) {
            swal("很抱歉，当前内容不允许复制 ",
                "如果你觉得本仓库不错，那就来 GitHub 给个 Star 吧！！！", "error");
        } else {
            swal("复制成功 🎉", "如果你觉得本仓库不错，那就来 GitHub 给个 Star 吧 😊 - by Whsin", "success");
        }

    };
}


function clickHeart1() {
    var a_idx = 0
    $("body").click(function (e) {
        var a = new Array("做完事情的原则，是知道什么事先不要做", "闲时多读书，博览聚才气；众前慎言行，低调养清气", "我们的能力是有限的，有很多东西飘然于我们的视野与心灵之外", "不要盘算太多，要顺其自然。该是你的终会得到", "静静的心里，都有一道最美丽的风景", "成长的心灵，是空中的鸟迹，千言万语却述不到它真形", "物质向下比就满足快乐；精神向上比就纯净升华", "知识就像内裤，看不见但很重要", "成长的心灵，没有目的，有的只是处处笑声", "英雄不问出路，流氓不看岁数", "帅有个屁用！到头来还不是被卒吃掉！");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 5,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#FF69B4"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
            3000,
            function () {
                $i.remove();
            });
    });
}

function clickHeart2() {
    var a_idx = 0
    $("body").click(function (e) {
        var a = new Array("❤加油哦❤", "❤爱你❤", "❤欢迎您❤", "❤真棒👍🏻❤", "❤加油❤", "❤努力❤", "❤奋斗❤", "❤拼搏❤", "❤爱你❤", "❤forever❤", "❤爱你❤");
        var $i = $("<span></span>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
            1500,
            function () {
                $i.remove();
            });
    });
}


// 动态调整背景色
function bgc() {
    var SL = ', 100%, 5%';
    $("body").css("background", background(SL));
    $(".sidebar").css("background", background(SL));
    setTimeout(() => {
        $('.app-nav li ul').css("background", background(', 100%, 15%'))
    }, 1000);;
}

function background(sl) {
    return 'linear-gradient(to left bottom, ' +
        "hsl(" + (Math.floor(Math.random() * 255) + sl) + ") 0%," +
        "hsl(" + (Math.floor(Math.random() * 255) + sl) + ") 100%)";
}