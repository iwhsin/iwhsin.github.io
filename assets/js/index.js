import * as $env from './variable.js';

$(function () {
    toTop();
    siteTime();
    // initCopyAction(!$env.copy_enable);
    signboard($env.live2d_enable);
    clickHeart1();
    // clickHeart2();
    // bgc();
})

// 快速回到顶部
function toTop() {
    $.goup({
        location: 'right', //default right
        trigger: 100,//在向下滚动多少像素后，必须显示按钮(绕过alwaysVisible)
        bottomOffset: 50, // 按钮与屏幕底部边缘相距多少像素
        locationOffset: 30,// 根据设置的位置，按钮距屏幕边缘多少像素
        // containerSize: 40, // 按钮的宽度和高度（最小为20）
        // containerRadius: 33,// 让您将正方形变换成圆形
        containerColor: '#36bc98',// 容器的颜色（十六进制格式）
        // arrowColor: '#36bc98',//箭头的颜色（十六进制格式）
        // alwaysVisible: true,//始终可见
        title: '回到顶部',
        // titleAsText: true,//如果为true，则悬停标题将变为按钮下的真实文本
    });
}

// 拷贝监听
function initCopyAction(prevent) {
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

// 看板娘
function signboard(live2d) {
    if (live2d) {
        $('.waifu').show();
        live2d_settings['modelId'] = 1;
        live2d_settings['modelTexturesId'] = 2;
        live2d_settings['showToolMenu'] = false;
        live2d_settings['modelStorage'] = false;
        live2d_settings['waifuSize'] = '180x150';
        live2d_settings['waifuTipsSize'] = '145x45';
        live2d_settings['showCopyMessage'] = true;//内容被复制触发提醒，true | false
        live2d_settings['waifuMinWidth'] = '768px';//面页小于 指定宽度 隐藏看板娘，例如 'disable' (停用)，'768px'
        live2d_settings['waifuEdgeSide'] = 'right:0,bottom:40';//看板娘贴边方向，例如 'left:0' (靠左 0px)，'right:30' (靠右 30px)
        live2d_settings['waifuDraggable'] = 'unlimited';//拖拽样式，可选 'disable' (禁用)，'axis-x' (只能水平拖拽)，'unlimited' (自由拖拽)
        live2d_settings['waifuDraggableRevert'] = 'true';//松开鼠标还原拖拽位置
        initModel("assets/plugins/live2d/assets/waifu-tips.json")
    } else {
        $('.waifu').hide();
    }
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

// 站点运行时间统计
function siteTime() {
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth() + 1;
    var todayDate = today.getDate();
    var todayHour = today.getHours();
    var todayMinute = today.getMinutes();
    var todaySecond = today.getSeconds();
    /* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳)
    year - 作为date对象的年份，为4位年份值
    month - 0-11之间的整数，做为date对象的月份
    day - 1-31之间的整数，做为date对象的天数
    hours - 0(午夜24点)-23之间的整数，做为date对象的小时数
    minutes - 0-59之间的整数，做为date对象的分钟数
    seconds - 0-59之间的整数，做为date对象的秒数
    microseconds - 0-999之间的整数，做为date对象的毫秒数 */
    var t1 = Date.UTC(2020, 5, 21, 13, 14, 0);
    var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
    var diff = t2 - t1;
    var diffYears = Math.floor(diff / years);
    var diffDays = Math.floor((diff / days) - diffYears * 365);
    var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
    var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
    var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
    var span = document.getElementById("sitetime");
    if (span) {
        span.innerHTML = " 本站已安全运行 " + diffYears + " 年 " + diffDays + " 天 " + diffHours + " 小时 " + diffMinutes + " 分 " + diffSeconds + " 秒 ";
    }
    window.setTimeout(function () {
        siteTime()
    }, 1000);
}