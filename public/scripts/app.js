const favourites = [];

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function addFavourites(favourite){
  $.ajax({
    url: "/favourites",
    type: "PUT",
    data: favourite,
    success: function(data) {
      console.log(data)
    }
  });

  let favouriteList = `
    <p>${favourite.title}</p>
  `
  $('#favourites').append(favouriteList);
}

function removeFavourites(unfavourite){
  $.ajax({
    url: "/unfavourites",
    type: "PUT",
    data: unfavourite,
    success: function(data) {
      console.log(data)
    }
  });
}

function findKeyWord(searchResult){
  // let status = "unclicked";
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
        $(`#${element._id}`).toggleClass('clicked');
        $(`#${element._id}`).on("click", function(){
          console.log(element);
          $(`#${element._id}`).removeClass('clicked');
          removeFavourites(element);
        });
      } else {
        $(`#${element._id}`).on("click", function(){
          console.log(element);
          $(`#${element._id}`).addClass('clicked');
          addFavourites(element);
        })
      }
  })
}

function displayResult(){
  $.ajax("/waste", { method: 'GET' })
    .then(function (result){
      console.log(result);
    });
}

function changeEventHandler(event) {
    // You can use “this” to refer to the selected element.
    if(!event.target.value) $('#div').empty();
}

function loadData(){
  $(".search-form").on("submit", function(event){
    event.preventDefault();
    const search = $(".searchBar").serialize();
    $.post("/waste", search, function(data){
        findKeyWord(data);
    });

    return false;
  })
}


$(document).ready(function(){
  loadData();
  document.querySelector('.searchBar').onchange=changeEventHandler;

})
