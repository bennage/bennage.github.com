(function() {

	// Credit the effect goes to @craigbuckler, his explanation is found: 
	// http://blogs.sitepointstatic.com/examples/tech/css3-starwars/index.html

	var button_html = '<li id="newhope" title="switch to Star Wards mode"><a href="#"><span>Star Wars Mode</span></a></li>';
	var stylesheet = '<link href="/stylesheets/newhope.css" media="screen, projection" rel="stylesheet" type="text/css">';
	var controls_html = '<div id="controls"><a href="#">about</a><a href="#">standard mode</a></div>';

	$.domReady(function() {

		var body = $('body');
		$('.main-navigation').append(button_html);

		$('#newhope').find('a').click(function() {
			body.hide();
			// Remove the existing styles
			$('[type="text/css"]').remove();
			// Hide elements that don't participate
			$('nav').hide();
			$('footer').hide();
			$('aside').hide();

			// Add the stylesheet supporting the effect
			$('head').append(stylesheet);

			body.append(controls_html);
			var controls = $('#controls a');
			controls.first().click(function() {
				alert('credit for the CSS goes to\n @craigbuckler\n\nFor more information, see:\nhttp://blogs.sitepointstatic.com/examples/tech/css3-starwars/index.html');
			});
			controls.last().click(function() {
				window.location.reload();
			});

			setTimeout(function() {
				body.show();
			}, 300);
		});

	});

}());