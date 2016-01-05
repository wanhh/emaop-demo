var base=require("common:widget/ui/base/base.js");
var selectedCls='selected';
var hoverCls='hover';
var app={
    init:function(list){
        this.$el=$('.leftnav');
        this.$navul=this.$el.find('ul');
        this.$navli=this.$el.find('li');
        this.$navitem=this.$el.find('.lfnav-item');
        this.$levelnav=$('.level-nav');
        this.$win=$(window);
        this.list=new base.listModel(list||[]);
        this.scrollTop=this.$win.scrollTop();
        if(this.list.length<1)return;
        this.updateModel();
        this.bindEvent();
        this.scrollHandler();
    },
    updateModel:function(){
        var that=this;
        this.list.each(function(i,item){
            item.top=$('.level-nav-'+item.id).offset().top;
        })
    },
    bindEvent:function(){
        var that=this;
        this.$navli.on('mouseenter',function(){
            if($(this).hasClass(selectedCls))return;
            $(this).addClass(hoverCls).siblings().removeClass(hoverCls);
        });
        this.$navul.on('mouseleave',function(){
            that.$navli.removeClass(hoverCls);
        });
        this.$navli.on('click',function(){
            var id=$(this).attr('data-id');
            that.changeSelectId(id);
        });
        this.$win.scroll(function(){
            that.scrollTimer&&clearTimeout(that.scrollTimer);
            that.scrollTimer=setTimeout(that.scrollHandler.bind(that),200);
        });
        this.$win.resize(function(){
            that.changeSelectId(that.list.selectId,true);
        });

    },
    changeSelectId:function(id,noScroll){
        this.list.selectId=id;
        if(!id||this.$win.width()<1345){
            this.hide();
        }else{
            this.show();
        }
        this.updateNav();
        !noScroll&&this.updateScrollTop();
    },

    updateNav:function(){
        var id=this.list.selectId;
        $('.lfnav-li-'+id).addClass(selectedCls).siblings().removeClass(selectedCls);
    },
    updateScrollTop:function(){
        var id=this.list.selectId;
        var $nav=$('.level-nav-'+id);
        var top=this.$win.scrollTop();
        $('html,body').animatePromise({
            scrollTop:$nav.offset().top
        },100);
    },
    getIdByTop:function(top){
        var id='';
        for(var i=0;i<this.list.length;i++){
            if(top>=(this.list[i].top-20)){
                id= this.list[i].id;
            }
        }
        return id;

    },

    scrollHandler:function(){
        var top=this.$win.scrollTop();
        var id=this.getIdByTop(top);
        this.changeSelectId(id,true);
        this.scrollTop=top;
    },
    show:function(){
        this.$el.fadeIn(300);
    },
    hide:function(){
        this.$el.fadeOut(200);
    }

}
return app;