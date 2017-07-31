window.fbAsyncInit = function() {
	FB.init({
		appId: '407768116077752',
		cookie: true,
		success: true,
		status: true,
		xfbml: true,
		version: 'v2.2'
	});

    FB.Event.subscribe("xfbml.render", function(response){
        $('.fb-loader').remove();
    });

	// Post To FB Feed
	function postToFeed(title, desc, url, image) {
		var obj = { 
			method: 'feed', 
			link: url, 
			picture: image, 
			name: title, 
			description: desc 
		};

		function callback(response){}
		FB.ui(obj, callback);
	}

	// Share Depiction on FB
    $('.facebook-share-button').click(function(e) {
        e.preventDefault();
        
        $depict = $('.trope-depictions');
        var title = $depict.find('.main-title').html();
        var desc  = $depict.find('.depiction-summary').html();        
        var image = $depict.find('.comic-img img').attr('src');

        var href  = $(this).prop('href');

        postToFeed(title, desc, href, image);

        return false;
    });

    // Load Depiction Comments
    $('.depiction-comments-btn').click(function() {
   
    	var depiction_id = $('.trope-depictions .carousel-slides .item').data('depiction-id');
    	var href = 'http://www.tvtropes.org?depict='+depiction_id;

        var html = '<div class="fb-loader"><img src="/img/loading-alt.gif" alt="loading" /></div>';
    	    html += '<div id="fb-comments" class="fb-comments" data-href="'+href+'" data-width="100%" data-order-by="social" data-numposts="5"></div>';
    	$('.facebook-comments-cont').html(html).css('display','');
    	$('.depiction-comments-btn').css('display','none');

    	FB.XFBML.parse();

    });

};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));