// document树加载完成后执行
$(function () { 

    //点击进入按钮进入首页
    $(".come-btn").click(
        function () {
            window.location.href = "find.html";
        }
    );
    //点击二手进入发现页面
    $(".content").eq(0).click(
        function () {
            window.location.href = "release.html";
        }
    );
    //点击转卖进入发布二手页面
    $(".content").eq(1).click(
        function () {
            window.location.href = "buying.html";
        }
    );
    
    //home-page-carsousel  轮播图
    var carsousel = $(".home-move").find("li");
    var timer = null;
    var currentIndex = 0; //轮播图片索引数，根据该数，确定轮播的图片，计算图片移动的位置
    var width = carsousel.find("img").eq(0).width();
    //自动轮播
    timer = setInterval(function () { 
        nextPlay();
     },1000);
     //鼠标进入轮播图，停止自动轮播
     $(".home-carsousel-main").mouseover(function(){
         timer = clearInterval(timer);
     });
     //鼠标离开轮播图，开始自动轮播
     $(".home-carsousel-main").mouseout(function(){
        timer = setInterval(function () {
            nextPlay();
          },1000)
    });
    //点击home-next图片，显示轮播的下一张图片
    $(".home-next").click(function(){
        nextPlay();
    });
    //点击home-previous图片，显示轮播的上一张图片
    $(".home-previous").click(function(){
        previousPlay();
    });
    //顺序轮播
    function nextPlay(){
        currentIndex++;
        if(currentIndex > carsousel.length - 1){
            $(".home-move").css("left",0);//轮播到最后一张图片，立即定位到第一张图片
            currentIndex = 0;
        }
        $(".home-move").animate({
            "left": -width * currentIndex,
        });
    }
    //倒叙轮播
    function previousPlay(){
        currentIndex--;
        if(currentIndex < 0){
            $(".home-move").css("left",-width * (carsousel.length - 1));//轮播到第一张图片，立即定位到最后一张图片
            currentIndex = carsousel.length - 1;
        }
        $(".home-move").animate({
            "left": -width * currentIndex,
        });
    }
    //home-footer 微信微博改变背景图片
    $(".home-weixin").hover(
        function(){
            $(this).attr("src","images/weixin.png");
        },
        function(){
            $(this).attr("src","images/weixin-dark.png");
        },
    );
    $(".home-weibo").hover(
        function(){
            $(this).attr("src","images/weibo.png");
        },
        function(){
            $(this).attr("src","images/weibo-dark.png");
        },
    );
    //release发布二手下拉框
    var classMenu = $(".select-postgoods").selectmenu({
        change:function(event,ui){
            var classId = ui.item.value;
            if(classId != "-1"){
                console.log(classId);
            }
        }
    });
    //商品详情点击图片切换图片
    $(".goodsdetailimg li").eq(0).addClass("goodsdetailimg-click").siblings().removeClass("goodsdetailimg-click");
    $(".goodsdetailimg li").click(function(){
        $(".goods-bigimg img").attr("src",$(this).children("img").attr("src"));
        $(this).addClass("goodsdetailimg-click").siblings().removeClass("goodsdetailimg-click");
    });
    //商品放大镜特效
    $(".goods-bigimg").hover(
        function(){
            $(".amplifier").css("display","block");
            $(".amplifier-big-img").css("display","block");
        },
        function(){
            $(".amplifier").css("display","none");
            $(".amplifier-big-img").css("display","none");
        }
    );
    $(".goods-bigimg").mousemove(function(event){
        var paddingLeft = parseInt($(this).css("padding-left"));
        var paddingTop = parseInt($(this).css("padding-top"));
        var paddingRight = parseInt($(this).css("padding-right"));
        var paddingBottom = parseInt($(this).css("padding-bottom"));
        // console.log(typeof(paddingLeft));
        //获取鼠标相对于图片移动的x y距离
        var translateX = event.pageX - $(this).offset().left -  $(".amplifier").width() / 2 - paddingLeft;
        var translateY = event.pageY - $(this).offset().top - paddingTop - $(".amplifier").height() / 2;

        if(translateX < 0){
            translateX = paddingLeft;
        }
        if(translateY < 0){
            translateY = paddingTop;
        }
        if(translateX > $(this).innerWidth() - paddingRight - $(".amplifier").width()){
            translateX = $(this).innerWidth() -paddingRight -  $(".amplifier").width();
        }
        if(translateY > $(this).innerHeight() - paddingBottom  - $(".amplifier").height()){
            translateY = $(this).innerHeight() - paddingBottom - $(".amplifier").height();
        }
        // console.log(translateX);
        $(".amplifier").css({
            "left":translateX + "px",
            "top":translateY + "px"
        });
        $(".amplifier-big-img img").css({
            "left": -translateX * ($(".goods-bigimg").width() / $(".amplifier").width()),
            "top": -translateY * ($(".goods-bigimg").height() / $(".amplifier").height())
        });
    });
    //个人中心导航栏切换显示相应信息
    $(".personal-navigation li:eq(0) a").addClass("personal-navclick");
    $(".personal-navigation li a").click(function(){
        $(this).addClass("personal-navclick").parent("li").siblings().children("a").removeClass("personal-navclick");
        // console.log($(this).parent("li").index());
        $(".nav-msgview>div").eq($(this).parent("li").index()).css("display","block").siblings().css("display","none");
        return false;
    });
    //修改个人资料和联系方式界面切换样式
    $("#changebasemsg").click(
        function () {
            if($(this).text() === "修改"){
                $(this).text("保存");
            }else{
                $(this).text("修改");
            }
            $(this).parents(".basemsg").children("div:not(.basemsg-title)").children("div:nth-of-type(2)").toggle();
            $(this).parents(".basemsg").children("div:not(.basemsg-title)").children("div:nth-of-type(3)").toggle();
        }
    );
    $("#changecontactways").click(
        function () {
            if($(this).text() === "修改"){
                $(this).text("保存");
            }else{
                $(this).text("修改");
            }
            $(this).parents(".basemsg").children("div:not(.basemsg-title)").children("div:nth-of-type(2)").toggle();
            $(this).parents(".basemsg").children("div:not(.basemsg-title)").children("div:nth-of-type(3)").toggle();
        }
    );
    $(".change-personalavatar").change(
        function(){
            $(".pc-avatar img").attr("src",URL.createObjectURL($(this)[0].files[0]));
        }
    );
    //发布/求购/收藏为空时进入相应页面
    $("#go-find").click(function () {
        window.location.href = "find.html";
    });
    $("#go-buyinng").click(function () {
        window.location.href = "buying.html";
    });
    $("#go-buyinng").click(function () {
        window.location.href = "release.html";
    });
    $(".home-goods li:first-child").click(function () {
        window.location.href = "goodsdetail.html";
    });
});
//回复框的显示和隐藏
function showreplymsgbox(id){
    $("."+id+"reviewbox").toggle("normal");
}
