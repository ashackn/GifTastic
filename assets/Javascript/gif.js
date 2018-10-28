$(document).ready(function (){

//Array called topics. Used influential women, they vary from fictional to non-fictional.  
    var topics = ["Wonder Woman", "Oprah Winfrey", "Malala Yousafzai", "Sally Ride NASA", "Mulan", "The Suffragettes", "Amelia Earhart", "Barbie", "Ellen DeGeneres", "Maya Angelou", "Betty Friedan", "Hidden Figures Movie", "Lisa Simpson","Mother Teresa", "Girl Power", "Frida Kahlo", "Cleopatra","WNBA", "Cat Woman", "Marilyn Monroe", "PowerPuff Girls", "Daenerys Targaryen", "Valentina Tereshkova", "Lucille Ball", "Serena Williams"];

  function renderButtons() {
    //leader-button is in a div where my 25 influential women are placed, the leader-button is empty(dumped)before loading to make sure no data is on the page before we click. ---double check definiton of empty.
    //The loop creates a button for each woman in the array. It appends the button to the leader-buttons div section. 
    //button class btn ("btn btn-outline-danger" Bootstrap button style)
      $("#leader-buttons").empty();
      for (var i = 0; i < topics.length; i++) {
          $("#leader-buttons").append("<button class= 'btn btn-outline-danger' data-topic='" + topics[i] + "'>" + topics[i] + "</button>");
      }
  }
    //calling the renderButtons function
  renderButtons();

  //button that allows you to submit a new female influencer. Grabs the value from the new influencer that was submitted and places the info in the topic variable. Trim means no white space.
  //.push is pushing the new influencer to the topics array with a new button, this happens when renderButtons function is called. 
  $("#submit-leader").on("click", function (event) {
    event.preventDefault();
      var topic = $("#input-leader").val().trim();
      topics.push(topic);
      console.log(topics);
      renderButtons();
      return;
  });

  //$("button").on("click", function ()...this did not work, switched to document, doc, works.

  $(document).on("click", "button", function () {
      var topic = $(this).attr("data-topic");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=CJxXlTEZp4fURt9ItL9iGmkLJq8C6ISc&limit=10";

//getting data from giphy
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          var results = response.data;
          console.log(response.data);
          $("#giphy-section").empty();
          for (var i = 0; i < results.length; i++){
              var womanDiv = $("<div>");
              var ratingtext = $("<p>").text("Rating: " + results[i].rating);
              var powerfulImage = $("<img>");
              
              //obj
              powerfulImage.attr("src", results[i]
              .images.original_still.url);
              powerfulImage.attr("data-still", results[i]
              .images.original_still.url);
              powerfulImage.attr("data-animate", results[i]
              .images.original.url);
              powerfulImage.attr("data-state", "still");
              powerfulImage.attr("class", "gif");
              womanDiv.append(ratingtext);
              womanDiv.append(powerfulImage);
              $("#giphy-section").append(womanDiv);
              
          }

  });
    
});

//animation function for obj
function animateState(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        console.log("ANIMATE LINK: " + $(this).attr("data-animate"));
        
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("SOURCE: " + $(this).attr("src"));
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
      
    }
  

    $(document).on("click", ".gif", animateState);

});