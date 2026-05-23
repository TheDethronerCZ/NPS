const demons = [
  {
    name: "Tidal Wave",
    video: "3v0w1qz"
  },
  {
    name: "Acheron",
    video: "dQw4w9WgXcQ"
  }
];

const grid = document.getElementById("demonGrid");

if (grid) {
  demons.forEach(d => {

    const thumbnail = `https://img.youtube.com/vi/${d.video}/maxresdefault.jpg`;

    grid.innerHTML += `
      <div class="demon">
        <img src="${thumbnail}">
        <p>${d.name}</p>
      </div>
    `;
  });
}
