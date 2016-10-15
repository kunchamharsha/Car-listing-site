var app=angular.module("spegray",[]);
app.controller("search",function($http,$scope){
	$scope.search=function(){
		var a=$scope.query
		$http.get("http://localhost:8983/solr/cars/select?indent=on&q=maruti&wt=json").then(function(response){
			console.log(response.data.response)
		})

	}
});
