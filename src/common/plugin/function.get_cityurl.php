<?php
/**
 */

function smarty_function_get_cityurl($arrParams, $template) {
    $TPLDATA=$template->getTemplateVars("tplData");
    $CITY=$TPLDATA['curCity']['pinyin']?$TPLDATA['curCity']['pinyin']:'beijing';
    $CITY=$arrParams['city']?$arrParams['city']:$CITY;
    return '/city/'.$CITY.'/';
}