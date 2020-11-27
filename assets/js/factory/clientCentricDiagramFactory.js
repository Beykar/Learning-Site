/* Client Centric Diagram Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('diagramData', function($http){
	return {
		getDiagramData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Client-Centric-Curriculum')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});