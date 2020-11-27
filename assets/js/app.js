var ptpApp = angular.module('ptpApp', ['ngAnimate', 'ui.router', 'ngSanitize', 'ui.bootstrap']);

//this is to allow the $location.search().q to work when entering a search term
ptpApp.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(
      {
        enabled: true,
        requireBase: false
      });    
  }]);
  
  ptpApp.filter('trusted', ['$sce', function($sce){
      var div = document.createElement('div');
      return function(text) {
          div.innerHTML = text;
          return $sce.trustAsHtml(div.textContent);
      }
  }]);
  
  ptpApp.filter('removeHTMLTags', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  });
  
  ptpApp.filter('limitHtml', function() {
    return function(text, limit) {
  
        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;
  
        return length > limit ? changedString.substr(0, limit - 1)+ '....' : changedString;
    }
  });

  ptpApp.run(function($rootScope, $window) {

    $rootScope.$on('$stateChangeSuccess', function () {
  
      var interval = setInterval(function(){
        if (document.readyState == 'complete') {
          $window.scrollTo(0, 0);
          clearInterval(interval);
        }
      }, 200);
  
    });
    
  });
  
  ptpApp.config(function($locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.hashPrefix('');
    $stateProvider

    .state('/',{
        url: "/SitePages/Index.aspx",
        templateUrl: "siteUrlSiteAssets/ptp_indexed-learning-site/assets/js/partials/homePartial.html" 
    })
    .state('home', {
        url: "/SitePages/Index.aspx/home",
        templateUrl: "siteUrlSiteAssets/ptp_indexed-learning-site/assets/js/partials/homePartial.html" 
    })
    .state('better-client-centric', {
      url: "/SitePages/Index.aspx/better_/:indCat",
      templateUrl: "siteUrlSiteAssets/ptp_indexed-learning-site/assets/js/partials/clientCentricPartial.html" 
    })
    .state('better', {
      url: "/SitePages/Index.aspx/better/:indCat",
      templateUrl: "siteUrlSiteAssets/ptp_indexed-learning-site/assets/js/partials/betterPartial.html" 
    })
    //$urlRouterProvider.otherwise("/SitePages/Index.aspx/home");
  
  });