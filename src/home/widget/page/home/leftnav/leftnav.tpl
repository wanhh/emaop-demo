<div class="leftnav">
    <ul>
        {%$list=[]%}
        {%foreach $navData as $id=>$datas%}
        {%if $datas.isLevel%}
        <li class="lfnav-li lfnav-li-{%$datas.id%}" data-id="{%$datas.id%}">
            <span class="lfnav-item lfnav-item-{%$datas.id%}" >

            </span>
        </li>
        {%$k=array_push($list,['id'=>$datas.id])%}
        {%/if%}
        {%/foreach%}
    </ul>

</div>
        {%script%}
        require.async('./leftnav.js',function(leftnav){
        leftnav.init({%$list|json_encode|escape:none%});
        })
        {%/script%}