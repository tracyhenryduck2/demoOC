var url="";
var model;
var request;
var Add;
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
	var app=angular.module('Add',[ ]);
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
	app.controller('AddController',['$http','$window','$scope',function($http,$window,$scope){
    Add=this;
		request=$http;
    model=Add;

    Add.flag = 1;

      Add.init=function(){

          $scope.$apply(function(){
            Add.detail = getEditInfo1();
            if(Add.detail==null){
              Add.detail = new Object();
              Add.detail.guideid = Add.user.id;
              Add.detail.guidename = Add.user.nickname;
              Add.detail.guidephone = Add.user.phone;
            } 
          });


 
      }
  

      Add.checkAndSave=function(){
       var re = /^[0-9]+.?[0-9]*$/;


           if(Add.detail.startdate==null || Add.detail.startdate=="" || Add.detail.enddate==null || Add.detail.enddate=="")
           {
              client.showmsg("请填写起止日期");
              return;
           }
           else if(Add.detail.teamname==null || Add.detail.teamname=="")
          {
             client.showmsg("请填写团名称");
             return;
          }
          else if(Add.detail.peopleNum==null || Add.detail.peopleNum=="")
          {
             client.showmsg("请填写总人数");
             return;
          }
          else if(!re.test(Add.detail.peopleNum))
          {
             client.showmsg("总人数必须是数字");
             return;
          }
           else
           {
             
              var dsa = Add.detail.startdate.replace(/-/g,"");
              var dsa2 = Add.detail.enddate.replace(/-/g,"");
               if(Number(dsa)>Number(dsa2)) 
               {
                  client.showmsg('结束日期必须不小于起始日期');
                  return;
               }
               else
               {
               setEditInfo1(JSON.stringify(Add.detail));
               client.setProcess(2);
               client.openAdd("jihexinxi.html",0,false);
               }
           }


      }
      
      Add.choosedate=function(flag){
        Add.flag =flag;
        var dsa = new Date().getTime();       
        client.creatDateDialog(dsa);
      }

      Add.refreshdate=function(year,month,day){
           $scope.$apply(function(){
                var m = month+1;
               if(Add.flag ==1) 
               {
                Add.detail.startdate = year + "-"+(m<10?('0'+m):m)+"-"+(day<10?('0'+day):day);
               }
              else 
              {
                Add.detail.enddate = year + "-"+(m<10?('0'+m):m)+"-"+(day<10?('0'+day):day);
              }
           });
      }

	}]);
})();

function updatedate(year,month,day){
   model.refreshdate(year,month,day);
}

function saveInfo(){
      model.checkAndSave();
}

function addNativeOK(){
    url = getPath();
    model.user = getUser();
    model.init();
}
