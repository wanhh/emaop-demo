{%$selectList=[]%}
{%$priceSort=$tplData.searchParam.priceSort%}
<div class="page-seResult">
<div class="page-center filter-box">
    <div class="filter-bd">
        <ul>
            {%foreach $FDATA as $line%}
            {%$tplData.searchParam[$line.keyId]=($tplData.searchParam[$line.keyId]|cat:'')%}
            <li class="li-{%$line.keyId%}">
                <span class="li-tit">{%$line.keyName%}</span>
                <span class="li-bd" >
                    {%if $line.keyName=='价格'%}
                    {%$price=$tplData.searchParam[$line.keyId]%}
                    {%$arr=explode('_',$price)%}
                    {%if $arr[1]%}
                    {%$name=($arr[0]|cat:'-'|cat:$arr[1]|cat:'万')%}
                    {%$k=array_push($selectList,['keyId'=>$line.keyId,'id'=>$price,'name'=>$name])%}
                    {%/if%}
                    <span class="price-input" keyId="{%$line.keyId%}" style="display: none;">
                         <input type="text" class="price-form" maxlength="5"/>
                         <span>-</span>
                         <input type="text" class="price-to" maxlength="5"/>
                         <span>万元</span>
                         <span class="price-sure">确定</span>
                     </span>
                    {%/if%}

                    <a class="li-bd-item {%if $tplData.searchParam[$line.keyId]==0%}selected{%/if%}"
                       keyId="{%$line.keyId%}" keyVal='0'
                            href="{%get_searchurl keyId=$line.keyId keyVal='0'%}">
                        <em>不限</em>
                    </a>
                    {%foreach $line.list as $i=>$item%}
                    <a class="li-bd-item {%if $tplData.searchParam[$line.keyId]==$item.id%}selected{%/if%}"
                       keyId="{%$line.keyId%}" keyVal="{%$item.id%}" title="{%$item.name%}"
                       href="{%get_searchurl keyId=$line.keyId keyVal=$item.id%}">
                        <em>{%$item.name%}</em>
                    </a>
                    {%if $tplData.searchParam[$line.keyId]==$item.id%}
                     {%$item.keyId=$line.keyId%}
                     {%$k=array_push($selectList,$item)%}
                    {%/if%}
                   {%/foreach%}

                </span>
            </li>
            {%/foreach%}
        </ul>

    </div>
    <div class="f-line">
        <a class="sort-tit" href="{%get_searchurl priceSort='0'%}">
            综合排序：
        </a>

        <ul class="sort-ul">
            {%if $priceSort=='1'%}
            <li class="price-seq up"><a href="{%get_searchurl priceSort='2'%}">价格</a><i></i></li>
            {%elseif $priceSort=='2'%}
            <li class="price-seq down"><a href="{%get_searchurl priceSort='1'%}">价格</a><i></i></li>
            {%else%}
            <li class="price-seq"><a href="{%get_searchurl priceSort='1'%}">价格</a><i></i></li>
            {%/if%}
        </ul>
    </div>
    <div class="filter-hd " >
        <span class="selceted-tit">全部结果></span>
        <span class="selceted-list">
            {%foreach $selectList as $item%}
            <a class="selected-item" keyId="{%$item.keyId%}" keyVal="{%$item.id%}"
               href="{%get_searchurl keyId=$item.keyId keyVal='0'%}">
                {%$item.name%}
            <i class="del">×</i>
            </a>
            {%/foreach%}
        </span>
        {%if $selectList[0]%}
        <a class="del-all" href="{%get_searchurl clearALL=1%}">
            全部清除
        </a>
        {%/if%}
    </div>
</div>
    <link rel="import" href="goodslist.tpl?__inline">
</div>
{%script%}
    require.async('./app.js',function(app){
         app.init();
    })
{%/script%}