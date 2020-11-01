//create the connection to server 
//io is coming from socket.io cdn
let socket = io.connect('http://localhost:8080');

console.log('socket',socket)

//init gets called once the user clicks start button 
function init(){
    draw(); //draw is reculsive
    // console.log('player',player)
    socket.emit('init',{
        playerName:player.name
    });
}

// listen for init (where is emitting init ? socketMain.js from server)
socket.on('initReturn',(data)=>{
    
    orbs = data.orbs
    //every 0.033 sec, 
        setInterval(()=>{

        if(player.xVector && player.yVector){
            socket.emit('tick',{
                xVector:player.xVector,
                yVector:player.yVector
            });
        }
        },33) 
  
});

socket.on('tock',(data)=>{
  players=data.players;
  player.locX = data.playerX
  player.locY = data.playerY
});

socket.on('orbCollision',(data)=>{
    orbs.splice(data.orbIndex,'1',data.newOrb);
    console.log('orbSwitch',data);
})