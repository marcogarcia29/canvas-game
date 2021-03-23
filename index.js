var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
this.canvas.width = 400;
this.canvas.height = 400;

var keys = {};

window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    e.preventDefault();
});

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
});

function Circle(options) {
    this.x = options.x || 40;
    this.y = options.y || 50;
    this.r = options.r || 5;
    this.sA = options.sA || 0;
    this.eA = options.eA || 2;
    this.color = options.color || '#000000';
    this.vx = options.vx || 5;
    this.vy = options.vy || 0;
    this.gravity = options.gravity || 5;
    this.gravitySpeed = options.gravitySpeed || 0;
    this.direction = options.direction || 'right';
}

function Box(options) {
    this.x = options.x || 10;
    this.y = options.y || 20;
    this.width = options.width || 30;
    this.height = options.height || 50;
    this.color = options.color || '#ee3344';
}

var player = new Circle({
    x: 40,
    y: 50,
    r: 15,
    sA: 0,
    eA: 2,
    color: 'black',
    gravity: 2,
    vx: 2,
    vy: 4
});

var ground = new Box ({
    x: 70,
    y: 270,
    width: 70,
    height: 10,
    color: 'black',
});

function input(player) {
    if (37 in keys) {
    if (player.x - player.r - player.vx >= 0) {
        player.x -= player.vx;
    }
    player.direction = 'left';
    }
    if (39 in keys) {
    if (player.x + player.r + player.vx <= canvas.width){
        player.x += player.vx;
    }
    player.direction = 'right';
    }
    if (38 in keys) {
    if (player.y - player.r - player.vy >= 0){
        player.y -= player.vy;
    }
    player.direction = 'up';
    }
    if (40 in keys) {
    if (player.y + player.r + player.vy <= canvas.height){
        player.y += player.vy;
    }
    player.direction = 'down';
    }
}

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, circle.sA, circle.eA * Math.PI)
    ctx.strokeStyle = circle.color;
    ctx.stroke();
}

function drawBox(ground){
    ctx.fillStyle = ground.color;
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

function block() {
    if (player.y + player.r > ground.y && player.y + player.r < ground.y + ground.height && player.x + player.r <= ground.x + ground.width + 25 && player.x + player.r > ground.x ){
        player.y == ground.y;
    }else {
        falling();
    }
}

function falling() {
    if (player.y + player.r < canvas.width){
        player.y += player.gravity;
    }
}


function update(){
    input(player);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    block();
    drawCircle(player);
    drawBox(ground);
    
}
                                                        
function loop(){
    update();
    draw();
    window.requestAnimationFrame(loop);
}
loop();