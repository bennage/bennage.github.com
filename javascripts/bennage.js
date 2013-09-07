(function() {

	function cycleSubtitle() {
		var subtitle = $('header h2');
		var pivot = (new Date().getSeconds() % 2);
		var quotes = ['not all who wander are lost', 'observing, reasoning, acting'];

		subtitle.text(quotes[pivot]);
	}

	$.domReady(function() {
		cycleSubtitle();
	});

}());