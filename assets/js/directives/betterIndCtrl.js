/* Home Controller
====================================================================================================
==================================================================================================*/
ptpApp.controller('betterIndCtrl', function (betterData, curriculumData, diagramData, focusData, insightsData, videoData, sectorInsightsData, $scope, $sce, $stateParams, $window, $filter, $q, $http) {

    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.pageTitle = $stateParams.indCat;
    $scope.betterDataArr = [];
    $scope.allCurriculumArr = [];
    $scope.curriculumArr = [];
    $scope.diagramArr = [];
    $scope.sectorInsightsAll = [];
    $scope.sectorInsightsArr = [];
    $scope.allInsightsArr = [];
    $scope.featuredInsightsArr = [];
    $scope.allFocusFeatureArr = [];
    $scope.focusFeatureArr = [];
    $scope.allVideoArr = [];
    $scope.videoArr = [];

    //console.log('$stateParams.indCat ', $stateParams.indCat);

    // Get data for page
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
                State: value.State_x002d_Name,
                PageIntro: value.Page_x002d_Intro
            }
            $scope.betterDataArr.push(dataObj);
        });
        $q.all($scope.betterDataArr).then(function(){
            $scope.betterItem = $filter('filter')($scope.betterDataArr, {State: $stateParams.indCat})[0];
            //console.log('$scope.betterItem ', $scope.betterItem);
        });

    });

    // if page is Client-Centric get data for curriculum diagram
    if ($stateParams.indCat == 'Client Centricity'){
        diagramData.getDiagramData().then(function(data){
            angular.forEach(data.d.results, function(value, key){
                var diagramObj = {
                    Title: value.Title,
                    Description: value.Description,
                    targetID: value.targetID
                }
                $scope.diagramArr.push(diagramObj); 
            });

            $q.all($scope.diagramArr).then(function(){
                $scope.negotiateModal = $filter('filter')($scope.diagramArr, {targetID: 'negotiateModal'})[0];
                $scope.collaborateModal = $filter('filter')($scope.diagramArr, {targetID: 'collaborateModal'})[0];
                $scope.mindsetModal = $filter('filter')($scope.diagramArr, {targetID: 'mindsetModal'})[0];
                $scope.powerModal = $filter('filter')($scope.diagramArr, {targetID: 'powerModal'})[0];
                $scope.serviceModal = $filter('filter')($scope.diagramArr, {targetID: 'serviceModal'})[0];
                $scope.versatilityModal = $filter('filter')($scope.diagramArr, {targetID: 'versatilityModal'})[0];
            });
        });
    }

    // if page is Client-Centric get data for intro and 3 boxes
    betterData.getClientCentricData().then(function(data){
        $scope.clientCentricData = data.d.results[0];
        //console.log('$scope.clientCentricData ', $scope.clientCentricData);
    });

    //Get Curriculum data
    curriculumData.getCurriculumData().then(function(data){
        //console.log('curriculum data ', data.d.results);           
        angular.forEach(data.d.results, function(value, key){
            // if(value.Link == null){
            //     value.Link = '#';
            // }
            var curriculumObj = {
                Title: value.Title,
                Description: value.Description,
                Link: value.Link ? value.Link : null,
                Image: value.Image ? value.Image.Url : null,
                State: value.State
            }
            $scope.allCurriculumArr.push(curriculumObj);
        });
        //console.log('$scope.allCurriculumArr ', $scope.allCurriculumArr);

        $q.all($scope.allCurriculumArr).then(function(){
            //console.log('stateParam ', $stateParams.indCat);
            angular.forEach($scope.allCurriculumArr, function(value, key){
                if(value.State == $stateParams.indCat){
                    $scope.curriculumArr.push(value);
                }
            });
            //console.log('$scope.curriculumArr ', $scope.curriculumArr);
        });
    });

    sectorInsightsData.getSectorData().then(function(data){
        //console.log('sector data ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var sectorObj = {
                ID: value.ID,
                Title: value.Title,
                Description: value.Description,
                Link: value.Link_x002d_address,
                State: value.State,
                Icon: value.icon
            }

            $scope.sectorInsightsAll.push(sectorObj);
        });
        //console.log("$scope.sectorInsightsAll:: ", $scope.sectorInsightsAll);
        $q.all($scope.sectorInsightsAll).then(function(){
            angular.forEach($scope.sectorInsightsAll, function(value, key){
                if(value.State == $stateParams.indCat){
                    $scope.sectorInsightsArr.push(value);
                }
            });
            //console.log('$scope.sectorInsightsArr ', $scope.sectorInsightsArr[0]);
        });
    });
       
    //Get Focus data for tabs
    focusData.getFocusData().then(function(data){
        // console.log('insights data ', data.d.results);
           
        angular.forEach(data.d.results, function(value, key){
            if(value.Likes == null){
                value.Likes = 0;
            }
            var focusObj = {
                ID: value.ID,
                Title: value.Title,
                Description: value.Description,
                Link: value.Link,
                State: value.State,
                Likes: value.Likes,
                Order: value.Order0,
                Focus: true
            }
            $scope.allFocusFeatureArr.push(focusObj);
        });
        //console.log('$scope.allFocusFeatureArr ', $scope.allFocusFeatureArr);

        $q.all($scope.allFocusFeatureArr).then(function(){
            //console.log('stateParam ', $stateParams.indCat);
            angular.forEach($scope.allFocusFeatureArr, function(value, key){
                if(value.State == $stateParams.indCat){
                    $scope.focusFeatureArr.push(value);
                }
            });
            //console.log('$scope.focusFeatureArr ', $scope.focusFeatureArr);
        });
    });

    //Get Insight data fot tabs
    insightsData.getInsightsData().then(function(data){
        //console.log('insights data ', data.d.results);
           
        angular.forEach(data.d.results, function(value, key){
            if(value.Likes == null){
                value.Likes = 0;
            }
            var insightObj = {
                ID: value.ID,
                Title: value.Title,
                Description: value.Description,
                Link: value.Link,
                State: value.State,
                Likes: value.Likes,
                Order: value.Order0,
                Insight: true
            }
            $scope.allInsightsArr.push(insightObj);
        });
        //console.log('$scope.allInsightsArr ', $scope.allInsightsArr);

        $q.all($scope.allInsightsArr).then(function(){
            //console.log('stateParam ', $stateParams.indCat);
            angular.forEach($scope.allInsightsArr, function(value, key){
                if(value.State == $stateParams.indCat){
                    $scope.featuredInsightsArr.push(value);
                }
            });
            //console.log('$scope.featuredInsightsArr ', $scope.featuredInsightsArr);
        });
    });

    //Get video data for tabs
    videoData.getVideoData().then(function(data){
        //console.log('videos data ', data.d.results);
           
        angular.forEach(data.d.results, function(value, key){
            if(value.Likes == null){
                value.Likes = 0;
            }
            var videoObj = {
                ID: value.ID,
                Title: value.Title,
                Description: value.Description,
                Link: $sce.trustAsResourceUrl(value.Link),
                State: value.State,
                Likes: value.Likes,
                Order: value.Order0,
                Video: true
            }
            $scope.allVideoArr.push(videoObj);
        });
        //console.log('$scope.allVideoArr ', $scope.allVideoArr);

        $q.all($scope.allVideoArr).then(function(){
            //console.log('stateParam ', $stateParams.indCat);
            angular.forEach($scope.allVideoArr, function(value, key){
                if(value.State == $stateParams.indCat){
                    $scope.videoArr.push(value);
                }
            });
            //console.log('$scope.videoArr 23', $scope.videoArr);
        });
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