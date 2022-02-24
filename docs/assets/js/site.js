// 全局变量定义
// 是否禁止复制功能
const COPY_PREVENT = false;

$(function(){
    // 快速回到顶部
    toTop();
    initCopyAction();
})


// 快速回到顶部
function toTop(){
    $.goup({
        location: 'right', //default right
        trigger: 100,//在向下滚动多少像素后，必须显示按钮(绕过alwaysVisible)
        bottomOffset: 32, // 按钮与屏幕底部边缘相距多少像素
        locationOffset: 32,// 根据设置的位置，按钮距屏幕边缘多少像素
        containerSize: 40, // 按钮的宽度和高度（最小为20）
        containerRadius: 33,// 让您将正方形变换成圆形
        containerColor: '#525252f2',// 容器的颜色（十六进制格式）
        arrowColor: '#42b983',//箭头的颜色（十六进制格式）
        // alwaysVisible: true,//始终可见
        title: '回到顶部',
        // titleAsText: true,//如果为true，则悬停标题将变为按钮下的真实文本
    });
}

// details标签联动
function detailsClick(){
    $('details').click(function () {
        $('details[open]').not(this).removeAttr('open');

        if (!this.open) {
            $('.' + this.className).not(this).attr('open', '');
        } else {
            $('.' + this.className).not(this).removeAttr('open', '');
        }
    })
}

/**
 * 拷贝操作
 */
function initCopyAction(){

    if (COPY_PREVENT) {
        // 禁止内容复制，清空剪切板
        document.body.onbeforecopy = function () {
            document.getSelection().empty();
        }
    }
    // 复制完成提示信息
    document.body.oncopy = function () {
        // 禁止内容复制，弹窗提示
        if(COPY_PREVENT) {
            swal("很抱歉，当前内容不允许复制 ",
            "如果你觉得本仓库不错，那就来 GitHub 给个 Star 吧！！！",
            "error");
        } else {
            swal("复制成功！！！", "","success");
        }
        
    };

    
}
