{%$loginInfo=$tplData.__loginInfo%}
<div class="top-wrap2">
    <div class="top-con page-center clearfix">
        <ul class="top-left">
            <li><a href="http://www.emao.com/" target="_blank">一猫汽车网</a><i></i></li>
            <li><a href="{%$url.home%}">新车商城</a><i></i></li>
            <li><a href="http://www.handaishu.com/?utm_source=emao_mall" target="_blank">憨袋鼠进口车</a></li>
        </ul>
        <ul class="sign-up ul-hasLogin" style="display: none">
            <li>
                <a target="_blank" class="avatar" href="http://i.emao.com/homecp/index">
                    <img src="{%$loginInfo.avatar%}" title="访问我的空间"/>
                </a>
                <a target="_blank" class="logined" href="http://i.emao.com/homecp/index" >{%$loginInfo.nickname%}</a>
                <i></i>
            </li>
            <li><a class="logout-link" act="logout" href="http://i.emao.com/?act=logout">退出</a></li>
        </ul>
        <ul class="top-right ul-noLogin">
            <li><a class="reg-link" act="register" href="http://i.emao.com/?act=register">注册</a><i></i></li>
            <li><a class="login-link" act="login" href="http://i.emao.com/?act=login">登录</a></li>
        </ul>
        <a href="javascript:void(0)" class="wx-box">
        <dl>
            <dt>新车商城公共帐号</dt>
            <dd>
                <img src="/static/lib/img/qr-wx.png" alt=""/>
            </dd>
        </dl>
        </a>
    </div>
</div>


<div class="head-wrap2">
    <div class="page-center">
        <div class="header">
            <div class="logo">
                <a href="{%$url.home%}">
                    <img src="/static/img/logo2.png" alt=""/>
                </a>
            </div>
            {%if $tplData.curCity.cityName%}
            <div class="adress-put">
                <span>所在城市：</span>
                <span class="adre-font">{%$tplData.curCity.cityName|default:'北京'%}</span>
                {%if $tplData.openCity%}
                <span class="arrow-down"></span>
                <div class="adre-tips">
                    <div class="city-hot">
                        <span class="pov">
                            热&nbsp;门：
                        </span>
                         <span class="city">
                             {%foreach $tplData.hotCity as $i=>$item%}
                             <a href="{%get_cityurl city=$item.pinyin%}" title="{%$item.cityName%}">{%$item.cityName%}</a>
                             {%/foreach%}
                        </span>
                    </div>
                    <dl>
                        {%foreach $tplData.openCity as $i=>$province%}
                        <dd>
                            <span class="pov">
                                {%$province.provinceName%}：
                            </span>
                            <span class="city">
                                 {%foreach $province.citys as $i=>$item%}
                                 <a href="{%get_cityurl city=$item.pinyin%}" title="{%$item.cityName%}">{%$item.cityName%}</a>
                                 {%/foreach%}
                            </span>
                        </dd>
                        {%/foreach%}
                    </dl>
                </div>
                {%/if%}
            </div>
            {%/if%}
            <a href="javascript:void(0)" class="qr-box">
            <dl>
                <dt>APP</dt>
                <dd>
                    <img src="/static/lib/img/qr.png" alt=""/>
                    <p>
                        <strong>一猫APP</strong><br/>
                        买车上一猫，省钱更省心
                    </p>
                </dd>
            </dl>
            </a>
            <p class="kf-info">
                <span class="kf-tel">客服电话：400-890-3881</span><br/>
                <span class="kf-time">周一至周六9:00-19:00</span>
            </p>

        </div>
    </div>
</div>
{%script%}
    require.async('./header.js', function(header){
        header.init();
    });
{%/script%}
{%script%}
    require.async('common:widget/ui/base/utils.js', function(utils){
        $('.reg-link,.login-link,.logout-link').each(function(){
            var url='http://i.emao.com/?act='+$(this).attr('act')+'&callbackUrl='+encodeURIComponent(location.href)
            $(this).attr('href',url);
        })
    });
{%/script%}