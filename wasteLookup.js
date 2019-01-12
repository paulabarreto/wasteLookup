function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function addId(resultArray) {

}

function findKeyWord(array, search){
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
        // $(this).data("favorite", true)
        $(`#star${element.id}`).toggleClass('clicked');;

      })
    }
  })
}

function loadData(){
  const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
  $('.search-form').on("submit", function(event){
    const search = $('.searchBar').val()
    $.ajax({
      url: Url,
      type: "Get",
      success: function(response){
        const resultId = response.map((e, i) => {
              return {
                  ...e,
                  id: i
              }
          });
        console.log(resultId);
        findKeyWord(resultId, search);
      },
      error: function(error){
        console.log(`Error ${error}`)
      }
    })

    return false;
  })
}

function addFavorites() {

}

$(document).ready(function(){
  loadData();
})
