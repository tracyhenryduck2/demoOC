var url="";
var model;
var request;
var Historys;
var result=false;
var result1= false;
var result2= false;
var result3= false;
function LoadNowData(){
     result1= false;
    request.post('http://'+url+'/app/Guide!teamList.action?guideId='+model.user.id+"&status=1").success(function(data){
        console.log(data);
         model.nowlist = data;
         result1= true;
         if(result1&&result2&&result3)  removeMask();
         }).error(function(data,status,headers,config){
      if((status>=200&&status<300)||status===304||status===1223||status===0){
          progress("Error","网络访问出错!");
      }
      });
}

function LoadFutureData(){
    result2= false;
    request.post('http://'+url+'/app/Guide!teamList.action?guideId='+model.user.id+"&status=0").success(function(data){
        console.log(data);
         model.fulist = data;
         result2= true;
         if(result1&&result2&&result3)  removeMask();
         }).error(function(data,status,headers,config){
      if((status>=200&&status<300)||status===304||status===1223||status===0){
     progress("Error","网络访问出错!");
      }
      });
}

function LoadHisData(){
     result3= false;
    request.post('http://'+url+'/app/Guide!teamList.action?guideId='+model.user.id+"&status=2").success(function(data){
        console.log(data);
         model.hislist = data;
         result3= true;
         if(result1&&result2&&result3)  removeMask();
         }).error(function(data,status,headers,config){
      if((status>=200&&status<300)||status===304||status===1223||status===0){
        progress("Error","网络访问出错!");
      }
      });
}


(function(){
	var app=angular.module('Historys',[ ]);
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
	app.controller('HistorysController',['$http','$window','$scope',function($http,$window,$scope){
        Historys=this;
		request=$http;
    model=Historys;
    
    Historys.gotoTuan=function(id){
      client.open("tuangaikuo.html?id="+id,1,false,"");
    }

	}]);
})();

function addNativeOK(){
    creatMask();
    url = getPath();
    model.user = getUser();
    LoadHisData();
    LoadNowData();
    LoadFutureData();
}

function extraAction(){
   client.open("test.html",1,false,"下一步");
}

function onMyResume(){
    LoadHisData();
    LoadNowData();
    LoadFutureData();
}