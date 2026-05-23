const demons = [
  {
    name: "Tidal Wave",
    creator: "Unknown",
    video: "dQw4w9WgXcQ",
    id: "1001",
    rank: 1
  }
];

const levels = [
  {
    name: "Easy Level",
    creator: "User1",
    difficulty: "Easy"
  }
];

/* DEMONS */
const demonGrid = document.getElementById("demonGrid");

if (demonGrid) {
  demons.forEach(d => {
    demonGrid.innerHTML += `
      <div class="demon-card">
        <img src="https://img.youtube.com/vi/${d.video}/maxresdefault.jpg">
        <p>#${d.rank} ${d.name}</p>
      </div>
    `;
  });
}

/* LEVELS */
const levelBox = document.getElementById("levels");

if (levelBox) {
  levels.forEach(l => {
    levelBox.innerHTML += `
      <div class="level-card">
        <h3>${l.name}</h3>
        <p>${l.creator}</p>
        <p>${l.difficulty}</p>
      </div>
    `;
    /* LOADING */
    window.addEventListener("load", () => {
  const loader = document.getElementById("loading");
  if (!loader) return; // ONLY run if it exists

  loader.style.display = "flex";

  const bar = document.querySelector(".bar-fill");
  if (bar) bar.style.width = "100%";

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});
  });
}
