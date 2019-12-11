var url="";
var model;
var request;
var Wode;
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
	var app=angular.module('Wode',[ ]);
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
	app.controller('WodeController',['$http','$window','$scope',function($http,$window,$scope){
        Wode=this;
		request=$http;
    model=Wode;
    
    Wode.gotoMine=function(){
      LoginTo("wodexinxi.html",1,"");
    }

    Wode.gotoHistory=function(){
      LoginTo("lishixinchengdan.html",1,"");
    }
    Wode.gotoJIfen=function(){
      client.showmsg("敬请期待");
    }
    Wode.gotoTousu=function(){
      LoginTo("toushu.html",1,"");
    }
    Wode.gotoUpdateCode=function(){
      LoginTo("xiugaimima.html",1,"");
    }

    Wode.logout=function(){
       showAlert("确认","确认要退出账号?","Logout();");
    }

    Wode.Login=function(){
      if(Wode.user==null)  client.open("denglu.html?tohtml=",1,false,"");
    }

    Wode.refresh=function(obj){
           $scope.$apply(function(){
            Wode.user = obj;  
           });
    }

	}]);
})();

function addNativeOK(){
    url = getPath();
    onResume();
}

function onResume(){
   model.refresh(getUser());
}

function Logout(){
      client.logout();
      onResume();
}