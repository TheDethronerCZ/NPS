/* =========================================================
   LEVEL CLIENT
========================================================= */

const levels = [

  {
    name: "Sunset Pulse",
    difficulty: "easy",
    creator: "Nova"
  },

  {
    name: "Afterglow",
    difficulty: "medium",
    creator: "Skye"
  },

  {
    name: "Crimson Void",
    difficulty: "extreme",
    creator: "Hexa"
  }
];

/* =========================
   LOAD LEVELS
========================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    loadLevels();
    initOverlay();
  }
);

function loadLevels() {

  const list =
    document.getElementById(
      "levelList"
    );

  levels.forEach(level => {

    const card =
      document.createElement("div");

    card.className =
      `level-card ${level.difficulty}`;

    card.innerHTML = `
      <h2>${level.name}</h2>

      <div class="level-meta">
        ${level.difficulty.toUpperCase()}
        •
        by ${level.creator}
      </div>
    `;

    card.onclick = () => {
      openLevel(level);
    };

    list.appendChild(card);
  });
}

/* =========================
   OVERLAY
========================= */

function initOverlay() {

  document
    .getElementById(
      "closeOverlay"
    )
    .onclick = closeLevel;
}

function openLevel(level) {

  document
    .getElementById(
      "overlayTitle"
    )
    .textContent = level.name;

  document
    .getElementById(
      "overlayDifficulty"
    )
    .textContent =
      `Difficulty:
      ${level.difficulty}`;

  document
    .getElementById(
      "overlayCreator"
    )
    .textContent =
      `Creator:
      ${level.creator}`;

  document
    .getElementById(
      "levelOverlay"
    )
    .classList.add("active");
}

function closeLevel() {

  document
    .getElementById(
      "levelOverlay"
    )
    .classList.remove("active");
}
