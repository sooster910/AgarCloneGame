
player.locX = Math.floor(500*Math.random()+10);
player.locY = Math.floor(500*Math.random()+10);

function draw(t){


   //reset the translation back to defualt;
    context.setTransform(1,0,0,1,0,0);

    //FIX:ONE 
    //wipe the entire canvas out     
    //every time we draw new frame, we are going to wipe everything out we start 
    //clear the screen out so the old stuff is gone from the last frame. 
   context.clearRect(0,0,canvas.width, canvas.height);

    //calmp the camera to the player
    const camX = -player.locX + canvas.width/2;
    const camY = -player.locY + canvas.height/2;

    //translate allows us to move the canvas around
    context.translate(camX, camY);
    
    //draw all player
    players.forEach((p)=>{
            console.log('p',p);
            const playerOrbObj = new playerOrb(p); 
            console.log('playerOrb',playerOrbObj)
            playerOrbObj.draw(context, t) 
        // context.beginPath();
        // context.fillStyle=p.color;

        // context.arc(p.locX,p.locY,p.radius,0,Math.PI*2); //this will be replaced
     
        // context.fill();
        // context.lineWith=3;
        // context.strokeStyle = 'rgb(0,255,0)';
        // context.stroke();
        // context = canvas.getContext("2d");
        // context.font = `${p.radius}px Comic Sans MS`;
        // context.fillStyle = 'white';
        // context.textAlign = 'center';
        // context.fillText('amit', p.locX, p.locY,);
    })

    //draw all orbs
    orbs.forEach((orb)=>{
        context.beginPath();
        context.fillStyle = orb.color;
        context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI*2);
        context.fill();
   });
    //recursivly call function forever every new frame 
    requestAnimationFrame(draw);

}

canvas.addEventListener('mousemove',(e)=>{
   
    const mousePosition={
        x:e.clientX,
        y:e.clientY
    };

    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
  
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
      
    }else if(angleDeg >= 90 && angleDeg <= 180){
        console.log('mouse is in the lower left quad')
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
      
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
    
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }
    
    player.xVector = xVector;
    player.yVector = yVector;
    
  
});


