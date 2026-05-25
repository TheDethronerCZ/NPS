async function loadDemons() {

  const container =
    document.getElementById(
      "demonContainer"
    );

  const { data } = await sb
    .from("demons")
    .select("*");

  container.innerHTML = "";

  data.forEach(demon => {

    const div =
      document.createElement("div");

    div.className = "card";

    div.innerHTML = `
      <h3>${demon.name}</h3>
      <p>Difficulty: ${demon.difficulty}</p>
      <p>Points: ${demon.points}</p>

      <button onclick="completeDemon(${demon.points})">
        Complete Demon
      </button>
    `;

    container.appendChild(div);
  });
}

async function completeDemon(points) {

  const { data: userData } =
    await sb.auth.getUser();

  if (!userData?.user) return;

  const user = userData.user;

  const { data: profile } = await sb
    .from("profiles")
    .select("player_points")
    .eq("id", user.id)
    .single();

  await sb
    .from("profiles")
    .update({
      player_points:
        (profile.player_points || 0)
        + points
    })
    .eq("id", user.id);

  alert(`+${points} points!`);
}

loadDemons();
