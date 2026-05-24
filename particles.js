const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];

for (let i = 0; i < 120; i++) {

  particles.push({

    x: Math.random() * canvas.width,

    y: Math.random() * canvas.height,

    size: Math.random() * 3 + 1,

    speed: Math.random() * 0.7 + 0.2,

    life: Math.random()
  });
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {

    p.y -= p.speed;

    if (p.y < -10) {

      p.y = canvas.height + 10;
      p.x = Math.random() * canvas.width;
    }

    p.life += 0.002;

    if (p.life > 1) p.life = 0;

    // yellow -> pink transition
    const r = 255;
    const g = Math.floor(220 - (120 * p.life));
    const b = Math.floor(120 + (80 * p.life));

    ctx.fillStyle =
      `rgb(${r}, ${g}, ${b})`;

    ctx.fillRect(
      p.x,
      p.y,
      p.size,
      p.size
    );
  });

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", () => {

  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
