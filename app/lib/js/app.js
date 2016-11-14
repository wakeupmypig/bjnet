var app  = angular.module('appModule',['ui.router','appModule.directive']);
app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('include',{
        url:'',
        templateUrl:'tmpl/include/public.html',
    }).state('include.content',{
        //首页
        url:'/index',
        index:true,
        views:{
            '':{
                templateUrl:'tmpl/home.html',
            }

        }
    }).state('include.admire',{
        //作品欣赏
        url:'/admire',
        views:{
            '':{
                templateUrl:'tmpl/article-admire.html',
            }

        }
    }).state('include.share',{
        //作品分享
        url:'/share',
        views:{
            '':{
                templateUrl:'tmpl/article-share.html',
            }

        }
    }).state('include.upload',{
        //作品上传
        url:'/upload',
        views:{
            '':{
                templateUrl:'tmpl/article-upload.html',
            }

        }
    }).state('include.regist',{
        //注册
        url:'/regist',
        views:{
            '':{
                templateUrl:'tmpl/regist.html',
            }

        }
    }).state('include.login',{
        //登录
        url:'/login',
        views:{
            '':{
                templateUrl:'tmpl/login.html',
            }

        }
    }).state('include.forgetPwd',{
        //忘记密码
        url:'/forgetPwd',
        views:{
            '':{
                templateUrl:'tmpl/forget-pwd.html',
            }

        }
    }).state('include.details',{
        //文章详情
        url:'/details',
        views:{
            '':{
                templateUrl:'tmpl/article-details.html',
            }

        }
    }).state('include.person',{
        //个人展示
        url:'/person',
        views:{
            '':{
                templateUrl:'tmpl/person-show.html',
            }

        }
    }).state('include.base',{
        //个人信息
        url:'/base',
        views:{
            '':{
                templateUrl:'tmpl/profile-base.html',
            }

        }
    }).state('include.collect',{
        //个人收藏
        url:'/collect',
        views:{
            '':{
                templateUrl:'tmpl/profile-collect.html',
            }

        }
    }).state('include.publish',{
        //个人发布
        url:'/publish',
        views:{
            '':{
                templateUrl:'tmpl/profile-publish.html',
            }

        }
    }).state('include.team',{
        //团队简介
        url:'/team',
        views:{
            '':{
                templateUrl:'tmpl/team.html',
            }

        }
    }).state('include.us',{
        //关于我们
        url:'/us',
        views:{
            '':{
                templateUrl:'tmpl/aboutUs.html',
            }

        }
    })

    $urlRouterProvider.otherwise('/index')
}]);

app.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event,toParams,toState,fromParams,fromState) {
        $rootScope.index = toParams.index;
    })
}])


