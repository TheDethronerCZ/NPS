const sb = supabase.createClient(
  "https://itlgyetcajqhbuqpxmyj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGd5ZXRjYWpxaGJ1cXB4bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDIxNDUsImV4cCI6MjA5NTE3ODE0NX0.0ix8VFlR-BRliJIZCkBor9RIczvw8skruGVYyKWamBo"
);

export async function signUp(username, password) {
  const email = `${username}@season.nps`;

  const { error } = await sb.auth.signUp({
    email,
    password
  });

  if (error) return alert(error.message);

  alert("Account created!");
}

export async function logIn(username, password) {
  const email = `${username}@season.nps`;

  const { error } = await sb.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  alert("Logged in!");
  location.reload();
}

export async function logOut() {
  await sb.auth.signOut();
  location.reload();
}
