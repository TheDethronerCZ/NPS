let isAdmin = false;

async function loadProfile() {

  const { data: user } = await sb.auth.getUser();

  if (!user?.user) return;

  const { data } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if (data?.is_admin) {
    isAdmin = true;

    document
      .querySelectorAll(".admin-only")
      .forEach(el => {
        el.style.display = "block";
      });
  }
}

loadProfile();
