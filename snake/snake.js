var field = document.getElementById("snake_field");
var ctx = field.getContext('2d')

field.setAttribute('width',800);
field.setAttribute('height',600);

let e = 0;

document.addEventListener('keydown', function(keypress){
    e =  keypress.keyCode;
    if (e == 40 && direction != -40) {
        direction = 40;
    }
    else if (e == 38 && direction != 40) {
        direction = -40;
    }
    else if (e == 37 && direction != 1){
        direction = -1;
    }
    else if (e == 39 && direction != -1){
        direction = 1;
    }
});

let playground = [];
let direction = 1;
let apple = 0;
let snake_body = [];
let snake = [286,285,284];
let lose_cond = [];
var lose = 0;
var apple_exs = 0;

class cell {
    constructor(cx,cy){
        this.x = cx;
        this.y = cy;
    }
    change_color() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x,this.y,20,20);
    }
    make_apple() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,20,20);
    }
}



function move() {
    let step = snake[0] + direction;
    snake.unshift(step);
    snake.pop();
    for(i=0;i<snake.length;i++){
        playground[snake[i]].change_color();
    }
    if(snake[0] == window.apple){
        snake.push(window.apple);
        place_apple();
    }
    for(i=0;i<lose_cond.length;i++){
        if(snake[0] == lose_cond[i]){
            window.lose = 1;
        }
    }
}

function make_frame(){
    let frame = [];
    for(i=0;i<playground.length;i++){
        if(playground[i].y == 0 || playground[i].y == 580){
            frame.push(i);
            playground[i].change_color();
        }
        else if(playground[i].x == 0 || playground[i].x == 780){
            frame.push(i);
            playground[i].change_color();
        }
    }
    return frame;
}

function make_field(){
    col = field.width/20;
    row = field.height/20;

    let cx = 0;
    let cy = 0;

    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            playground.push(new cell(cx,cy));
            cx += 20;
        }
        cx = 0;
        cy += 20;
    }
} 

function place_apple() {
    window.apple = Math.floor(Math.random() * (1200 - 1)) + 1;
    for(i=0;i<lose_cond.length;i++){
        if(window.apple == lose_cond[i]){
            place_apple();
            return false;
        }
    }
}

function render() {    
    ctx.clearRect(20, 20, 760, 560);
    move();
    snake_body = [];
    lose_cond = [];
    snake_body = snake_body.concat(snake);
    snake_body.shift();
    lose_cond = lose_cond.concat(snake_body);
    lose_cond = lose_cond.concat(make_frame());
    if (window.lose == 1){
        alert('Вы проиграли. Для начала новой игры, обновите страницу')
        return false;
    }
    else if (window.apple_exs == 0) {
        place_apple();
        window.apple_exs = 1;
    }
    playground[window.apple].make_apple();
    setTimeout(render,100);
}

make_field();
make_frame();
render();