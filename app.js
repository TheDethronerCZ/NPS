//
// ================================
// 1. SUPABASE INIT
// ================================
//

const SUPABASE_URL = "https://itlgyetcajqhbuqpxmyj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGd5ZXRjYWpxaGJ1cXB4bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDIxNDUsImV4cCI6MjA5NTE3ODE0NX0.0ix8VFlR-BRliJIZCkBor9RIczvw8skruGVYyKWamBo";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


//
// ================================
// 2. AUTH SYSTEM
// ================================
//

async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) console.log("SignUp error:", error.message);
}

async function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.log("Login error:", error.message);
    return;
  }

  await loadProfile();
}

async function logOut() {
  await supabase.auth.signOut();
  location.reload();
}


//
// ================================
// 3. PROFILE SYSTEM
// ================================
//

async function loadProfile() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (error) {
    console.log("Profile error:", error.message);
    return;
  }

  // Username display
  const usernameEl = document.getElementById("usernameDisplay");
  if (usernameEl) {
    usernameEl.textContent = "Username: " + (data.username || "Unknown");
  }

  // Stats safely updated
  setText("creatorPoints", "Creator Points: " + data.creator_points);
  setText("demonPoints", "Demon Points: " + data.demon_points);
  setText("stars", "Stars: " + data.stars);
}


//
// ================================
// 4. DEMON SYSTEM (FUTURE READY)
// ================================
//

async function submitDemon(name, creator, difficulty, video) {
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) return;

  const { error } = await supabase.from("demons").insert({
    name,
    creator,
    difficulty,
    video,
    created_by: user.user.id
  });

  if (error) console.log("Demon submit error:", error.message);
}


//
// ================================
// 5. SMALL HELPERS
// ================================
//

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}


//
// ================================
// 6. INIT
// ================================
//

loadProfile();
