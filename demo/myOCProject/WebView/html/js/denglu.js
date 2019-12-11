var url="";
var model;
var request;
var Login;
var result=false;
var uname = '';
var  cd = '';
function LoadData(){
  result=false;
    request.post('http://'+url+'/app/ProjectOverview!ajaxProjectOverview.action').success(function(data){

         //model.list = data;
         }).error(function(data,status,headers,config){
      if((status>=200&&status<300)||status===304||status===1223||status===0){
      $("body").html("网络访问出错！");
      }
      });
}


(function(){
	var app=angular.module('Login',[ ]);
      app.config(function($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
         var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            
            for (name in obj) {
                value = obj[name];
                
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                    + encodeURIComponent(value) + '&';
                }
            }
            
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        
        return angular.isObject(data) && String(data) !== '[object File]'
        ? param(data)
        : data;
    }];
});
	app.controller('LoginController',['$http','$window','$scope',function($http,$window,$scope){
    Login=this;
		request=$http;
    model=Login;
    Login.tohtml = GetQueryString("tohtml");
    Login.Register=function(){
    client.open("zhuce.html",1,false);

   }

    Login.LoginIn=function(){
           if(Login.username==null || Login.username=='')
           {
             progress("Error","请输入用户名");
             return;
           }

           if(Login.password==null || Login.password=='')
           {
             progress("Error","请输入密码");
             return;
           } 
     
            progress("Show","正在登陆...");
             //$http({url:'http://' + '120.26.110.125/jncloud'+ '/app/Index!ajaxUserLogin.action',method:'post',data:{"uname":Login.username,"password":Login.password}}).success(function(data){
             $http({url:'http://' + url+ '/app/Index!login.action',method:'post',data:{"uname":Login.username,"password":Login.password}}).success(function(data){
              progress("Dismiss");
               // client.setUserJson(1,"aaa","aaa","13136369541",1,23);
               // client.setLoginInfo(Login.username,Login.password);
               // if(Login.tohtml=='') progress("Success","登陆成功!","goPrevious();");
               // else                 progress("Success","登陆成功!","gotoNextHtml();");
               //alert(JSON.stringify(data));
             if(data.errcode==106)
             {
                client.setUserJson(data.user.id,data.user.nickname.toString(),'http://tech.zhetian.net/app/mlm/leishao.jpeg',data.user.phone.toString(),data.user.sex,data.user.age);
                client.setLoginInfo(Login.username,Login.password);
                if(Login.tohtml=='') progress("Success","登陆成功!","goPrevious();");
                else                 progress("Success","登陆成功!","gotoNextHtml();");
             }
             else
             {
                progress("Error",data.errmsg);
             }
        }).error(function(data, status, headers, config){
            progress("Dismiss");
          if((status >= 200 && status < 300 ) || status === 304 || status === 1223 || status === 0)
          {
            progress("Error","网络访问出错!");
          }
        }) ;
    }

    Login.init=function(username,psw){
      $scope.$apply(function(){
         Login.username = username;
         Login.password = psw;
      });
    }

	}]);
})();

function addNativeOK(){
    url = getPath();
    uname = client.readGlobalInfo("username");
    cd    = client.readGlobalInfo("password"); 
    model.init(uname,cd);
    //client.createLoading();
}

function gotoNextHtml(){
   if(model.tohtml=="lishixinchengdan.html")
    client.open(model.tohtml,1,true,"plus");
   else if(model.tohtml=="yaojietuan.html")
    client.open(model.tohtml,1,true,"历史抢单");
  else if(model.tohtml=="shuoshuo.html")
    client.openSay();
    else
    client.open(model.tohtml,1,true,"");  
}