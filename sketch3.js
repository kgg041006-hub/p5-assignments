/*
 * Caricature + GIF/PNG Save (no bottom text)
 * - Eyes follow mouse
 * - ENTER: talk (mouth animates)
 * - Click: wink
 * - C: toggle background
 * - S: save PNG (600x400)
 * - s: save 5s GIF (only if saveGif library available)
 */

let talkEndMs = 0;
let nextAutoBlinkMs = 0;
let forceBlink = 0;
let altWinkLeft = true;
let bgMode = 0;
let notice = "";

function setup() {
  pixelDensity(1);
  createCanvas(600, 400);
  textFont('sans-serif');
  scheduleNextBlink();

  if (typeof saveGif !== "function") {
    notice = "GIF 저장 비활성화: Add library에서 'p5.gif' 추가하세요 (s키)";
  } else {
    notice = "PNG: S키, GIF(5s): s키";
  }
}

function scheduleNextBlink(){
  nextAutoBlinkMs = millis() + int(random(900, 2200));
}

function keyPressed(){
  if (key === 'S') saveCanvas('caricature_600x400', 'png');

  if (key === 's') {
    if (typeof saveGif === 'function') {
      saveGif('caricature_5s', 5);
    } else {
      notice = "이 환경엔 saveGif가 없습니다. p5.gif 라이브러리를 추가하세요.";
      console.warn(notice);
    }
  }

  if (key === 'c' || key === 'C') bgMode = 1 - bgMode;
  if (keyCode === ENTER) talkEndMs = millis() + 1500;
}

function mousePressed(){
  forceBlink = altWinkLeft ? 1 : 2;
  altWinkLeft = !altWinkLeft;
}

function draw() {
  background(bgMode ? color(210,230,255) : 230);
  const now = millis();

  let blinkLeft=false, blinkRight=false;
  if (now >= nextAutoBlinkMs) { blinkLeft = blinkRight = true; scheduleNextBlink(); }
  if (forceBlink===1) blinkLeft = true;
  if (forceBlink===2) blinkRight = true;
  if (forceBlink===3) blinkLeft = blinkRight = true;

  const headBob = sin(now*0.006) * 3;
  const earringSwing = radians(8) * sin(now*0.012);

  push();
  translate(width/2, height/2 + 22 + headBob);

  const SKIN  = color(255,220,190);
  const HAIR  = color(80,50,35);
  const LIP   = color(205,60,95);
  const SHIRT = color(160,55,55);
  const GOLD  = color(230,190,60);

  noStroke();
  fill(SHIRT); rect(-110,115,220,70,30);
  fill(HAIR); ellipse(0,15,280,350);

  const EAR_X=86, EAR_Y=-6, EAR_W=26, EAR_H=36;
  fill(SKIN);
  ellipse(-EAR_X, EAR_Y, EAR_W, EAR_H);
  ellipse( EAR_X, EAR_Y, EAR_W, EAR_H);

  push(); translate(-EAR_X, EAR_Y+EAR_H/2+6); rotate(earringSwing*0.15); fill(GOLD); circle(0,0,10); pop();
  push(); translate( EAR_X, EAR_Y+EAR_H/2+6); rotate(-earringSwing*0.15); fill(GOLD); circle(0,0,10); pop();

  fill(SKIN); ellipse(0,-6,165,205);
  fill(SKIN); rect(-20,85,40,40,10);

  noFill(); stroke(30); strokeWeight(4);
  arc(-38,-52,50,18,PI+0.3,TWO_PI-0.3);
  arc( 38,-52,50,18,PI+0.3,TWO_PI-0.3);

  noStroke(); fill(255);
  ellipse(-38,-30,40,26);
  ellipse( 38,-30,40,26);

  const toLocalX = mouseX - width/2;
  const toLocalY = mouseY - (height/2 + 22 + headBob);
  const gazeScale = 0.03;
  const maxOff = 8;
  let lx = -38 + constrain(toLocalX*gazeScale, -maxOff, maxOff);
  let ly = -30 + constrain(toLocalY*gazeScale, -maxOff, maxOff);
  let rx =  38 + constrain(toLocalX*gazeScale, -maxOff, maxOff);
  let ry = -30 + constrain(toLocalY*gazeScale, -maxOff, maxOff);
  fill(0);
  ellipse(lx, ly, 20, 20);
  ellipse(rx, ry, 20, 20);
  fill(255);
  ellipse(lx+8, ly-6, 7, 7);
  ellipse(rx+8, ry-6, 7, 7);

  noStroke(); fill(SKIN);
  if (blinkLeft)  rect(-58,-43,40,28,8);
  if (blinkRight) rect( 18,-43,40,28,8);

  stroke(0); strokeWeight(2);
  if (!blinkLeft) { line(-48,-38,-56,-48); line(-38,-40,-38,-50); line(-28,-38,-20,-48); }
  if (!blinkRight){ line( 28,-38, 20,-48); line( 38,-40, 38,-50); line( 48,-38, 56,-48); }

  stroke(125); strokeWeight(2); line(0,-10,0,16);

  const talking = millis() < talkEndMs;
  const mouthDY = talking ? 6 * abs(sin(millis()*0.04)) : 0;
  noStroke(); fill(LIP);
  arc(0, 46, 60, 26 + mouthDY, 0, PI, CHORD);

  pop();
  forceBlink = 0;
}
