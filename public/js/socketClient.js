$(function(){

    
    userD = ""
    roomId = ""

    $(document).on('submit', '#userNameForm', function(event){
        event.preventDefault();
        socket.emit('submitName', {
            name: $('#userNameInput').val(),
        });
        $('#userName').text('Hi '+$('#userNameInput').val());
        $('#userNameForm').hide();
        $('#userNameInput').val('');
    });
    socket.on('roomDetail', (roomData) => {
       // $('#onlinePlayers').html('');
        roomData.users.forEach(user => {
            $('#onlinePlayers')
            .append($('<li class="list-group-item" id="'+user.id+'">')
            .html('<button type="button" data-room="'+user.room+'" class="btn btn-warning btn-sm joinGameRequest">'+user.name+'</button>'));
        });
    });

    socket.on('existingUsers', (userData) => {
       // $('#onlinePlayers').html('');
        userData.users.forEach(user => {
            if(userData.currentUserId != user.id){

                $('#onlinePlayers')
                .append($('<li class="list-group-item" id="'+user.id+'">')
                .html('<button type="button" data-room="'+user.room+'" class="btn btn-warning btn-sm joinGameRequest">'+user.name+'</button>'));
            }
        });
    });

    socket.on('joinRequestRecieved', (userData) => {
        //console.log(userData);
        $('.notification')
        .html('<div class="alert alert-success">Recieved a game request from <strong>'+userData.name+'</strong>. <button data-room="'+userData.room+'" class="btn btn-danger btn-sm acceptGameRequest">Accept</button></div>')
        $('#status').append($(`<a class="btn btn-dark text-light my-4 px-2 mx-2" target="_blank" href="http://localhost:8080/api/move/${userData.room}">Opponent previous move</a>`));
    });

    $(document).on('click', '.joinGameRequest', function(){
        socket.emit('sendJoinRequest', {
            room: $(this).data('room')
        });

        roomId = $(this).data('room');

        $('.notification').html('<div class="alert alert-success">Game request sent.</div>');
        $('#status').append($(`<a class="btn btn-dark text-light my-4 px-2 mx-2" target="_blank" href="http://localhost:8080/api/move/${roomId}">Your previous move</a>`));
        
    });

    $(document).on('click', '.acceptGameRequest', function(){

        roomId =  $(this).data('room')
        $('#status').append($(`<a class="btn btn-dark text-light my-4 px-2 mx-2" target="_blank" href="http://localhost:8080/api/move/${roomId}">Your previous move</a>`));

        
        socket.emit('acceptGameRequest', {
            room: $(this).data('room')
        });
        $('.notification')
        .html('<div class="alert alert-success">Please wait for game initialize from host.</div>');
    });

    socket.on('gameRequestAccepted', (userData) => {
        //console.log(userData);
        $('.notification')
        .html('<div class="alert alert-success">Game request accepted from <strong>'+userData.name+'</strong>.</div>');
        $('.notification')
        .append($('<div class="text-center">'))
        .append('Choose rotation. <button data-room="'+userData.room+'" data-color="black" type="button" class="btn btn-dark btn-sm setOrientation">Black</button> or <button data-room="'+userData.room+'" data-color="white" type="button" class="btn btn-light btn-sm setOrientation">White</button>');

        $('#status').append($(`<a class="btn btn-dark text-light my-4 px-2 mx-2" target="_blank" href="http://localhost:8080/api/move/${userData.room}">Opponent previous move</a>`));

        $('#onlinePlayers li#'+userData.id).addClass('active');
        if($('#onlinePlayers li#'+userData.id).hasClass('active'))
            {
                $('#onlinePlayers li#'+userData.id).css("background", "#ffc107");
            }
        else{
            $('#onlinePlayers li#'+userData.id).css("background", "white");
        }
                
    });

    socket.on('opponentDisconnect',function(){
        $('.notification')
        .html('<div class="alert alert-success">Opponent left the room</div>');
        board.reset();
        chess.reset();
    })

    

    
    
}(jQuery));