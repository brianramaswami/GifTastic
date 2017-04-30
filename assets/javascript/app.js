  var topics = [];


  
// This function handles events where a topics button is clicked
$("#addAnimal").on("click", function(event) {
	event.preventDefault();
	// This line grabs the input from the textbox
	var topic = $("#animal-input").val().trim();
	// Adding topics from the textbox to our array
	topics.push(topic);
	// Calling renderButtons which handles the processing of our topics array
	renderButtons();
	$("#animal-input").val('');
});

function displayGifs() {
	  $("#animals").empty();
	// $(".topics").on("click", function() {
	  var search = $(this).attr("data-name");

	  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	    search + "&api_key=dc6zaTOxFJmzC&limit=10";

	  $.ajax({
	      url: queryURL,
	      method: "GET"
	    })
	    .done(function(response) {
	      var results = response.data;
	      for (var i = 0; i < results.length; i++) {
	        var gifDiv = $("<div class='item'>");

	        var rating = results[i].rating;

	        var p = $("<p>").text("Rating: " + rating);

	        var personImage = $("<img>");
	        //starts off as still
	        personImage.attr("src", results[i].images.original_still.url);
	        personImage.attr("data-animate", results[i].images.original.url)
	        personImage.attr("data-still", results[i].images.original_still.url)
	        personImage.attr("data-state", "still");
	        personImage.addClass("gif");



	        gifDiv.prepend(p);
	        gifDiv.prepend(personImage);

	        $("#animals").prepend(gifDiv);
	      }
	    });
	// });
}

// Function for displaying topics data
function renderButtons() {
	// Deleting the topicss prior to adding new topicss
	// (this is necessary otherwise you will have repeat buttons)
	$("#animalButtons").empty();
	// Looping through the array of topicss
	for (var i = 0; i < topics.length; i++) {
	  // Then dynamicaly generating buttons for each topics in the array
	  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	  var a = $("<button>");

	  // a.attr("id", "topics");
	
	  // Adding a class of topics to our button
	  a.addClass("topics");
	  // Adding a data-attribute
	  a.attr("data-name", topics[i]);
	  // Providing the initial button text
	  a.text(topics[i]);
	  // Adding the button to the buttons-view div
	  $("#animalButtons").append(a);
	}
}

function animateImages() {


      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}


$(document).on("click", ".topics", displayGifs);
$(document).on("click", ".gif", animateImages);