var app=angular.module("spegray",[]);
app.config(function($locationProvider) {
  $locationProvider.html5Mode({
  enabled:false,
  requireBase: false
});
});
app.controller("search",function($http,$scope,$location){
	$scope.search=function(){
		var url="http://localhost:8983/solr/cars/select?indent=on&q="+$scope.query+"&wt=json"
		$http.get(url,{cache:true}).then(function(response){
			console.log(response.data.response.docs)
			$scope.result=response.data.response.docs
			$location.search('cars',$scope.query)
		})

	}
	$scope.check=function(){
		var data=$location.search()
		$scope.query=data.cars
		$scope.search()		
	}
});
