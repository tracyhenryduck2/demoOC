function getByClass(oParent, sClass)
{
 var aEle=oParent.getElementsByTagName('*');
 var aResult=[];
 var re=new RegExp('\\b'+sClass+'\\b', 'i');
 var i=0;
 
 for(i=0;i<aEle.length;i++)
 {
  //if(aEle[i].className==sClass)
  //if(aEle[i].className.search(sClass)!=-1)
  if(re.test(aEle[i].className))
  {
   aResult.push(aEle[i]);
  }
 }
 
 return aResult;
}


//弹性运动原生函数，透明度需要改进，iTarget不带单位
    function startElasticMove(obj,json){
      clearInterval(obj.timer);
      var json2 = copy( json );
      obj.timer=setInterval(function(){
        var bStop=true;
        for(var attr in json){
          //var iSpeed=0;
          var iCur=0;
          if(attr=='opacity'){
            iCur=Math.round(parseFloat(getStyle(obj, attr))*100);
          }else{
            iCur=parseInt(getStyle(obj, attr));
          }

          json2[attr]+=(json[attr]-iCur)/6;
          json2[attr]*=0.75;

          //console.log(Math.round( iCur + json2[attr] ) );
          if( Math.abs(json2[attr])<1 && Math.abs(json[attr]-iCur)<=1 ){
            if(attr=='opacity')
            {
            	
              obj.style.filter='alpha(opacity:'+(json[attr])+')';
              obj.style.opacity=(json[attr])/100;
            }
            else
            {
              obj.style[attr] = json[attr]+'px';
              //console.log( json[attr] );
            }

            //iSpeed = 0;
          }else{
            bStop=false;
            if(attr=='opacity')
            {
              obj.style.filter='alpha(opacity:'+(iCur + json2[attr])+')';
              obj.style.opacity=(iCur + json2[attr])/100;
            }
            else
            {
              obj.style[attr] = Math.round( iCur + json2[attr] )+'px';
              console.log( iCur + json2[attr] )
            }                                                               
          }

        }
        //document.title=iCur+'px'+iSpeed;
        if(bStop){
          clearInterval(obj.timer);        
        }

      },30);
    }
      
      function getStyle(obj,attr){
        if(obj.currentStyle){
          return obj.currentStyle[attr];
        }else{
          return getComputedStyle(obj,false)[attr];
        }
      }

      function copy( obj ){
        var o = {};
        for(var i in obj ){
          o[i] = 0;
        }
        return o;
      }
/*运动框架，包括链式运动框架,iTarget不带单位*/
function startMove(obj, attr, iTarget, fn)
{
  clearInterval(obj.timer);
  obj.timer=setInterval(function (){
    //1.取当前的值
    var iCur=0;
    
    if(attr=='opacity')
    {
      iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
    }
    else
    {
      iCur=parseInt(getStyle(obj, attr));
    }
    
    //2.算速度
    var iSpeed = (iTarget-iCur)/5;
    iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
    
    //3.检测停止
    if(iCur==iTarget)
    {
      clearInterval(obj.timer);
      
      if(fn)
      {
        fn();
      }
    }
    else
    {
      if(attr=='opacity')
      {
        obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
        obj.style.opacity=(iCur+iSpeed)/100;
      }
      else
      {
        obj.style[attr]=iCur+iSpeed+'px';
      }
    }
  }, 30)
}      


function to_upper(a)
{
switch(a){
case '0' : return '零'; break;
case '1' : return '一'; break;
case '2' : return '二'; break;
case '3' : return '三'; break;
case '4' : return '四'; break;
case '5' : return '五'; break;
case '6' : return '六'; break;
case '7' : return '七'; break;
case '8' : return '八'; break;
case '9' : return '九'; break;
default: return '' ;
}
}
function to_mon(a){
if(a>10){ a=a - 8;
return(to_mon(a));}
switch(a){
case 0 : return ''; break;
case 1 : return '十'; break;
case 2 : return '百'; break;
case 3 : return '千'; break;
case 4 : return '万'; break;
case 5 : return '十'; break;
case 6 : return '百'; break;
case 7 : return '千'; break;
case 8 : return '亿'; break;
}
}

function repace_acc(Money){
var yy;
var outmoney;
outmoney=Money;

yy=0;
while(true){
var lett= outmoney.length;
outmoney= outmoney.replace("零","零");
outmoney= outmoney.replace("零万","万");
outmoney= outmoney.replace("零亿","亿");
outmoney= outmoney.replace("零千","零");
outmoney= outmoney.replace("零百","零");
outmoney= outmoney.replace("零零","零");
outmoney= outmoney.replace("零十","零");
outmoney= outmoney.replace("亿万","亿零");
outmoney= outmoney.replace("万千","万零");
outmoney= outmoney.replace("千百","千零");
outmoney= outmoney.replace("一十","十");
yy= outmoney.length;
if(yy==lett) break;
}
yy = outmoney.length;
if ( outmoney.charAt(yy-1)=='零'){
outmoney=outmoney.substring(0,yy-1);
}
yy = outmoney.length;
 
 return outmoney;
}


function creat(){
var test1= document.all.text1.value;
var money1 = new Number(test1);
if(money1> 1000000000000000000) {
alert("您输入的数字太大，重新输入！");
return;
}
var monee = Math.round(money1*100).toString(10)
var i,j;
j=0;
var leng = monee.length;
var monval="";
for( i=0;i<leng;i++)
{
monval= monval+to_upper(monee.charAt(i))+to_mon(leng-i-1);
}
repace_acc(monval);
}

function filterToChinese(input){
                    var out = "";

                    if(isNaN(input)) {
                      return "NAN";
                    }
                    else
                    {
                      var money1 = parseInt(input);
                      if(money1> 1000000000000000000) {
                      return "NAN";
                      }
                      var monee = money1.toString();
                      var i,j;
                      j=0;
                      var leng = monee.length;
                      var monval="";
                      for( i=0;i<leng;i++)
                      {
                      monval= monval+to_upper(monee.charAt(i))+to_mon(leng-i-1);
                      }
                      return repace_acc(monval);
                    }
                   
                }


//同to_upper
function to_upperMoney( a)
{
switch(a){
case '0' : return '零'; break;
case '1' : return '壹'; break;
case '2' : return '贰'; break;
case '3' : return '叁'; break;
case '4' : return '肆'; break;
case '5' : return '伍'; break;
case '6' : return '陆'; break;
case '7' : return '柒'; break;
case '8' : return '捌'; break;
case '9' : return '玖'; break;
default: return '' ;
}
}

//同to_mon
function to_monMoney(a){
if(a>10){ a=a - 8;
return(to_mon(a));}
switch(a){
case 0 : return '分'; break;
case 1 : return '角'; break;
case 2 : return '元'; break;
case 3 : return '拾'; break;
case 4 : return '佰'; break;
case 5 : return '仟'; break;
case 6 : return '万'; break;
case 7 : return '拾'; break;
case 8 : return '佰'; break;
case 9 : return '仟'; break;
case 10 : return '亿'; break;
}
}

//同repace_acc
function repace_accMoney(Money){
Money=Money.replace("零分","");
Money=Money.replace("零角","零");
var yy;
var outmoney;
outmoney=Money;
yy=0;
while(true){
var lett= outmoney.length;
outmoney= outmoney.replace("零元","元");
outmoney= outmoney.replace("零万","万");
outmoney= outmoney.replace("零亿","亿");
outmoney= outmoney.replace("零仟","零");
outmoney= outmoney.replace("零佰","零");
outmoney= outmoney.replace("零零","零");
outmoney= outmoney.replace("零拾","零");
outmoney= outmoney.replace("亿万","亿零");
outmoney= outmoney.replace("万仟","万零");
outmoney= outmoney.replace("仟佰","仟零");
yy= outmoney.length;
if(yy==lett) break;
}
yy = outmoney.length;
if ( outmoney.charAt(yy-1)=='零'){
outmoney=outmoney.substring(0,yy-1);
}
yy = outmoney.length;
if ( outmoney.charAt(yy-1)=='元'){
outmoney=outmoney +'整';
}

}