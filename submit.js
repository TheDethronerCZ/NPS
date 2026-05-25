async function submitLevel() {

  const { data: userData } =
    await sb.auth.getUser();

  if (!userData?.user) {
    alert("Not logged in");
    return;
  }

  const user = userData.user;

  const name =
    document.getElementById("levelName").value;

  const type =
    document.getElementById("type").value;

  const enjoyability =
    parseInt(document.getElementById("enjoyability").value);

  if (!name || !enjoyability) {
    alert("Missing fields");
    return;
  }

  const { error } = await sb
    .from("submissions")
    .insert({
      level_name: name,
      creator_id: user.id,
      type,
      enjoyability,
      status: "pending"
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Submitted!");
}
