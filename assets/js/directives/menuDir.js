/* Menu Pop-Out Directive
 ===========================================================================================
 ===========================================================================================*/

 ptpApp.directive('menuPopout', [ function () {
	return {
		restrict: 'A',
		link: function (scope, elem) {
			var windowWidth = $(window).width();
			
			if(windowWidth <=740 ) {
				
				$(".ey__ham-menu-toggle--mobile").on('click', function(e){
			      e.preventDefault();

			      var menuBtnParent = $(this).parent();
			    
			      if ($('.ey__popout-menu').hasClass('active')) {
			        $('.ey__popout-menu').removeClass('active');
			        $(this).removeClass('open');
			      } else {
			        $(this).addClass('open');
			        $('.ey__popout-menu').addClass('active');
			      }
			    });

			    $(".ey__main-nav-anchor").on('click', function(e){
			      e.preventDefault();
			      var itemLink = $(this).attr('href');
			      $('.ey__popout-menu').removeClass('active');
			      $('#menuToggle').removeClass('open');
			      window.location.href = itemLink;
			    });

			} else {
				
				$(".ey__ham-menu-toggle--tablet").on('click', function(e){
			      e.preventDefault();

				  var menuBtnParent = $(this).parent();
			    
			      if (menuBtnParent.find('.ey__popout-menu').hasClass('active')) {
			        $('.ey__popout-menu').removeClass('active');
					$(this).removeClass('open');
				} else {
					$(this).addClass('open');
			        menuBtnParent.find('.ey__popout-menu').addClass('active');
			      }
			    });

			    $(".ey__main-nav-anchor").on('click', function(e){
			      e.preventDefault();
			      var itemLink = $(this).attr('href');
			      $('.ey__popout-menu').removeClass('active');
			      $('#menuToggle').removeClass('open');
			      window.location.href = itemLink;
				});
				
			}
			
			$('.ey__main-cont').on('click', function(){
				closeMenu();
			});

			function closeMenu(){
				$('.ey__ham-menu-toggle--tablet').removeClass('open');
				$('.ey__popout-menu').removeClass('active');			
			}
		}
	};
} ]);