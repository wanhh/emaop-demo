var log={
    ga1:function(id){//立即抢购
        ga&&ga('send', 'event', 'gmall', 'submit', id||emao.carInfo.autoGid);
    },
    ga2:function(id){//提交订单
        ga&&ga('send', 'event', 'gmall', 'submit_success', id||$('#goodsId').val());
    },
    ga3:function(id){//去付款
        ga('send', 'event', 'gmall', 'pay' ,id||emao.orderId);
    },
    ga4:function(id){//付款成功
        ga('send', 'event', 'gmall', 'pay_success' ,id||emao.orderId);
    },
    ga5:function(id){//在线咨询
        ga('send', 'event', 'gmall', 'consult');
    },
    mvq:function(id){//付款成功
        var _mvq = window._mvq || [];
        window._mvq = _mvq;
        _mvq.push(['$setAccount', 'm-114937-0']);
        _mvq.push(['$setGeneral', 'ordercreate', '',  '','']);
        _mvq.push(['$logConversion']);
        _mvq.push(['$addOrder',id||emao.orderId, '']);
        _mvq.push(['$logData']);
    }
};
return log;