let currentSeed;
let cloudX1 = 0;
let cloudShift2 = 0;
let cloudShift_3 = 0;
let boatBobL = 0;
let boatBobR = 0;
let boatDriftL = 0;
let boatDriftR = 0;
let sunPulse = 1;
let sea_blend_factor = 0;

function setup() {
  pixelDensity(1);
  createCanvas(600, 400);
  // 애니메이션이 계속 돌아야 GIF가 잘 찍힘
  reseed();
  colorMode(RGB, 255);
}

function keyPressed() {
  // r 키: 시드 리셋
  if (key === 'r' || key === 'R') {
    reseed();
  }

  // s 키: 5초 동안 GIF 저장
  if (key === 's' || key === 'S') {
    // p5.gif가 제대로 로드되어 있으면 바로 사용 가능
    saveGif('mySketch', 5); // 파일명, 지속 시간(초)
  }
}

function reseed() {
  currentSeed = int(random(1e6) * 1.5);
  randomSeed(currentSeed);
  // 필요하면 noiseSeed도 같이 고정
  // noiseSeed(currentSeed);
}

function draw() {
  let t = millis() / 1000.0;

  cloudX1      = 28 * sin(t * 0.3) + noise(t * 0.5) * 6;
  cloudShift2  = 40 * sin(t * 0.25 + 1.0);
  cloudShift_3 = 35 * cos(t * 0.28 + 2.0);

  boatBobL   = 5 * sin(t * 1.2);
  boatBobR   = 5 * sin(t * 1.2 + PI);
  boatDriftL = 15 * sin(t * 0.15);
  boatDriftR = -15 * sin(t * 0.13);

  sunPulse = 1 + 0.08 * sin(t * 1.1 + 0.5);

  sea_blend_factor = (sin(t * 0.5 + frameCount * 0.01) + 1) / 2;

  drawScene();
}

function drawScene() {
  const SKY_COLOR   = color(180, 220, 255);
  const DARK_SEA    = color(20, 80, 160);
  const LIGHT_SEA   = color(60, 130, 200);
  const SUN_GLOW    = color(255, 200, 60);
  const BOAT_BODY   = color(120, 70, 40);
  const SAIL_CLOTH  = color(250);

  let seaColor = color(
    LIGHT_SEA.levels[0] + (DARK_SEA.levels[0] - LIGHT_SEA.levels[0]) * sea_blend_factor,
    LIGHT_SEA.levels[1] + (DARK_SEA.levels[1] - LIGHT_SEA.levels[1]) * sea_blend_factor,
    LIGHT_SEA.levels[2] + (DARK_SEA.levels[2] - LIGHT_SEA.levels[2]) * sea_blend_factor
  );

  noStroke();
  fill(SKY_COLOR);
  rect(0, 0, width, height * 0.65);
  fill(seaColor);
  rect(0, height * 0.65, width, height * 0.35);

  let sunSize = 70 * sunPulse;
  fill(SUN_GLOW);
  stroke(0);
  ellipse(width * 0.82, height * 0.20, sunSize, sunSize);

  drawCloud(120 + cloudX1, 90, 24);
  drawCloud(260 + cloudShift2, 70, 20);
  drawCloud(420 + cloudShift_3, 110, 26);

  // 왼쪽 배
  push();
  translate(width * 0.3 + boatDriftL, height * 0.58 + boatBobL);
  stroke(0);
  fill(BOAT_BODY);
  rect(-60, 0, 120, 30);
  triangle(60, 0, 60, 30, 85, 15);
  fill(0);
  rect(-2, -90, 4, 90);
  fill(SAIL_CLOTH);
  triangle(2, -90, 2, 0, 80, 0);
  triangle(-2, -60, -2, 0, -50, 0);
  pop();

  // 오른쪽 배
  push();
  translate(width * 0.7 + boatDriftR, height * 0.58 + boatBobR);
  stroke(0);
  fill(BOAT_BODY);
  rect(-50, 0, 100, 26);
  triangle(50, 0, 50, 26, 72, 13);
  fill(0);
  rect(-5, -70, 4, 70);
  fill(SAIL_CLOTH);
  triangle(-1, -70, -1, 0, 70, 0);
  triangle(-5, -45, -5, 0, -40, 0);
  fill(200, 100, 60);
  rect(-15, -20, 12, 20);
  fill(255, 220, 180);
  ellipse(-9, -28, 20, 20);
  pop();
}

function drawCloud(x, y, r) {
  noStroke();
  fill(255);
  ellipse(x, y, r * 2, r * 2);
  ellipse(x + r * 0.9, y + 3, r * 1.5, r * 1.5);
  ellipse(x - r * 0.9, y + 4, r * 1.6, r * 1.6);
}
