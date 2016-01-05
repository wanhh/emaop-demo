/**
 * Created by xiaochao on 2015/4/29.
 */
function Pop(options){
    var defaults={
        tpl:['<div class="pop">',
            '<div class="pop-bg"></div>',
            '<div class="pop-cont">',
            '<div class="pop-cont-bg"></div>',
            '<div class="pop-box"></div>',
            '<div class="pop-close"></div>',
            '</div>',
            '</div>'].join(''),
        boxTpl:'',
        isRemove:0,
        id:'pop-'+(new Date).getTime(),
        width:594,
        height:414,
        callback:function(){},
        cls:''
    };
    this.opts= $.extend(defaults,options);
    this.init();
}
$.extend(Pop.prototype,{
    init:function(){
        if(this.inited)return;
        this.createDOM();
        this.bindEvent();
        this.inited=true;
    },
    createDOM:function(){
        this.$el=$('#'+this.opts.id);
        if(this.$el.length)return;
        this.$el=$(this.opts.tpl);
        this.$close=this.$el.find('.pop-close');
        this.$cont=this.$el.find('.pop-cont');
        this.$box=this.$el.find('.pop-box');
        this.$box.html(this.opts.boxTpl);
        this.$el.attr('id',this.opts.id);
        this.$el.addClass(this.opts.cls);
        this.$cont.css({
            width:this.opts.width,
            height:this.opts.height,
            marginTop:-this.opts.height/2,
            marginLeft:-this.opts.width/2
        });
        this.$el.appendTo('body');
    },
    bindEvent:function(){
        var that=this;
        this.$close.click(this.hide.bind(this));
        this.$el.find('.pop-btn').click(function(){
            var status=$(this).attr('status')-0;
            that.opts.callback(status);
            that.hide();
        })
    },
    hide:function(){
        this.$el.hide();
        if(this.opts.isRemove){
            this.$el.remove();
        }
    },
    show:function(){
        this.$el.show();
    }
});
return Pop;