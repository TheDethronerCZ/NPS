const demons = [
  "TidalWave",
  "Acheron"
];

const grid = document.getElementById("demonGrid");

if (grid) {
  demons.forEach(name => {
    grid.innerHTML += `
      <div class="demon">
        <img src="images/${name}.png">
        <p>${name}</p>
      </div>
    `;
  });
}
