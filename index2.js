/*
 * Caricature (p5.js)
 * - Exact 600x400 PNG export (handles HiDPI & download blocks)
 */

let savedOnce = false;

function setup() {
  // HiDPI에서도 600x400 그대로 저장되도록
  pixelDensity(1);                 // ← createCanvas 전에 호출
  createCanvas(600, 400);
  noLoop();

  // 브라우저가 자동 다운로드를 막을 때 대비용 버튼
  const btn = createButton('PNG 저장');
  btn.mousePressed(() => saveCanvas('caricature_600x400', 'png'));

  // 자동 저장: 렌더 완료 직후 약간 딜레이 후 1회 저장
  // (일부 환경에서 draw 완료 전 저장되는 문제 방지)
  setTimeout(() => {
    if (!savedOnce) {
      savedOnce = true;
      saveCanvas('caricature_600x400', 'png');
    }
  }, 100);
}

function keyPressed(){
  // 수동 저장 단축키 (S)
  if (key === 's' || key === 'S') saveCanvas('caricature_600x400', 'png');
}

function draw() {
  background(230);

  // === 색상 팔레트 ===
  const SKIN  = color(255, 220, 190);
  const HAIR  = color(80, 50, 35);   // 어두운 갈색
  const LIP   = color(205, 60, 95);
  const BLUSH = color(255, 150, 150, 190);
  const SHIRT = color(160, 55, 55);
  const GOLD  = color(230, 190, 60); // 귀걸이 색

  translate(width / 2, height / 2 + 22);
  noStroke();

  // === 머리 ===
  fill(HAIR);
  ellipse(0, 15, 280, 350);

  // === 귀 ===
  const EAR_X = 86, EAR_Y = -6, EAR_W = 26, EAR_H = 36;
  fill(SKIN);
  ellipse(-EAR_X, EAR_Y, EAR_W, EAR_H);
  ellipse( EAR_X, EAR_Y, EAR_W, EAR_H);

  // === 귀걸이 (작은 스터드) ===
  const LOBE_Y = EAR_Y + EAR_H / 2 + 6;
  noStroke();
  fill(GOLD);
  circle(-EAR_X, LOBE_Y, 10);
  circle( EAR_X, LOBE_Y, 10);

  // === 얼굴 ===
  fill(SKIN);
  ellipse(0, -6, 165, 205);

  // === 목 ===
  const NECK_W = 40, NECK_H = 40;
  fill(SKIN);
  rect(-NECK_W / 2, 85, NECK_W, NECK_H, 10);

  // === 상체 ===
  fill(SHIRT);
  rect(-110, 115, 220, 70, 30);

  // === 얼굴 특징 ===
  // 눈썹
  noFill(); stroke(30); strokeWeight(4);
  arc(-38, -52, 50, 18, PI + 0.3, TWO_PI - 0.3);
  arc( 38, -52, 50, 18, PI + 0.3, TWO_PI - 0.3);

  // 눈
  noStroke(); fill(255);
  ellipse(-38, -30, 40, 26);
  ellipse( 38, -30, 40, 26);

  // 눈동자 + 하이라이트
  fill(0);
  ellipse(-38, -30, 20, 20);
  ellipse( 38, -30, 20, 20);
  fill(255);
  ellipse(-30, -36, 7, 7);
  ellipse(46, -36, 7, 7);

  // 속눈썹
  stroke(0); strokeWeight(2);
  line(-48, -38, -56, -48);
  line(-38, -40, -38, -50);
  line(-28, -38, -20, -48);
  line( 28, -38,  20, -48);
  line( 38, -40,  38, -50);
  line( 48, -38,  56, -48);

  // 코
  stroke(125); strokeWeight(2);
  line(0, -10, 0, 16);

  // 입
  noStroke(); fill(LIP);
  arc(0, 46, 60, 26, 0, PI, CHORD);

  // 볼터치
  fill(BLUSH);
  ellipse(-60, 4, 20, 14);
  ellipse( 60, 4, 20, 14);
}
