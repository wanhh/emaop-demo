{%extends file="common/page/layout2.tpl"%}
{%block name="block_assign"%}
    {%$bodyCls='bg'%}

    {%$navData=[]%}
    {%if count($tplData.goodsEmao.data)>3%}
    {%$k=array_push($navData,[
        'isLevel'=>1,
        'id'=>'zxcar',
        'tit'=>'特卖车',
        'tpl'=>'hotcar',
        'color'=>'#ed3f36',
        'goods'=>$tplData.goodsEmao.data,
        'len'=>count($tplData.goodsEmao.data),
        'searchurl'=>{%get_searchurl carFrom=1%}
        ])%}
    {%/if%}
    {%if count($tplData.goodsCon.data)>3%}
    {%$k=array_push($navData,[
        'isLevel'=>1,
        'id'=>'hotcar',
        'tit'=>'热销车',
        'tpl'=>'hotcar',
        'color'=>'#00c0e6',
        'goods'=>$tplData.goodsCon.data,
        'len'=>count($tplData.goodsCon.data),
        'searchurl'=>{%get_searchurl carFrom=2%}
    ])%}
    {%/if%}
    {%if $tplData.bannerAd1%}
    {%$k=array_push($navData,[
        'isBannerAd1'=>1,
        'id'=>'bannerAd1',
        'ad'=>$tplData.bannerAd1
        ])%}
    {%/if%}
    {%if count($tplData.customAd)>0%}
    {%$k=array_push($navData,[
        'isLevel'=>1,
        'id'=>'dingcar',
        'color'=>'#0072c1',
        'tit'=>'定制车',
        'tpl'=>'dingcar',
        'goods'=>array_slice($tplData.customAd,0,4),
        'len'=>count(array_slice($tplData.customAd,0,4)),
        'searchurl'=>{%get_searchurl sellType=3%}
    ])%}
    {%/if%}



{%/block%}
{%block name="block_content"%}
{%widget name="home:widget/page/home/home.tpl"%}
{%widget name="common:widget/gotop/gotop.tpl"%}
{%/block%}