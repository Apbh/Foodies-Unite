//Set Varibles
//================================================================================

var topic = ["Sushi", "Pasta", "Indian food", "Sandwich", "BBQ", "Ramen", "Bacon", "Shrimp", "Salmon", "Pho", "Cookies", "Pizza", "Chocolate", "Dukbokki", "Cake", "Risotto", "Tea", "Coffee", "Fries", "Yoghurt", "Salad", "Ice-cream", "Salads", "Pudding", "Strawberries"];
var gifCounter = 0;



//Functions
//===============================================================================

function displayfood() {
    var food = $(this).attr("foodName")
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rl5UuLRyhFRyvVLPwcurT8cC7SPBxT0u&q=" + food + "&limit=10&offset=&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response);



            for (var i = 0; i < results.length; i++) {
                //creating a div
                var gifCaption = $("<div>");
                gifCaption.addClass("contents")

                //Paragraph
                var newp = $("<p>");
                newp.text("Rating is: " + results[i].rating);

                // Image
                var newgif = $("<img>");
                newgif.addClass("gif");
                newgif.attr("alt", "Gif Not Available");
                newgif.attr("src", results[i].images.fixed_height_still.url);
                newgif.attr("data-still", results[i].images.fixed_height_still.url);
                newgif.attr("data-animate", results[i].images.fixed_height.url);
                newgif.attr("data-state", "still");
            
                

                //Attaching image + paragraph to div
                gifCaption.prepend(newp);
                gifCaption.prepend(newgif);

                //Nesting divs
                $("#foodgifs").prepend(gifCaption);
                $("#foodgifs").prepend(gifCaption);

            }



            //converting from still state to animate and then back to still
            $(".gif").on("click", function () {



                var state = $(this).attr("data-state");

                if (state === "still") {

                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");

                }

                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }



            });

        });

}



function createbtns() {
    //create buttons for item in the topic array

    //empty out foodbtns div
    $("#foodbtns").empty();


    //for loop
    for (var i = 0; i < topic.length; i++) {

        var button = $("<button>");
        button.addClass("foodlist")
        button.attr("foodName", topic[i]);
        button.text(topic[i]);
        $("#foodbtns").append(button);

    }
}


//MAIN PROCESSES
//============================================================================
//Take user input and create buttons for it

$("#submitentry").on("click", function (event) {
    event.preventDefault();
    var foodItem = $("#feedMe").val().trim();
    topic.push(foodItem);
    createbtns();
});



$(document).on("click", ".foodlist", displayfood);

$("#reset").on("click", function (event) {
    event.preventDefault;
    $("#foodgifs").empty();

})

//caling on create button function
createbtns();



//Add 10 more gifs on each button click
// if (buttonClickedAgain)
// {   
//  displayfood();
// gifCounter = gifCounter + 10;
// console.log(gifCounter);

// }

