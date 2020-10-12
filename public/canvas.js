
function init(){
    draw();
}

player.locX = Math.floor(500*Math.random()+10);
player.locY = Math.floor(500*Math.random()+10);
function draw(){
        //FIX:ONE 
   //wipe the entire canvas out     
   //every time we draw new frame, we are going to wipe everything out we start 
   context.clearRect(0,0,canvas.width, canvas.height);

    context.beginPath();
    context.fillStyle='rgb(255,0,0)';
    context.arc(player.locX,player.locY,10,0,Math.PI*2);
    context.fill();
    context.lineWith=3;
    context.strokeStyle = 'rgb(0,255,0)';
    context.stroke();
    //recursivly call function forever every new frame 
    requestAnimationFrame(draw);

}

canvas.addEventListener('mousemove',(e)=>{
    console.log('moursemove', e)
   

    const mousePosition={
        x:e.clientX,
        y:e.clientY
    };

 
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        console.log('mouse is in the lower right quad')
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        console.log('mouse is in the lower left quad')
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        console.log('mouse is in the upper left quad')
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        console.log('mouse is in the upper right quad')
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    speed = 10
    xV = xVector;
    yV = yVector;

    //users trying to go off the page or players tryqing to go off of the grid. 
    if((player.locX < 5 && player.xVector < 0) || (player.locX > 500) && (xV > 0)){
        player.locY -= speed * yV;
    }else if((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)){
        player.locX += speed * xV;
    }else{
        player.locX += speed * xV;
        player.locY -= speed * yV;
    }    
})