(function () {
    angular.module('homeApp', ['ngMaterial', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainListCtrl'
        })
        .when('/video', {
            templateUrl: 'video.html'
        })
        .when('/add-member', {
            templateUrl: 'templates/member.html',
            controller: 'addMemberCtrl'
        })
        .when('/add-money', {
            templateUrl: 'templates/money.html',
            controller: 'addMoneyCtrl'
        })
        .otherwise({
            redirectTo : '/'
        });
        // $locationProvider.html5Mode(true);
    }])
    .factory('avosService', function ($rootScope, $location, $q) {

        var avos = {};

        avos.save = function (className, data) {

            var Father = AV.Object.extend(className);
            var son = new Father();
            var deferred = $q.defer();
            var i;

            for (i in data) {
                if (data.hasOwnProperty(i)) {
                    son.set(i, data[i]);
                }
            }

            son.save(null, {
                success: function (data) {
                    deferred.resolve();
                },
                error: function (data, error) {
                    deferred.reject();
                }
            });

            return deferred.promise;
        };
        avos.query = function (className) {

            var Father = AV.Object.extend(className);
            var son = new AV.Query(Father);
            var deferred = $q.defer();

            son.find({
                success: function (results) {
                    if (results.length) {
                        deferred.resolve(results);
                    } else {
                        deferred.reject();
                    }
                },
                error: function (error) {
                    deferred.reject();
                }
            });

            return deferred.promise;
        };

        return avos;
    })
    .controller('AppCtrl', function ($scope, $mdBottomSheet, $location) {
        $scope.jumpTo = function (path) {
            $location.path(path);
        };
        $scope.showMenu = function ($event) {
            $mdBottomSheet.show({
                templateUrl: 'templates/bottom-sheet-list-template.html',
                controller: 'ListBottomSheetCtrl',
                targetEvent: $event
            }).then(function (clickedItem) {
                console.log(clickedItem.name + ' clicked!');

                if (clickedItem.name === '添加组员') {
                    $location.path('/add-member');
                } else if (clickedItem.name === '添加罚款') {
                    $location.path('/add-money');
                } else if (clickedItem.name === '打开游戏详情页') {
                    // campaignPlugin.openAppDetail('com.shinlol.weilan');
                    campaignPlugin.startActivity('wdj://detail/user/4383987');
                } else if (clickedItem.name === '全屏播视频') {
                    // campaignPlugin.openUserDetail('4383987');
                    // campaignPlugin.closeWebView();
                    campaignPlugin.openNewWebView('http://100.64.109.23:9999/#/video', '', false, false);
                }
            });
        };
    })
    .controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {

        $scope.items = [
            { name: '添加组员', icon: 'copy' },
            { name: '添加罚款', icon: 'print' },
            { name: '打开游戏详情页', icon: 'share' },
            { name: '全屏播视频', icon: 'upload' },
        ];

        $scope.listItemClick = function ($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    })
    .controller('mainListCtrl', function ($scope, avosService) {

        $scope.penalties = [];
        $scope.total = 0;
        var getPenaltyList = avosService.query('penalty');

        getPenaltyList.then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.total = $scope.total + data[i].get('money');
                $scope.penalties.push(data[i].attributes);
            }
        });
    })
    .controller('addMemberCtrl', function ($scope, $mdToast, avosService) {
        $scope.user = {
            team: 'Front-End'
        };
        $scope.sendInfo = function () {

            var promise = avosService.save('userInfo', $scope.user);

            promise.then(function () {
                $mdToast.show({
                    template: '<md-toast>保存成功</md-toast>',
                    hideDelay: 2000,
                    position: 'bottom'
                });
                $scope.jumpTo('/');
            }, function () {
                $mdToast.show({
                    template: '<md-toast>保存失败</md-toast>',
                    hideDelay: 2000,
                    position: 'bottom'
                });
            });
        };
    })
    .controller('addMoneyCtrl', function ($scope, $mdToast, avosService) {

        $scope.users = [];
        var getUserList = avosService.query('userInfo');

        getUserList.then(function (data) {

            for (var i = 0; i < data.length; i++) {
                $scope.users.push(data[i].get('name'));
            }
        });

        $scope.sendInfo = function () {

            var promise = avosService.save('penalty', $scope.penalty);

            promise.then(function () {
                $mdToast.show({
                    template: '<md-toast>保存成功</md-toast>',
                    hideDelay: 2000,
                    position: 'bottom'
                });
                $scope.jumpTo('/');
            }, function () {
                $mdToast.show({
                    template: '<md-toast>保存失败</md-toast>',
                    hideDelay: 2000,
                    position: 'bottom'
                });
            });
        };
    })
    .run(function () {
        AV.initialize('mrs258hknp5z7w7enjprecbu82ks0ugu22wctbeeg5hbl9q8',
            'ywj4b16q37ojxtuv6l4o2zk3yjdhfru12okejtxqqva5cdr0');
    });

    angular.bootstrap(document, ['homeApp']);
})();
