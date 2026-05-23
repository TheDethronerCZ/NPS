/* =========================
   NAV SYSTEM (GLOBAL)
========================= */

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
