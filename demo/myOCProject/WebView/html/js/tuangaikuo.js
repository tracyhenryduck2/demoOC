var url="";
var model;
var request;
var Tuan;
var result=false;
function LoadData(){
  creatMask();
  result=false;
    request.post('http://'+url+'/app/Guide!teamInfo.action?teamId='+GetQueryString('id')).success(function(data){
        removeMask();
         model.detail = data;
         model.detail.filterInterest = model.filterToString(data.interestPlace);
         }).error(function(data,status,headers,config){
      removeMask();
      if((status>=200&&status<300)||status===304||status===1223||status===0){
      progress("Error","网络无法连接");
      }
      });
}


(function(){
	var app=angular.module('Tuan',[ ]);

 app.filter("NumberFilter",function(){
                return function(input){
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
            });


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
	app.controller('TuanController',['$http','$window','$scope',function($http,$window,$scope){
        Tuan=this;
		request=$http;
    model=Tuan;
    //LoadData();



    Tuan.moreTrail=function(){
       client.open("trail.html?id="+GetQueryString('id'),1,false,"");
    }

    Tuan.moreMember=function(){
      client.open("chengyuanlist.html?id="+GetQueryString('id'),1,false,"");
    }

    Tuan.moreComment=function(){
      client.open("pinlun.html?id="+GetQueryString('id'),1,false,"");
    }

    Tuan.filterToString = function(data){
       var dsa2 = new Array();
       if(data.length>0)
       {
          for(var i=0;i<data.length;i++)
          {
             var dsa  =  data[i].interest_place.split(",");
             var str ='';

             for(var j=0;j<dsa.length;j++)
             {

               var douhao = (j==(dsa.length-1)?'':',');
                  str+=('第'+filterToChinese(j+1)+'站:'+dsa[j]+douhao); 
             }
 
             var o = new Object();
             o.interest_place = str;
                 console.log(o);
             dsa2.push(o); 
          }
          return dsa2;
       }

       return null;
    }

    //     Tuan.detail = {interestplace:[{interest_place:'背景,背景2,背景3'},{interest_place:'背景'},{interest_place:'背景'}]};
    //  Tuan.detail.filterInterest = Tuan.filterToString(Tuan.detail.interestplace);
    // console.log(Tuan.detail);

	}]);
})();

function addNativeOK(){
    url = getPath();
    model.user = getUser();
    LoadData();
}