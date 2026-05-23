document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  buildLoader();
  createParticles();
  renderPage();
});
function buildNav() {
  const nav = document.createElement("div");
  nav.className = "nav";

  const pages = [
    ["Demons", "demons.html"],
    ["Levels", "levels.html"],
    ["Submit", "submit.html"],
    ["Rate", "rate.html"],
    ["Account", "account.html"],
    ["Admin", "admin.html"]
  ];

  pages.forEach(p => {
    const a = document.createElement("a");
    a.href = p[1];
    a.textContent = p[0];

    if (p[0] === "Admin") {
      a.classList.add("admin-hover");

      // hide admin if not logged in
      if (localStorage.getItem("admin") !== "true") {
        a.style.display = "none";
      }
    }

    nav.appendChild(a);
  });

  document.body.appendChild(nav);
}

function buildLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";

  loader.innerHTML = `
    <div>Loading page..</div>
    <div class="bar"><div class="bar-fill"></div></div>
  `;

  document.body.appendChild(loader);

  const bar = loader.querySelector(".bar-fill");

  setTimeout(() => bar.style.width = "100%", 100);
  setTimeout(() => loader.remove(), 900);
}

/* PARTICLES (FIXED — ALWAYS WORKS) */
function createParticles() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = "none";

  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: -Math.random() * 0.6 - 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      const grad = ctx.createLinearGradient(p.x, p.y, p.x + 10, p.y + 10);
      grad.addColorStop(0, "#ff8a3d");
      grad.addColorStop(1, "#ffe08a");

      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < 0) {
        p.y = h;
        p.x = Math.random() * w;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

window.onload = () => {
  buildNav();
  buildLoader();
  createParticles();
};
