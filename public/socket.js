//create the connection to server 
//io is coming from socket.io cdn
let socket = io.connect('http://localhost:8080');

console.log('socket',socket)

//init gets called once the user clicks start button 
function init(){
    draw(); //draw is reculsive
    console.log('player',player)
    socket.emit('init',{
        playerName:player.name
    });
}

// listen for init (where is emitting init ? socketMain.js from server)
socket.on('initReturn',(data)=>{
  
    orbs = data.orbs
});

socket.on('tock',(data)=>{
    console.log('tock data',data)
})