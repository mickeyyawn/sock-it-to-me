$(document).ready(function(){
  var socket = io.connect('/');
  
  socket.on('welcome', function (data) {
    $('#welcomeMessageFromServer').html('got a message from the server: ' + data.hello);
  });

  socket.on('product.added', function (data) {
    $('#notification').append('<h4>new product was added: ' + data.name + '</h4>');
    console.log(data);
  });

  $('#addProduct').click(function(evt){
    console.log('adding product to database...' + $('#productName').val());
    AJAX('POST', {productName:$('#productName').val()}, '/product', function(ret){
      console.log('added product to database');
      console.log(ret);
      $('#productName').val('');
    });
    return false;
  });
});


function AJAX(type, data, endpoint, callback){
  jQuery.ajax({
     type: type,
     url: endpoint,
     data: data,
     error: function(jqXHR, textStatus, errorThrown){
       alert(errorThrown);
     },
     success: function(msg){
       callback(msg);
     }
   });  
}