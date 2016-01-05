{%extends file="common/page/layout2.tpl"%}
{%block name="block_assign"%}
{%$bodyCls='bg' scope='global'%}
{%$brandList=[]%}
{%foreach $tplData.allBrandList as $list%}
    {%foreach $list as $item%}
        {%$item.name=$item.brandName%}
        {%$i=array_push($brandList,$item)%}
    {%/foreach%}
{%/foreach%}
{%$sellList=[
    '0'=>[
    'id'=>'1',
    'name'=>'特价车'
    ],
    '1'=>[
    'id'=>'2',
    'name'=>'抵扣券'
    ],
    '2'=>[
    'id'=>'3',
    'name'=>'定制车'
    ]
]%}
{%$carriageList=[]%}
{%foreach $tplData.carriageList as $i=>$item%}
{%$j=array_push($carriageList,['id'=>$i,'name'=>$item])%}
{%/foreach%}
{%$priceList=[]%}
{%foreach $tplData.priceList as $i=>$item%}
{%$j=array_push($priceList,['id'=>$i,'name'=>$item])%}
{%/foreach%}
{%$sourceList=[
    '0'=>[
    'id'=>'1',
    'name'=>'一猫自营'
    ],
    '1'=>[
    'id'=>'2',
    'name'=>'商户自营'
    ]
]%}
{%$huodongList=[
    '0'=>[
    'id'=>'1',
    'name'=>'1212'
    ]
]%}
{%$FDATA=[
    '0'=>[
    'keyName'=>'品牌',
    'keyId'=>'brandId',
    'list'=>$brandList
    ],
    '1'=>[
    'keyName'=>'级别',
    'keyId'=>'carriageId',
    'list'=>$carriageList
    ],
    '2'=>[
    'keyName'=>'价格',
    'keyId'=>'price',
    'list'=>$priceList
    ],
    '3'=>[
    'keyName'=>'来源',
    'keyId'=>'carFrom',
    'list'=>$sourceList
    ],
    '4'=>[
    'keyName'=>'类型',
    'keyId'=>'sellType',
    'list'=>$sellList
    ]

]%}
        {%*,
        '5'=>[
        'keyName'=>'活动',
        'keyId'=>'isActivity',
        'list'=>$huodongList
        ]*%}

{%/block%}
{%block name="block_content"%}
{%widget name="common:widget/nav/nav.tpl"%}
{%widget name="home:widget/page/homeList/page.tpl"%}
{%widget name="common:widget/gotop/gotop.tpl"%}
{%/block%}
{%block name="block_foot_js"%}
{%widget name="home:widget/page/homeList/footJs.tpl"%}
{%/block%}