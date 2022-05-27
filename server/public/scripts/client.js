console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  
  // delete button on click
  $('#viewKoalas').on('click','.deleteBtn', handleDelete);
  
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: Boolean($('#readyForTransferIn').val()), // todo 
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    console.log(koalaToSend);
    saveKoala( koalaToSend );
    getKoalas();
    features/delete-btn

    $('.refresh').val('');

  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url:'/koalas',
    method: 'GET'
  }).then((res)=>{
    console.log('Recieve data back');
    displayKoalas(res);
  }).catch((err) => {
    alert('Failed to display Koalas. Sorry.')
    console.log('DELETE /koalas failed:', err)
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas

  $.ajax({
    url:'/koalas',
    method:'POST',
    data:newKoala
  }).then(()=>{
    console.log('Sending post request', response);
    getKoalas();
  }).catch(()=>{
    console.log('post request failed', error);
  })
}


function displayKoalas(koalas){
  $('#viewKoalas').empty();

  for(koala of koalas){
    $('#viewKoalas').append(`
    <tr data-koala-id = ${koala.id}>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td>
      <button class ="markReadBtn">Ready for Transfer</button>
      </td>
      <td>
      <button class ="deleteBtn">Delete</button>
      </td>
  </tr>
    `);
  }
}

// Delete Button
function handleDelete() {
  console.log('test');
  
  let tr = $(this).closest('tr');
  let id = tr.data('koala-id');

  console.log(id);
  

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${id}`
  })
  .then((res) => {
    console.log('in DELETE /koala');
    // Refresh data
    getKoalas();
  }).catch((err) => {
    console.log('DELETE /koalas error', err);
  })
}