/* Curriculum Data Factory
======================================================================================
======================================================================================
*/

ptpApp.factory('curriculumData', function($http){
	return {
		getCurriculumData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Curriculum-Accordion')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});