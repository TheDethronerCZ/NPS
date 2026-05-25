const demons = [

  {
    name: "Eclipse Core",
    difficulty: "extreme",
    creator: "Nova"
  },

  {
    name: "Solar Collapse",
    difficulty: "insane",
    creator: "Hexa"
  },

  {
    name: "Afterburn",
    difficulty: "hard",
    creator: "Skye"
  }
];

window.addEventListener(
  "DOMContentLoaded",
  loadDemons
);

function loadDemons() {

  const list =
    document.getElementById(
      "demonList"
    );

  demons.forEach(demon => {

    const card =
      document.createElement("div");

    card.className =
      `level-card ${demon.difficulty}`;

    card.innerHTML = `
      <h2>${demon.name}</h2>

      <div class="level-meta">
        ${demon.difficulty.toUpperCase()}
        •
        by ${demon.creator}
      </div>
    `;

    list.appendChild(card);
  });
}
