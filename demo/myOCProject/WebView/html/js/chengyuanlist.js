var url="";
var model;
var request;
var Cheng;
var result=false;
function LoadData(){
  result=false;
  //creatMask();
    request.post('http://'+url+'/app/Guide!getTravollerList.action?teamId='+GetQueryString('id')).success(function(data){
       // removeMask();
         model.list = data;
         }).error(function(data,status,headers,config){
     // removeMask();
      if((status>=200&&status<300)||status===304||status===1223||status===0){
      progress("Error","网络访问出错!");
      }
      });
}


(function(){
	var app=angular.module('Cheng',[ ]);
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
	app.controller('ChengController',['$http','$window','$scope',function($http,$window,$scope){
    Cheng=this;
		request=$http;
    model=Cheng;
    // url = "192.168.1.28/trip";
    // LoadData();
    Cheng.call=function(phone){
      client.call('tel:'+phone);
    }
	}]);
})();


function addNativeOK(){
    url = getPath();
    LoadData();
}
