{%strip%}
<!DOCTYPE html>
{%*全局公共配置*%}
<link rel="import" href="config.tpl?__inline">
{%* 自定义变量 *%}
{%block name="block_assign"%}
{%/block%}
{%* 使用html插件替换普通html标签，同时注册JS组件化库 *%}
{%html framework="common:static/lib/js/lib.js"%}
<!--STATUS OK-->
    {%* 使用head插件替换head标签，主要为控制加载同步静态资源使用 *%}
    {%head%}
        {%* 头部meta，seo相关可以写在这里面 *%}
        {%block name="block_meta"%}
        <meta name="renderer" content="webkit"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        {%* 页面title *%}
        <title>
            {%block name="block_title"%}{%$tplData.pageTitle%}{%/block%}
        </title>
        <meta content="{%$tplData.pageDescription%}" name="description"/>
        <meta content="{%$tplData.pageKeyword%}" name="keywords"/>
        {%/block%}

        {%* 头部css *%}
        {%block name="block_global_css"%}
        {%require name="common:static/lib/css/global.css"%}
        {%/block%}
        {%block name="block_head_css"%}
        {%/block%}
        {%* 头部js *%}
        {%block name="block_head_js"%}
            {%widget name="common:widget/headJs/headJs.tpl"%}
        {%/block%}
        {%block name="block_ad_head"%}
        {%/block%}
    {%/head%}
    {%* 使用body插件替换body标签，主要为可控制加载JS资源 *%}
    {%body class="$bodyCls"%}
        {%block name="block_body"%}
            {%block name="block_header"%}
            {%widget name="common:widget/header/header.tpl"%}
            {%/block%}
            {%block name="block_content"%}
            {%/block%}
            {%block name="block_footer"%}
                {%widget name="common:widget/footer/footer.tpl"%}
            {%/block%}
            {%* 底部js区域 *%}
            {%block name="block_foot_js"%}{%/block%}
        {%/block%}
    {%/body%}
{%/html%}
{%/strip%}