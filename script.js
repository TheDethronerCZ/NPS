const demons = [
  "Rosecity"
];

const grid = document.getElementById("demonGrid");

if (grid) {

  demons.forEach(demon => {

    const prettyName =
      demon.replace(/([A-Z])/g, " $1").trim();

    grid.innerHTML += `
      <div class="demon-card">

        <img src="images/${demon}.png">

        <h2>${prettyName}</h2>

        <p>Extreme Demon</p>

      </div>
    `;
  });

}