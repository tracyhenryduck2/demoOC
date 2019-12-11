var url="";
var model;
var request;
var Add;
var result=false;
var totalplacelist = [];
var referweatherlist = [];
var starttimelist=[];
var endtimelist=[];
var interestplacelist=[];
var datelist=[];
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
    Add.list = new Array();

    Add.traillist = new Array();
    Add.teamInfoBean = new Object();

    Add.addchengyuan=function(){
      showAddMemberDialog("添加成员",'ChangeSuccess');
    }

    Add.delete=function(index){
      Add.list.splice(index,1);
    }
    
    Add.refresh=function(sex,nick,phone,age){
        $scope.$apply(function(){
             var o = new Object();
             o.sex = sex;
             o.name = nick;
             o.phone = phone;
             o.age = age;
             Add.list.push(o);
        });
    }
/**
{"teamInfoBean":Add.teamInfoBean,
              "name":Add.namelist,"age":Add.agelist,"sex":Add.sexlist,"phone":Add.phonelist,"totalPlace":Add.totalplacelist,
              "referWeather":Add.referweatherlist,"startTime":Add.starttimelist,"endTime":Add.endtimelist,
              "interestPlace":Add.interestplacelist,"date":Add.datelist}
**/
//http://' + url+ '/app/Guide!addTeam.action
    Add.sumbit = function(){
      progress("Show","请稍后...");
      if(Add.traillist.length==0)  
      {
        progress("Dismiss");
        progress("Error","请设置路线!");
        return;
      }
 
       if(Add.list.length==0)  
      {
        progress("Dismiss");
        progress("Error","请添加游客信息!");
        return;
      }  

             $http({url:'http://' + url+ '/app/Guide!addTeam.action',method:'post',data:{'teamInfo':JSON.stringify(Add.teamInfoBean),'travollerList':JSON.stringify(Add.list),'trailList':JSON.stringify(Add.traillist)}}).success(function(data){
          progress("Dismiss");

          if(data.result==1)
          {
            progress("Success","提交成功!","Add.gofinish();");
          }
          else
          {
            progress("Error","提交失败!");
          }
  
        }).error(function(data, status, headers, config){
         progress("Dismiss");
          if((status >= 200 && status < 300 ) || status === 304 || status === 1223 || status === 0)
          {
            progress("Error","网络访问出错!");
          }
        }) ;
    }

    Add.gofinish=function(){
      client.gofinish();
    }


	}]);
})();

function addNativeOK(){
  url  = getPath();
  model.user = getUser();
}

function ChangeSuccess(sex,nick,phone,age){
  model.refresh(sex,nick,phone,age);
}

function submit(){
  var a = getEditInfo1();
  var b = getEditInfo2();
  var c = getEditInfo3();
  var d = getEditInfo4();
  model.traillist = [];
  for(var i=0;i<c.length;i++)
  {
    var date  = c[i].date;
    var place = c[i].place;
    var weather =c[i].referWeather;
    for(var j=0;j<c[i].traillist.length;j++)
    {
      var o = new Object();
      o.endTime = c[i].traillist[j].endtime==null?'':c[i].traillist[j].endtime;
      o.startTime = c[i].traillist[j].starttime==null?'':c[i].traillist[j].starttime;
      o.interestPlace = c[i].traillist[j].interest==null?'':c[i].traillist[j].interest;
      o.date = date==null?'':date;
      o.totalPlace = place==null?'':place;
      o.referWeather = weather==null?'':weather;
      model.traillist.push(o);
    }
  }

   model.teamInfoBean.teamName  = a.teamname==null?'':a.teamname;
   model.teamInfoBean.guideId   = model.user.id;
   model.teamInfoBean.createId   = model.user.id;
   model.teamInfoBean.peopleNum   = a.peopleNum==null?'':a.peopleNum;
   model.teamInfoBean.startDate = a.startdate==null?'':a.startdate;
   model.teamInfoBean.endDate = a.enddate==null?'':a.enddate;
   model.teamInfoBean.leadName = a.leadname==null?'':a.leadname;
   model.teamInfoBean.leadPhone = a.leadphone==null?'':a.leadphone;
   model.teamInfoBean.emergencyApplyer = a.emergencyapplyer==null?'':a.emergencyapplyer;
   model.teamInfoBean.emergencyPhone = a.emergencyphone==null?'':a.emergencyphone;
   model.teamInfoBean.carNumber = a.carnumber==null?'':a.carnumber;
   model.teamInfoBean.startFlight = a.startflight==null?'':a.startflight;
   model.teamInfoBean.backFlight = a.endflight==null?'':a.endflight;
   model.teamInfoBean.airportSend = b.airportsend==null?'':b.airportsend;
   model.teamInfoBean.airportGather = b.airportgather==null?'':b.airportgather;
   model.teamInfoBean.startGather = b.startgather==null?'':b.startgather;


   model.teamInfoBean.summary = d.summary==null?'':d.summary;
   model.teamInfoBean.climate= d.climate==null?'':d.climate;
   model.teamInfoBean.localTimes = d.localtimes==null?'':d.localtimes;
   model.teamInfoBean.clothes = d.clothes==null?'':d.clothes;
   model.teamInfoBean.note = d.note==null?'':d.note;

  model.sumbit();
}

// function addNativeOK(){
//     url = getPath();
// }
