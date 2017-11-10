//alert("hello");
$(document).ready(function() {

	var subjects = ['Yas', 'Whatever', 'Eye roll', 'Hungry', 'Barf', 'Ugh', 'Crying',
					'Annoyed', 'Accomplished', 'Dance', 'Celebrate', 'No', 'Bruh', 'Sleepy', 'Tired', 
					'Happy', 'Laugh', 'Tew Much', 'Nah', 'Cant even'];

	function renderButtons(){
		$(".button-display").empty();
        for (var i = 0; i < subjects.length; i++) {
			var a = $("<button>");
			a.addClass("subject");
			a.attr("data-name", subjects[i]);
			a.text(subjects[i]);
			$(".button-display").append(a);
        }
    }

	$('.add-button').on('click', function(event){
			event.preventDefault();
			var subject = $('#new-topic').val().trim();
			subjects.push(subject);
			renderButtons();

    });

    $(document).on('click', ".subject", displayGifInfo);

	function displayGifInfo() {
		var subject = $(this).attr('data-name');
		console.log("subject is " + subject);

		var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=HTUJTlyE5uX4W1ec5rnNj818O1qgKJLj&limit=10";
		 		
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        	var results = response.data;

        	for (var i = 0; i < results.length; i++){
	        	var gifDiv = $('<div class="gifs">');
	        	var rating = response.data[i].rating;
	        	console.log("rating is " + rating);
	        	var ratingUpper = rating.toUpperCase();
	        	var ratingDiv = $('<div>').text("Rating: " + ratingUpper);
	        	var br = $('<br>');
	        	if (rating === ""){
	        		rating = 'Unrated';      		
	         	}

	         	var image = $('<img>')
	         	image.attr("src", results[i].images.fixed_height.url);
	        	// image.attr(response.data[i].images.fixed_height.url;  
        		image.attr('data-state', 'still');
        		image.attr('data-still', results[i].images.fixed_height_still.url);
        		image.attr('data-animate', results[i].images.fixed_height.url);
	        	gifDiv.append(ratingDiv);
	        	gifDiv.append(br);
	        	gifDiv.append(image);
	        	image.addClass('gif');
	        	$('.gif-display').prepend(gifDiv);
        	}
     	});
    }

//// If the clicked image's state is still, update its src attribute to what its gif-animate value is.
		      // Then, set the image's state to animate
		      // Else set src to the still value
    $("body").on('click', '.gif', (function() {
    	console.log("gif button is clicked");
    	var state = $(this).attr('data-state');
    	console.log('state is ' + state);
    	if (state === 'still'){
    		$(this).attr('src', $(this).attr('data-animate'));
    		$(this).attr('data-state', 'animate');
    	} else {
    		$(this).attr('src', $(this).attr('data-still'));
    		$(this).attr('data-state', 'still');
    	}
    	console.log('state is now ' + state);
    }));
    renderButtons();
});
















