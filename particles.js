const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


// detect mobile (important for performance)
const isMobile = window.innerWidth < 768;

// fewer particles on mobile = HUGE performance boost
const PARTICLE_COUNT = isMobile ? 25 : 80;

const particles = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// sunset palette
const colors = [
  "#ff8a3d",
  "#ffb35c",
  "#ffe08a",
  "#ff6aa0"
];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: rand(0, w),
    y: rand(0, h),
    r: rand(1, isMobile ? 2 : 3),
    dx: rand(-0.3, 0.3),
    dy: rand(-0.2, 0.2),
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: rand(0.3, 0.8)
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (let p of particles) {

    p.x += p.dx;
    p.y += p.dy;

    // wrap around screen
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

draw();
