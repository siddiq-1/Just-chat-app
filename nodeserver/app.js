//NODE SERVER WHICH WILL HANDLE ALL THE CONNECTIONS FOR SOCKET IO

const io = require('Socket.io')(8000);

const users ={};
io.on('connection',Socket=>{
    Socket.on('new-user-joined',Name=>{
        users[Socket.id]=Name;
        Socket.broadcast.emit('user-joined',Name);    
    }); 
    Socket.on('send',message=>{
        Socket.broadcast.emit('receive',{message:message,Name:users[Socket.id]})
    });
    Socket.on('disconnect',message=>{
        Socket.broadcast.emit('left',users[Socket.id]);
        delete users[Socket.id];
    });
})

