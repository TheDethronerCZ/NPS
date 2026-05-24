//
// =====================
// SUPABASE INIT (GLOBAL SAFE)
// =====================
//

const SUPABASE_URL = "https://itlgyetcajqhbuqpxmyj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGd5ZXRjYWpxaGJ1cXB4bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDIxNDUsImV4cCI6MjA5NTE3ODE0NX0.0ix8VFlR-BRliJIZCkBor9RIczvw8skruGVYyKWamBo";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.sb = sb; // optional debug access


//
// =====================
// AUTH FUNCTIONS (GLOBAL)
// =====================
//

window.signUp = async function () {
  const username = document.getElementById("username")?.value?.trim();
  const password = document.getElementById("password")?.value?.trim();

  if (!username || !password) return;

  const fakeEmail = `${username}@season.nps`;

  const { error } = await sb.auth.signUp({
    email: fakeEmail,
    password
  });

  if (error) console.log("SignUp error:", error.message);
};

window.logIn = async function () {
  const username = document.getElementById("username")?.value?.trim();
  const password = document.getElementById("password")?.value?.trim();

  if (!username || !password) return;

  const fakeEmail = `${username}@season.nps`;

  const { error } = await sb.auth.signInWithPassword({
    email: fakeEmail,
    password
  });

  if (error) {
    console.log("Login error:", error.message);
    return;
  }

  loadProfile();
};

//
// =====================
// PROFILE SYSTEM
// =====================
//

async function loadProfile() {
  const { data: userData } = await sb.auth.getUser();

  if (!userData.user) return;

  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

 document.getElementById("usernameDisplay").textContent =
  "Username: " + (data.username || userData.user.email.split("@")[0]);
  setText("creatorPoints", "Creator Points: " + data.creator_points);
  setText("demonPoints", "Demon Points: " + data.demon_points);
  setText("stars", "Stars: " + data.stars);
}
async function setupSubmitPage() {
  const { data: userData } = await sb.auth.getUser();

  if (!userData.user) return;

  const { data: profile } = await sb
    .from("profiles")
    .select("is_admin")
    .eq("id", userData.user.id)
    .single();

  if (!profile?.is_admin) return;

  loadAdminSubmissions();
}

setupSubmitPage();
async function loadAdminSubmissions() {

  const { data } = await sb
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const panel = document.getElementById("adminPanel");

  panel.innerHTML = "<h1>Admin Queue</h1>";

  data.forEach(sub => {

    panel.innerHTML += `
      <div class="card">

        <h3>${sub.level_name}</h3>

        <p>Type: ${sub.submission_type}</p>
        <p>Enjoyability: ${sub.enjoyability}/10</p>

        <button onclick="acceptSubmission(${sub.id})">
          Accept
        </button>

        <button onclick="denySubmission(${sub.id})">
          Deny
        </button>

      </div>
    `;
  });
}
window.acceptSubmission = async function(id) {

  await sb
    .from("submissions")
    .update({
      accepted: true,
      denied: false
    })
    .eq("id", id);

  location.reload();
}
window.denySubmission = async function(id) {

  await sb
    .from("submissions")
    .update({
      denied: true,
      accepted: false
    })
    .eq("id", id);

  location.reload();
}
window.submitRun = async function() {

  const { data: userData } = await sb.auth.getUser();

  if (!userData.user) {
    alert("You must be logged in.");
    return;
  }

  await sb
    .from("submissions")
    .insert({
      user_id: userData.user.id,

      level_name: document.getElementById("levelName").value,

      video: document.getElementById("video").value,

      submission_type: document.getElementById("submissionType").value,

      enjoyability: parseInt(
        document.getElementById("enjoyability").value
      )
    });

  alert("Submission sent.");
}

//
// =====================
// HELPERS
// =====================
//

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}


//
// =====================
// INIT
// =====================
//

loadProfile();
