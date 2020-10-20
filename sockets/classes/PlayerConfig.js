//this is where all the data that no other player needs to know about 

class PlayerConfig{
    constructor(settings){
        this.xVector = 0;
        this.yVector = 0;
        this.spped = settings.defaultSpeed;
        this.zoom = settings.defaultZoom;
    }
}

module.exports = PlayerConfig;