var log=require('common:widget/ui/base/log.js');
var base=require('common:widget/ui/base/base.js');
var utils=base.utils;
var gotop={
    init:function(){
        var that=this;
        this.$el=$('#gotop');
        this.$online=$('.ask-online');
        this.$win=$(window);
        this.updata();
        this.bindEvent();
        this.$online.length&&utils.getLoginAskLink(function(link){
            that.$online.attr('href',link);
        });


    },
    bindEvent:function(){
        var that=this,timer;
        this.$win.scroll(function(){
            clearTimeout(timer);
            timer=setTimeout(function(){
                that.updata();
            },10)
        });
        this.$el.click(function(){
            $('html,body').animatePromise({
                scrollTop:0
            },500).then(that.updata.bind(that));
        });
        this.$online.click(log.ga5.bind(log));
    },
    updata:function(){
        var scrollTop= this.$win.scrollTop();
        scrollTop>0? this.$el.show():this.$el.hide();
    },
    show:function(){
        this.$el.show();
    },
    hide:function(){
        this.$el.hide();
    }
}
return gotop;