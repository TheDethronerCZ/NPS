const demons = [
  {
    name: "TidalWave",
    creator: "Unknown",
    video: "dQw4w9WgXcQ",
    id: "1001",
    rank: 1
  }
];

const grid = document.getElementById("demonGrid");

if (grid) {
  demons.forEach(d => {
    grid.innerHTML += `
      <div class="demon-card" onclick="openDemon('${d.name}')">
        <img src="https://img.youtube.com/vi/${d.video}/maxresdefault.jpg">
        <p>#${d.rank} ${d.name}</p>
      </div>
    `;
  });
}

function openDemon(name) {
  const d = demons.find(x => x.name === name);
  alert(
    `Name: ${d.name}\nCreator: ${d.creator}\nID: ${d.id}\nRank: #${d.rank}`
  );
}

/* LOADING SCREEN */
window.onload = () => {
  const loader = document.getElementById("loading");
  if (!loader) return;

  loader.style.display = "flex";
  setTimeout(() => document.querySelector(".bar-fill").style.width = "100%", 100);
  setTimeout(() => loader.style.display = "none", 1200);
};
