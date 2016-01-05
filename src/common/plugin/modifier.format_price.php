<?php

function smarty_modifier_format_price($price=0,$index=9999) {
    $DEFAULT_PRICE = 0;
    $DEFAULT_DECIMAL = 2;
    $unit='元';

    //$decimal = (empty($params['decimal'])) ? $DEFAULT_DECIMAL : abs(intval($params['decimal']));
   $decimal=$DEFAULT_DECIMAL;
    //$price = (empty($params['price'])) ? $DEFAULT_PRICE : floatval($params['price']);
    if ($price == 0) {
        $price = round($price);
        $price = number_format($price, 0, '.', '');
    }elseif ($price >= 10000) {
        $price = round($price/10000, $decimal);
        $price = number_format($price, $decimal, '.', '');
        $unit="万";
    } elseif ($price > 0 && $price < 1) {
        $price = round($price,$decimal);
        $price = number_format($price, $decimal, '.', '');
    } else {
        $price = round($price);
        $price = number_format($price, 0, '.', '');
    }
    $arr=array($price,$unit);
    if($index==9999){
        return $price.$unit;
    }else{
        return $arr[$index];
    }
}