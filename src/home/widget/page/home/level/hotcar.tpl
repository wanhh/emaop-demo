
{%$len=$datas.len%}
{%$index=($len-($len%4))%}
<div class="level-nav level-nav-{%$datas.id%}" data-id="{%$datas.id%}"
        style="color:{%$datas.color%};border-color:{%$datas.color%};"
        >
    <span class="tit">{%$datas.tit%}</span>
    <a class="moreLink" href="{%$datas.searchurl%}" target="_blank">更多</a>
</div>
<div class="products clearfix">
<div class="products-list">

        {%$i=0%}
        {%foreach $datas.goods as $item%}
        {%if $i>=$index||$i>=16%}
        {%break%}
        {%/if%}
        {%if ($i%4)==3%}
        {%$cls='lastitem'%}
        {%else%}
        {%$cls=''%}
        {%/if%}
        {%$i=($i+1)%}
        {%widget name="home:widget/gooditem/gooditem`$item.tpl`.tpl" list=$item cls=$cls%}
        {%/foreach%}

</div>
</div>
