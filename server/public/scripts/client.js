console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  $('#addButton').on('click', setupClickListeners);
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
      readyForTransfer: $('#readyForTransferIn').val(), // todo 
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    console.log(koalaToSend);
    // saveKoala( koalaToSend );
    
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url:'/koalas',
    method: 'GET'
  }).then((reponse)=>{
    console.log('Recieve data back');
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
    console.log('Sending post request');
  }).catch(()=>{
    console.log('post request failed');
  })
 

}


function displayKoalas(koalas){
  $('#viewKoalas').empty();

  for(koala of koalas){
    $('#viewKoalas').append(`
    <tr data-book-id = ${koala.id}>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.readyForTransfer}</td>
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


