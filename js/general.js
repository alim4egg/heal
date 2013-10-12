$(document).ready(function() {
	
	//For making tables responsive
	var switched = false;
	var updateTables = function() {
		if (($(window).width() < 480) && !switched ) {
			switched = true;
			$(".table").each(function(i, element) {
				splitTable($(element));
			});
			return true;
		}
		else if (switched && ($(window).width() > 480)) {
			switched = false;
			$(".table").each(function(i, element) {
				unsplitTable($(element));
			});
		}
	};
   
	$(window).load(updateTables);
	$(window).bind("resize", updateTables);
   
	function splitTable(original) {
		original.wrap("<div class='table-wrapper' />");
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");
	}
	
	function unsplitTable(original) {
		original.closest(".table-wrapper").find(".pinned").remove();
		original.unwrap();
		original.unwrap();
	}

	// Initialize main slider
    $('#slider').nivoSlider({
		animSpeed: 500,
		pauseTime: 9000,
		directionNav: true,
		beforeChange:function(){ 
			$(".header").css('opacity','0');
			$(".text").css('opacity','0');
		}, // Triggers before a slide transition
        afterChange:function(){
			$(".header").animate({opacity:1},1000);
			$(".text").animate({opacity:1},1000);
		}
	});
	
	
	// Initialize blog post slider (display on homepage)
	if ( $("#header-mobile-menu").css('display') == "none" ) {
	    var slider = $('#blog-slider').bxSlider({
			displaySlideQty: 4,
			moveSlideQty:4,
			controls:false
		});
	} 
	
	if ( ( $("#header-mobile-menu").css('display') != "none" ) && ( $("#header-mobile-menu").css('position') == "absolute" ) ) {
		var slider = $('#blog-slider').bxSlider({
			displaySlideQty:2,
			moveSlideQty:2,
			controls:false
		});
	}
	
	if ( ( $("#header-mobile-menu").css('display') != "none" ) && ( $("#header-mobile-menu").css('position') == "static" ) ) {
		var slider = $('#blog-slider').bxSlider({
			displaySlideQty:1,
			moveSlideQty:1,
			controls:false
		});
	}
	
	$('#go-prev').click(function(){
		slider.goToPreviousSlide();
		return false;
	});

	$('#go-next').click(function(){
		slider.goToNextSlide();
		return false;
	});
		
	//Delete last delimeter
	$('.twitterBody li:last, #contact-address span:last, #contact-method li:last, #blog-post-sidebar li:last, .testimonials-wrap:last').css('borderBottom','none');
	
	//Drop down menu creation 
	$('#menu-header-menu li').each(function(){
		if ( $(this).children('.sub-menu') != false) {
			$(this).mouseenter(function(){ 
				$(this).children('.sub-menu').fadeIn(200);
			}).mouseleave(function(){;
				$(this).children('.sub-menu').fadeOut(100);
			});
		}
	});
	
	//Flickr Feed
	$('#flickr-feed').jflickrfeed({
		limit:6,
		qstrings:{ id: '52617155@N08' },
		itemTemplate: 
			'<li>' +
			'<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
		'</li>'
	});
	
	//Footer subscribtion button animation
	$("#mce-EMAIL").click(function(){
		$(this).attr('value',' ');
	}).blur(function(){
		if ($(this).attr('value') == '') {
			$(this).attr('value','email address');
		}
	});
	
	//Form animation 
	$("#leave-reply-wrap form input, #leave-reply-wrap form textarea").focus(function(){
		$(this).css({boxShadow:"none",opacity:1,outline:"4px solid #f6f6f6"});
	}).blur(function(){
		$(this).css({boxShadow:"none",opacity:1,outline:"4px solid #f6f6f6"});
	});
	
	//Gallery animation
	$(".gallery-image").hover(function(){
		$(this).children().children("img").css({opacity:0.2});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({opacity:0.7});
		}
		$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({display:"block"});
	},function(){
		$(this).children().children("img").css({opacity:0.8});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({opacity:0});
		}
		$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({display:"none"});
	});
	
	
	//Main Blog animation
	$("#blog-slider li").hover(function(){
		$(this).find("img").css({opacity:0.2});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).find(".main-blog-magnifier").css({opacity:0.7});
		}
		$(this).find(".main-blog-magnifier").css({display:"block"});
	},function(){
		$(this).find("img").css({opacity:0.8});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).find(".main-blog-magnifier").css({opacity:0});
		}
		$(this).find(".main-blog-magnifier").css({display:"none"});
	});
	
	//Contact form animation 
	$("#contact-form form").hover(function(){
		$(this).children("#contact-form-title").css({opacity:0.5});
	},function(){
		$(this).children("#contact-form-title").css({opacity:0.3});
	});
	
	
	//Accordion widget initializing
	$(".accordion").accordion({
		icons: {
			'header':'accordionplus', 
			'headerSelected':'accordionminus'
		}
	});
	
	//Tabs widget initializing
	$(".tabs").tabs();
	
	
	//Lightbox plugin for Galleries
	$(".gallery-image a").lightBox();
	
	//Back to top button initialize
    $(window).scroll(function () { 
		if ($(this).scrollTop() > 400) {
			$("#back-to-top").show(500); 
		} 
		if ($(this).scrollTop() < 400) {
			$("#back-to-top").hide(500); 
		}
	});
	
	//Smooth scrolling
	$("#back-to-top").click(function(event){		
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
		
	//Online Appointment form
	
	$("#prefered_email").click(function(){
		$("#form-email-wrap").show(300);
		$("#form-telephone-wrap").hide();
	});
	
	$("#prefered_phone").click(function(){
		$("#form-telephone-wrap").show(300);
		$("#form-email-wrap").hide();
	});
	
	//Mobile menu
	$('#header-mobile-menu').change(function() {
		// set the window's location property to the value of the option the user has selected
		window.location = $(this).val();
	});	
	
	//Make current option in mobile menu selected
	$("#header-mobile-menu option").each(function() {
		var path = window.location.pathname;
		var pageName = path.substring(path.lastIndexOf('/') + 1);
		if ($(this).attr('value') == pageName) {
			$(this).attr('selected','selected');
		}
	});
	
	//Delete margin bottom in footer if IE8
	if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
		$("#copyright-info").css("margin-bottom","20px");
	}
	
	//Twitter feed initialize
	var displaylimit = 3;
	var showdirecttweets = true;
	var showretweets = true;
	var showtweetlinks = true;
	var showprofilepic = true;
 
	$.getJSON('get-tweets.php',{"twitterusername": "envato", "displaylimit": 3},
	function(feeds) {
		var feedHTML = '';
		var displayCounter = 1;
		for (var i=0; i<feeds.length; i++) {
			var tweetscreenname = feeds[i].user.name;
			var tweetusername = feeds[i].user.screen_name;
			var profileimage = feeds[i].user.profile_image_url_https;
			var status = feeds[i].text;
			var isaretweet = false;
			var isdirect = false;
			var tweetid = feeds[i].id_str;
 
			//If the tweet has been retweeted, get the profile pic of the tweeter
			if(typeof feeds[i].retweeted_status != 'undefined'){
				profileimage = feeds[i].retweeted_status.user.profile_image_url_https;
				tweetscreenname = feeds[i].retweeted_status.user.name;
				tweetusername = feeds[i].retweeted_status.user.screen_name;
				tweetid = feeds[i].retweeted_status.id_str
				isaretweet = true;
			};
 
			//Check to see if the tweet is a direct message
			if (feeds[i].text.substr(0,1) == "@") {
				isdirect = true;
			}
 
			if (((showretweets == true) || ((isaretweet == false) && (showretweets == false))) && ((showdirecttweets == true) || ((showdirecttweets == false) && (isdirect == false)))) {
				if ((feeds[i].text.length > 1) && (displayCounter <= displaylimit)) {
					if (showtweetlinks == true) {
						status = addlinks(status);
					}
					feedHTML += '<div class="twitterRow">';
					feedHTML += '<div class="twitter-text"><p><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+tweetusername+'" >'+tweetscreenname+'</a></strong> <a href="https://twitter.com/'+tweetusername+'" >@'+tweetusername+'</a></span><br/>'+status+'</p></div>';
					feedHTML += '</div>';
					displayCounter++;
				}
			}
		}
 
		$('#tweet-feed,.tweet').html(feedHTML);
	});
 
	//Function modified from Stack Overflow
	function addlinks(data) {
		//Add link to all http:// links within tweets
		data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
			return '<a href="'+url+'" >'+url+'</a>';
		});
 
		//Add link to @usernames used within tweets
		data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
			return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" >'+reply.charAt(0)+reply.substring(1)+'</a>';
		});
		return data;
	}
 

	// Google Maps Initializing
	if (document.getElementById("gmaps")) {
		//---- Code for a small maps on main page ----
		var myOptions = { 
			//Coordinates of the map's center
			center: new google.maps.LatLng(40.709345,-73.99879), 
			//Zoom level
			zoom: 15,
			//Type of the map (posible values .HYBRID, .SATELLITE, .ROADMAP, .TERRAIN)
			mapTypeId: google.maps.MapTypeId.HYBRID
		};
		//Define the map and select the element in which it will be displayed
		var map = new google.maps.Map(document.getElementById("gmaps"),myOptions);
	
		var marker = new google.maps.Marker({
			//Coordinate of the map marker's location
			position: new google.maps.LatLng(40.710670, -73.999604),
			map: map,
			//Text that will be displayed when the mouse hover on the marker
			title:"Heal Clinic 1"
		});
		var marker1 = new google.maps.Marker({
			//Coordinate of the map marker's location
			position: new google.maps.LatLng(40.709345,-73.99879),
			map: map,
			//Text that will be displayed when the mouse hover on the marker
			title:"Heal Clinic 2"
		});
	}
	
	//---- Code for a big maps located in contact section ----
	if (document.getElementById("contact-gmaps")) {
		var myOptions1 = { 
			//Coordinates of the map's center
			center: new google.maps.LatLng(40.709345,-73.99879), 
			//Zoom level
			zoom: 15,
			//Type of map (possible values .ROADMAP, .HYBRID, .SATELLITE, .TERRAIN)
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		//Define the map and select the element in which it will be displayed
		var map1 = new google.maps.Map(document.getElementById("contact-gmaps"),myOptions1);
		var marker1 = new google.maps.Marker({
			//Coordinate of the marker's location
			position: new google.maps.LatLng(40.710670, -73.999604),
			map: map1,
			//Text that will be displayed when the mouse hover on the marker
			title:"Heal Clinic 1"
		});
		var marker2 = new google.maps.Marker({
			//Coordinate of the map marker's location
			position: new google.maps.LatLng(40.709345,-73.99879),
			map: map1,
			//Text that will be displayed when the mouse hover on the marker
			title:"Heal Clinic 2"
		});
	}
	
	
});