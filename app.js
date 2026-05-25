//
// ========================================
// SUPABASE
// ========================================
//

const SUPABASE_URL =
  "https://itlgyetcajqhbuqpxmyj.supabase.co/";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGd5ZXRjYWpxaGJ1cXB4bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDIxNDUsImV4cCI6MjA5NTE3ODE0NX0.0ix8VFlR-BRliJIZCkBor9RIczvw8skruGVYyKWamBo";

const sb =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


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
// PROFILE
// ========================================
//

let currentProfile = null;


//
// ========================================
// AUTH
// ========================================
//

window.signUp = async function () {

  const username =
    document
      .getElementById("username")
      .value
      .trim();

  const password =
    document
      .getElementById("password")
      .value
      .trim();

  const fakeEmail =
    `${username}@vsunset.gg`;

  const { error } =
    await sb.auth.signUp({

      email: fakeEmail,
      password: password
    });

  if (error) {

    popup(error.message);
    return;
  }

  popup("Account created!");
};

window.logIn = async function () {

  const username =
    document
      .getElementById("username")
      .value
      .trim();

  const password =
    document
      .getElementById("password")
      .value
      .trim();

  const fakeEmail =
    `${username}@vsunset.gg`;

  const { error } =
    await sb.auth.signInWithPassword({

      email: fakeEmail,
      password: password
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
// PROFILE LOADING
// ========================================
//

async function loadProfile() {

  const { data: userData, error: userError } =
    await sb.auth.getUser();

  if (userError || !userData?.user) return;

  const user = userData.user;

  console.log("USER ID:", user.id);

  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log("PROFILE:", data);
  console.log("ERROR:", error);

  if (error || !data) return;

  currentProfile = data;

  if (data.is_admin === true) {
    showAdminUI();
  }
}

//
// ========================================
// ADMIN UI
// ========================================
//

window.showAdminUI = function () {

  document
    .querySelectorAll(".admin-only")
    .forEach(el => {

      el.style.display = "block";
    });
}

//
// ========================================
// INIT
// ========================================
//

loadProfile();
async const { data, error } = await sb.from("profiles").select("*");

if (error) {
  console.log(error);
}
console.log("PROFILE DATA:", data);

console.log("BINDING ADMIN FUNCTIONS");

window.showAdminUI = showAdminUI;
window.editLevel = editLevel;
window.deleteLevel = deleteLevel;
window.addLevel = addLevel;
window.editDemon = editDemon;
window.deleteDemon = deleteDemon;
window.acceptSubmission = acceptSubmission;
window.denySubmission = denySubmission;
