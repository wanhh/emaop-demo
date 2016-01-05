<!--
    @require "goodslist.less"
-->
<div class="goodslist page-center">
    <div class="goods-ul clearfix">
        {%$i=0%}
    {%foreach $tplData.carList as $i=>$item%}
        {%if ($i%4)==3%}
        {%$cls='lastitem'%}
        {%else%}
        {%$cls=''%}
        {%/if%}
        {%$i=($i+1)%}
        {%widget name="home:widget/gooditem/gooditem`$item.tpl`.tpl" list=$item  cls=$cls%}
     {%/foreach%}
    </div>
    <div class="ad-banner" style="display: none">
        <a href=""><img src="../home/temp/pic4.png" alt=""/></a>
    </div>
</div>
{%widget name="home:widget/paging/paging.tpl"%}
{%if count($tplData.carList)==0%}
<link rel="import" href="noresult.tpl?__inline">
{%/if%}
{%widget name="common:widget/wish/wish.tpl"%}