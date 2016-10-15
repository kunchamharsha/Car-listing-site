var app=angular.module("spegray",[]);
app.controller("search",function($http,$scope){
	$scope.search=function(){
		var url="http://localhost:8983/solr/cars/select?indent=on&q="+$scope.query+"&wt=json"
		$http.get(url).then(function(response){
			console.log(response.data.response.docs)
			$scope.result=response.data.response.docs
		})

	}
});
