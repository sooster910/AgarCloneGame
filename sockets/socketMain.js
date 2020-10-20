const io = require('../server').io;

const Orb = require('./classes/Orb');
let orbs = [];
let settings = {
    defaultObs : 500,
    defaultSpeed : 6,
    defaultSize: 6,
    //as player gets bigger, the zoom needs to go out
    //becuase once player gets really big, it's very possible for the orb to take up the whole screen. 
    defaultZoom: 1.5,
    worldWidth:500,
    worldHeight:500
}
initGame()

io.sockets.on('connect', (socket) => {
    //a player has connected
    //make a plyaerConfig object
    let playerConfig = new PlayerConfig(settings );
    //make a playerDataObject
    let playerData = new PlayerData(null, settings);
    //make a master player object to hold both
    let player = new Player(socket.id, playerConfigm, playerData)

    socket.emit('init', {
        orbs
    });
});

// Render other random orbs on the background at the beginning of the game
function initGame() {
    for(let i = 0; i < settings.defaultObs; i++) {
        orbs.push(new Orb())
    }
}

module.exports = io;