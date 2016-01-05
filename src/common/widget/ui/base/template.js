var codeReg = /\{\{\=([^{}]+)\}\}/g;
var varReg = /\bit\.([a-zA-Z0-9_$]+)/g;
var format = function (tpl, data) {
    return (tpl + "").replace(codeReg, function(m, expression){
        var expressionHtml = expression.replace(varReg, function(mm, key){
            var value = data[(key+"").replace(/^\s|\s$/g,"")];
            value === undefined ? (value = "") : value;
            typeof value === "string" ? value = '"' + value + '"' : value;
            return value;
        });
        expressionHtml = eval(expressionHtml);
        expressionHtml === undefined ? (expressionHtml = "" ): expressionHtml;
        return expressionHtml
    });
}
return function (tpl, data) {
    tpl = tpl || "";
    if ( data === undefined ) {
        return function ( _data ) {
            return format(tpl, _data);
        };
    } else return format(tpl, data);
}