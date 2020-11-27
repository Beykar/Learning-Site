/* Focus Feature Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('focusData', function($http){
	return {
		getFocusData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Featured-Articles')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});