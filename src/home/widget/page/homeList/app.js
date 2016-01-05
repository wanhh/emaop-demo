var endDown=require('common:widget/ui/plugin/countdown.js');
var app={
    init:function(){
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

        this.searchParam=window.emao.searchParam||{
            brandId:0,
            sellType:0,
            carriageId:0,
            carFrom:0,
            price:0
        }
        this.$priceForm=$('.price-form');
        this.$priceTo=$('.price-to');
        this.$priceSure=$('.price-sure');
        this.updataPriceInput();
        this.bindEvent();
        $('.home-time').endDown();
    },
    bindEvent:function(){
        var that=this;
        $('.price-input input').keyup(this.inputChange.bind(this));
        $('.price-input input').change(this.inputChange.bind(this));
        this.$priceSure.click(this.priceSureClickHandler.bind(this));

    },
    inputChange:function(){
        var formPrice=this.$priceForm.val()||'';
        var toPrice=this.$priceTo.val()||'';
        formPrice=formPrice.replace(/\D/g,'');
        toPrice=toPrice.replace(/\D/g,'');
        formPrice&&(formPrice=formPrice-0);
        toPrice&&(toPrice=toPrice-0);
        this.$priceForm.val(formPrice);
        this.$priceTo.val(toPrice);
    },
    priceSureClickHandler:function(){
        var formPrice=this.$priceForm.val();
        var toPrice=this.$priceTo.val();
        if(!formPrice||!toPrice){
            return;
        }
        location.href=this.getSearchUrl({'price':formPrice+'_'+toPrice});
    },
    getSearchUrl:function(obj){
        var urlPrev='/city/'+emao.curCity.pinyin+'/car';
        var json=$.extend(this.searchParam,obj);
        var url=urlPrev;
        url+='-';
        url+=json['sellType'];
        url+='-';
        url+=json['brandId'];
        url+='-';
        url+=json['carriageId'];
        url+='-';
        url+=json['price'];
        url+='-';
        url+=json['carFrom'];
        url+='-1.html';
        return url
    },

    updataPriceInput:function(){
        var price=this.searchParam.price+'';
        var priceList=price.split('_');
        if(priceList.length!=2)return;
        this.$priceForm.val(priceList[0])
        this.$priceTo.val(priceList[1])
    }
}
return app;
