/* =========================
    Directive to toggle sliding tools menu
============================= */

ptpApp.directive("slideMenu", [
    function() {
      return {
        restrict: "AE",
    
        scope: true,
        link: function(elem, attr) {
                $('.ptp__quick-links-icon-link').on('click', function(){
                    $('.ptp__quick-links-icon').toggleClass('rotated');
                    $('.ptp__quick-links-section').toggleClass('show-menu');
                });
        }
      };
    }
]);
