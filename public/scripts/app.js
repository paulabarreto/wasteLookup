function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function addFavourites(favourite){
  let favouriteList = `
    <p>${favourite.title}</p>
  `
  $('#favourites').append(favouriteList);
}

function findKeyWord(array, search){
  const favorites = [];

  array.forEach(function(element){
    if(element.keywords.includes(search)){
      let description = decodeHtml(element.body)

      let result =
        `
          <tr id=${element.id}>
            <th>
              <span id="star${element.id}">
                <i class="fas fa-star"></i>
              </span>
              ${element.title}

            </th>
            <td>${description}</td>
          </tr>
        `

      $('#tableResult').append(result).data("favorite", false);
      $(`#${element.id}`).click(function(){
        $(`#star${element.id}`).toggleClass('clicked');;
        addFavourites(element);
      })
    }
  })
}

function changeEventHandler(event) {
    // You can use “this” to refer to the selected element.
    if(!event.target.value) $('#div').empty();
}

function loadData(){
  $('.search-form').on("submit", function(event){
    const search = $('.searchBar').val()
    $.ajax({
      url: "/waste",
      type: "Get",
      success: function(response){
        console.log("front", response);
        findKeyWord(response, search);
      },
      error: function(error){
        console.log(`Error ${error}`)
      }
    })

    return false;
  })
}

function loadFaves(){
    $.ajax("/faves", { method: 'GET' })
    .then(function (faves){
      console.log(faves);
      // renderTweets(tweets);
    });
  }


$(document).ready(function(){
  loadData();
  loadFaves();
  document.querySelector('.searchBar').onchange=changeEventHandler;

})
