$(document).ready(function() {
    let search = "";
    let person = "";

    cartoons = ["Yoshi", "Kirby", "Waluigi"];
    function startBtns(){
      var i;
    for (i = 0; i < cartoons.length; i++) { 
      let primeros = $("<button>").text(cartoons[i])
      primeros.addClass("gifButton")
      $("#buttons-casa").append(primeros)
    };
    };

    startBtns();

    $(document).on("click", ".gifButton", function(){
      person = $(this).text();
      $("#gifs-appear-here").empty();
      addImg(person);
    });

        function addImg(person) {
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=xgQzfx20m59JRNhkIWIzvUmWafakmhDE&limit=10";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              let animated = results[i].images.fixed_height.url;
              let still = results[i].images.fixed_height_still.url;
              var p = $("<p>").text("Rating: " + rating);
              var personImage = $("<img>");
              personImage.attr("src", animated);
              personImage.attr("still", still);
              personImage.attr("animated", animated);
              personImage.attr("state", "a");  
              gifDiv.prepend(p);
              gifDiv.prepend(personImage);
              $("#gifs-appear-here").prepend(gifDiv);
            };
          });
      };

        $("#add-gif").on("click", function(){
        search = $("#gif-input").val().trim();
        let btn = $("<button>").text(search);
        btn.addClass("gifButton");
        $("#buttons-casa").append(btn);
        $("#gif-input").val("");

      });
      

      $(document).on("click", "img", function(){
        $(this).attr("src", "still");
        let state = $(this).attr("state");
        if (state === "a"){
          $(this).attr("state", "s");
          $(this).attr("src", $(this).attr("still"));
        } else if (state === "s") {
          $(this).attr("state", "a");
          $(this).attr("src", $(this).attr("animated"));
        }
      });

});