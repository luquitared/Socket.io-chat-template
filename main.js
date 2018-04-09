// Client object needed for authentication
var user = {
  room: null,
  msg: null,
  up_recieved: false,
  down_recieved: false,
  flag_recieved: false
}

$(function () {
  var socket = io();

//Hide DIV elements
  $('.leave_comment').hide();
  $('.reactions').hide();
  $('.list-group').hide();

// When create button is clicked, create a room
  $('#create_button').click(function(){
        var room = $('#input_rm_name').val();
        user.room = room;
        socket.emit('recieve name', room);
        $('.leave_comment').toggle();
        $('.reactions').toggle();
        $('.list-group').toggle();
        $(".join-room").html( "<h3>Currently viewing room</h3>" ); //doesnt work
        return false;
      });

//Transmitting messages event handler
  $('#send_msg_button').click(function(){
    user.msg = $('#comment_box').val();
    //console.log(msg);
    socket.emit('chat message', user.msg, user.room); //Sends user object

    return false;
    });

//Comment UI handling
  $('#post_comment').click(function(){
    $('#comment_box').toggle();

  });

// emits reactions to other users
  $(".list-group li #up").click(function(){
    if(user.up_recieved == false) {
      $('#up-count').html(function(i, val) {return +val+1});
      user.up_recieved = true;
      socket.emit('reaction', user);
    }
  });
  $(".list-group li #down").click(function(){
    if(user.down_recieved == false) {
      $('#down-count').html(function(i, val) {return +val+1});
      user.down_recieved = true;
      socket.emit('reaction', user);
    }
  });
  $(".list-group li #flag").click(function(){
    if(user.flag_recieved == false) {
      $('#flag-count').html(function(i, val) {return +val+1});
      user.flag_recieved = true;
      socket.emit('reaction', user);
    }
  });

//Handles sending messages between rooms and generates needed HTML
  socket.on('chat message', function(msg){
    $('.comments').append($('<div class="row"><div class="col-sm-1"><div class="thumbnail"><img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"></div><!-- /thumbnail --></div><!-- /col-sm-1 --><div class="col-sm-5"><div class="panel panel-default"><div class="panel-heading"><strong>myusername</strong> <span class="text-muted">commented 5 days ago</span></div><div class="panel-body"><p> SUP </p></div><!-- /panel-body --></div><!-- /panel panel-default --></div><!-- /col-sm-5 -->'));
    $(".panel-body:has(p)").append($('<p>')).text(msg);
    });
});
