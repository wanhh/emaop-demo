var Pop=require('common:widget/pop/pop.js');
var utils={
    json2Query: function(json) {
        if (json == null || typeof json != "object") return json;
        var query = [];
        for (var i in json) {
            query[query.length] = i + "=" + json[i];
        }
        return query.join("&");
    },
    query2Json: function( /*string*/ query) {
        if (query == null || typeof query != "string") return query;
        var json = {};
        var queryMap = query.split("&");
        for (var i = 0, len = queryMap.length; i < len; i++) {
            var s = queryMap[i].split("=");
            json[s[0]] =s.length<2?'':s[1];
        }
        return json;
    },
    html_encode : function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    },
    html_decode: function(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    },
    creatImage: function(data, src, options) {
        var img = document.createElement('img');
        options = options || {};
        img.onload = function(data) {
            return function() {
                if (options.loadHandler) {
                    options.loadHandler.call(this, data);
                }
            };
        }(data);
        img.onerror = function(data) {
            return function() {
                if (options.errorHandler) {
                    options.errorHandler.call(this, data);
                }
            };
        }(data);
        img.src = src;
        return img;
    },
    zoomImg:function(el,w,h){
        var $el=$(el);
        var $box=$el.parent();
        $box.css('overflow','hidden');
        w=w||$box.width();
        h=h||$box.height();
        $el.show();
        var elW=el.width;
        var elH=el.height;
        var obj={};
        if(elW/elH>w/h){
            obj={
                width:'auto',
                height:'100%',
                marginLeft:(w-(h*elW/elH))/2
            }
        }else{
            obj={
                width:'100%',
                height:'auto',
                marginTop:(h-w*elH/elW)/3
            }
        }
        $el.css(obj);
        return obj
    },
    zoomRightImg:function(el,w,h){
        var $el=$(el);
        var $box=$el.parent();
        $box.css('overflow','hidden');
        w=w||$box.width();
        h=h||$box.height();
        $el.show();
        var elW=$el.width();
        var elH=$el.height();
        if(elW/elH>w/h){
            $el.css({
                width:'auto',
                height:'100%',
                marginLeft:(w-(h*elW/elH))*0.6
            })
        }else{
            $el.css({
                width:'100%',
                height:'auto',
                marginTop:(h-w*elH/elW)/3
            })
        }
    },
    getLoginUrl:function(url){
        return 'http://i.emao.com/?act=login&callbackUrl='+encodeURIComponent(url||location.href);
    },
    checkIfLogin:function(successCallback,noLoginCallback){
        var that=this;
        noLoginCallback=noLoginCallback||function(){
            location.href=that.getLoginUrl();
        };
        if(!$.cookie("EMUSS")){
            noLoginCallback();
            return
        };
        $.ajax({
            url:window.URL.home+"?c=common/islogin&a=test",
            dataType:'jsonp'
        }).then(function(json){
            if (json.code == 9999) {//未登录
                noLoginCallback(json);
                return;
            }
            successCallback&&successCallback(json);
        });


    },
    getLoginAskLink:function(successCallback,noLoginCallback){
        var that=this;
        noLoginCallback=noLoginCallback||function(){
        };
        if(!$.cookie("EMUSS")){
            noLoginCallback();
            return
        };
        $.ajax({
            url:"http://mall.api.emao.com/newcar/public/?c=service&a=onlineTalkUrl&client=1",
            dataType:'jsonp'
        }).then(function(json){
            if (json&&json.data&&json.data.link) {
                successCallback(json.data.link);
                return;
            }
            noLoginCallback(json);
        });


    },
    getHashConf:function(){
        var hash = window.location.hash.replace(/^#/,"");
        var hashConf = (hash=="")?{}:this.query2Json(hash);
        return hashConf;
    },
    getHashConfItem:function (id){
        var hash = this.getHashConf();
        return hash[id];
    },
    setHashConfItem:function (id,v){
        var hash = this.getHashConf();
        hash[id] = v;
        window.location.hash = "#"+this.json2Query(hash);
    },
    delHashConfItem:function (id){
        var hash = this.getHashConf();
        delete hash[id];
        window.location.hash = "#"+this.json2Query(hash);
    }
};

$.alert=function(tit,tip){
    tip=tip||'';
    var tpl=[
        '<div class="pop-cont">' ,
        '<div class="pop-head"></div>',
        '<div class="msg-tit">'+tit+'</div>',
        '<p class="msg-tip">'+tip+'</p>',
        '<div class="pop-btns">',
        '<span class="pop-btn btn-sure" status="1">确定</span>',
        '</div>',
        '</div>'].join('');
    var pop=new Pop({boxTpl:tpl,isRemove:1});
    pop.show();
    return pop;
};

$.confirm=function(tit,callback){
    var tpl=[
        '<div class="pop-cont">' ,
        '<div class="pop-head"></div>',
        '<div class="msg-tit">'+tit+'</div>',
        '<div class="pop-btns">',
        '<span class="pop-btn btn-sure" status="1">确定</span>',
        '</div>',
        '</div>'].join('');
    var pop=new Pop({boxTpl:tpl,isRemove:1});
    pop.show();
    return pop;
};

utils.tplEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    var newFun=new Function(code.replace(/[\r\t\n]/g, ''));
    return options?newFun.apply(options):function(options){return newFun.apply(options)};
};
utils.formatPrice=function(price,i){
    price=price-0;
    var strPrice=price+'';
    strPrice=strPrice.split('.')[1];
    if(strPrice){
        price=price.toFixed(2);
    }
    var arr=[price,'元'];
    if(i===undefined){
        return arr[0]+arr[1];
    }
    return arr[i];

};
utils.fprice=function(price,i,bit){
    price=price-0;

    bit=bit===undefined?2:bit;
    var strPrice=price+'';
    strPrice=strPrice.split('.')[1];
    if(strPrice){
        price=price.toFixed(bit);
    }
    var arr=[price,'元'];
    if(price>=10000){
        price=price/10000;
        price=price.toFixed(bit);
        arr[0]=price;
        arr[1]='万';
    }
    if(i===undefined){
        return arr[0]+arr[1];
    }
    return arr[i];

};


return utils;