function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function findKeyWord(array, search){
  console.log(search);

  array.forEach(function(element){
    if(element.keywords.includes(search)){
      let description = decodeHtml(element.body)
      let result =
        `
          <tr>
            <th>${element.title}</th>
            <td>${description}</td>
          </tr>
        `

      $('#tableResult').append(result);
    }
  })
}

function loadData(){
  const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
  $('.search-form').on("submit", function(event){
    const search = $('.searchBar').val()
    // event.preventDefault();
    $.ajax({
      url: Url,
      type: "Get",
      success: function(response){
        findKeyWord(response, search);
      },
      error: function(error){
        console.log(`Error ${error}`)
      }
    })
    return false;
  })
}

$(document).ready(function(){
  loadData();
})
