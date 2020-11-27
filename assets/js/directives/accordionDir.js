/* =========================
    Directive to toggle accordion -/+ icons
============================= */

ptpApp.directive("accordion", [
    function() {
      return {
        restrict: "AE",
    
        scope: true,
        link: function(elem, attr) {
            
            $('.ptp__better-accordion-link').on('click', function(e){
                //console.log('this before', $(this).attr('class'));
                $(this).toggleClass('active');
                //console.log('this after', $(this).attr('class'));
            });
        }
      };
    }
]);