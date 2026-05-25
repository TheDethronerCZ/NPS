const views = ["home", "levels", "demons", "leaderboard"];

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const flash = document.getElementById("transitionLayer");

let musicOn = false;

/* =========================
   GD STYLE VIEW SWITCH
========================= */

function showView(name) {

  if (!views.includes(name)) return;

  // flash effect (GD transition feel)
  flash.classList.add("active");

  setTimeout(() => {
    flash.classList.remove("active");
  }, 300);

  // switch views
  views.forEach(v => {
    const el = document.getElementById(v);

    el.classList.remove("active");
  });

  const target =
    document.getElementById(name);

  target.classList.add("active");

  // camera micro-zoom feel
  document.body.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.01)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 250,
      easing: "ease-out"
    }
  );
}

/* =========================
   BUTTONS
========================= */

document.getElementById("viewHome").onclick =
  () => showView("home");

document.getElementById("viewLevels").onclick =
  () => showView("levels");

document.getElementById("viewDemons").onclick =
  () => showView("demons");

document.getElementById("viewLeaderboard").onclick =
  () => showView("leaderboard");

/* =========================
   MUSIC SYSTEM
========================= */

musicBtn.onclick = async () => {

  musicOn = !musicOn;

  if (musicOn) {
    music.volume = 0.45;
    await music.play();
    musicBtn.textContent = "MUSIC ON";
  } else {
    music.pause();
    musicBtn.textContent = "MUSIC OFF";
  }
};

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
