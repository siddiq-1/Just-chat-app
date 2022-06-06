const Socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');
const append = (message,position)=>{
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
}
const Name = prompt("Enter your name")
Socket.emit('new-user-joined',Name ); 

Socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`,'right')
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`,'right');
    Socket.emit('send',message);
    messageInput.value = ''
});
Socket.on('receive',data =>{
    append(`${data.Name}:${data.message}`,'left');
});
Socket.on('left',Name =>{
    append(`${Name} left the chat`,'left');
});


 