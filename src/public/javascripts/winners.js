////////////////////////////////////////////////
// Disable default drag behaviour in browsers //
////////////////////////////////////////////////
$(document).on("dragstart", function() {
	return false;
});

$(document).ready(function(){
	/**
	 * Trianglify background of winning entry
	 */
	
	var winningEntryDiv = $('.winning-entry-bg-wrapper');
	
	 var triPattern = Trianglify({
	 	width: (winningEntryDiv.innerWidth() > 1600 ) ? winningEntryDiv.innerWidth() : 1600,
	 	height: (winningEntryDiv.innerHeight() > 620 ) ? winningEntryDiv.innerHeight() : 620,
	 	variance: '0.87',
	 	cell_size: 45,
	 	x_colors:['#4C1A00', '#FF5A00', '#FF9A64']
	 });

	 winningEntryDiv.css('background-image','url('+triPattern.png()+')');
	///////////////////////////
	// Slick Slider Settings //
	///////////////////////////

	/**
	 * Options for slick slider
	 */
	var entriesSlickOptions = {
		dots: 		false,
		autoplay: 	true,
		speed: 		1000,
		arrows: 	true,
		fade: 		true,
		cssEase: 	'linear',
		autoplaySpeed: 4500
	};

	/**
	 * Initialize slick for winner slider
	 */
	$('#winner-slider').slick(entriesSlickOptions);

	/**
	 * Initialize slick for winner thumbnail slider
	 */
	$('#winner-slider-nav').slick({
		slidesToShow: 	5,
		slidesToScroll: 1,
		dots: 			false,
		focusOnSelect: 	true,
		arrows: 		true,
		vertical: 		true,
		asNavFor: '#winner-slider',
	});

	/**
	 * Get all other entry sliders el
	 */
	var otherEntrySliders = $('.other-entry-panel-slider');

	/**
	 * Change setting options for other entry sliders
	 *
	 * - set slower autoplay speed
	 * - enable dots for other entry sliders
	 */
	entriesSlickOptions['autoplaySpeed'] = 6000;
	entriesSlickOptions['dots'] = true;

	/**
	 * Initialize other entry sliders
	 */
	otherEntrySliders.each(function(){
		$(this).slick(entriesSlickOptions);
	});

	/**
	 * re-layout other entry slider on foundation tab-change event
	 *
	 * this resolves the issue where slick does not display due to the tab panel being
	 * hidden (thus having height: 0px when initialized and calculated). triggers a
	 * re-calculation of slider layout when event callback is fired.
	 *
	 * source:
	 * https://github.com/kenwheeler/slick/issues/187#issuecomment-141203485
	 */
	$('#winner-tabs').on('change.zf.tabs', function( e ) {
		otherEntrySliders.slick('setPosition');
	});

	// bug fix (14 Nov 2016)
	// prevent anchor links from jumping to '#<id>' position when clicked.
	$('#winner-tabs a').on('click', function(e){
		e.preventDefault();
	});
	
	/////////////////////////////////////////
	// Touch settings for other entry tabs //
	/////////////////////////////////////////

	/**
	 * hammer.js implementation for drag functionality on other entry tabs
	 */
	var tabEl = $('.winner-tabs-wrapper'),
		margin, 
		childWidth = 0 - ($( "#winner-tabs" )[0].scrollWidth);

	var hammertime = new Hammer(tabEl[0], {
		domEvents: true
	});

	/**
	 * calculate current left margin value when panning begins
	 */
	tabEl.on( "panstart", function( e ) {
		el = $( "#winner-tabs" );
		margin = parseInt( el.css( "margin-left" ), 10 );
	} );

	/**
	 * disable other hammer.js touch functionality (not needed)
	 */
	hammertime.get('pinch').set({ enable: false });
	hammertime.get('rotate').set({ enable: false });
	hammertime.get('press').set({ enable: false });
	hammertime.get('tap').set({ enable: false });
	hammertime.get('doubletap').set({ enable: false });

	/**
	 * Initialize hammer.js for other entry tabs
	 */
	hammertime.on('pan', function(e) {
		e.preventDefault();
		var delta = margin + e.deltaX;
		if ( delta >= childWidth && delta <= 0 ) {
			el.css( {
				"margin-left": margin + e.deltaX
			} ); 
		}
	});

	/////////////////////////////////////////////////////////////
	// Lightgallery settings for viewing entries in fullscreen //
	/////////////////////////////////////////////////////////////

	// initialize lightGallery
	var galleryEl =	Array.prototype.slice.call(document.querySelectorAll('.other-entry-panel-slider'));
	galleryEl.push(document.getElementById('winner-slider'));
	
	for (i=0; i<galleryEl.length; i++) {
		lightGallery(galleryEl[i], {
			selector: 		'.slide',
			download: 		false,
			hideBarsDelay: 	1000,
			zoom: 			true,
			scale: 			1,
			actualSize: 	true,
			enableZoomAfter: true,
		});
	}

});