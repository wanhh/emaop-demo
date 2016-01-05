$.createCache = function( requestFunction ) {
    var cache = {};
    return function( key, callback ) {
        if ( !cache[ key ] ) {
            cache[ key ] = $.Deferred(function( defer ) {
                requestFunction( defer, key );
            }).promise();
        }
        return cache[ key ].done( callback );
    };
};
$.cachedGetScript = $.createCache(function( defer, url ) {
    $.getScript( url ).then( defer.resolve, defer.reject );
});
$.loadImage = $.createCache(function( defer, url ) {
    var image = new Image();
    function cleanUp() {
        image.onload = image.onerror = null;
    }
    defer.then( cleanUp, cleanUp );
    image.onload = function() {
        defer.resolve( url );
    };
    image.onerror = defer.reject;
    image.src = url;

});
$.fn.animatePromise = function( prop, speed, easing, callback ) {
    var elements = this;
    return $.Deferred(function( defer ) {
        elements.animate( prop, speed, easing, function() {
            defer.resolve();
            if ( callback ) {
                callback.apply( this, arguments );
            }
        });
    }).promise();
};
Function.prototype.bind = Function.prototype.bind||function (oThis) {
    if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ? this:oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};
(function($){
    function Tip(msg,btn,pos){
        this.msg=msg;
        this.$btn=$(btn);
        this.time=2000;
        this.id='tip-'+(new Date).getTime();
        this.tpl=['<span id="'+this.id+'" class="span-tip">'+this.msg+'</span>'].join('');
        this.pos=pos;
        this.init();
    }
    $.extend(Tip.prototype,{
        init:function(){
            if(this.inited)return;
            this.createDOM();
            this.autoRemove();
            this.inited=true;
        },
        createDOM:function(){
            this.remove();
            this.$el=$(this.tpl);
            var offset=this.$btn.offset()||{};
            var w=this.$btn.width();
            var h=this.$btn.height();
            var lineHeight=h;
            var top=offset.top;
            var left=offset.left+w+10;
            if(this.pos==3){
                top=offset.top+h;
                left=offset.left;
                lineHeight=24;
            }
            this.$el.css({
                position:'absolute',
                top:top,
                left:left,
                fontSize:'12px',
                color:'red',
                lineHeight:lineHeight+'px',
                zIndex:9999
            });
            this.$el.appendTo('body');
        },
        remove:function(){
            $('#'+this.id).remove();
        },
        autoRemove:function(){
            this.timer&&clearTimeout(this.timer);
            this.timer=setTimeout(this.remove.bind(this),this.time);
        }
    });
    $.fn.tip=function(msg,pos){
        var tip;
        for(var i=0;i<this.length;i++){
            tip=new Tip(msg,this[i],pos);
        }
        return this;
    };
})($);
$.fn.lazyLoad=(function($,$win){
    function LazyLoad(opts){
        this.opts=opts;
        this.$el=opts.$el;
        var lazySrc=this.$el.attr(opts.lazySrcKey)||"";
        if(!this.$el[0].hasAttribute(opts.lazySrcKey)){
            return;
        }
        this.lazySrc=lazySrc;
        this.$topEl=this.$el;
        if(this.opts.topCls&&this.$el.parents(this.opts.topCls).length){
            this.$topEl=this.$el.parents(this.opts.topCls);
        }
        this.elTop=this.$topEl.offset().top;
        this.elH=this.$topEl.height();
        this.$el.removeAttr(opts.lazySrcKey);
        this.opts.beforeBind.call(this);
        this.bindEvent();
        this.updataScroll();

    };
    LazyLoad.prototype={
        bindEvent:function(){
            this.$el[0].onload=this.opts.loadHandler.bind(this,{status:1});
            this.$el[0].onerror=this.opts.loadHandler.bind(this,{status:0});
            $win.scroll(this.updataScroll.bind(this));
            $win.resize(this.updataScroll.bind(this));
        },
        updataScroll:function(){
           if(this.srcLoaded)return;
           var winH=$win.height();
           var winTop=$win.scrollTop();
           this.elTop=this.elTop||this.$el.offset().top;
           this.elH=this.elH||this.$topEl.height();
           if(this.elTop+this.elH+this.opts.topBuffer>=winTop&&this.elTop-this.opts.bottomBuffer<=winTop+winH){
               this.loadSrc();
           }
        },
        loadSrc:function(){
            if(this.srcLoaded)return;
            this.$el.attr('src',this.lazySrc);
            this.srcLoaded=true;
            this.opts.loadAction.call(this);
        }
    };
    return function(opts) {
        var defaults = {
            beforeBind: function () {},
            loadHandler: function () {},
            loadAction: function () {},
            lazySrcKey: 'lazy-src',
            topCls: '',
            topBuffer: 0,
            bottomBuffer: 0
        };
        opts = $.extend(defaults, opts);
        for (var i = 0; i < this.length; i++) {
            opts.$el = $(this[i]);
            new LazyLoad(opts)
        }
    }
})($,$(window));
