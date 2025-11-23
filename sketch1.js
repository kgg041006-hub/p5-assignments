/*
 * Simple Seascape Scene (p5.js)
 * 도형: rect(), ellipse(), triangle()
 * 키: R = 재생성, S = PNG 저장
 */

let seed;
let saveBtn; // 저장 버튼

function setup() {
  pixelDensity(1);   // 저장 PNG 크기를 600x400으로 고정
  createCanvas(600, 400);
  noLoop();
  reseed();

  // 저장 버튼 추가 (키보드 S와 동일 동작)
  saveBtn = createButton('PNG 저장');
  saveBtn.position(10, 10);          
  saveBtn.mousePressed(() => saveCanvas('20231207_김기경_과제1','png'));
  saveBtn.style('padding','6px 10px');
  saveBtn.style('font-size','14px');
}

function keyPressed(){
  if(key==='r' || key==='R') reseed();
  if(key==='s' || key==='S') saveCanvas('20231207_김기경_과제1','png');
}

function reseed(){
  seed = int(random(1e6));
  randomSeed(seed);
  drawScene();
}

function drawScene(){
  // 색 팔레트
  const SKY   = color(180, 220, 255);
  const SEA   = color(60, 130, 200);
  const SUN   = color(255, 200, 60);
  const BOAT  = color(120, 70, 40);
  const SAIL  = color(250);

  // 1) 배경: 하늘과 바다
  noStroke();
  fill(SKY); rect(0, 0, width, height*0.65);
  fill(SEA); rect(0, height*0.65, width, height*0.35);

  // 2) 해(원)
  fill(SUN); stroke(0); 
  ellipse(width*0.82, height*0.20, 70, 70);

  // 3) 구름(원 3개씩)
  drawCloud(120, 90, 24);
  drawCloud(260, 70, 20);
  drawCloud(420, 110, 26);

  // 4) 왼쪽 돛단배
  push();
  translate(width*0.3, height*0.58);
  stroke(0); 
  fill(BOAT);
  rect(-60, 0, 120, 30);
  triangle(60, 0, 60, 30, 85, 15);
  fill(0);
  rect(-2, -90, 4, 90);
  fill(SAIL);
  triangle(2, -90, 2, 0, 80, 0);
  triangle(-2, -60, -2, 0, -50, 0);
  pop();

  // 4-2) 오른쪽 배 + 사람
  push();
  translate(width*0.7, height*0.58);
  stroke(0);
  fill(BOAT);
  rect(-50, 0, 100, 26);
  triangle(50, 0, 50, 26, 72, 13);
  fill(0);
  rect(-2, -70, 4, 70);   // 돛대
  fill(SAIL);
  triangle(2, -70, 2, 0, 70, 0);   // 돛
  triangle(-2, -45, -2, 0, -40, 0);

  // 사람 (단순 도형)
  fill(200,100,60);       // 몸
  rect(-15, -20, 12, 20);
  fill(255,220,180);      // 머리
  ellipse(-9, -28, 20, 20);
  pop();

  // 5) 외곽 프레임
  noFill(); stroke(0);
  rect(6, 6, width-12, height-12, 8);
}

// 구름: 원 3개
function drawCloud(x, y, r){
  noStroke(); fill(255);
  ellipse(x, y, r*2, r*2);
  ellipse(x+r*0.9, y+3, r*1.5, r*1.5);
  ellipse(x-r*0.9, y+4, r*1.6, r*1.6);
}
