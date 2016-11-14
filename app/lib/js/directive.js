angular.module('appModule.directive',[])
    .directive('myChangeSize', function () {
        //改变内容区域 大小mask层
        return {
            restrict:'A',
            link: function (scope,element,attr) {
                $(element).find('li').on('mouseenter',function(){
                    $(this).find('a').stop().animate({width:"353px",height:"236px",marginLeft:"-176.5px",marginTop:"-118px"},500);
                });
                $(element).find('li').on('mouseleave',function(){
                    $(this).find('a').stop().animate({width:"0px",height:"0px",marginLeft:"0px",marginTop:"0px"},500);
                });
            }
        }
    })
    .directive('indexMenuBox', function () {
        //首页导航切换
        return {
            restrict:'A',
            link: function (scope,element,attr) {
                var flag = true;
                $(element).on('click',function(){
                    if(flag){
                        $('.menu-box ul').animate({right:"-550px"},500);
                    }else{
                        $('.menu-box ul').animate({right:"26px"},500);
                    }
                    flag = !flag
                });
            }
        }
    })
    .directive('teamHover', function () {
        //团队简介
        return {
            restrict:'A',
            link: function (scope,element,attr) {
                $(element).on('mouseenter',function(){
                    "use strict";
                    $(this).addClass('overlay');
                });
                $(element).on('mouseleave',function(){
                    "use strict";
                    $(this).removeClass('overlay');
                });
            }
        }
    })
    .directive('baseSlide', function () {
        //资料修改的收缩
        return {
            restrict:'A',
            link: function (scope,element,attr) {
                $(element).on('click',function(){
                    var parent = $(this).parent();
                    var box = parent.next();
                    //console.log(box.is(":visible"));
                    if(box.is(":visible")){
                        box.slideUp();
                        //console.log("bbb");
                    }else{

                        box.slideDown();
                        //console.log("ccc");
                    }
                });
            }
        }
    })
    .directive('genderChecked', function () {
        //资料修改的收缩
        return {
            restrict:'A',
            link: function (scope,element,attr) {
                $(element).on('click',function(){
                    var parent = $(this).parent();
                    parent.children().removeClass("checked");
                    $(this).addClass("checked");
                });
            }
        }
    })
    .directive('mapContent', function () {
        //关于我们-地图
        return {
            restrict:'A',
            link: function (scope,element,attr) {
                //创建和初始化地图函数：
                function initMap(){
                    createMap();//创建地图
                    setMapEvent();//设置地图事件
                    addMapControl();//向地图添加控件
                    addMarker();//向地图中添加marker
                    addRemark();//向地图中添加文字标注
                }
                var str = $(element).attr("id");

                //创建地图函数：
                function createMap(){
                    var map = new BMap.Map(str);//在百度地图容器中创建一个地图
                    var point = new BMap.Point(116.328234,39.988717);//定义一个中心点坐标
                    map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
                    window.map = map;//将map变量存储在全局
                }

                //地图事件设置函数：
                function setMapEvent(){
                    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
                    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                    map.enableKeyboard();//启用键盘上下左右键移动地图
                }

                //地图控件添加函数：
                function addMapControl(){
                    //向地图中添加缩放控件
                    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
                    map.addControl(ctrl_nav);
                    //向地图中添加缩略图控件
                    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
                    map.addControl(ctrl_ove);
                    //向地图中添加比例尺控件
                    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
                    map.addControl(ctrl_sca);
                }
                //标注点数组
                var markerArr = [{title:"珠峰培训",content:"七年专注前端开发培训  有口皆碑<br/>地址：地铁回龙观东大街站A口向西200米<br/>电话：400-8888-8888",point:"116.367582|40.087227",isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}
                ];

                function addMarker(){
                    for(var i=0;i<markerArr.length;i++){
                        var json = markerArr[i];
                        var p0 = json.point.split("|")[0];
                        var p1 = json.point.split("|")[1];
                        var point = new BMap.Point(p0,p1);
                        var iconImg = createIcon(json.icon);
                        var marker = new BMap.Marker(point,{icon:iconImg});
                        var iw = createInfoWindow(i);
                        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
                        marker.setLabel(label);
                        map.addOverlay(marker);
                        label.setStyle({
                            borderColor:"#808080",
                            color:"#333",
                            cursor:"pointer"
                        });

                        (function(){
                            var index = i;
                            var _iw = createInfoWindow(i);
                            var _marker = marker;
                            _marker.addEventListener("click",function(){
                                this.openInfoWindow(_iw);
                            });
                            _iw.addEventListener("open",function(){
                                _marker.getLabel().hide();
                            })
                            _iw.addEventListener("close",function(){
                                _marker.getLabel().show();
                            })
                            label.addEventListener("click",function(){
                                _marker.openInfoWindow(_iw);
                            })
                            if(!!json.isOpen){
                                label.hide();
                                _marker.openInfoWindow(_iw);
                            }
                        })()
                    }
                }
                //创建InfoWindow
                function createInfoWindow(i){
                    var json = markerArr[i];
                    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
                    return iw;
                }
                //创建一个Icon
                function createIcon(json){
                    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
                    return icon;
                }

                //向地图中添加文字标注函数
                function addRemark(){
                    for(var i=0;i<lbPoints.length;i++){
                        var json = lbPoints[i];
                        var p1 = json.point.split("|")[0];
                        var p2 = json.point.split("|")[1];
                        var label = new BMap.Label("<div style='padding:2px;'>"+json.content+"</div>",{point:new BMap.Point(p1,p2),offset:new BMap.Size(3,-6)});
                        map.addOverlay(label);
                        label.setStyle({borderColor:"#999"});
                    }
                }

                initMap();//创建和初始化地图
            }
        }
    });












