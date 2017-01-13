function initHyperForm() {
	//add validation for forms
	if (hyperform && typeof hyperform === 'function') {
		hyperform(window, {
			revalidate: 'oninput'
		});
	}
}

function initNewsSticker() {
	var slider = document.getElementById('twitter-section-slider');
	var clonedSlider = document.getElementById('twitter-section-slider-clone');

	var firstOffsetTop = slider.offsetTop;

	window.addEventListener('scroll', function(event) {
		clonedSlider.classList.toggle('sticked', window.scrollY >= firstOffsetTop);
	});
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
		var phone = form.elements['phone'].value;

		var data = {
			email: email,
			name: name,
			phone: phone
		};

		mixpanel.alias(email);

		mixpanel.track('Send Apply Form', {
			$name: name,
			$email: email,
			$phone: phone
		});

		mixpanel.people.set({
			$name: name,
			$email: email,
			$phone: phone
		});

		// Test
		//var url = 'https://demo.triip.me/api/v1/type_a_retreat_subscriptions/';


		// Production
		var url = 'https://www.triip.me/api/v1/type_a_retreat_subscriptions/';

		$.ajax({
			url: url,
			method: 'POST',
			type: 'POST',
			crossDomain: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $.param(data),
			success: function(data) {
				console.log(data);
				form.reset();
				$doc.find('.js-alert-error').hide();
				$doc.find('.js-alert-success').slideDown();
				mixpanel.track('Apply Successfully');
			},
			error: function(err) {
				console.warn(err);
				var errorMessage = 'There is some errors on submission, but don\'t worry, we will contact you soon.';
				if (err &&
					err.responseJSON &&
					err.responseJSON.errors[0] &&
					err.responseJSON.errors[0].title) {
					errorMessage = err.responseJSON.errors[0].title;
				}
				$doc.find('.js-alert-success').hide();
				$doc.find('.js-alert-error').slideDown();
				$('#error-messages').html(errorMessage);
				mixpanel.track('Apply Error', {
					message: errorMessage
				});
			}
		});

		return false;
	});

	window.twitterFetcher.fetch({
		"profile": {
			"screenName": 'typeAretreat'
		},
		"id": '811424291149361152',
		"maxTweets": 8,
		"enableLinks": true,
		"dataOnly": true,
		"customCallback": function(tweets) {
			var elements = document.getElementsByClassName('twitter-section-items');
			if (!elements && !elements.length) {
				return;
			}
			var html = '<marquee scrollamount="5" onmouseover="this.stop();" onmouseout="this.start();">';
			for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
				var tweetObject = tweets[i];
				var div = document.createElement("div");
				div.innerHTML = tweetObject.tweet;
				var text = div.textContent || div.innerText || "";
				html += '<span><a href="' + tweetObject.permalinkURL + '">' + text + '</a></span>';
			}
			html += '</marquee>';

			for (var j = elements.length - 1; j >= 0; j--) {
				elements[j].innerHTML = html;
			}

			initNewsSticker();
		}
	});

})(document, jQuery);
