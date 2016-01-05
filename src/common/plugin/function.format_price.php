<?php
/**
 * 格式化价格输出
 * @param float $price: 以元为单位的价格数字
 * @param int $decimal: 要保留的小数位数
 * @return string
 *
 * @author: zuguoliang
 * @email: zuguoliang057@emao.com
 */

function smarty_function_format_price($params, &$smarty) {
    $DEFAULT_PRICE = 0;
    $DEFAULT_DECIMAL = 2;

    $decimal = (empty($params['decimal'])) ? $DEFAULT_DECIMAL : abs(intval($params['decimal']));
    $price = (empty($params['price'])) ? $DEFAULT_PRICE : floatval($params['price']);
    if ($price == 0) {
        return 0;
    }

    if ($price >= 10000) {
        $price = round($price/10000, $decimal);
        $price = number_format($price, $decimal, '.', '') . '万';
    } elseif ($price >= 1 && $price < 10000) {
        $price = round($price);
        $price = number_format($price, 0, '.', '');
    } else {
        $price = round($price, $decimal);
        $price = number_format($price, $decimal, '.', '');
    }

    return $price;
}