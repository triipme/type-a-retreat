function initHyperForm() {
	//add validation for forms
	if (hyperform && typeof hyperform === 'function') {
		hyperform(window, {
			revalidate: 'onsubmit'
		});
	}
}

(function(doc, $){

	var $doc = $(doc);

	initHyperForm();

	$('body').floatingSocialShare({
		place: 'top-left', // alternatively content-left, top-right
		counter: false, // set to false for hiding the counters of buttons
		twitter_counter: false, // Twitter API does not provide counters without API key, register to https://opensharecount.com/
		buttons: ['facebook', 'twitter', 'linkedin','pinterest', 'tumblr', 'google-plus'], // all of the currently avalaible social buttons
		title: document.title, // your title, default is current page's title
		url: window.location.href,  // your url, default is current page's url
		text: 'share with ', // the title of a tags
		description: $('meta[name="description"]').attr('content'), // your description, default is current page's description
		media: $('meta[property="og:image"]').attr('content'), // pinterest media
		popup_width: 400, // the sharer popup width, default is 400px
		popup_height: 300 // the sharer popup height, default is 300px
	});

	$doc.on('click', '.js-button-apply-top', function() {
		$('html, body').animate({
			scrollTop: $("#apply-section").offset().top
		}, 500);
	});

	$doc.on('submit', '#apply-form', function() {
		alert('Form Submitted');
		return false;
	});

})(document, jQuery);
