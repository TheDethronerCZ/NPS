
/* =========================================================
   🌅 GLOBAL UI SYSTEM
========================================================= */


/* =========================================================
   AURA MODE
========================================================= */

let auraMode =
  localStorage.getItem(
    "auraMode"
  ) === "true";

const auraBtn =
  document.getElementById(
    "auraToggle"
  );

function updateAuraUI() {

  if (!auraBtn) return;

  auraBtn.textContent =
    auraMode
      ? "AURA: ON"
      : "AURA: OFF";

  auraBtn.classList.toggle(
    "active-toggle",
    auraMode
  );
}

if (auraBtn) {

  updateAuraUI();

  auraBtn.addEventListener(
    "click",

    () => {

      auraMode =
        !auraMode;

      localStorage.setItem(
        "auraMode",
        auraMode
      );

      updateAuraUI();

      window.dispatchEvent(
        new CustomEvent(
          "auraToggle",
          {
            detail: auraMode
          }
        )
      );
    }
  );
}


/* =========================================================
   MUSIC
========================================================= */

const music =
  document.getElementById(
    "bgMusic"
  );

const musicBtn =
  document.getElementById(
    "musicToggle"
  );

let musicEnabled =
  localStorage.getItem(
    "musicEnabled"
  ) === "true";


function updateMusicUI() {

  if (!musicBtn) return;

  musicBtn.textContent =
    musicEnabled
      ? "MUSIC: ON"
      : "MUSIC: OFF";

  musicBtn.classList.toggle(
    "active-toggle",
    musicEnabled
  );
}


if (music) {

  music.volume = 0.4;

  // 🌅 restore time
  const savedTime =
    localStorage.getItem(
      "musicTime"
    );

  if (savedTime) {

    music.currentTime =
      parseFloat(savedTime);
  }

  // 🌅 save playback time
  setInterval(() => {

    localStorage.setItem(
      "musicTime",
      music.currentTime
    );

  }, 1000);
}


if (
  music &&
  musicBtn
) {

  updateMusicUI();

  // 🌅 autoplay if enabled
  if (musicEnabled) {

    music.play()
      .catch(() => {});
  }

  musicBtn.addEventListener(

    "click",

    async () => {

      musicEnabled =
        !musicEnabled;

      localStorage.setItem(
        "musicEnabled",
        musicEnabled
      );

      updateMusicUI();

      if (musicEnabled) {

        try {

          await music.play();

        } catch (err) {

          console.log(err);
        }

      } else {

        music.pause();
      }
    }
  );
}


console.log(
  "🌅 ui.js loaded"
);
