let vibeMode = false;
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
function getParticleCount() {
  if (vibeMode) return isMobile ? 60 : 140;
  return isMobile ? 25 : 80;
}
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

draw(){
  if (vibeMode) {
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#ff8a3d";
} else {
  ctx.shadowBlur = 0;
}

};
function createParticles() {

  particles.length = 0;

  const count = getParticleCount();

  for (let i = 0; i < count; i++) {

    particles.push({
      x: rand(0, w),
      y: rand(0, h),

      r: vibeMode
        ? rand(2, isMobile ? 3 : 4)
        : rand(1, isMobile ? 2 : 3),

      dx: vibeMode
        ? rand(-0.8, 0.8)
        : rand(-0.3, 0.3),

      dy: vibeMode
        ? rand(-0.6, 0.6)
        : rand(-0.2, 0.2),

      color: vibeMode
        ? ["#ff4d6d", "#ff8a3d", "#ffe08a", "#ff2e63"][Math.floor(Math.random() * 4)]
        : ["#ff8a3d", "#ffb35c", "#ffe08a", "#ff6aa0"][Math.floor(Math.random() * 4)],

      alpha: vibeMode
        ? rand(0.6, 1)
        : rand(0.3, 0.8)
    });
  }
}
createParticles();
