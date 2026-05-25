window.addEventListener(
  "DOMContentLoaded",
  () => {

    const music =
      document.getElementById(
        "bgMusic"
      );

    const button =
      document.getElementById(
        "musicToggle"
      );

    if (!music || !button) return;

    let enabled =
      localStorage.getItem("music")
      === "true";

    music.volume = 0.4;

    update();

    button.onclick = async () => {

      enabled = !enabled;

      localStorage.setItem(
        "music",
        enabled
      );

      if (enabled) {
        await music.play();
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
  }
);
