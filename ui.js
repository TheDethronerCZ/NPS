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
