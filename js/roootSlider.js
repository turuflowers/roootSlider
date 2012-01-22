/*
*	Class: roootSlider
*	Author: Nicolás Flores (http://www.nicolasflores.com.ar)
*	Web plugin: http://www.roootgroup.com.ar/roootSlider)
*	Version: 0.1
*/
(function($){
 $.fn.roootSlider = function(options) {
 
  var defaults = {
      display : '.display',
      wrapper: '.wrapper',
      selector: '.selector',
      pointer : '.pointer',
      module : '.module',
      next: '.next',
      prev: '.prev'
  };
  var options = $.extend(defaults, options);
    
  return this.each(function() {
	// setting all elements
	var r = $(this);
	var s = $(this).find(options.selector);
	var total_width = s.width();	
	var li = s.find('li');	
	var n = li.length;	
	var p = $(s).find(options.pointer);	
	var next_btn = $(this).find(options.next);
	var prev_btn = $(this).find(options.prev);
	
	// setting the general width, we need this to know how many pixels have to move all
	movement = r.width();
	
	// we set the width for all the li, making them very easy to add and erase
	li_width = Math.round(total_width / n);
	rounded = total_width - (li_width * n);
	
	var w = li.width(li_width + "px");
	var firstli = s.find('li:first');	
	var lastli = s.find('li:last');	
	
	lastli.width((li_width + rounded) + "px");
	
	// some css
	lastli.css('background-image', 'none');
		
	// and now, the clicks...
	var p_width = p.width() + 5; // pointer width, 
	
	li.click(function(){
		if(!$(this).hasClass('active')){ 
			// css to make the button "unclicked"...
			$(options.selector + " li.active").removeClass("active");
			// ...and "clicked"
			$(this).addClass("active");
	
			// we need to select the right module to show
			// first, we get the index...
			index = li.index(this);
			
			// ...and move the pointer
			position = ((index+1) * li_width) - p_width;
			
			p.animate({
				left: position
			}, 500);
			
			// hiding the old one, showing the new
			// we get the old...
			var showing = r.find(options.display + " " + options.module + ".active");
			// ...and the new
			var nextToShow = r.find(options.display + " > div:nth-child(" + (index+1) + ")");

			// hide...
			showing.hide(500, function(){
				$(this).removeClass("active"); // removing the active class
				// ...show
				nextToShow.show(500,function(){
					$(this).addClass("active"); // adding the active class

					// know, we need to check if the buttons next and prev needs to be show... check the next section for better instructions
					limit = (r.find(options.display + " .active " + options.wrapper).length-1) * movement;
					limit = "-" + limit + "px";

					if(limit == "-0px"){
						next_btn.css('display', 'none')
					}
					else{
						if(r.find(options.display + " " + options.module + ".active").css('left') != limit){
							next_btn.css('display', 'block');
						}
					}
					
					if($(this).css('left') == "0px"){
						prev_btn.css('display', 'none');
					}else{
						prev_btn.css('display', 'block');
					}
				});
			});
		}
	});		
	
	
	// prev and next buttons
	next_btn.click(function(){
		// we get the "mask" area
		limit = (r.find(options.display + " .active " + options.wrapper).length-1) * movement;
		limit = "-" + limit + "px"
		
		// if we have something to move next, then move it
		if(r.find(options.display + " .active ").css('left') != limit){
			if(r.find(options.display + " .active " + options.wrapper).length > 0){
				moving = "-=" + movement;
				r.find(options.display + " " + options.module + ".active").animate({
					left: moving
				}, 500, function(){
					// finish the movement, then show/hide buttons
					prev_btn.css('display', 'block'); // if I hit next, then I need prev
					// checking if there are no more next
					if(r.find(options.display + " " + options.module + ".active").css('left') == limit){
						next_btn.css('display', 'none')
					}
				
				});
			}
		}
		
	});

	prev_btn.click(function(){
		// if we have something to move back, then move it
		if(r.find(options.display + " .active ").css('left') != '0px'){
		
			if(r.find(options.display + " .active " + options.wrapper).length > 0){
				moving = "+=" + movement;
				r.find(options.display + " .active").animate({
				left: moving
				}, 500, function(){
					// finish the movement, then show/hide buttons
					next_btn.css('display', 'block'); // if I hit prev, then I need next
					// checking if there are no more prev
					if(r.find(options.display + " " + options.module + ".active").css('left') == '0px'){
						prev_btn.css('display', 'none');
					}
				});
			}
			
		}
		
	});

	// Rock & Roll!
	r.find(options.display + " " + options.module + ":first").addClass('active');
	firstli.click();
	
  });
 };
})( jQuery );