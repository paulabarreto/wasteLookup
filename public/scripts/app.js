const favourites = [];

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function addFavourites(favourite){
  favourites.push(favourite);
  let favouriteList = `
    <p>${favourite.title}</p>
  `
  $('#favourites').append(favouriteList);
}

function findKeyWord(searchResult){
  // let status = "unclicked";
  searchResult.forEach(function(element){

    let description = decodeHtml(element.body)

      let result =
        `
            <tr id=${element.id}>
              <th>
                <span id="star${element.id}" class="${status}">
                  <i class="fas fa-star"></i>
                </span>
                ${element.title}

              </th>
              <td>${description}</td>
            </tr>
          `

      $('#tableResult').append(result);
      // $(`#${element.id}`).click(function(){
      //   $(`#star${element.id}`).toggleClass('clicked');
      //   addFavourites(element);
      // })
  })
}

function displayResult(){
  $.ajax("/waste", { method: 'GET' })
    .then(function (result){
      console.log(result);
      // renderTweets(tweets);
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
    console.log(search);
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
