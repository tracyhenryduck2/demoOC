var url="";
var model;
var request;
var Wode;
var result=false;

//获取导游证信息
function LoadGuideExInfo(){

    request.post('http://'+url+'/app/Guide!guideCertificate.action?guideId='+model.user.id).success(function(data){
        model.guideInfo = data;
         }).error(function(data,status,headers,config){
      if((status>=200&&status<300)||status===304||status===1223||status===0){
       progress("Error","网络访问出错!");
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
    Wode.editnickname="";
    Wode.editsex=-1;
    Wode.editage='';
    Wode.edittype='';
    var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(116.404,39.915), 5);



    var txt = "北京";
        
    var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.407845,39.914101), "北京");

    map.addOverlay(myCompOverlay);
   

    Wode.ChangeNickname=function(){
        Wode.edittype = 1;
        showDialog(1,"修改昵称",Wode.user.nickname.toString(),"ChangeSuccess");
    }

    Wode.ChangeAge=function(){
       Wode.edittype = 3;
        showDialog(3,"修改年龄",Wode.user.age.toString(),"ChangeSuccess");
    }

    Wode.ChangeSex=function(){
       Wode.edittype = 2;
        showDialog(2,"修改性别",Wode.user.sex.toString(),"ChangeSuccess");
    }

    Wode.ChangeTouX=function(){
      showDialog(4,"修改头像");
    }

    Wode.refresh=function(obj){
      $scope.$apply(function(){
          Wode.user = obj;
      });
    }

    Wode.EditNickname=function(){
     
            progress("Show","正在修改...");

             $http({url:'http://' + url+ '/app/Index!modNickname.action',method:'post',data:{"uId":Wode.user.id,"nickname":Wode.editnickname}}).success(function(data){
              progress("Dismiss");
             if(data.result==1)
             {
                Wode.user.nickname = Wode.editnickname;
                client.setUserJson(Wode.user.id,Wode.user.nickname.toString(),Wode.user.nickname.toString(),Wode.user.phone.toString(),Wode.user.sex,Wode.user.age);
                progress("Success","昵称修改成功!");
             }
             else
             {
                progress("Error","昵称修改失败");
             }
        }).error(function(data, status, headers, config){
            progress("Dismiss");
          if((status >= 200 && status < 300 ) || status === 304 || status === 1223 || status === 0)
          {
            progress("Error","网络访问出错!");
          }
        }) ;
    }


    Wode.EditAge=function(){
     
            progress("Show","正在修改...");

             $http({url:'http://' + url+ '/app/Index!modAge.action',method:'post',data:{"uId":Wode.user.id,"age":Wode.editage}}).success(function(data){
              progress("Dismiss");
             if(data.result=1)
             {
                Wode.user.age = Wode.editage;
                client.setUserJson(Wode.user.id,Wode.user.nickname.toString(),Wode.user.nickname.toString(),Wode.user.phone.toString(),Wode.user.sex,Wode.user.age);
                progress("Success","年龄修改成功!");
             }
             else
             {
                progress("Error","年龄修改失败");
             }
        }).error(function(data, status, headers, config){
            progress("Dismiss");
          if((status >= 200 && status < 300 ) || status === 304 || status === 1223 || status === 0)
          {
            progress("Error","网络访问出错!");
          }
        }) ;
    }


    Wode.EditSex=function(){
     
            progress("Show","正在修改...");

             $http({url:'http://' + url+ '/app/Index!modSex.action',method:'post',data:{"uId":Wode.user.id,"sex":Wode.editsex}}).success(function(data){
              progress("Dismiss");
             if(data.result==1)
             {
                Wode.user.sex = Wode.editsex;
                client.setUserJson(Wode.user.id,Wode.user.nickname.toString(),Wode.user.nickname.toString(),Wode.user.phone.toString(),Wode.user.sex,Wode.user.age);
                progress("Success","性别修改成功!");
             }
             else
             {
                progress("Error","性别修改失败");
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


function ChangeSuccess(flag,message){
   if(flag==1)
   {
      switch(model.edittype)
      {
        case 1:model.editnickname = message;
               model.EditNickname();
               break;
        case 2:model.editsex = parseInt(message);
               model.EditSex();
               break;
        case 3:model.editage = parseInt(message);
               model.EditAge();
               break;
      }
   }
   
}

function refreshtouxiang(url){
       document.getElementById("touxiang").src="file://"+url;
}


function addNativeOK(){
    url = getPath();
    model.user = getUser();
    model.refresh(model.user);
    LoadGuideExInfo();
}

  // 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#EE5D5B";
      div.style.border = "1px solid #BC3B3A";
      div.style.color = "white";
      div.style.height = "18px";
      div.style.padding = "2px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(images/label.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "11px";
      arrow.style.height = "10px";
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);
     
      div.onmouseover = function(){
        this.style.backgroundColor = "#6BADCA";
        this.style.borderColor = "#0000ff";
        this.getElementsByTagName("span")[0].innerHTML = that._overText;
        arrow.style.backgroundPosition = "0px -20px";
      }

      div.onmouseout = function(){
        this.style.backgroundColor = "#EE5D5B";
        this.style.borderColor = "#BC3B3A";
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "0px 0px";
      }

      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }