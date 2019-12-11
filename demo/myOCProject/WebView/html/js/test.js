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
	app.controller('AddController',['$http','$window','$scope',function($http,$window,$scope){
    Add=this;
		request=$http;
    model=Add;

    Add.flag = 1;
    Add.process=1;

      Add.init=function(){

          $scope.$apply(function(){
            if(Add.detail==null){
              Add.detail = new Object();
              Add.detail.guideid = Add.user.id;
              Add.detail.guidename =Add.user.nickname;
              Add.detail.guidephone = Add.user.phone;
            } 
          });


 
      }


      Add.checkAndSave1=function(){
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
                  Add.process=2;
                  client.setParm("1");
                  $scope.$apply(function(){
                   Add.process=2;
                  });
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


    Add.checkAndSave2=function(){
      $scope.$apply(function(){
        Add.process=3;
        Add.init3();
      });

    }

    Add.editIndex = -1;
    Add.editflag = 1; //标志位表示原生态对话框要更新哪个变量

    Add.init3=function(){
      var day = null;
      if( Add.datelist==null)
      {
        Add.datelist=new Array();

        if(Add.detail.startdate!=null&&Add.detail.enddate!=null)
        {
          s1 = new Date(Add.detail.startdate.toString());
          s2 = new Date(Add.detail.enddate.toString());

          var days = s2.getTime() - s1.getTime();
          day = parseInt(days / (1000 * 60 * 60 * 24));
        }

        for(var i=0;i<day+1;i++)
        {

           var o = new Object();

            var ds = new Date(Add.detail.startdate);
            o.date =getSmpFormatDateByLong(getthedate(ds.getTime(),i),false);
            o.addflag = true;
            o.zhankai = false;
            o.traillist= new Array();
            o.style = {"display":"none"};
            o.edit_starttime='请输入起始时间';
            o.edit_endtime='请输入结束时间';
            o.edit_interest='请输入景点';
            o.place = '地点';
            o.referWeather = '天气';
            Add.datelist.push(o);
        }
      }
      else
      {
        //判断第一步的时候起止时间有无变更
        if(Add.datelist[0].date==Add.detail.startdate && Add.datelist[Add.datelist.length-1].date==Add.detail.enddate)
        {
          for(var i=0;i<Add.datelist.length;i++)
            {
                Add.datelist[i].addflag = true;
                Add.datelist[i].zhankai = false;
                Add.datelist[i].style = {"display":"none"};
            }
        }
        else
        {
                Add.datelist.length=0;

                if(Add.detail.startdate!=null&&Add.detail.enddate!=null)
                {
                  s1 = new Date(Add.detail.startdate.toString());
                  s2 = new Date(Add.detail.enddate.toString());

                  var days = s2.getTime() - s1.getTime();
                  day = parseInt(days / (1000 * 60 * 60 * 24));
                }

                for(var i=0;i<day+1;i++)
                {

                   var o = new Object();

                    var ds = new Date(Add.detail.startdate);
                    o.date =getSmpFormatDateByLong(getthedate(ds.getTime(),i),false);
                    o.addflag = true;
                    o.zhankai = false;
                    o.traillist= new Array();
                    o.style = {"display":"none"};
                    o.edit_starttime='请输入起始时间';
                    o.edit_endtime='请输入结束时间';
                    o.edit_interest='请输入景点';
                    o.place = '地点';
                    o.referWeather = '天气';
                    Add.datelist.push(o);
                }
        }

      }

    }

    Add.zhankai=function(index,flag){
        Add.datelist[index].zhankai = flag; 
      $(".rail_detail").eq(index).slideToggle();
    }

    Add.addplace=function(index,content){
        Add.editIndex = index;
        Add.editflag  = 4;
        if(content.toString()=='地点') content = '';
        showDialog(1,"填写地点",content.toString(),"ChangeSuccess");
    }

    Add.addreferweather=function(index,content){
        Add.editIndex = index;
        Add.editflag  = 5;
        if(content.toString()=='天气') content = '';
        showDialog(1,"填写参考天气",content.toString(),"ChangeSuccess");
    }


    Add.addrail=function(index,flag){
     
     Add.datelist[index].addflag = flag;
    }

    Add.confirmrail=function(index){
       if(Add.datelist[index].edit_starttime=='请输入起始时间' 
        || Add.datelist[index].edit_endtime=='请输入结束时间'
        || Add.datelist[index].edit_interest=='请输入景点'  ) 
        {
          client.showmsg('请确认填写完整'); 
          return;
        }  

       var dsa = Add.datelist[index].edit_starttime.replace(/:/g,"");
       var dsa2 = Add.datelist[index].edit_endtime.replace(/:/g,"");

        if(Number(dsa)>=Number(dsa2))
        {
          client.showmsg('结束时间必须大于起始时间');
          return;
        }

               var m =new Object();
               m.starttime = Add.datelist[index].edit_starttime;
               m.endtime   = Add.datelist[index].edit_endtime;
               m.interest  = Add.datelist[index].edit_interest;
               Add.datelist[index].traillist.push(m);
               Add.datelist[index].edit_starttime='请输入起始时间';
               Add.datelist[index].edit_endtime='请输入结束时间';
               Add.datelist[index].edit_interest='请输入景点';
               Add.datelist[index].addflag = true;
    }


    Add.chooseStartTime=function(index){
      Add.editIndex = index;
      Add.editflag  = 1;
      if(Add.datelist[index].date!=null&&Add.datelist[index].date!=0)
      {
          var dsa = new Date(Add.datelist[index].date).getTime();
          client.creatTimeDialog(dsa);
      }

    }

    Add.chooseEndTime=function(index){
      Add.editIndex = index;
      Add.editflag  = 2;
      if(Add.datelist[index].date!=null&&Add.datelist[index].date!=0)
      {
          var dsa = new Date(Add.datelist[index].date).getTime();
          client.creatTimeDialog(dsa);
      }
    }

    Add.chooseInterest=function(index,content){
        
        Add.editIndex = index;
        Add.editflag  = 3;
        if(content.toString()=='请输入景点') content = '';
        showDialog(1,"填写景点",content.toString(),"ChangeSuccess");
    }

    Add.refreshEditStr=function(content){
          $scope.$apply(function(){
            if( Add.editIndex !=-1)
            {
              if(Add.editflag==3)
              Add.datelist[Add.editIndex].edit_interest = content;
              else if(Add.editflag==4)
              Add.datelist[Add.editIndex].place = content;
              else if(Add.editflag==5)
              Add.datelist[Add.editIndex].referWeather = content;
            }
            
          });
    }


    Add.refreshEditTime=function(hour,minute){
          $scope.$apply(function(){
            if( Add.editIndex !=-1)
            {
              if(Add.editflag==1)
               Add.datelist[Add.editIndex].edit_starttime = (hour<10?('0'+hour):hour)+":"+(minute<10?('0'+minute):minute);
             else if(Add.editflag==2) 
               Add.datelist[Add.editIndex].edit_endtime = (hour<10?('0'+hour):hour)+":"+(minute<10?('0'+minute):minute);
            }

          });
    }

    Add.delete=function(index,parentindex){

     Add.datelist[parentindex].traillist.splice(index,1);
    }



    Add.mblist = new Array();

    Add.traillist = new Array();
    Add.teamInfoBean = new Object();

    Add.addchengyuan=function(){
      showAddMemberDialog("添加成员",'ChangeSuccess2');
    }

    Add.delete=function(index){
      Add.mblist.splice(index,1);
    }
    
    Add.refresh=function(sex,nick,phone,age){
        $scope.$apply(function(){
             var o = new Object();
             o.sex = sex;
             o.name = nick;
             o.phone = phone;
             o.age = age;
             Add.mblist.push(o);
        });
    }
/**
{"teamInfoBean":Add.teamInfoBean,
              "name":Add.namelist,"age":Add.agelist,"sex":Add.sexlist,"phone":Add.phonelist,"totalPlace":Add.totalplacelist,
              "referWeather":Add.referweatherlist,"startTime":Add.starttimelist,"endTime":Add.endtimelist,
              "interestPlace":Add.interestplacelist,"date":Add.datelist}
**/
//http://' + url+ '/app/Guide!addTeam.action

   Add.sumbitbefore=function(){
    showAlert("确定","确认发布吗？","Add.sumbit();");
   }

    Add.sumbit = function(){
      progress("Show","请稍后...");
      if(Add.traillist.length==0)  
      {
        progress("Dismiss");
        progress("Error","请设置路线!");
        return;
      }
 
       if(Add.mblist.length==0)  
      {
        progress("Dismiss");
        progress("Error","请添加游客信息!");
        return;
      }  

             $http({url:'http://' + url+ '/app/Guide!addTeam.action',method:'post',data:{'teamInfo':JSON.stringify(Add.teamInfoBean),'travollerList':JSON.stringify(Add.mblist),'trailList':JSON.stringify(Add.traillist)}}).success(function(data){
          progress("Dismiss");

          if(data.result==1)
          {
            client.setParm(null);
            progress("Success","提交成功!","goPrevious();");
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


    Add.checkAndSave3=function(){
        $scope.$apply(function(){
           Add.process=4;
            
          });
 
    }

    Add.checkAndSave4=function(){
              $scope.$apply(function(){
                 Add.process=5;
            
          });

    }

   Add.back=function(){
              $scope.$apply(function(){
               if(Add.process>2)
             {
               Add.process--;
             }
             else if(Add.process==2)
             {
               Add.process--;
               client.setParm(null);
             }
            
          });

   }

	}]);
})();

function updatedate(year,month,day){
   model.refreshdate(year,month,day);
}

function ChangeSuccess2(sex,nick,phone,age){
  model.refresh(sex,nick,phone,age);
}

function ChangeSuccess(flag,message){
   
   model.refreshEditStr(message);
}

function updatetime(hour,minute){
model.refreshEditTime(hour,minute);
}



function extraAction(){
  if(model.process==1)
   model.checkAndSave1();
  else if(model.process==2)
   model.checkAndSave2();
  else if(model.process==3)
  model.checkAndSave3();
  else if(model.process==4)
  model.checkAndSave4();
  else if(model.process==5)
  {
   model.traillist = [];
  for(var i=0;i<model.datelist.length;i++)
  {
    var date  = model.datelist[i].date;
    var place = model.datelist[i].place;
    var weather =model.datelist[i].referWeather;
    for(var j=0;j<model.datelist[i].traillist.length;j++)
    {
      var o = new Object();
      o.endTime = model.datelist[i].traillist[j].endtime==null?'':model.datelist[i].traillist[j].endtime;
      o.startTime = model.datelist[i].traillist[j].starttime==null?'':model.datelist[i].traillist[j].starttime;
      o.interestPlace = model.datelist[i].traillist[j].interest==null?'':model.datelist[i].traillist[j].interest;
      o.date = date==null?'':date;
      o.totalPlace = place==null?'':place;
      o.referWeather = weather==null?'':weather;
      model.traillist.push(o);
    }
  }

   model.teamInfoBean.teamName  = model.detail.teamname==null?'':model.detail.teamname;
   model.teamInfoBean.guideId   = model.user.id;
   model.teamInfoBean.createId   = model.user.id;
   model.teamInfoBean.peopleNum   = model.detail.peopleNum==null?'':model.detail.peopleNum;
   model.teamInfoBean.startDate = model.detail.startdate==null?'':model.detail.startdate;
   model.teamInfoBean.endDate = model.detail.enddate==null?'':model.detail.enddate;
   model.teamInfoBean.leadName = model.detail.leadname==null?'':model.detail.leadname;
   model.teamInfoBean.leadPhone = model.detail.leadphone==null?'':model.detail.leadphone;
   model.teamInfoBean.emergencyApplyer = model.detail.emergencyapplyer==null?'':model.detail.emergencyapplyer;
   model.teamInfoBean.emergencyPhone = model.detail.emergencyphone==null?'':model.detail.emergencyphone;
   model.teamInfoBean.carNumber = model.detail.carnumber==null?'':model.detail.carnumber;
   model.teamInfoBean.startFlight = model.detail.startflight==null?'':model.detail.startflight;
   model.teamInfoBean.backFlight = model.detail.endflight==null?'':model.detail.endflight;
   model.teamInfoBean.airportSend = model.detail.airportsend==null?'':model.detail.airportsend;
   model.teamInfoBean.airportGather = model.detail.airportgather==null?'':model.detail.airportgather;
   model.teamInfoBean.startGather = model.detail.startgather==null?'':model.detail.startgather;


   model.teamInfoBean.summary = model.detail.summary==null?'':model.detail.summary;
   model.teamInfoBean.climate= model.detail.climate==null?'':model.detail.climate;
   model.teamInfoBean.localTimes = model.detail.localtimes==null?'':model.detail.localtimes;
   model.teamInfoBean.clothes = model.detail.clothes==null?'':model.detail.clothes;
   model.teamInfoBean.note = model.detail.note==null?'':model.detail.note;

   model.sumbitbefore();
  }

}

function goBack(){
   model.back();
}

function addNativeOK(){
    url = getPath();
    model.user = getUser();
    model.init();
}
