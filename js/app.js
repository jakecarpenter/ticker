/* angular code for the controller. */

var app = angular.module('controllerApp', []);

//need to enable CORS for api calls
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

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
        	var headlines = [];
        	for (var i = data.headlines.length - 1; i >= 0; i--) {
        		var headline = {};
        		headline.text = data.headlines[i].headline;
        		headline.icon = 'basketball.png';
        		headline.class = 'basketball-text';
        		headlines.push(headline);
        	};

            $scope.headlines = headlines; 	
        });
    }

}