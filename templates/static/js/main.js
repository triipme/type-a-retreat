function initHyperForm() {
	//add validation for forms
	if (hyperform && typeof hyperform === 'function') {
		hyperform(window, {
			revalidate: 'oninput'
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
		mixpanel.track('Click Top Apply Now Button');
	});

	$doc.on('submit', '#apply-form', function(event) {
		var form = event.currentTarget
		var $form = $(form);
		var email = form.elements['email'].value;
		var name = form.elements['name'].value;

		mixpanel.alias(email);

		mixpanel.track('Send Apply Form', {
			$name: name,
			$email: email
		});

		mixpanel.people.set({
			'$name': name,
			'$email': email
		});

		$.ajax({
			url: '//formspree.io/' + window.formToken,
			dataType: 'json',
			method: 'POST',
			data: $form.serialize(),
			success: function(data) {
				console.log(data);
				form.reset();
				$doc.find('.js-alert-success').slideDown();
				mixpanel.track('Apply Successfully');
			},
			error: function(err) {
				console.log(err);
				$doc.find('.js-alert-error').slideDown();
				mixpanel.track('Apply Error');
			}
		});
		return false;
	});

})(document, jQuery);
