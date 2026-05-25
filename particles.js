const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

/* =========================
   STATE
========================= */

let auraMode = false;
let beat = 0;

const particles = [];

const colorsNormal = ["#ff8a3d", "#ffcf6b", "#ff6aa0"];
const colorsAura = ["#ff2e63", "#ff8a3d", "#ffe08a", "#ff4d6d"];

const isMobile = window.innerWidth < 768;

/* =========================
   HELPERS
========================= */

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   PARTICLES
========================= */

function count() {
  return auraMode
    ? (isMobile ? 60 : 130)
    : (isMobile ? 25 : 70);
}

function create() {
  particles.length = 0;

  for (let i = 0; i < count(); i++) {
    particles.push({
      x: rand(0, w),
      y: rand(0, h),
      r: auraMode ? rand(2, 4) : rand(1, 2.5),
      dx: auraMode ? rand(-0.7, 0.7) : rand(-0.3, 0.3),
      dy: auraMode ? rand(-0.7, 0.7) : rand(-0.3, 0.3),
      color: auraMode ? pick(colorsAura) : pick(colorsNormal),
      alpha: rand(0.3, 0.9)
    });
  }
}

create();

/* =========================
   AURA TOGGLE
========================= */

window.addEventListener("auraToggle", (e) => {
  auraMode = e.detail;
  create();
});

/* =========================
   BEAT REACT (simple)
========================= */

const music = document.getElementById("bgMusic");
let audioCtx, analyser, dataArray;

if (music) {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;

    const source = audioCtx.createMediaElementSource(music);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    document.addEventListener("click", () => {
      if (audioCtx.state === "suspended") audioCtx.resume();
    }, { once: true });

  } catch (e) {
    console.log("Audio not available", e);
  }
}

function updateBeat() {
  if (!analyser || music.paused) {
    beat *= 0.9;
    return;
  }

  analyser.getByteFrequencyData(dataArray);

  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }

  beat = sum / 200;
}

/* =========================
   LOOP
========================= */

function draw() {
  ctx.clearRect(0, 0, w, h);

  updateBeat();

  ctx.shadowBlur = auraMode ? 12 + beat * 10 : 5 + beat * 5;
  ctx.shadowColor = "#ff8a3d";

  for (let p of particles) {

    p.x += p.dx * (1 + beat * 0.5);
    p.y += p.dy * (1 + beat * 0.5);

    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.globalAlpha = p.alpha;

    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + beat * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  requestAnimationFrame(draw);
}

draw();
