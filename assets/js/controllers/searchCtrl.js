/* Search Controller
====================================================================================================
==================================================================================================*/ 

ptpApp.controller('searchCtrl', function(betterData, $scope, $state, $stateParams, $location, $sce, $window, $filter,$q) {

	'use strict';
	window.scrollTo(0,0);
	$scope.$sce = $sce;
    $scope.showResults = false;
    $scope.betterDataArr = [];
    $scope.initialKeywordsArr = [];
    $scope.KeywordsArr = [];
    

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
        $q.all($scope.betterDataArr).then(function(){
            angular.forEach($scope.betterDataArr, function(value, key){
                $scope.initialKeywordsArr.push(value.KeywordsArr);
            });
    
            $scope.keywordsArr = [].concat.apply([], $scope.initialKeywordsArr);
            //console.log('$scope.keywordsArr ', $scope.keywordsArr);
        });
        
    });

    $scope.searchResults = function(){
        $scope.searchKeyword = $("#search-input").val();
        $scope.showResults = true;

        //console.log('search keyword', $scope.searchKeyword);

        if($scope.searchKeyword == ''){
            alert('Please enter a search value!');
        } else {
            //get page title and redirect
            angular.forEach($scope.betterDataArr, function(value, key){
                if (value.KeywordsArr.indexOf($scope.searchKeyword) > -1){
                    console.log('page ', value);
                    if(value.State == 'Client Centricity'){
                        $state.go('better-client-centric', {indCat: value.State});
                    } else {
                        $state.go('better', {indCat: value.State});
                    }
                }
            });
        }
        
    }
	
	//$scope.searchResults();

});