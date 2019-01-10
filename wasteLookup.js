function findKeyWord(array, search){
  array.forEach(function(element){
    if(element.keywords.includes(search)){
      let $result = `
        <tr>
          <th>${element.title}</th>
          <td>${element.body}</td>
        </tr>
      `
      $('#tableResult').append($result);
    }
  })
}

function loadData(){
  const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
  $('.search').on("submit", function(event){
    const search = $('.search').val()
    event.preventDefault();
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
  })
}

$(document).ready(function(){
  loadData();
})
