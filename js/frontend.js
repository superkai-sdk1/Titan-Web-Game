(function($){
    Drupal.behaviors.mafiatheme = {
        attach: function (context, settings) {
            $('.hero-carousel').slick({
            	arrows: false,
            	autoplay: true,
            	infinite: true,
            	autoplaySpeed: 2000,
            	speed: 500,
            	fade: true,
            	cssEase: 'linear'
            });
            
            $('body').on('click', '#header-log-in', function(e) {
            	e.preventDefault();
                if ($('#footer-log-in-block').css('display') == 'block' ) {
                    $('#footer-log-in-block').hide();
                }
                
                $('#header-log-in-block').toggle();
            });
            
            $('body').on('click', '#footer-log-in', function(e) {
            	e.preventDefault();
                if ($('#header-log-in-block').css('display') == 'block' ) {
                    $('#header-log-in-block').hide();
                }
                
                $('#footer-log-in-block').toggle();
            });
            
            var col5 = $('.main-game-table .col5'), 
            		col6 = $('.main-game-table .col6'),
            		col7 = $('.main-game-table .col7'),
            		col8 = $('.main-game-table .col8')
            		mixed = $(col5.add(col6).add(col7).add(col8));
            		
            $('body').on('click', '.shrink', function(e){
            	e.preventDefault();
            	$(mixed).hide();
            	$(this).replaceWith("<a class='expand' href=''><i class='fa fa-angle-double-right'></i></a>")
            });
            $('body').on('click', '.expand', function(e){
            	e.preventDefault();
            	$(mixed).show();
            	$(this).replaceWith("<a class='shrink' href=''><i class='fa fa-angle-double-left'></i></a>")
            });
            
            $('.mobile-toggle').on('click', function(){
            	$(this).toggleClass('opened');
            	if ($(this).hasClass('opened')){
            		$('nav').addClass('active');
            	} else {
            		$('nav').removeClass('active');
            	}
            });
            
            $('body').on('click', '.location .city', function(e){
            	e.preventDefault();
            	$('.location').html('');
            	$("<input id='countries'></input>").appendTo('.location');
            	var options = {
            
            	  url: "js/countries.json",
            
            	  getValue: "name",
            
            	  list: {	
            		match: {
            		  enabled: true
            		}
            	  }
            	};
            
            	$("#countries").easyAutocomplete(options);
            	return false;
            });
            
            $('body').on('click', '.location ul li', function(){
            	var location = $(this).text();
            	$('.location').html('').append("<a class='city' href=''><span>" + location + "</span></a>");
            });
        }
    }
})(jQuery);