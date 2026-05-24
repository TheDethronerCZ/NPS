const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: Math.random() * 3 + 1,
    v: Math.random() * 1 + 0.3
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    ctx.fillStyle = "#ffb36b";
    ctx.fillRect(p.x, p.y, p.s, p.s);

    p.y -= p.v;

    if (p.y < 0) p.y = canvas.height;
  }

  requestAnimationFrame(draw);
}

draw();
