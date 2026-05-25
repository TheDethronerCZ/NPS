/* =========================================================
   🌅 NPS vSUNSET — PARTICLES.JS
   Beat Reactive + Mobile Optimized
========================================================= */


/* =========================================================
   CANVAS
========================================================= */

const canvas =
  document.getElementById("bg");

const ctx =
  canvas.getContext("2d");

let w;
let h;

function resizeCanvas() {

  w =
    canvas.width =
    window.innerWidth;

  h =
    canvas.height =
    window.innerHeight;
}

window.addEventListener(
  "resize",
  resizeCanvas
);

resizeCanvas();


/* =========================================================
   MOBILE DETECTION
========================================================= */

const isMobile =
  window.innerWidth < 768;


/* =========================================================
   PARTICLES
========================================================= */

const particles = [];

let ldmEnabled = false;

let beatPulse = 0;


/* =========================================================
   HELPERS
========================================================= */

function rand(min, max) {

  return (
    Math.random() *
    (max - min) +
    min
  );
}

function pick(arr) {

  return arr[
    Math.floor(
      Math.random() *
      arr.length
    )
  ];
}


/* =========================================================
   COLORS
========================================================= */

const normalColors = [

  "#ff8a3d",
  "#ffb35c",
  "#ffe08a",
  "#ff6aa0"
];

const ldmColors = [

  "#ff2e63",
  "#ff8a3d",
  "#ffe08a",
  "#ff4d6d",
  "#ff00aa"
];


/* =========================================================
   PARTICLE CREATION
========================================================= */

function getParticleCount() {

  if (ldmEnabled) {

    return isMobile
      ? 55
      : 140;
  }

  return isMobile
    ? 28
    : 80;
}


function createParticles() {

  particles.length = 0;

  const count =
    getParticleCount();

  for (
    let i = 0;
    i < count;
    i++
  ) {

    particles.push({

      x: rand(0, w),

      y: rand(0, h),

      r: ldmEnabled
        ? rand(1.5, 4)
        : rand(1, 3),

      dx: ldmEnabled
        ? rand(-0.8, 0.8)
        : rand(-0.3, 0.3),

      dy: ldmEnabled
        ? rand(-0.7, 0.7)
        : rand(-0.2, 0.2),

      alpha: rand(0.3, 1),

      color: ldmEnabled
        ? pick(ldmColors)
        : pick(normalColors)
    });
  }
}

createParticles();


/* =========================================================
   LDM EVENT LISTENER
========================================================= */

window.addEventListener(
  "ldmToggle",

  e => {

    ldmEnabled =
      e.detail;

    createParticles();
  }
);


/* =========================================================
   MUSIC REACTIVITY
========================================================= */

const music =
  document.getElementById(
    "bgMusic"
  );

let analyser;
let audioData;
let audioSource;

if (music) {

  try {

    const audioCtx =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    analyser =
      audioCtx.createAnalyser();

    analyser.fftSize = 128;

    audioData =
      new Uint8Array(
        analyser.frequencyBinCount
      );

    audioSource =
      audioCtx.createMediaElementSource(
        music
      );

    audioSource.connect(analyser);

    analyser.connect(
      audioCtx.destination
    );

    // 🌅 resume context on click
    document.addEventListener(
      "click",

      () => {

        if (
          audioCtx.state ===
          "suspended"
        ) {

          audioCtx.resume();
        }
      },

      { once: true }
    );

  } catch (err) {

    console.log(
      "Audio analyzer failed:",
      err
    );
  }
}


/* =========================================================
   BEAT DETECTION
========================================================= */

function updateBeat() {

  if (
    !analyser ||
    music.paused
  ) {

    beatPulse *= 0.92;

    return;
  }

  analyser.getByteFrequencyData(
    audioData
  );

  let total = 0;

  for (
    let i = 0;
    i < audioData.length;
    i++
  ) {

    total += audioData[i];
  }

  const avg =
    total /
    audioData.length;

  // 🌅 pulse intensity
  beatPulse =
    avg / 180;
}


/* =========================================================
   DRAW LOOP
========================================================= */

function draw() {

  ctx.clearRect(
    0,
    0,
    w,
    h
  );

  updateBeat();

  // 🌅 glow boost
  if (ldmEnabled) {

    ctx.shadowBlur =
      12 +
      beatPulse * 16;

    ctx.shadowColor =
      "#ff8a3d";

  } else {

    ctx.shadowBlur =
      4 +
      beatPulse * 6;

    ctx.shadowColor =
      "#ffcf6b";
  }

  for (
    let p of particles
  ) {

    // 🌅 beat movement boost
    const beatBoost =
      1 +
      beatPulse * 1.5;

    p.x +=
      p.dx * beatBoost;

    p.y +=
      p.dy * beatBoost;

    // 🌅 screen wrap
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;

    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.globalAlpha =
      p.alpha;

    ctx.fillStyle =
      p.color;

    ctx.beginPath();

    ctx.arc(

      p.x,
      p.y,

      p.r +
      beatPulse * 1.5,

      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.globalAlpha = 1;

  requestAnimationFrame(
    draw
  );
}

draw();


/* =========================================================
   DEBUG
========================================================= */

console.log(
  "🌅 particles.js loaded"
);
