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
const SUPABASE_URL = "https://itlgyetcajqhbuqpxmyj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGd5ZXRjYWpxaGJ1cXB4bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDIxNDUsImV4cCI6MjA5NTE3ODE0NX0.0ix8VFlR-BRliJIZCkBor9RIczvw8skruGVYyKWamBo";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) console.log(error);
}

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
