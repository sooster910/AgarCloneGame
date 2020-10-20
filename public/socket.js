//create the connection to server 
//io is coming from socket.io cdn
let socket = io.connect('http://localhost:8080');

console.log('socket',socket)


// listen for init (where is emitting init ? socketMain.js from server)
socket.on('init',(data)=>{
    console.log('data',data);
    orbs = data.orbs
})