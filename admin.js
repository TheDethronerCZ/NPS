let isAdmin = false;

async function loadProfile() {

  const { data: userData } =
    await sb.auth.getUser();

  if (!userData?.user) return;

  const user = userData.user;

  const { data } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!data) return;

  isAdmin = data.is_admin === true;

  if (isAdmin) {
    enableAdminUI();
    loadSubmissions();
  }
}

/* =========================
   SHOW ADMIN UI
========================= */

function enableAdminUI() {

  document
    .querySelectorAll(".admin-only")
    .forEach(el => {
      el.style.display = "block";
    });
}

/* =========================
   LOAD SUBMISSIONS
========================= */

async function loadSubmissions() {

  const container =
    document.getElementById(
      "submissionList"
    );

  if (!container) return;

  const { data } = await sb
    .from("submissions")
    .select("*")
    .eq("status", "pending");

  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML =
      "<p>No pending submissions</p>";
    return;
  }

  data.forEach(sub => {

    const div =
      document.createElement("div");

    div.className = "card";

    div.innerHTML = `
      <h3>${sub.level_name}</h3>
      <p>Type: ${sub.type}</p>
      <p>Enjoyability: ${sub.enjoyability}</p>

      <button onclick="acceptSubmission('${sub.id}', '${sub.type}', ${sub.enjoyability}, '${sub.creator_id}')">
        Accept
      </button>

      <button onclick="denySubmission('${sub.id}')">
        Deny
      </button>
    `;

    container.appendChild(div);
  });
}

/* =========================
   ACCEPT
========================= */

async function acceptSubmission(
  id,
  type,
  enjoyability,
  creator_id
) {

  await sb
    .from("submissions")
    .update({ status: "accepted" })
    .eq("id", id);

  if (enjoyability >= 8) {

    const points =
      type === "verification"
        ? 10
        : 5;

    const { data } = await sb
      .from("profiles")
      .select("creator_points")
      .eq("id", creator_id)
      .single();

    await sb
      .from("profiles")
      .update({
        creator_points:
          (data.creator_points || 0)
          + points
      })
      .eq("id", creator_id);
  }

  loadSubmissions();
}

/* =========================
   DENY
========================= */

async function denySubmission(id) {

  await sb
    .from("submissions")
    .update({ status: "denied" })
    .eq("id", id);

  loadSubmissions();
}

loadProfile();
