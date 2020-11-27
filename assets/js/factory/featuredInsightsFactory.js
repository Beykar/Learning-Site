/* Featured Insights Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('insightsData', function($http){
	return {
		getInsightsData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Featured-Insights')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getIndData: function(ID, listName){
			return $http.get("siteUrl_api/web/lists/getByTitle('"+ listName + "')/items?$filter=ID eq'" + ID + "'", {
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});