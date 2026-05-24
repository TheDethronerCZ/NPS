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
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  const { error } = await sb.auth.signUp({
    email,
    password
  });

  if (error) console.log("SignUp error:", error.message);
};

window.logIn = async function () {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  const { error } = await sb.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.log("Login error:", error.message);
    return;
  }

  loadProfile();
};

window.logOut = async function () {
  await sb.auth.signOut();
  location.reload();
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

  const usernameEl = document.getElementById("usernameDisplay");
  if (usernameEl) {
    usernameEl.textContent = "Username: " + (data.username || "Unknown");
  }

  setText("creatorPoints", "Creator Points: " + data.creator_points);
  setText("demonPoints", "Demon Points: " + data.demon_points);
  setText("stars", "Stars: " + data.stars);
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
