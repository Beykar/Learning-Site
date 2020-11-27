/* Home Controller
====================================================================================================
==================================================================================================*/

ptpApp.controller('homeCtrl', function (betterData, videoData, insightsData, quickLinksData, $scope, $sce, $http, $stateParams, $window, $filter, $q) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
   
    $scope.betterDataArr = [];
    $scope.featuredVideoArr = [];
    $scope.quickLinksArr = [];

    betterData.getBetterData().then(function(data){
        //console.log('data ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var dataObj = {
                Title: value.Title,
                CardImage: value.Card_x002d_Image.Url,
                CardIntro: value.Card_x002d_Intro,
                PageBanner: value.Page_x002d_Banner.Url,
                KeywordsArr: value.Keywords.results,
                BetterType: value.Better_x002d_Type,
                State: value.State_x002d_Name
            }
            $scope.betterDataArr.push(dataObj);
        });
        //console.log('$scope.betterDataArr ', $scope.betterDataArr);
    });

    //Get video data for tabs
    videoData.getVideoData().then(function(data){
        //console.log('video data ', data.d.results);
           
        angular.forEach(data.d.results, function(value, key){
            if(value.Likes == null){
                value.Likes = 0;
            }
            if(value.Featured == true){
                var videoObj = {
                    ID: value.ID,
                    Title: value.Title,
                    Description: value.Description,
                    Link: $sce.trustAsResourceUrl(value.Link),
                    State: value.State,
                    Featured: value.Featured,
                    Likes: value.Likes,
                    Date: value.Created
                }
                $scope.featuredVideoArr.push(videoObj);
            } 
        });
        //console.log('$scope.featuredVideoArr before', $scope.featuredVideoArr);
   
        $q.all($scope.featuredVideoArr).then(function(){
            //sort array by date. latest first
            $scope.featuredVideoArr = $filter('orderBy')($scope.featuredVideoArr, '-Date');
            //console.log('$scope.featuredVideoArr after', $scope.featuredVideoArr);
            $scope.featuredVideoArr = $scope.featuredVideoArr.slice(0, 5);
        });
        
 });
    
    quickLinksData.getQQData().then(function(data){
        // console.log('qq data ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var qqObj = {
                Title: value.Title,
                Image: value.Link_x002d_Image.Url,
                Link: value.Link_x002d_Url
            }
            $scope.quickLinksArr.push(qqObj);
        });
        //console.log('qq arr ', $scope.quickLinksArr);
    });

     // Update 'Likes'
     $scope.updateLikes = function(item, listName){
        var itemID = item.ID;

		insightsData.getIndData(itemID, listName).then(function(data){
            $scope.selectedEntryData = data.d.results[0];
            //console.log('$scope.selectedEntryData ', $scope.selectedEntryData);
			$scope.selectedFieldID = $scope.selectedEntryData.ID;
            $scope.selectedLikes = $scope.selectedEntryData.Likes;
            if($scope.selectedLikes == null){
                $scope.selectedLikes = 0;
            }
			//console.log("$scope.selectedLikes:: ", $scope.selectedLikes);

			var data = JSON.stringify($scope.selectedLikes + 1); 
			$scope.data = data.replace(/[{}]/g, ""); 
            //console.log("data.replace:::", $scope.data);

            // Get SP.Data.listNameListItem type
            $scope.listItemType = $scope.selectedEntryData['__metadata']['type'];
            //console.log('$scope.listItemType ', $scope.listItemType);
			var dataValue = "{'__metadata':{'type':'" + $scope.listItemType + "'},'Likes' : '" + $scope.data + "'}";  
			//console.log("dataValue:::", dataValue); 
			

            //console.log('$("#__REQUESTDIGEST").val() ', $("#__REQUESTDIGEST").val());
			$http({
				url: "siteUrl_api/Web/Lists/GetByTitle('" + listName + "')/Items(" + $scope.selectedFieldID + ")",
                method: "POST",
				headers: {
					Accept: "application/json;odata=verbose",
					"Content-Type": "application/json;odata=verbose", //header for create record
					"X-RequestDigest": $("#__REQUESTDIGEST").val(),
					"X-HTTP-Method": "MERGE",
					"If-Match": "*",
				},
				data: dataValue
			}).then(function(response) {
                    //console.log("success inserted");
                    //console.log("response", response);
                    insightsData.getIndData(itemID, listName).then(function(data){
                        $scope.resultData = data.d.results[0];
                        //console.log(' selected item callback likes', $scope.resultData);
                        item.Likes = $scope.resultData.Likes;
                    });
				},
				function(response) {
					console.log("failed.... ", response);
				}
			);
		});
    };
});  

