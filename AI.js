let dp = [];
function toBin(dec){
  if(dec === 0) return 0;
  return (dec % 2) + toBin(Math.floor(dec / 2));
}
function move(x){
  if(x === 1){
    ar = transpose();
    swipe();
    ar = transpose();
    initRandom();
  }
  else if(x === 2){
    ar = transpose();
    flip();
    swipe();
    flip();
    ar = transpose();
    initRandom();
  }
  else if(x === 3){
    flip();
    swipe();
    flip();
    initRandom();
  }
  else{
    swipe();
    initRandom();
  }
}
function player(){
  let bitmap = 0;
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(ar[i][j] === 0)
        bitmap *= 16;
      else
        bitmap = bitmap * 16 + Math.log2(ar[i][j]);
    }
  }
  let past = ar;
  console.table(ar);
  console.log(toBin(bitmap));
}
