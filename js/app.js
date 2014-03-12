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

    $scope.loadBasketballNews = function () {
		    var httpRequest = $http({
            method: 'GET',
            url: 'http://api.espn.com/v1/sports/basketball/nba/news/headlines?apikey=h8jcejfstdxvqtycaq64pzgm',
            

        }).success(function(data, status) {
            $scope.headlines = data.headlines;
            console.log(data)
        });
    }

}