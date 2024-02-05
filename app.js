// Randy Nguyen

console.log("Let's get this party started!");

const $gifContainer = $("#gif-container");
const $searchInput = $("#search");

//function using AJAX to add a gif
function addGif(res){
    let numResults = res.data.length;
    if (numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);
        let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
        let $newGif = $("<img>", {
            src: res.data[randomIdx].images.original.url,
            class: "w-100"
        });
        $newCol.append($newGif);
        $gifContainer.append($newCol);
    }
}

// This handles the form submission and clears search box and makes ajax call
$("form").on("submit", async function(evt){
    evt.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
    addGif(response.data);
});

//This removes all gifs in gif container
$("#remove").on("click", function() {
    $gifContainer.empty();
});