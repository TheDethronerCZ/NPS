const views = ["home", "levels", "demons", "leaderboard"];

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicOn = false;

/* =========================
   VIEW SYSTEM
========================= */

function showView(name) {

  views.forEach(v => {
    document.getElementById(v).classList.remove("active");
  });

  document.getElementById(name).classList.add("active");
}

/* =========================
   BUTTON EVENTS
========================= */

document.getElementById("viewHome")
  .onclick = () => showView("home");

document.getElementById("viewLevels")
  .onclick = () => showView("levels");

document.getElementById("viewDemons")
  .onclick = () => showView("demons");

document.getElementById("viewLeaderboard")
  .onclick = () => showView("leaderboard");

/* =========================
   MUSIC SYSTEM
========================= */

musicBtn.onclick = async () => {

  musicOn = !musicOn;

  if (musicOn) {
    music.volume = 0.4;
    await music.play();
    musicBtn.textContent = "MUSIC ON";
  } else {
    music.pause();
    musicBtn.textContent = "MUSIC OFF";
  }
};

/* =========================
   AUTO START VIEW
========================= */

showView("home");
