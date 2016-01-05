var base=require('common:widget/ui/base/base.js');
var utils=base.utils;
var header={
    init:function(){
        $('.reg-link,.login-link,.logout-link').each(function(){
            var url='http://i.emao.com/?act='+$(this).attr('act')+'&callbackUrl='+encodeURIComponent(location.href);
            $(this).attr('href',url);
        });
        utils.checkIfLogin(this.updataLogin.bind(this),function(){});
        this.bindEvent();
        this.setCityCookie();
    },
    updataLogin:function(json){
        var $el= $('.ul-hasLogin');
        if(json.code!=9999){
            $('.ul-noLogin').hide();
            $el.find('.avatar img').attr('src',json.data.avatar);
            $el.find('.logined').html(json.data.nickname);
            $el.show();
        }
    },
    setCityCookie:function(){
        if(!window.emao['mall_cityId'])return;
        $.cookie('mall_cityId', window.emao['mall_cityId'], { expires: 1, path: '/',domain: 'emao.com'});
    },
    bindEvent:function(){
        var that = this;
        var timer=null;
        $('.adress-put').hover(function(){
            clearTimeout(timer);
            $(".adre-tips").show();
        },function(){
            timer=setTimeout(function(){
                $(".adre-tips").hide();
            },300)
        });
    }
};
return header;

