<div class="custom-car-nav level-nav level-nav-{%$datas.id%}">
    <span class="tit">{%$datas.tit%}</span>
    <a class="moreLink" href="{%$datas.searchurl%}" target="_blank">更多</a>
</div>
<div class="products customAd ">
    <div class="ding-list ding-list-{%$datas.len%}">
    {%foreach $datas.goods as $item%}
    <div class="cad-ding {%if $item@last%}car-ding-last{%/if%}">
        <a href="{%$item['linkUrl']%}" class="" target="_blank">
            <img src="{%$item['pic']%}" alt=""/>
        </a>
    </div>
    {%/foreach%}
    </div>
</div>
