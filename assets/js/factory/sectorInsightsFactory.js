/* Section Insights Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('sectorInsightsData', function($http){
	return {
		getSectorData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Sector-Insights')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});