
function init(){
    draw();
}


let randomX = Math.floor(500*Math.random()+10);
let randomY = Math.floor(500*Math.random()+10);
console.log('randomX',Math.random())

function draw(){
    context.beginPath();
    context.fillStyle='rgb(255,0,0)';
    context.arc(randomX,randomY,10,0,Math.PI*2);
    context.fill();
    context.lineWith=3;
    context.strokeStyle = 'rgb(0,255,0)';
    context.stroke();
    requrestAnimationFrame(draw);

}

canvas.addEventListener('mousemove',(e)=>{
    console.log('moursemove', e)

    const mousePosition={
        x:e.clientX,
        y:e.clientY
    };

    const angleDeg= Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2))
})