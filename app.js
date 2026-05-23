/* =========================
   NAV SYSTEM (GLOBAL)
========================= */
function checkAdmin() {
  const adminBtn = document.getElementById("adminBtn");

  // TEMP SYSTEM (replace later with Supabase)
  const isLoggedInAsAdmin = localStorage.getItem("admin") === "true";

  if (adminBtn && isLoggedInAsAdmin) {
    adminBtn.style.display = "inline-block";
  }
}
window.onload = () => {
  buildBrand();
  buildNav();
  buildLoader();
  checkAdmin();

  const page = document.body.dataset.page;
  if (page) setArt(page);
};
const pages = [
  ["Demons", "demons.html"],
  ["Levels", "levels.html"],
  ["Submit", "submit.html"],
  ["Rate", "rate.html"],
  ["Account", "account.html"],
  ["Admin", "admin.html"]
];

function buildNav() {
  const nav = document.createElement("div");
  nav.className = "nav";

  pages.forEach(p => {
    const a = document.createElement("a");
    a.href = p[1];
    a.textContent = p[0];

    if (p[0] === "Admin") {
      a.classList.add("admin-hover");
    }

    nav.appendChild(a);
  });

  document.body.appendChild(nav);
}


/* =========================
   BRAND
========================= */

function buildBrand() {
  const a = document.createElement("a");
  a.className = "brand";
  a.href = "index.html";
  a.innerHTML = `NPS v<span>SUNSET</span>`;
  document.body.appendChild(a);
}

/* =========================
   LOADER
========================= */

function buildLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";

  loader.innerHTML = `
    <div>Loading page..</div>
    <div class="bar"><div class="bar-fill"></div></div>
  `;

  document.body.appendChild(loader);

  setTimeout(() => {
    const bar = loader.querySelector(".bar-fill");
    bar.style.width = "100%";
  }, 100);

  setTimeout(() => loader.remove(), 1000);
}

/* =========================
   ART SYSTEM
========================= */

function setArt(page) {
  const art = document.createElement("div");
  art.className = "page-art";
  art.style.backgroundImage = `url('assets/art/art-${page}.png')`;
  document.body.appendChild(art);
}

/* =========================
   INIT
========================= */

window.onload = () => {
  buildBrand();
  buildNav();
  buildLoader();

  const page = document.body.dataset.page;
  if (page) setArt(page);
};
/* =========================
   Load only once
========================= */
window.onload = () => {
  buildBrand();
  buildNav();
  buildLoader();

  const page = document.body.dataset.page;
  if (page) setArt(page);
};
/* =========================
    BG Particles
========================= */
function createParticles() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "0";
  canvas.style.pointerEvents = "none";

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: -Math.random() * 0.6 - 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      const gradient = ctx.createLinearGradient(p.x, p.y, p.x + 10, p.y + 10);
      gradient.addColorStop(0, "#ff8a3d");
      gradient.addColorStop(1, "#ffe08a");

      ctx.fillStyle = gradient;

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
  buildBrand();
  buildNav();
  buildLoader();
  checkAdmin();
  createParticles();
};
