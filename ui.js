let auraMode =
  localStorage.getItem("auraMode") === "true";

const auraBtn =
  document.getElementById("auraToggle");

const music =
  document.getElementById("bgMusic");

const musicBtn =
  document.getElementById("musicToggle");

let musicEnabled =
  localStorage.getItem("musicEnabled") === "true";

function updateUI() {

  if (auraBtn) {
    auraBtn.textContent =
      auraMode ? "AURA: ON" : "AURA: OFF";
  }

  if (musicBtn) {
    musicBtn.textContent =
      musicEnabled ? "MUSIC: ON" : "MUSIC: OFF";
  }
}

if (auraBtn) {

  auraBtn.onclick = () => {

    auraMode = !auraMode;

    localStorage.setItem("auraMode", auraMode);

    updateUI();

    window.dispatchEvent(
      new CustomEvent("auraToggle", {
        detail: auraMode
      })
    );
  };
}

if (music) {

  music.volume = 0.4;

  const saved = localStorage.getItem("musicTime");

  if (saved) music.currentTime = parseFloat(saved);

  setInterval(() => {
    localStorage.setItem("musicTime", music.currentTime);
  }, 1000);
}

if (musicBtn && music) {

  musicBtn.onclick = async () => {

    musicEnabled = !musicEnabled;

    localStorage.setItem("musicEnabled", musicEnabled);

    updateUI();

    if (musicEnabled) {
      try {
        await music.play();
      } catch (e) {}
    } else {
      music.pause();
    }
  };
}

updateUI();
