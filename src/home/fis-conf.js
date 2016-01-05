fis.config.merge({
    namespace : 'home',
    roadmap:{
        domain:'http://s.emao.net/tmall/build/pc'
    }
});
var pack={
    'static/tar/homebase.css' : [
        /\/static\/lib\/css\/global\.(css|less)/i
        ,/\/widget\/(?!(page\/)).*\.(css|less)/i
    ],
    'static/tar/homebase.js' : [
        /\/widget\/(?!(page\/)).*\.js/i,

    ]
};
function toPack(pageName){
    var cssKey='static/tar/'+pageName+'.css';
    var cssReg=new RegExp("/widget/page/"+pageName+"/.*\\.(css|less)","i");
    var jsKey='static/tar/'+pageName+'.js';
    var jsReg=new RegExp("/widget/page/"+pageName+"/.*\\.js","i");
    pack[cssKey]=[cssReg];
    pack[jsKey]=[jsReg];
}
var pages=['home','homeList'];
pages.forEach(function(item){
    toPack(item);
});
fis.config.set('pack', pack);


