var count = [];
var field = document.getElementById("snow_field");
var ctx = field.getContext('2d')

field.setAttribute('width',window.innerWidth);
field.setAttribute('height',window.innerHeight);

change();

    window.addEventListener('resize', change);
        
function change () {
    field.setAttribute('width',window.innerWidth);
    field.setAttribute('height',window.innerHeight);
    field.style.width = window.innerWidth + "px";
    field.style.height = window.innerHeight + "px";
    count = []
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

class flake {

    constructor () {
            this.x = Math.floor(Math.random() * window.innerWidth);
            this.y = -10;
            this.dy = Math.random() + .3;
            this.color = this.dy - .3;
            //this.dangle = Math.random() / 10;
            //this.angle = Math.random()*1.2*Math.PI;
            this.fillStyle = "rgba( 0 , 0, 0, " + this.color + ")";
        }

    go (z) {
            //this.angle += this.dangle;
            //this.x = this.x + Math.cos(this.angle) * 1.2; 
            this.y += this.dy;
            ctx.fillStyle = this.fillStyle;
            ctx.fillRect(this.x,this.y,3,3);
    }

    kheram(z) {
        if (this.y > window.innerHeight) {
            count.splice(z, 1);
        }
    }

}

count[0] = new flake();
    
    
function lets_go() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if(count.length < window.innerHeight/4) {
        count.push( new flake() );
    }
    for(let z = 0; z < count.length; z++) {
        count[z].go(z);
    }
    for(let z = 0; z < count.length; z++) {
        count[z].kheram(z);
    }
    

    requestAnimationFrame(lets_go);
}

lets_go();
