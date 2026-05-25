/* =========================================================
   🌅 UI SYSTEM 2.0
========================================================= */

function pulse(el) {
  if (!el) return;

  el.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.06)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 200
    }
  );
}

/* =========================
   GLOBAL BUTTON FEEL
========================= */

document.addEventListener("click", (e) => {

  if (e.target.tagName === "BUTTON") {
    pulse(e.target);
  }
});

/* =========================
   PAGE FADE ON NAV
========================= */

document.querySelectorAll("a").forEach(a => {

  a.addEventListener("click", (e) => {

    const href = a.href;

    if (!href.includes("#")) {

      e.preventDefault();

      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = href;
      }, 180);
    }
  });
});

/* =========================
   HOVER SOUND FEEL (optional hook)
========================= */

document.querySelectorAll(".card").forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-4px) scale(1.01)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

/* =========================
   LOG
========================= */

console.log("🌅 UI v2 loaded");
function bindToggles() {

  const auraBtn = document.getElementById("auraToggle");
  const musicBtn = document.getElementById("musicToggle");
  const music = document.getElementById("bgMusic");

  if (!music) return;

  music.volume = 0.4;

  let aura = localStorage.getItem("aura") === "true";
  let musicOn = localStorage.getItem("music") === "true";

  function update() {
    if (auraBtn)
      auraBtn.textContent = aura ? "AURA: ON" : "AURA: OFF";

    if (musicBtn)
      musicBtn.textContent = musicOn ? "MUSIC: ON" : "MUSIC: OFF";
  }

  if (auraBtn) {
    auraBtn.onclick = () => {
      aura = !aura;
      localStorage.setItem("aura", aura);
      window.dispatchEvent(new CustomEvent("auraToggle", { detail: aura }));
      update();
    };
  }

  if (musicBtn) {
    musicBtn.onclick = async () => {
      musicOn = !musicOn;
      localStorage.setItem("music", musicOn);

      if (musicOn) {
        try { await music.play(); } catch {}
      } else {
        music.pause();
      }

      update();
    };
  }

  update();
}

window.addEventListener("load", bindToggles);
document.addEventListener("click", () => {

  const music = document.getElementById("bgMusic");

  if (!music) return;

  if (localStorage.getItem("music") === "true") {
    music.play().catch(() => {});
  }

}, { once: true });
