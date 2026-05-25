//
// ========================================
// SUPABASE
// ========================================
//

const SUPABASE_URL = "https://itlgyetcajqhbuqpxmyj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGd5ZXRjYWpxaGJ1cXB4bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDIxNDUsImV4cCI6MjA5NTE3ODE0NX0.0ix8VFlR-BRliJIZCkBor9RIczvw8skruGVYyKWamBo";

const sb = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


//
// ========================================
// GLOBAL PROFILE
// ========================================
//

let currentProfile = null;


//
// ========================================
// POPUP
// ========================================
//

function popup(text) {
  alert(text);
}


//
// ========================================
// AUTH
// ========================================
//

window.signUp = async function () {

  const username =
    document.getElementById("username")?.value.trim();

  const password =
    document.getElementById("password")?.value.trim();

  if (!username || !password) {
    popup("Missing username or password");
    return;
  }

const fakeEmail =
  `${username}@gmail.com`;

  const { data, error } =
    await sb.auth.signUp({
      email: fakeEmail,
      password
    });

  if (error) {
    popup(error.message);
    return;
  }

  popup("Account created!");
};

window.logIn = async function () {

  const username =
    document.getElementById("username")?.value.trim();

  const password =
    document.getElementById("password")?.value.trim();

  const fakeEmail =
    `${username}@season.nps`;

  const { error } =
    await sb.auth.signInWithPassword({
      email: fakeEmail,
      password
    });

  if (error) {
    popup(error.message);
    return;
  }

  popup("Logged in!");

  location.reload();
};

window.logOut = async function () {

  await sb.auth.signOut();

  popup("Logged out.");

  location.reload();
};


//
// ========================================
// PROFILE
// ========================================
//

async function loadProfile() {

  const { data: userData } =
    await sb.auth.getUser();

  if (!userData.user) return;

  const { data } =
    await sb
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

  if (!data) return;

  currentProfile = data;

  setText(
    "usernameDisplay",
    data.username
  );

  setText(
    "creatorPoints",
    `Creator Points: ${data.creator_points}`
  );

  setText(
    "playerPoints",
    `Player Points: ${data.player_points}`
  );

  if (data.is_admin) {
    showAdminUI();
  }
}


//
// ========================================
// ADMIN UI
// ========================================
//

function showAdminUI() {

  document
    .querySelectorAll(".admin-only")
    .forEach(el => {
      el.style.display = "block";
    });
}


//
// ========================================
// SUBMIT
// ========================================
//

window.submitRun = async function () {

  const { data: userData } =
    await sb.auth.getUser();

  if (!userData.user) {
    popup("You must be logged in.");
    return;
  }

  const levelName =
    document.getElementById("levelName").value;

  const video =
    document.getElementById("video").value;

  const submissionType =
    document.getElementById("submissionType").value;

  const enjoyability =
    parseInt(
      document.getElementById("enjoyability").value
    );

  const { error } =
    await sb
      .from("submissions")
      .insert({
        user_id: userData.user.id,

        level_name: levelName,

        video,

        submission_type: submissionType,

        enjoyability
      });

  if (error) {
    popup(error.message);
    return;
  }

  popup("Submission sent!");
};


//
// ========================================
// LEADERBOARDS
// ========================================
//

async function loadLeaderboards() {

  const creatorBoard =
    document.getElementById("creatorBoard");

  const playerBoard =
    document.getElementById("playerBoard");

  if (!creatorBoard || !playerBoard) return;

  const { data: creators } =
    await sb
      .from("profiles")
      .select("*")
      .order("creator_points", {
        ascending: false
      });

  const { data: players } =
    await sb
      .from("profiles")
      .select("*")
      .order("player_points", {
        ascending: false
      });

  creatorBoard.innerHTML = "";
  playerBoard.innerHTML = "";

  creators.forEach((user, i) => {

    creatorBoard.innerHTML += `
      <div class="card">
        <h3>#${i + 1} ${user.username}</h3>
        <p>${user.creator_points} CP</p>
      </div>
    `;
  });

  players.forEach((user, i) => {

    playerBoard.innerHTML += `
      <div class="card">
        <h3>#${i + 1} ${user.username}</h3>
        <p>${user.player_points} PP</p>
      </div>
    `;
  });
}


//
// ========================================
// HELPERS
// ========================================
//

function setText(id, text) {

  const el =
    document.getElementById(id);

  if (el) {
    el.textContent = text;
  }
}


//
// ========================================
// INIT
// ========================================
//

loadProfile();
loadLeaderboards();
