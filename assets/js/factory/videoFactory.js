/* Video Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('videoData', function($http){
	return {
		getVideoData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Videos')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});