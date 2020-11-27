/* 'Better' Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('betterData', function($http){
	return {
		getBetterData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Better-Categories')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getClientCentricData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('	Lst_Client-Centric-Curriculum-Boxes')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getTestData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_test')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getTestIndData: function(ID){
			return $http.get("siteUrl_api/web/lists/getByTitle('Lst_test')/items?$filter=ID eq'" + ID + "'", {
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getClientCentricityCarousel: function(){
			return $http.get("siteUrl_api/web/lists/getByTitle('Lst_ClientCentricity_Carousel')/items?$select=*", {
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}

	
});