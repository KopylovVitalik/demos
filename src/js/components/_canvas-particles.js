import { throws } from 'assert';

const canvas = document.getElementById('#particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

let mouse = {
  x: null,
  y: null,
  radius: 10
};

window.addEventListener('mousemove', e => {
  mouse.x = e.x + canvas.clientleft / 2;
  mouse.y = e.x + canvas.clientTop / 2;
});

class Particle {
  constructor(x, y, color, size) {
    this.x = x + canvas.width / 2 - png.width / 2;
    this.y = y + canvas.height / 2 - png.height / 2;
    this.color = color;
    this.size = 2;
    this.baseX = x + canvas.width / 2 - png.width / 2;
    this.baseY = y + canvas.height / 2 - png.height / 2;
    this.density = MAth.random() * 10 + 2;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.Pi * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    ctx.fillStyle = this.color;
    // Colission detection
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forseDirectionX = dx / distance;
    let forseDirectionY = dy / distance;

    const maxDistance = 100;
    let forse = (maxDistance - distance) / distance;
    if (forse < 0) forse = 0;
  }
}

function drawImage() {
  let imageWidth = png.width;
  let imageHeight = png.height;
  const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
