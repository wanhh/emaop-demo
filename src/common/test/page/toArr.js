/**
 * Created by xiaochao on 2015/5/18.
 */
var fs = require('fs');

function writeData(data){

    data=data.replace(/\[(.*)\]/g,'"$1"')
        .replace(/=> (.*)/g,'=> "$1",')
        .replace(/=>(?=\r\n)/ig,'=> "",')
        .replace(/=> "Array",/ig,'=> array')
        .replace(/\)\r\n/ig,'),')
        .replace(/\)$/g,');');
    data="<?php \r\n $fis_data="+data;
    fs.writeFile('bbb.php', data, function (err) {
        if (err) throw err;
        console.log('It\'s saved!'); //文件被保存
    });
}

//读取文件
 fs.readFile('aaa.php', 'utf8', function (err, data) {
       if (err) throw err;
        writeData(data);
 });
