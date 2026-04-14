let bg;
let catImg;

let cats = [];

function preload() {
  bg = loadImage("1103.png");          // 背景
  catImg = loadImage("1000042900.png"); // 三隻貓共用
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();

  // ⭐ 位置微調（配合放大）
  cats.push(new Cat(width * 0.35, height * 0.68, "w1", "w1/index.html"));
  cats.push(new Cat(width * 0.5, height * 0.68, "w2", "w2/index.html"));
  cats.push(new Cat(width * 0.65, height * 0.56, "w3", "w3/index.html"));
}

function draw() {
  image(bg, 0, 0, width, height);

  cats.forEach(cat => {
    cat.update();
    cat.display();
  });
}

// 🐱 貓類
class Cat {
  constructor(x, y, label, link) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;

    this.label = label;
    this.link = link;

    this.t = random(1000);
  }

  update() {
    this.t += 0.02;

    // 🌊 漂浮（自然感）
    this.x = this.baseX + sin(this.t * 2) * 10;
    this.y = this.baseY + cos(this.t * 2) * 6;
  }

  display() {
    push();
    imageMode(CENTER);

    // 🐱 放大3倍（重點）
    image(catImg, this.x, this.y, 210, 150);

    // 🏷 臉上文字
    drawPixelText(this.label, this.x, this.y);

    pop();
  }

  isHovered() {
    return dist(mouseX, mouseY, this.x, this.y) < 100; // 配合放大
  }

  clicked() {
    if (this.isHovered()) {
      window.location.href = this.link;
    }
  }
}

// 🔤 像素文字
function drawPixelText(txt, x, y) {
  textAlign(CENTER, CENTER);
  textSize(16);
  textFont('monospace');

  // 陰影
  fill(0, 150);
  text(txt, x + 2, y + 2);

  // 主文字
  fill(255);
  text(txt, x, y);
}

// 🖱 點擊事件
function mousePressed() {
  cats.forEach(cat => cat.clicked());
}

// 視窗調整
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
