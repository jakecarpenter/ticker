/* angular code for the controller. */

var app = angular.module('tickerApp', []);

function HeadlineCtrl($scope, $http) {

    $scope.headlines = [];

    $scope.loadHeadlines = function() {
        var httpRequest = $http({
            method: 'GET',
            url: 'headlines.json'

        }).success(function(data, status) {
            $scope.headlines = data;
        });

    };

}