/* =========================================================
   AUDIO ENGINE
========================================================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    initMusic();
  }
);

function initMusic() {

  const music =
    document.getElementById(
      "bgMusic"
    );

  const button =
    document.getElementById(
      "musicToggle"
    );

  if (!music || !button) return;

  music.volume = 0.45;

  let enabled =
    localStorage.getItem("music")
    === "true";

  update();

  button.onclick = async () => {

    enabled = !enabled;

    localStorage.setItem(
      "music",
      enabled
    );

    if (enabled) {

      try {
        await music.play();
      } catch {}
    }
    else {
      music.pause();
    }

    update();
  };

  function update() {

    button.textContent =
      enabled
        ? "MUSIC ON"
        : "MUSIC OFF";
  }

  document.addEventListener(
    "click",
    async () => {

      if (enabled) {

        try {
          await music.play();
        } catch {}
      }
    },
    { once: true }
  );
}
