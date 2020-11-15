let socket = io.connect('http://localhost:8080');

console.log('socket',socket)

//init gets called once the user clicks start button 
function init(){
    draw(); //draw is reculsive
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

});

socket.on('orbCollision',(data)=>{
    orbs.splice(data.orbIndex,'1',data.newOrb);
});

socket.on('tickTock', (data)=>{
    player.locX = data.playerX
    player.locY = data.playerY
});

socket.on('updateleaderBoard',(data)=>{
    document.querySelector('.leader-board').innerHTML = "";
    data.forEach((curPlayer)=>{
        document.querySelector('.leader-board').innerHTML+= `<li class="leaderboard-player">${curPlayer.name} - ${curPlayer.score}</li>`
    });

});

socket.on('playerDeath',(data)=>{
     console.log('playerDeath',data);
     document.querySelector("#game-message").innerHTML = `${data.died.name} absorbed by ${data.killedBy.name}`;
     $("#game-message").css({"background-color":"#00e6e6","opacity":"1"});
     $("#game-message").show();
     $("#game-message").fadeOut(5000)
   

});