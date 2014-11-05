angular.module('homeApp', ['ngMaterial'])
    .controller('AppCtrl', function ($scope, $mdSidenav) {
        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle();
        };
        $scope.todos = [{
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Yaochun Zhang',
            notes: '2014-10-23 Happy Hour 迟到'
        }, {
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Jiyun Han',
            notes: '2014-10-30 Happy Hour 迟到'
        }, {
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Yaochun Zhang',
            notes: '2014-10-23 Happy Hour 迟到'
        }, {
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Jiyun Han',
            notes: '2014-10-30 Happy Hour 迟到'
        }, {
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Yaochun Zhang',
            notes: '2014-10-23 Happy Hour 迟到'
        }, {
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Jiyun Han',
            notes: '2014-10-30 Happy Hour 迟到'
        }, {
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Yaochun Zhang',
            notes: '2014-10-23 Happy Hour 迟到'
        }, {
            face: 'images/schumi.jpg',
            what: '缴纳罚款 100 大洋',
            who: 'Jiyun Han',
            notes: '2014-10-30 Happy Hour 迟到'
        }];
    });

angular.bootstrap(document, ['homeApp']);
