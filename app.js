async function isAdmin() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return false;

  const res = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", data.user.id)
    .single();

  return res.data?.is_admin;
}
async function setupAdminUI() {
  const admin = await isAdmin();

  const btn = document.getElementById("adminEditBtn");

  if (btn && admin) {
    btn.style.display = "block";
  }
}

setupAdminUI();

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: Math.random() * 3 + 1,
    v: Math.random() * 1 + 0.3
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    ctx.fillStyle = "#ffb36b";
    ctx.fillRect(p.x, p.y, p.s, p.s);

    p.y -= p.v;

    if (p.y < 0) p.y = canvas.height;
  }

  requestAnimationFrame(draw);
}

draw();
const modal = document.getElementById("demonModal");

const nameEl = document.getElementById("modalName");
const creatorEl = document.getElementById("modalCreator");
const idEl = document.getElementById("modalId");
const diffEl = document.getElementById("modalDifficulty");
const videoEl = document.getElementById("modalVideo");

document.querySelectorAll(".demon-card").forEach(card => {
  card.addEventListener("click", () => {

    nameEl.textContent = card.dataset.name;
    creatorEl.textContent = card.dataset.creator;
    idEl.textContent = card.dataset.id;
    diffEl.textContent = card.dataset.difficulty;

    videoEl.href = card.dataset.video;

    modal.classList.remove("hidden");
  });
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await supabase.auth.signUp({ email, password });
}

async function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await supabase.auth.signInWithPassword({ email, password });

  loadProfile();
}

async function logOut() {
  await supabase.auth.signOut();
  location.reload();
}

async function loadProfile() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (!data) return;

  document.getElementById("usernameDisplay").textContent =
    "Username: " + (data.username || "Unknown");

  document.getElementById("creatorPoints").textContent =
    "Creator Points: " + data.creator_points;

  document.getElementById("demonPoints").textContent =
    "Demon Points: " + data.demon_points;

  document.getElementById("stars").textContent =
    "Stars: " + data.stars;
}

loadProfile();

async function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) console.log(error);
  else updateUser();
}

async function logOut() {
  await supabase.auth.signOut();
  updateUser();
}

async function updateUser() {
  const { data } = await supabase.auth.getUser();

  const userEmail = document.getElementById("userEmail");

  if (data.user) {
    userEmail.textContent = data.user.email;
  } else {
    userEmail.textContent = "Not logged in";
  }
}

updateUser();
async function loadProfile() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (!data) return;

  document.getElementById("userEmail").textContent = data.email;

  document.querySelector(".card:nth-of-type(3)").innerHTML = `
    <h2>Stats</h2>
    <p>Creator Points: ${data.creator_points}</p>
    <p>Demon Points: ${data.demon_points}</p>
    <p>Stars: ${data.stars}</p>
  `;
}

loadProfile();
async function checkAdminUI() {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return;

  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.user.id)
    .single();

  if (data?.is_admin) {
    document.body.classList.add("admin");
  }
}

checkAdminUI();
async function submitDemon(name, creator, difficulty, video) {
  const { data: user } = await supabase.auth.getUser();

  await supabase.from("demons").insert({
    name,
    creator,
    difficulty,
    video,
    created_by: user.user.id
  });
}
async function completeChallenge(type) {
  const { data: user } = await supabase.auth.getUser();

  let points = 0;

  if (type === "extreme") points = 10;
  if (type === "level") points = 5;

  await supabase.rpc("increment_creator_points", {
    user_id: user.user.id,
    amount: points
  });
}
