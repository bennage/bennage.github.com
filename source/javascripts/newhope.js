(function() {

	// http://blogs.sitepointstatic.com/examples/tech/css3-starwars/index.html
	var button_html = '<li id="newhope" title="switch to Star Wards mode"><a href="#"><span>Star Wars Mode</span></a></li>';

	$.domReady(function() {

		var body = $('body');
		$('.main-navigation').append(button_html);

		$('#newhope').find('a').click(function() {
			body.hide();
			$('[type="text/css"]').remove();
			$('nav').hide();
			$('footer').hide();
			$('aside').hide();
			$('head').append('<link href="/stylesheets/newhope.css" media="screen, projection" rel="stylesheet" type="text/css">');

			setTimeout(function() {
				body.show();
			}, 300);
		});

	});

}());