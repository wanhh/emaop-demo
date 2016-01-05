<!--<a class="act-list" href="http://huodong.emao.com/mall/1111/bmcrx.html" target="_blank">-->
<!--<span class="img-11"></span><i class="img-22"></i>-->
<!--</a>-->
<a class="shop-wish" href="http://mall.emao.com/?c=index&a=desire" target="_blank">
    购车愿望
</a>
{%if $tplData.onlineTalkUri%}
<a class="ask-online" href="{%$tplData.onlineTalkUri%}" target="_blank">
    咨询
</a>
{%/if%}
<a class="order-list" href="{%$url.center%}/homecp/shangcheng/order/" target="_blank">
    订单
</a>
<a class="gotop" id="gotop" href="javascript:void(0)">回顶</a>
{%script%}
    require.async('./gotop.async.js',function(gotop){
        gotop.init();
    });
{%/script%}