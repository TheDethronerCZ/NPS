/* =========================================================
   CORE ENGINE
========================================================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    initTransitions();
    initAura();
  }
);

/* =========================
   PAGE TRANSITIONS
========================= */

function initTransitions() {

  document
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        e => {

          const href =
            link.getAttribute("href");

          if (!href) return;

          e.preventDefault();

          document.body.animate(
            [
              { opacity: 1 },
              { opacity: 0 }
            ],
            {
              duration: 180,
              fill: "forwards"
            }
          );

          setTimeout(() => {
            window.location.href = href;
          }, 180);
        }
      );
    });
}

/* =========================
   AURA MODE
========================= */

function initAura() {

  const auraBtn =
    document.getElementById(
      "auraToggle"
    );

  if (!auraBtn) return;

  let enabled =
    localStorage.getItem("aura")
    === "true";

  update();

  auraBtn.onclick = () => {

    enabled = !enabled;

    localStorage.setItem(
      "aura",
      enabled
    );

    document.body.classList.toggle(
      "aura-mode",
      enabled
    );

    update();

    window.dispatchEvent(
      new CustomEvent(
        "auraToggle",
        { detail: enabled }
      )
    );
  };

  function update() {

    auraBtn.textContent =
      enabled
        ? "AURA ON"
        : "AURA OFF";

    document.body.classList.toggle(
      "aura-mode",
      enabled
    );
  }
}
