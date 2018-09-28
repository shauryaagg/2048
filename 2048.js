let ar, width = 400, score = 0;
function initRandom(){
  let options = [];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(ar[i][j] === 0){
        options.push({x: i, y: j});
      }
    }
  }
  if(options.length > 0){
    let opt = random(options);
    ar[opt.x][opt.y] = random(1) > 0.5 ? 4 : 2;
  }
}
function drawGrid(){
  let w = width / 4;
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i*w, j*w, w, w);
      if(ar[i][j] !== 0){
        textAlign(CENTER,CENTER);
        let size = [64, 64, 50, 40];
        let txt = "" + ar[i][j];
        textSize(size[txt.length - 1]);
        fill(0);
        noStroke();
        text(ar[i][j], i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
function isGameOver(){
  let dx = [1, -1, 0, 0];
  let dy = [0, 0, 1, -1];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(ar[i][j] === 0){
        return false;
      }
      let changeX = i + dx[i], changeY = j + dy[i];
      if(changeX < 4 && changeX >= 0 && changeY < 4 && changeY >= 0 && ar[changeX][changeY] === ar[i][j]){
        return false;
      }
    }
  }
  return true;
}
function swipe(){
  let right;
  for(let i = 0; i < 4; i++){
    right = 0;
    for(let j = 3; j >= 0; j--){
      if(ar[i][j] !== 0){
        ar[i][3 - right] = ar[i][j];
        if(3 - right++ !== j)
          ar[i][j] = 0;
      }
    }
    for(let j = 3; j > 0; j--){
      if(ar[i][j] !== 0 && ar[i][j] === ar[i][j-1]){
        ar[i][j] = 2 * ar[i][j];
        score += ar[i][j];
        ar[i][j-1] = 0;
      }
    }
    right = 0;
    for(let j = 3; j >= 0; j--){
      if(ar[i][j] !== 0){
        ar[i][3 - right] = ar[i][j];
        if(3 - right++ !== j)
          ar[i][j] = 0;
      }
    }
  }
}
function transpose(){
  let grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      grid[i][j] = ar[j][i];
    }
  }
  return grid;
}
function flip(){
  for(let i = 0; i < 4; i++){
    ar[i].reverse();
  }
}
function keyPressed(){
  if(keyCode == DOWN_ARROW){
    swipe();
    initRandom();
  }
  else if(keyCode == UP_ARROW){
    flip();
    swipe();
    flip();
    initRandom();
  }
  else if(keyCode == RIGHT_ARROW){
    ar = transpose();
    swipe();
    ar = transpose();
    initRandom();
  }
  else if(keyCode == LEFT_ARROW){
    ar = transpose();
    flip();
    swipe();
    flip();
    ar = transpose();
    initRandom();
  }
  if(isGameOver()){
    console.log("GAME OVER");
    score = 0;
    setup();
  }
}
function setup(){
  createCanvas(450, 450);
  ar = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  initRandom();
  initRandom();
//  player();
  //keyPressed();
}
function draw(){
  background(255);
  drawGrid();
  select('#score').html(score);
}
