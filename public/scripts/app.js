//Decodes HTML string
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

//Displays the Favourites Bar for an array of favourites
function addFavouritesBar(favourites) {
  let favouriteList = [];
  $(".favesTitle").html("Favourites");
  let elem = $('#favourites');
  favourites.forEach(function(favourite){
    let decodedDescription = decodeHtml(favourite.body)
    favouriteList.push(`
          <tr>
            <th>
              <span id=${favourite._id} class="clicked">
                <i class="fas fa-star"></i>
              </span>
              ${favourite.title}
            </th>
            <td>${decodedDescription}</td>
          </tr>
      `);
  })
  elem.html(favouriteList);
}

//Displays the Favourites Bar for one favourite element
function addFavouriteToBar(favourite) {
    $(".favesTitle").html("Favourites");
    let elem = $('#favourites');
    let decodedDescription = decodeHtml(favourite.body)
    let favouriteList =
      `
        <tr>
          <th>
            <span id=${favourite._id} class="clicked">
              <i class="fas fa-star"></i>
            </span>
            ${favourite.title}
          </th>
          <td>${decodedDescription}</td>
        </tr>
      `
      elem.append(favouriteList);
}

//Sends ajax request to update the database adding a false value to favourite
function removeFavourites(unfavourite){
  $.ajax({
    url: "/waste/unfavourites",
    type: "PUT",
    data: unfavourite,
    success: function(data) {
      console.log("removed");
    }
  });
}

//Sends ajax request to update the database adding a favourite key value pair
function addFavourites(favourite){
  $.ajax({
    url: "/waste/favourites",
    type: "PUT",
    data: favourite,
    success: function(data) {
      console.log("added");
    }
  });
}

//Displays the search result on the page
function findKeyWord(searchResult, faves){
    console.log(searchResult);
    searchResult.forEach(function(element){
    let description = decodeHtml(element.body)

      let result =
        `
            <tr>
              <th>
                <span id=${element._id}>
                  <i class="fas fa-star"></i>
                </span>
                ${element.title}
              </th>
              <td>${description}</td>
            </tr>
          `
      $('#tableResult').append(result);
      if(element.favourite) {
        faves.push(element);
        $(`#${element._id}`).addClass('clicked');
        $(`#${element._id}`).on("click", function(){
          $(`#${element._id}`).toggleClass('clicked');
          removeFavourites(element);
          const removedFave = faves.filter(word => word !== element );
          addFavouritesBar(removedFave);
        });
      } else {
        $(`#${element._id}`).on("click", function(){
          $(`#${element._id}`).toggleClass('clicked');
          addFavouriteToBar(element);
          addFavourites(element);
        })
      }
  })
  if(faves.length > 1) {
    addFavouritesBar(faves)
  }
}

//Gets the input value and sends it to the backend to make a query for keywords
function loadData(faves){
  $(".search-form").on("submit", function(event){
    event.preventDefault();
    const search = $(".searchBar").serialize();
    $.post("/waste", search, function(data){
        findKeyWord(data, faves);
    });

    return false;
  })
}

//Reloads the page if the search bar is emptied
function changeEventHandler(event) {
    if(!event.target.value) {
      location.reload();
    }
}

$(document).ready(function(){
  var faves = [];
  loadData(faves);
  document.querySelector('.searchBar').onkeyup=changeEventHandler;
})
