var url="";
var model;
var request;
var Say;
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
	var app=angular.module('Say',[ ]);
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
	app.controller('SayController',['$http','$window','$scope',function($http,$window,$scope){
        Say=this;
		request=$http;
    model=Say;
    Say.list = [];
    Say.delteindex = -1;
    Say.addpic=function(){

      client.showPhotoSheet();
 

    }

    Say.deletepic=function(index){
        Say.delteindex = index;
        showAlert("删除","是否删除此图片?","refreshDelete();");
    }

    Say.refreshImage=function(str1,str2){
       $scope.$apply(function(){
          var o = new Object();
          o.thumbnail = "file://" + str1;
          o.detail = "file://" + str2;
          Say.list.push(o);
       });
    }

     Say.refreshDelete=function(index){
       $scope.$apply(function(){
          Say.list.splice(index,1);
       });
    }

	}]);
})();

function addNativeOK(){
    url = getPath();
}

function refreshImage(str1,str2){
    //model.refreshImage(str);
    model.refreshImage(str1,str2);
}

function refreshDelete(){
   model.refreshDelete(model.delteindex);
}
