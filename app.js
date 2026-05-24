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
const modal = document.getElementById("demonModal");

const nameEl = document.getElementById("modalName");
const creatorEl = document.getElementById("modalCreator");
const idEl = document.getElementById("modalId");
const diffEl = document.getElementById("modalDifficulty");
const videoEl = document.getElementById("modalVideo");

document.querySelectorAll(".demon-card").forEach(card => {
  card.addEventListener("click", () => {

    nameEl.textContent = card.dataset.name;
    creatorEl.textContent = card.dataset.creator;
    idEl.textContent = card.dataset.id;
    diffEl.textContent = card.dataset.difficulty;

    videoEl.href = card.dataset.video;

    modal.classList.remove("hidden");
  });
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
