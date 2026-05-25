async function loadLevels() {

  const container =
    document.getElementById(
      "levelsContainer"
    );

  if (!container) return;

  const { data } = await sb
    .from("levels")
    .select("*");

  container.innerHTML = "";

  data.forEach(level => {

    const div =
      document.createElement("div");

    div.className = "card";

    div.innerHTML = `
      <h3>${level.name}</h3>
      <p>Difficulty: ${level.difficulty}</p>
      <p>Rating: ${level.rating}</p>

      <button onclick="completeLevel('${level.id}', '${level.difficulty}')">
        Complete
      </button>
    `;

    container.appendChild(div);
  });
}

async function completeLevel(id, difficulty) {

  const { data: userData } =
    await sb.auth.getUser();

  if (!userData?.user) return;

  const user = userData.user;

  /* =========================
     POINT SYSTEM
  ========================= */

  let points = 0;

  if (difficulty === "easy demon") points = 1;
  if (difficulty === "medium demon") points = 3;
  if (difficulty === "hard demon") points = 15;
  if (difficulty === "insane demon") points = 20;
  if (difficulty === "extreme demon") points = 25;

  await sb
    .from("level_completions")
    .insert({
      user_id: user.id,
      level_id: id,
      difficulty
    });

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

loadLevels();
