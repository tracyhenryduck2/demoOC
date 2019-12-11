

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var parm = location.search; //获取url中"?"符后的字串
     if(parm.indexOf("?") == -1){
		parm=client.getParm();
     }
     var r = parm.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function getUser()
{
    if(client.getUserJson()==null || client.getUserJson()=='')
    {
         return null;
    }
    else
    {
       var userJson=eval("("+client.getUserJson()+")");
        var user=userJson.user;
        return user;
    }

}

function getEditInfo1(){
    var infoJson = eval("("+client.readNotGlobalInfo("totalinfo")+")");
    return infoJson;
}

function getEditInfo2(){
    var infoJson = eval("("+client.readNotGlobalInfo("jiheinfo")+")");
    return infoJson;
}

function getEditInfo3(){
    var infoJson = eval("("+client.readNotGlobalInfo("railinfo")+")");
    return infoJson;
}

function getEditInfo4(){
    var infoJson = eval("("+client.readNotGlobalInfo("zhuyiinfo")+")");
    return infoJson;
}

function getEditInfo5(){
    var infoJson = eval("("+client.readNotGlobalInfo("memberinfo")+")");
    return infoJson;
}

function setEditInfo1(info){
    client.saveNotGlobalInfo("totalinfo",info);
}
function setEditInfo2(info){
    client.saveNotGlobalInfo("jiheinfo",info);
}

function setEditInfo3(info){
    client.saveNotGlobalInfo("railinfo",info);
}

function setEditInfo4(info){
    client.saveNotGlobalInfo("zhuyiinfo",info);
}

function setEditInfo5(info){
    client.saveNotGlobalInfo("memberinfo",info);
}


function getBranch(){
 	var userJson=eval("("+client.getUserJson()+")");
	if(userJson==null){
		alert("没有json数据");
	}
	var branch=userJson.branch;
	return branch;
}

function getPath()
{
	return client.getIpPort();
}
function getFilePath()
{
    return "http://"+client.getIpPort()+"/upload/";
}

/*获取小数掉后一位，如果为零，则取整*/
function toDecimal(x) { 


    if(x == undefined || x == null || isNaN(x))
    {
      return;
    }
    else
    {
      if(((x*10)%10)==0)
      {
        return (x);
      }
      else
      {
        return(Math.round(x*10)/10);
      }
    }

}

function showDialog(type,title,message,method){
    client.showDialog(type,title,message,method);
}

function showAddMemberDialog(title,method){
client.showAddMemberDialog(title,method);
}

function isAndroid(){
   return true;
}
function creatMask(popDivId) { 
// 参数w为弹出页面的宽度,参数h为弹出页面的高度,参数s为弹出页面的路径 
// var maskDiv = window.parent.document.createElement("div"); 
// maskDiv.id = "maskDiv"; 
// maskDiv.style.position = "fixed"; 
// maskDiv.style.top = "0"; 
// maskDiv.style.left = "0"; 
// maskDiv.style.zIndex = 1000; 
// maskDiv.style.backgroundColor = "#FFFFFF00"; 
// maskDiv.style.filter = "alpha(opacity=70)"; 
// maskDiv.style.opacity = "0.7"; 
// maskDiv.style.width = "100%"; 
// maskDiv.style.height = (window.parent.document.body.scrollHeight + 50) + "px"; 
// maskDiv.innerHTML="<div style='margin:100px auto;width:50px;height:100px;position: relative;'><img  style='margin:100px auto;position: relative;' src='images/loading-spinning-bubbles.svg' /></div>"
// window.parent.document.body.appendChild(maskDiv); 
// maskDiv.onmousedown = function() { 
// return; 
// };
  client.createLoading(); //原生态LOADING

} 

function removeMask()
{
  // window.parent.document.body.removeChild(window.parent.document.getElementById("maskDiv"));
  // // flag_of_cre=true;
  // try{
  //      bindEvent();
  // }catch (e) {  
  //               //alert("不支持TouchEvent事件！" + e.message);  
  //            } 
  client.removeLoading();  //原生态删除loading

}
function change(ele)
{
  ele.style.height = (ele.scrollHeight-8) + 'px';
}
function goPrevious() {
    var deviceType = isAndroid();
    if(deviceType){
        client.goBack();
    }else{
        history.back();
    }
};

function progress(type,message,method){
    if(isAndroid()){
    	client.progress(type,message,method);
    }else{
        client.progress("progress",[type,message,method],
                        function(success){
                        },
                        function(error) {
                        alert("Error: \r\n"+error);
                        });
    }
};


function showAlert(title,message,method){
    if(isAndroid()){
    	client.confirm(title,message,method);
    }else{
        client.showAlertView("showAlertView",[title,message,method],
         function(success){

         },
         function(error) {
         alert("Error: \r\n"+error);
         });
    }
};

function openUrl(url,type ){
    if(isAndroid()){
        client.open(url,type);
    }else{
        client.open("open",[url,"1"],
         function(success){
         },
         function(error) {
         alert("Error: \r\n"+error);
         });
    }
};


function  download(url,name){

    var str = client.getIpPort()+'/oa/DownLoad!downLoad.action?fileRealName='+url+'&fileName='+name;
     window.location='http://'+str;
}

function downloadCompanyReAttach(url,name){
     var str = client.getIpPort()+'/oa/App/AppCompanyDayReport!downLoad.action?fileId='+url+'&fileName='+name;
     window.location='http://'+str;
}


//参数说明：dd传字符串2015-05-01 也可以传时间戳,
//          dadd为增加的天数
function getthedate(dd,dadd)
{
//可以加上错误处理
var a = new Date(dd)
a = a.valueOf()
a = a + dadd * 24 * 60 * 60 * 1000
a = new Date(a);
var m = a.getMonth() + 1;
if(m.toString().length == 1){
    m='0'+m;
}
var d = a.getDate();
if(d.toString().length == 1){
    d='0'+d;
}
var ds = a.getFullYear() + "-" + m + "-" + d;

return new Date(ds).getTime();
}


//扩展Date的format方法 
Date.prototype.format = function (format) { 
var o = { 
"M+": this.getMonth() + 1, 
"d+": this.getDate(), 
"h+": this.getHours(), 
"m+": this.getMinutes(), 
"s+": this.getSeconds(), 
"q+": Math.floor((this.getMonth() + 3) / 3), 
"S": this.getMilliseconds() 
} 
if (/(y+)/.test(format)) { 
format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
} 
for (var k in o) { 
if (new RegExp("(" + k + ")").test(format)) { 
format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); 
} 
} 
return format; 
} 
function getSmpFormatDateByLong(l, isFull) { 
return getSmpFormatDate(new Date(l), isFull); 
}
function getSmpFormatDate(date, isFull) { 
var pattern = ""; 
if (isFull == true || isFull == undefined) { 
pattern = "yyyy-MM-dd hh:mm:ss"; 
} else { 
pattern = "yyyy-MM-dd"; 
} 
return getFormatDate(date, pattern); 
} 
function getFormatDate(date, pattern) { 
if (date == undefined) { 
date = new Date(); 
} 
if (pattern == undefined) { 
pattern = "yyyy-MM-dd hh:mm:ss"; 
} 
return date.format(pattern); 
}

function LoginTo(url,flag,extra){

    if(getUser()==null)
    {
     client.open("denglu.html?tohtml="+url,1,false,"");
    }
    else
    {
      client.open(url,flag,false,extra); 
    }
}

//0代表密码符合要求，1代表密码不包括两种以上的半角字符，2代表字符串包括全角字符（中文）
function chkpasswordHalf(str){
   var int_shuzi=0;
   var int_zifu=0;
   var int_fuhao=0;  

   if(str.length<6||str.length>20) return 3;
      
      for(var i=0;i<str.length;i++)     
          {        
            var strCode=str.charCodeAt(i);
            if(strCode<127)
            {
               if(strCode>=48&&strCode<=57)
               {
                 int_shuzi++;
               }
               else if((strCode>=65&&strCode<=90)||(strCode>=97&&strCode<=122))
               {
                int_zifu++;
               }
               else
               {
                int_fuhao++;
               }

            }
            else
            {
              return 2;
            }
              
          }
   var count = 0;  
     if(int_shuzi==0)  count++;
     if(int_zifu==0)    count++;
     if(int_fuhao==0)   count++;

    if(count<=1)  return 0;
    else          return 1;
}

//0代表符合要求，1代表密码不包括两种以上的半角字符，2代表字符串包括全角字符（中文）
function chknameHalf(str){
   var int_shuzi=0;
   var int_zifu=0;
   var int_fuhao=0;  
      
      for(var i=0;i<str.length;i++)     
          {        
            var strCode=str.charCodeAt(i);
            if(strCode<127)
            {
               if(strCode>=48&&strCode<=57)
               {
                 int_shuzi++;
               }
               else if((strCode>=65&&strCode<=90)||(strCode>=97&&strCode<=122))
               {
                int_zifu++;
               }
               else
               {
                int_fuhao++;
               }

            }
            else
            {
              return 2;
            }
              
          }
   var count = 0;  
     if(int_shuzi==0)  count++;
     if(int_zifu==0)    count++;
     if(int_fuhao==0)   count++;

    if(count<=1)  return 0;
    else          return 1;
}