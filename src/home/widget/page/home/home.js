var utils=require("common:widget/ui/base/base.js").utils;
var endDown=require('common:widget/ui/plugin/countdown.js');
var $container=$(".s_container");
var app={
    init:function(imgdata){
        //console.log(imgdata);
        $('.gooditem img').lazyLoad({
            topCls:'.gooditem',
            beforeBind:function(){
                this.$el.parents('.gooditem').css('opacity',0);
            },
            loadHandler:function(){
                this.$el.parents('.gooditem').css('opacity',1);
            },
            loadAction:function(){
                this.$el.parents('.gooditem').css('opacity',1);
            }
        });
        $('.gg img').lazyLoad();
        this.imgData=imgdata||{};
        this.len=$(imgdata).length;
        this.prevIndex=0;
        this.curIndex=0;
        this.$ul=$(".slide-img");
        this.$li=this.$ul.find('li');
        this.$slideMenu=$('.slide-menu');
        this.dir='left';
        this.width=$container.width();
        //this.reset();
        this.updataImg();
        this.bindEvent();
        this.startAutoMove();
        $('.home-time').endDown();
        if(this.len==1){
            $('.slide-prev,.slide-next').hide();
        }

    },
    bindEvent:function() {
        var that = this;
        var $liFirst = $(".menu li:first");
        $(".menu li:first,.subCategory").hover(function () {
            clearTimeout(that.hideTimer);
            $liFirst.addClass('active');
            $(".subCategory").show();
        }, function () {
            that.hideTimer = setTimeout(function () {
                $liFirst.removeClass('active');
                $(".subCategory").hide();
            }, 300);
        });
        $(".slide-menu li").click(function () {
            var index = $(this).index();

            that.stopAuotMove();
            //$(this).addClass("active").siblings().removeClass("active");
            //that.slideMenu($(this));
            that.switchTo(index, function () {
                that.startAutoMove();
            });
        });
        $(".slide-prev").click(function(){
            var index=that.curIndex-1;
            that.stopAuotMove();
            that.dir='right';
            that.switchTo(index, function () {
                that.startAutoMove();
            });
        });
        $(".slide-next").click(function(){
            var index=that.curIndex+1;
            that.stopAuotMove();
            that.dir='left';
            that.switchTo(index, function () {
                that.startAutoMove();
            });
        });
        $container.hover(that.stopAuotMove.bind(this), that.startAutoMove.bind(this));
    },
    updataImg:function(){
        var $imgs=this.$ul.find('img');
        $imgs.each(function(i,item){
          var src=$(item).attr('src');
          var img=document.createElement('img');
            img.onload=function(){
                $(item).css(utils.zoomImg(this,900,400));
            };
            img.src=src;
        })
        this.$ul.find('img').load(function(){
            utils.zoomImg(this);
        });
        this.$ul.find('img').each(function(){
            var src=$(this).attr('loadSrc');
            if(!src)return;
            $(this).attr('src',$(this).attr('loadSrc'))
        })
    },
    switchTo:function(index,callback){
        var that=this;
        if(this.len<=1) return;
        if(index==that.curIndex)return;
        index=(index+this.len)%this.len;
        var stepWid=null;

        if(that.dir=='left'){
            stepWid=-this.width;
        }else{
            stepWid=this.width;
        }
        this.$li.eq(index).css('left',-stepWid).show();
        var moveObj={
            left:stepWid
        };
        var callbackFun=function(){
            that.curIndex=index;
            that.reset();
            callback&&callback.call(that);
            that.isMoving=false;
        };
        this.updataMenu();
        if(this.isMoving){
            this.$ul.stop();
            this.$ul.css(moveObj);
            callbackFun();
        }else{
            this.isMoving=true;
            this.$ul.stop(true).animate(moveObj,700,callbackFun);
        }


    },
    reset:function(){
        this.$ul.css('left',0);
        this.$li.eq(this.curIndex).css('left',0).siblings().hide();
        this.updataMenu();
    },
    updataMenu:function(){
        $(".slide-menu li").eq(this.curIndex).addClass("active").siblings().removeClass("active");

    },
    autoMove:function(){
        var that=this;
        var callee=arguments.callee;
        clearTimeout(this.timer);
        that.dir='left';
        that.switchTo((that.curIndex+1)%that.len,function(){
            that.timer=setTimeout(function(){
                callee.call(that);
            },5000)

        });

    },
    stopAuotMove:function(){
        clearTimeout(this.startTimer);
        clearTimeout(this.timer);

    },
    startAutoMove:function(){
        if(this.len<=1) return;
        var that=this;

        this.startTimer=setTimeout(function(){
            that.autoMove();
        },2000);

    }


}
return app;