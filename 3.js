var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var size = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -8;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 7;
var brickColumnCount = 4;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var points = 33;
var chances = 3;

var bricks = [];
for(var c = 0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r = 0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}
function collisionDetection() {
  for(var c = 0; c<brickColumnCount; c++) {
    for(var r = 0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          points++;
          if(points == brickRowCount*brickColumnCount) {
            alert("Congrats, You finished Level 3!");
            window.location.replace("4.html"); 
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI*2);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(var c = 0; c<brickColumnCount; c++) 
  {
    for(var r = 0; r<brickRowCount; r++) 
    {
      if(bricks[c][r].status == 1) 
      {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#808080";
          ctx.fill();
          ctx.closePath();
        
        
      }
    }
  }
}
function drawPoints() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Points: "+points, 8, 20);
}
function drawChances() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Chances: "+chances, canvas.width-100, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawPoints();
  drawChances();
  collisionDetection();

  if(x + dx > canvas.width-size || x + dx < size) {
    dx = -dx;
  }
  if(y + dy < size) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-size) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      chances--;
      if(!chances) {
        alert("You lost, Press Ok to try again!");
        document.location.replace("endgame.html");
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
