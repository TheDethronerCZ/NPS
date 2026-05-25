async function loadLeaderboards() {

  const creators =
    document.getElementById(
      "creatorBoard"
    );

  const players =
    document.getElementById(
      "playerBoard"
    );

  const { data: c } = await sb
    .from("profiles")
    .select("username, creator_points")
    .order("creator_points", { ascending: false });

  const { data: p } = await sb
    .from("profiles")
    .select("username, player_points")
    .order("player_points", { ascending: false });

  creators.innerHTML =
    c.map(u =>
      `<p>${u.username} - ${u.creator_points}</p>`
    ).join("");

  players.innerHTML =
    p.map(u =>
      `<p>${u.username} - ${u.player_points}</p>`
    ).join("");
}

loadLeaderboards();
