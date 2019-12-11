var url="";
var model;
var request;
var Register;
var result=false;
function LoadData(){
  result=false;
    request.post('http://'+url+'/app/ProjectOverview!ajaxProjectOverview.action').success(function(data){
        console.log(data);
         //model.list = data;
         }).error(function(data,status,headers,config){
      if((status>=200&&status<300)||status===304||status===1223||status===0){
      $("body").html("网络访问出错！");
      }
      });
}


(function(){
	var app=angular.module('Register',[ ]);
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
	app.controller('RegisterController',['$http','$window','$scope',function($http,$window,$scope){
    Register=this;
		request=$http;
    model=Register;
    Register.sex =1;
     Register.chooseSex=function(sex){
        Register.sex = sex;
     }

    Register.checkName=function(){
         var flag = chknameHalf(Register.username);
         if(flag==2){
            Register.checknote1 = "用户名包含全角字符";
         }
        else {
          Register.checknote1 = "";
        }
    }

    Register.checkpassword=function(){
         var flag = chkpasswordHalf(Register.password);
         if(flag==3){
            Register.checknote2 = "密码长度不符合要求";
         }else if(flag==2){
           Register.checknote2 = "密码包含全角字符";
         }else if(flag==1){
           Register.checknote2 = "密码过于简单，请填写两种以上的字母、数字、或者半角字符";
         }
        else {
          Register.checknote2= "";
        }
    }

    Register.checkpasswordconfirm=function(){
         var flag = chkpasswordHalf(Register.passwordconfirm);
         if(flag==3){
            Register.checknote3 = "密码长度不符合要求";
         }else if(flag==2){
           Register.checknote3 = "密码包含全角字符";
         }else if(flag==1){
           Register.checknote3 = "密码过于简单，请填写两种以上的字母、数字、或者半角字符";
         }
        else {
          Register.checknote3= "";
        }
    }

    Register.submit=function(){
        if(Register.username==null||Register.username=='')
        {
          progress("Error","用户名不能为空");
          return;
        }
        if(Register.password==null||Register.password=='')
        {
          progress("Error","密码不能为空");
          return;
        }
        if(Register.passwordconfirm==null||Register.passwordconfirm=='')
        {
          progress("Error","密码确认不能为空");
          return;
        }
        if(Register.nickname==null||Register.nickname=='')
        {
          progress("Error","昵称不能为空");
          return;
        }
        if(Register.phone==null||Register.phone=='')
        {
          progress("Error","手机号不能为空");
          return;
        }
        if(Register.checknote1!='')
        {
          progress("Error","用户名不符合要求");
          return;
        }
        if(Register.checknote2!='')
        {
          progress("Error","密码不符合要求");
          return;
        }
        if(Register.checknote3!='')
        {
          progress("Error","密码确认不符合要求");
          return;
        }
        if(Register.password!=Register.passwordconfirm)
        {
          progress("Error","密码确认不一致");
          return;
        }

        progress("Show","正在提交中...");

         $http({url:'http://' + url+ '/app/Index!ajaxUserLogin.action',method:'post',data:{"username":Register.username,"password":Register.password}}).success(function(data){
          progress("Dismiss");
         if(data.code==1)
         {
             progress("Success","注册成功!","goPrevious();");
         }
         else
         {
            progress("Error","注册失败!");
         }
    }).error(function(data, status, headers, config){
      progress("Dismiss");
      if((status >= 200 && status < 300 ) || status === 304 || status === 1223 || status === 0)
      {
        progress("Error","网络访问出错!");
      }
    }) ;

    }

	}]);
})();

function addNativeOK(){
    url = getPath();
}
