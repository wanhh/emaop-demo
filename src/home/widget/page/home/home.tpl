
<div class="wrapper pos-re clearfix">
    {%widget name="common:widget/nav/nav.tpl" cls="nav-pos"%}
    <div class="sub-nav">
        <ul class="menu">
            <li>
                <h3><i></i>按品牌选车</h3>
                <p style="height:66px;overflow: hidden ">
                    {%foreach $tplData.hotBrandList as $k=>$hotList%}
                    <a href="{%get_searchurl brandId=$hotList.id%}" target="_blank">{%$hotList.brandName%}</a>
                    {%/foreach%}
                </p>

            </li>
            <li>
                <h3><i></i>按价格选车</h3>
                <p>
                    {%foreach $tplData.priceList as $k=>$priceList%}
                    <a href="{%get_searchurl price=$k%}" target="_blank">{%$priceList%}</a>
                    {%/foreach%}
                </p>
            </li>
            <li>
                <h3><i></i>按级别选车</h3>
                <p>
                    {%foreach $tplData.carriageList as $k=>$list%}
                    <a href="{%get_searchurl carriageId=$k%}" target="_blank">
                        {%$list%}
                    </a>
                    {%/foreach%}
                </p>
            </li>
        </ul>
        <div class="subCategory">
            <div class="subjiao"></div>
            <div class="subcon">
                <div class="brand-hot">
                    <div class="brand-lit">
                        热点品牌
                    </div>
                    <ul class="hot-list">
                        {%foreach $tplData.hotBrandList as $k=>$hotList%}
                        <li>
                            <a href="{%get_searchurl brandId=$hotList.id%}">
                                <img src="{%$hotList.logo%}" alt=""/>
                                <p>{%$hotList.brandName%}</p>
                            </a>
                        </li>
                        {%/foreach%}
                    </ul>
                </div>
                <ul class="brand-category">
                    {%foreach $tplData.allBrandList as $k=>$alphaList%}
                    <li>
                        <dl class="brand-sidebar">
                            <dt class="brand-head">
                                {%$k%}
                            </dt>
                            <dd>
                                {%foreach $alphaList as $lista%}
                                    {%foreach $lista as $list%}
                                        <a href="{%get_searchurl brandId=$list.id%}">
                                            {%$list.brandName%}
                                        </a>
                                    {%/foreach%}
                                {%/foreach%}

                            </dd>
                        </dl>
                    </li>
                    {%/foreach%}

                </ul>
            </div>
        </div>
    </div>
    <div class="slide">
        <div class="s_container">
            <ul class="slide-img">
                {%foreach $tplData.adList as $i=>$list%}
                <li style="left:{%($i*900)%}px"><a href="{%$list.linkUrl%}" target="_blank"><img style="width:100%;" src="{%$list.pic%}" alt=""/></a></li>
                {%/foreach%}
            </ul>

        </div>

        {%if count($tplData.adList)>1%}
            <div class="slide-prev"></div>
            <div class="slide-next"></div>
            <ul class="slide-menu">
                {%foreach $tplData.adList as $list%}
                    {%if $list@first%}
                    <li class="active"></li>
                    {%else%}
                    <li></li>
                    {%/if%}
                {%/foreach%}
            </ul>
        {%/if%}
    </div>
</div>
<script type="text/javascript" src="http://cbjs.baidu.com/js/m.js"></script>
{%if $tplData.packTypeAd%}
<div class="gg">
    <div class="gg-yichu">
        {%foreach $tplData.packTypeAd as $adList%}
        <div class="g4-item">
            <a href="{%$adList.linkUrl%}" target="_blank"><img lazy-src="{%$adList.pic%}" alt=""/></a>
        </div>
        {%/foreach%}
    </div>
</div>
{%/if%}
{%foreach $navData as $id=>$datas%}
    {%if $datas.isLevel%}
        {%widget name="home:widget/page/home/level/`$datas.tpl`.tpl" datas=$datas%}
    {%/if%}
    {%if $datas.isBannerAd1%}
    <div class="gg"><a href="{%$tplData.bannerAd1.linkUrl%}" target="_blank"><img lazy-src="{%$tplData.bannerAd1.pic%}" alt=""/></a></div>
    {%/if%}
{%/foreach%}
    {%widget name="home:widget/page/home/leftnav/leftnav.tpl"%}
{%script%}


require.async('./home.js',function(home){
    {%$adList=$tplData.adList%}
    home.init({%$adList|json_encode|escape:none%});
})
{%/script%}
{%script%}
    (function (G,D,s,c,p) {
    c={//监测配置
        UA:"UA-emao-000001",  //客户项目编号,由系统生成
        NO_FLS:0,
        WITH_REF:1,
        URL:'http://s.emao.net/build/web/js/statistics/iwt-min.js'  //iwt.js的URL位置，请客户自行托管JS文件，只需修改此值
    };
    G._iwt?G._iwt.track(c,p):(G._iwtTQ=G._iwtTQ || []).push([c,p]),!G._iwtLoading && lo();
    function lo(t) {
        G._iwtLoading=1;s=D.createElement("script");s.src=c.URL;
        t=D.getElementsByTagName("script");t=t[t.length-1];
        t.parentNode.insertBefore(s,t);
    }
    })(this,document);
{%/script%}
