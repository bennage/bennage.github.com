(function() {

	// http://blogs.sitepointstatic.com/examples/tech/css3-starwars/index.html
	$.domReady(function() {

		var nav = $('.main-navigation').append('<li><a href="#" class="newhope"><img src="/images/R2D2-icon.png"/></a></li>');
		nav.children().last().find('a').click(function() {
			$('body').hide();
			$('[type="text/css"]').remove();
			$('nav').hide();
			$('footer').hide();
			$('aside').hide();
			$('head').append('<link href="/stylesheets/newhope.css" media="screen, projection" rel="stylesheet" type="text/css">');
			setTimeout(function() {
				$('body').show();
			}, 300);
		});

	});

}());