/**
 * Created by xiaochao on 2015/5/18.
 */
var fs = require('fs');

function writeData(data){
    var dataList=data.split('\r\n');
    var newList=["<?php \r\n$fis_data="];
    var len=dataList.length;
    dataList.forEach(function(item,i){
        item=item.replace(/^\s*(.*?)\s*$/,"$1");
        var arr=item.split('=>');
        var str='';
        if(arr.length>1){ //
            var key=arr[0].replace(/^\s*(.*?)\s*$/,"$1");
            var val=arr[1].replace(/^\s*(.*?)\s*$/,"$1").replace(/\"/g,'\\"');
            key=key.replace(/\[(.*)\]/g,'"$1"');
            if(!Number(val)){
                if(val.length>100){
                    val='<br/>local Test<br/>';//超长文字替换
                }
                val='"'+val+'"';
            }
            val=val+','
            val=val.replace(/"Array",/ig,'array');
            str=key+'=>'+val;
        }
        switch (item){
            case 'Array':
                str='array';
                break;
            case '(':
                str='(';
                break;
            case ')':
                str=(i==len-1)?');':'),';
                break;
        }
        newList.push(str);
    });


    fs.writeFile('bbb.php', newList.join('\r\n'), function (err) {
        if (err) throw err;
        console.log('It\'s saved!'); //文件被保存
    });
}

//读取文件
fs.readFile('aaa.php', 'utf8', function (err, data) {
    if (err) throw err;
    writeData(data);
});