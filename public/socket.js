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

    console.log('player',player)
    //every 33sec, 
    if(player.xVector || player.yVector){
        setInterval(()=>{
            socket.emit('tick',{
                xVector:player.xVector,
                yVector:player.yVector
            });
        },33) 
    }
});

socket.on('tock',(data)=>{
    console.log('data',data)
  players=data.players;
  player.locX = data.playerX
  player.locY = data.playerY
})