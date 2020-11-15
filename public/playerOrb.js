 class playerOrb{
    constructor(p){
        this.radius=p.radius;
        this.x = p.locX;
        this.y = p.locY; 
        this.total = 8;
        this.gap=1/this.total;
        this.originPos=[];
        this.pos=[];
        this.color = p.color;

        // for(let i=0;i<this.total; i++){
        //     const pos = this.getCirclePoint(this.radius,this.gap*i);
        //     this.originPos[i] = pos;
        //     this.pos[i] = pos;
        // }
        // this.fps = 500;
        // this.fpsTime = 1000/this.fps;

    }

    draw(ctx,t){

        if(!this.time){
            this.time= t;
        }
        const now = t-this.time;
        if(now <this.fpsTime){
            this.time = t;
            this.updatePoints();
        }
        
        ctx.beginPath();
        let pos = this.pos[0];
        // ctx.moveTo(pos.x+this.x, this.y+pos.y)
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); //this will be replaced
        ctx.lineWith = 10;
        ctx.strokeStyle = 'rgb(0,255,0)';
        ctx.stroke();

        // for(let i =1;i<this.total;i++){
        //     const pos = this.pos[i];
        //     ctx.lineTo(pos.x + this.x, pos.y+this.y);
        // }
        ctx.fill();

        context = canvas.getContext("2d");
        context.font = `${this.radius}px Comic Sans MS`;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('amit', this.x, this.y);
        
    }

    updatePoints(){
        for(let i = 1;i < this.total; i++){

            const pos = this.originPos[i];
            this.pos[i]={
                x:pos.x+this.ranInt(5),
                y:pos.y+this.ranInt(5)
            }
        }
      
    }

    getCirclePoint(radius, t){
        console.log('getCirclePoint',t)
        const theta = Math.PI *2 *t;

        return{
            x:(Math.cos(theta)*radius),
            y:(Math.sin(theta)*radius)
        }
    }

    ranInt(max){
        return Math.random()*max;
    }

    

}
