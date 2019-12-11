var url="";
var model;
var request;
var Access;
var result=false;
function LoadData(){
  result=false;
  creatMask();
    request.post('http://'+url+'/app/Guide!sheetDetail.action?guideId='+model.user.id+'&accessTrailId='+GetQueryString("id")).success(function(data){
        console.log(data);
        removeMask();
         model.detail = data;
         }).error(function(data,status,headers,config){
          removeMask();
      if((status>=200&&status<300)||status===304||status===1223||status===0){
      progress("Error","网络访问出错!");
      }
      });
}


(function(){
	var app=angular.module('Access',[ ]);
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
	app.controller('AccessController',['$http','$window','$scope',function($http,$window,$scope){
    Access=this;
		request=$http;
    model=Access;
    Access.robId = -1;
   Access.rob =function(id){
    Access.robId = id;
    showAlert("确认","确认抢此单吗?","Access.submit();");
   }

   Access.submit=function(){
    progress("Show","提交中...");
            $http({url:'http://' + url+ '/app/Guide!robsheet.action',method:'post',data:{"guideId":Access.user.id,"accessTrailId":Access.robId}}).success(function(data){
              progress("Dismiss");
             if(data.result==1)
             {
                 progress("Success","提交成功!","goPrevious();");
             }
             else
             {
                progress("Error","提交失败");
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
    model.user = getUser();
    LoadData();
}
