var url="";
var model;
var request;
var Xincheng;
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
	var app=angular.module('Xincheng',[ ]);

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


	app.controller('XinchengController',['$http','$window','$scope',function($http,$window,$scope){
    Xincheng=this;
		request=$http;
    model=Xincheng;



    Xincheng.editIndex = -1;
    Xincheng.editflag = 1; //标志位表示原生态对话框要更新哪个变量

    Xincheng.init=function(){
      var day = null;
      Xincheng.list = getEditInfo3();
      Xincheng.startdate = getEditInfo1().startdate;
      Xincheng.enddate = getEditInfo1().enddate;
      if( Xincheng.list==null)
      {
        Xincheng.list=new Array();

        if(Xincheng.startdate!=null&&Xincheng.enddate!=null)
        {
          s1 = new Date(Xincheng.startdate.toString());
          s2 = new Date(Xincheng.enddate.toString());

          var days = s2.getTime() - s1.getTime();
          day = parseInt(days / (1000 * 60 * 60 * 24));
        }

        for(var i=0;i<day+1;i++)
        {

           var o = new Object();

            var ds = new Date(Xincheng.startdate);
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
            Xincheng.list.push(o);
        }
      }
      else
      {
        //判断第一步的时候起止时间有无变更
        if(Xincheng.list[0].date==Xincheng.startdate && Xincheng.list[Xincheng.list.length-1].date==Xincheng.enddate)
        {
          for(var i=0;i<Xincheng.list.length;i++)
            {
                Xincheng.list[i].addflag = true;
                Xincheng.list[i].zhankai = false;
                Xincheng.list[i].style = {"display":"none"};
            }
        }
        else
        {
                Xincheng.list.length=0;

                if(Xincheng.startdate!=null&&Xincheng.enddate!=null)
                {
                  s1 = new Date(Xincheng.startdate.toString());
                  s2 = new Date(Xincheng.enddate.toString());

                  var days = s2.getTime() - s1.getTime();
                  day = parseInt(days / (1000 * 60 * 60 * 24));
                }

                for(var i=0;i<day+1;i++)
                {

                   var o = new Object();

                    var ds = new Date(Xincheng.startdate);
                    o.date =getSmpFormatDateByLong(getthedate(ds.getTime(),i),false);
                    o.addflag = true;
                    o.zhankai = false;
                    o.traillist= new Array();
                    o.style = {"display":"none"};
                    o.edit_starttime='请输入起始时间';
                    o.edit_endtime='请输入结束时间';
                    o.edit_interest='请输入景点';
                    o.place = '地点';
                    Xincheng.list.push(o);
                }
        }

      }

    }

    Xincheng.zhankai=function(index,flag){
        Xincheng.list[index].zhankai = flag; 
      $(".rail_detail").eq(index).slideToggle();
    }

    Xincheng.addplace=function(index,content){
        Xincheng.editIndex = index;
        Xincheng.editflag  = 4;
        if(content.toString()=='地点') content = '';
        showDialog(1,"填写地点",content.toString(),"ChangeSuccess");
    }

    Xincheng.addreferweather=function(index,content){
        Xincheng.editIndex = index;
        Xincheng.editflag  = 5;
        if(content.toString()=='天气') content = '';
        showDialog(1,"填写参考天气",content.toString(),"ChangeSuccess");
    }


    Xincheng.addrail=function(index,flag){
     
     Xincheng.list[index].addflag = flag;
    }

    Xincheng.confirmrail=function(index){
       if(Xincheng.list[index].edit_starttime=='请输入起始时间' 
        || Xincheng.list[index].edit_endtime=='请输入结束时间'
        || Xincheng.list[index].edit_interest=='请输入景点'  ) 
        {
          client.showmsg('请确认填写完整'); 
          return;
        }  

       var dsa = Xincheng.list[index].edit_starttime.replace(/:/g,"");
       var dsa2 = Xincheng.list[index].edit_endtime.replace(/:/g,"");

        if(Number(dsa)>=Number(dsa2))
        {
          client.showmsg('结束时间必须大于起始时间');
          return;
        }

               var m =new Object();
               m.starttime = Xincheng.list[index].edit_starttime;
               m.endtime   = Xincheng.list[index].edit_endtime;
               m.interest  = Xincheng.list[index].edit_interest;
               Xincheng.list[index].traillist.push(m);
               Xincheng.list[index].edit_starttime='请输入起始时间';
               Xincheng.list[index].edit_endtime='请输入结束时间';
               Xincheng.list[index].edit_interest='请输入景点';
               Xincheng.list[index].addflag = true;
    }


    Xincheng.chooseStartTime=function(index){
      Xincheng.editIndex = index;
      Xincheng.editflag  = 1;
      if(Xincheng.list[index].date!=null&&Xincheng.list[index].date!=0)
      {
          var dsa = new Date(Xincheng.list[index].date).getTime();
          client.creatTimeDialog(dsa);
      }

    }

    Xincheng.chooseEndTime=function(index){
      Xincheng.editIndex = index;
      Xincheng.editflag  = 2;
      if(Xincheng.list[index].date!=null&&Xincheng.list[index].date!=0)
      {
          var dsa = new Date(Xincheng.list[index].date).getTime();
          client.creatTimeDialog(dsa);
      }
    }

    Xincheng.chooseInterest=function(index,content){
        
        Xincheng.editIndex = index;
        Xincheng.editflag  = 3;
        if(content.toString()=='请输入景点') content = '';
        showDialog(1,"填写景点",content.toString(),"ChangeSuccess");
    }

    Xincheng.refreshEditStr=function(content){
          $scope.$apply(function(){
            if( Xincheng.editIndex !=-1)
            {
              if(Xincheng.editflag==3)
              Xincheng.list[Xincheng.editIndex].edit_interest = content;
              else if(Xincheng.editflag==4)
              Xincheng.list[Xincheng.editIndex].place = content;
              else if(Xincheng.editflag==5)
              Xincheng.list[Xincheng.editIndex].referWeather = content;
            }
            
          });
    }


    Xincheng.refreshEditTime=function(hour,minute){
          $scope.$apply(function(){
            if( Xincheng.editIndex !=-1)
            {
              if(Xincheng.editflag==1)
               Xincheng.list[Xincheng.editIndex].edit_starttime = (hour<10?('0'+hour):hour)+":"+(minute<10?('0'+minute):minute);
             else if(Xincheng.editflag==2) 
               Xincheng.list[Xincheng.editIndex].edit_endtime = (hour<10?('0'+hour):hour)+":"+(minute<10?('0'+minute):minute);
            }

          });
    }

    Xincheng.delete=function(index,parentindex){

     Xincheng.list[parentindex].traillist.splice(index,1);
    }

      Xincheng.checkAndSave=function(){
            var savelist = new Array();
            for(var i=0;i<Xincheng.list.length;i++)
            {
               var o = new Object();
               o.date = Xincheng.list[i].date;
               o.place = Xincheng.list[i].place;
               o.referWeather = Xincheng.list[i].referWeather;
               o.traillist = Xincheng.list[i].traillist;
               savelist.push(o);
            }
           setEditInfo3(JSON.stringify(savelist));
      }

    Xincheng.init();

	}]);
})();


function saveInfo(){
      model.checkAndSave();
}

function ChangeSuccess(flag,message){
   
   model.refreshEditStr(message);
}

function updatetime(hour,minute){
model.refreshEditTime(hour,minute);
}

// function addNativeOK(){
//     url = getPath();
// }
