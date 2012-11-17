(function() {

	// http://blogs.sitepointstatic.com/examples/tech/css3-starwars/index.html

	$.domReady(function() {
		
		$('body').hide();

		$('[type="text/css"]').remove();
		// $('header[role="banner"]').hide();
		$('nav').hide();
		$('footer').hide();
		$('aside').hide();
		$('head').append('<link href="/stylesheets/newhope.css" media="screen, projection" rel="stylesheet" type="text/css">');

		$('body').show();

	});

}());