const io = require('../server').io;
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');
const Player = require('./classes/Player');
const Orb = require('./classes/Orb');
const {checkForOrbCollisions,checkForPlayerCollisions}= require('./checkCollisions')



let orbs = [];
let players= [];
let settings = {
    defaultObs : 5000,
    defaultSpeed : 6,
    defaultSize: 6,
    //as player gets bigger, the zoom needs to go out
    //becuase once player gets really big, it's very possible for the orb to take up the whole screen. 
    defaultZoom: 1.5,
    worldWidth:5000,
    worldHeight:5000
}
initGame();

setInterval(() => {

    if(players.length>0){
      io.to('game').emit('tock', {
        players,
      });
    }
  }, 33)
io.on('connection', (socket) => {
    let player;
    //a player has connected
    // Instead of immediately kicking off emitting orbs object first,
    // we listen for init form client side
    console.log('server socket connected')
    socket.on('init',(data)=>{
        console.log('init on',data)
        console.log('init on ')
        //add the player to the game namespace
        socket.join('game');
    //make a plyaerConfig object
        let playerConfig = new PlayerConfig(settings);
        //make a playerDataObject
        let playerData = new PlayerData(data.playerName, settings);
        //make a master player object to hold both
        player = new Player(socket.id, playerConfig, playerData);

        console.log('player',player)
        player.tickSent = false;
       
        //게임 시작하자 마자
        setInterval(() => {

            // if(player.tickSent){
              socket.emit('tickTock', {
                playerX: player.playerData.locX,
                playerY: player.playerData.locY,
              });
            //}
          }, 33)

        socket.emit('initReturn', {
            orbs
        });
        players.push(playerData);
    });

    //the server sent over the tick, that means we know what direction to move the socket
 
        socket.on('tick', (data) => {
            console.log('tick data', data.xVector )
            if (data.xVector || data.yVector) { //this is important
                console.log('yes you have xVector')
                speed = player&& player.playerConfig &&player.playerConfig.speed
              let xV = player.playerConfig.xVector = data.xVector
              let yV = player.playerConfig.yVector = data.yVector
         
              if((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > settings.worldWidth) && (xV > 0)){
                  player.playerData.locY -= speed * yV
              }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > settings.worldHeight) && (yV < 0)){
                  player.playerData.locX += speed * xV
              }else{
                  player.playerData.locX += speed * xV
                  player.playerData.locY -= speed * yV
              } 
              
              let capturedOrb = checkForOrbCollisions(player.playerData, player.playerConfig, orbs, settings)
              capturedOrb.then((data)=>{
                    const orbData = {
                        orbIndex : data,
                        newOrb:orbs[data],
                    }
                    //update updateleaderBoard
                    socket.emit('updateleaderBoard',updateleaderBoard());
                    //emit to all sockets the orb to replace
                    socket.emit('orbCollision',orbData )
                    console.log('collision');
              }).catch((err) => {
                console.log('no collision',err)
              })

              //check player collision
              let playerDeath = checkForPlayerCollisions(player.playerData, player.playerConfig,players,player.socketId);
              playerDeath.then((data)=>{

                    console.log('player collisionn')
                    socket.emit('updateleaderBoard',updateleaderBoard());

              }).catch((err)=>{
                    console.log('err',err);
              });
            }
          });

        });

// Render other random orbs on the background at the beginning of the game
function initGame() {
    for(let i = 0; i < settings.defaultObs; i++) {
        orbs.push(new Orb(settings))
    }

}

function updateleaderBoard(){
  //sort player descending order
  players.sort((a,b)=>{
    return b.score- a.score
  });

  let scoreBoard = players.map((curPlayer)=>{
    return{
      name:curPlayer.name,
      score: curPlayer.score
    }
  })
  return scoreBoard;
}
module.exports = io