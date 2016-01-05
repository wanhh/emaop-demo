<!--
    @require "gooditem.less"
-->
<a class="gooditem {%$cls%}" href="/car/{%$list.id%}.html" target="_blank">
    <div class="border"></div>

    {%*<div class="self_tags">
        {%if $list.isPurchase==1%}
        <span>一猫自营</span>
        {%else%}
        <span>4s店</span>
        {%/if%}
    </div>*%}
    <div class="car-img">
        <img lazy-src="{%$list.mainImg%}" alt=""/>
        {%if $list.sellType==2%}<!--限时特惠-->
        <div class="time-limit"></div>
        {%/if%}
    </div>
    <p class="coupon">
        一猫价:{%$list.minPrice|format_price%}{%if $list.multiple>1%}起{%/if%}
    </p>
    <p class="chang-mao-price">
        {%if $list.fall%}
        <span class="mark-down">最高降{%$list.fall|format_price%}</span>
        {%/if%}
        <span class="chang-price">指导价：{%$list.price%}万</span>
    </p>
    <div class="h-line"></div>
    <h3 title="{%$list.goodsName%}" title="{%$list.goodsName%}">{%$list.goodsName%}</h3>
    <p class="products-desc" title="{%$list.sellLead%}">{%$list.sellLead%}</p>
    {%if $list.sellType==2%}<!--限时特惠-->
    <p class="limit-box">
        <i></i>限时抢：<span class="home-time" nowTime="{%$smarty.now|date_format:'%Y/%m/%d,%H:%M:%S'%}" endTime="{%$list.endSellTimeFormat%}"></span>
    </p>
    {%/if%}
    <div class="deals_tags">
        <span class="ding">定制车</span>
    </div>
    {%if $list.isActivity==1%}
    <div class="fall5000"></div>
    {%/if%}
</a>

