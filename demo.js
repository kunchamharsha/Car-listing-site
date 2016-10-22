var app = angular.module("spegray", []);
app.config(function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

app.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
});

app.directive("owlCarousel", function () {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function (element) {
				// provide any default options you want
				var defaultOptions = {
					items: 6, //10 items above 1000px browser width
					itemsDesktop: [1000, 6], //5 items between 1000px and 901px
					itemsDesktopSmall: [900, 2], // betweem 900px and 601px
					itemsTablet: [600, 1], //2 items between 600 and 0
					itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for (var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
app.directive('owlCarouselItem', [function () {
	return {
		restrict: 'A',
		transclude: false,
		link: function (scope, element) {
			// wait for the last item in the ng-repeat then call init
			if (scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);


app.controller("home",function($scope,$window){
	$scope.carmakers=[
        "Audi",
        "BMW",
        "Bentley",
        "Chevrolet",
        "Datsun",
        "Ferrari",
        "Force Motors",
        "Ford",
        "Honda",
        "Hyundai",
        "ISUZU",
        "Jaguar",
        "Land Rover",
        "MINI",
        "Mahindra",
        "Maserati",
        "Mercedes Benz",
        "Mitsubishi",
        "Nissan",
        "Porsche",
        "Premier",
        "Renault",
        "Rolls Royce",
        "Skoda",
        "SsangYong",
        "Volkswagen",
        "Volvo"]
	$scope.loadroute = function () {
 		$window.location.href = '/search.html?cars='+$scope.query;	
	}
});
app.controller("search", function ($http, $scope, $timeout, $window, $location) {
	$scope.search = function () {
		var url = "/searchdata/cars/select?indent=on&q=" + $scope.query + "&wt=json"
		$http.get(url, { cache: true }).then(function (response) {
			$scope.result = response.data.response.docs
			$location.search('cars', $scope.query)
			$scope.datapresent = true
		})

	}
	$scope.loadroute = function () {
		$window.location.reload();
	}
	$scope.searchmake = function () {
		$scope.newquery = $scope.result[0].company[0];
		var url = "searchdata/cars/select?indent=on&q=" + $scope.newquery + "&wt=json"
		$timeout(function () {
			$http.get(url, { cache: true })
				.then(function (response) {
					$scope.carmake = response.data.response.docs
				})
				
		});
	}
	$scope.check = function () {
		var data = $location.search()
		$scope.query = data.cars
		$scope.search()
	}
	
});
