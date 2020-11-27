/* Quick-Links Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('quickLinksData', function($http){
	return {
		getQQData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('	Lst_PTP-Quick-Links')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
	
});