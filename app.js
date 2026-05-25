/* =========================================================
   🌅 NPS vSUNSET — FULL REBUILT APP.JS
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
  "https://itlgyetcajqhbuqpxmyj.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGd5ZXRjYWpxaGJ1cXB4bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDIxNDUsImV4cCI6MjA5NTE3ODE0NX0.0ix8VFlR-BRliJIZCkBor9RIczvw8skruGVYyKWamBo";

const sb =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================================
   GLOBAL STATE
========================================================= */

let profile = null;

let isAdmin = false;

let ldmMode = false;

let musicEnabled = false;


/* =========================================================
   PROFILE LOADING
========================================================= */

async function loadProfile() {

  const {
    data: userData,
    error: userError
  } = await sb.auth.getUser();

  if (
    userError ||
    !userData?.user
  ) {
    console.log("No user logged in.");
    return;
  }

  const user = userData.user;

  console.log("USER:", user.id);

  const {
    data,
    error
  } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log("PROFILE:", data);

  if (error || !data) {

    console.log(
      "Profile missing or blocked."
    );

    return;
  }

  profile = data;

  isAdmin =
    data.is_admin === true;

  if (isAdmin) {
    enableAdminUI();
  }

  const usernameDisplay =
    document.getElementById(
      "usernameDisplay"
    );

  if (usernameDisplay) {

    usernameDisplay.textContent =
      data.username;
  }
}


/* =========================================================
   ADMIN UI
========================================================= */

function enableAdminUI() {

  document
    .querySelectorAll(".admin-only")
    .forEach(el => {

      el.style.display = "block";
    });

  console.log("Admin UI enabled.");
}


/* =========================================================
   LDM MODE
========================================================= */

window.addEventListener(

  "DOMContentLoaded",

  () => {

    /* =========================
       LDM
    ========================= */

    const ldmToggle =
      document.getElementById(
        "ldmToggle"
      );

    let ldmMode = false;

    if (ldmToggle) {

      ldmToggle.addEventListener(
        "click",

        () => {

          ldmMode = !ldmMode;

          ldmToggle.textContent =
            ldmMode
              ? "LDM: ON"
              : "LDM: OFF";

          ldmToggle.classList.toggle(
            "active-toggle",
            ldmMode
          );

          window.dispatchEvent(
            new CustomEvent(
              "ldmToggle",
              {
                detail: ldmMode
              }
            )
          );
        }
      );
    }


    /* =========================
       MUSIC
    ========================= */

    const music =
      document.getElementById(
        "bgMusic"
      );

    const musicToggle =
      document.getElementById(
        "musicToggle"
      );

    let musicEnabled = false;

    if (music) {
      music.volume = 0.4;
    }

    if (
      music &&
      musicToggle
    ) {

      musicToggle.addEventListener(

        "click",

        async () => {

          musicEnabled =
            !musicEnabled;

          if (musicEnabled) {

            try {

              await music.play();

              musicToggle.textContent =
                "Music: ON";

              musicToggle.classList.add(
                "active-toggle"
              );

            } catch (err) {

              console.log(err);
            }

          } else {

            music.pause();

            musicToggle.textContent =
              "Music: OFF";

            musicToggle.classList.remove(
              "active-toggle"
            );
          }
        }
      );
    }

    console.log(
      "Toggle systems loaded"
    );
  }
);

/* =========================================================
   NAVIGATION GLOW FX
========================================================= */

document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener(
      "mouseenter",

      () => {

        link.style.boxShadow =
          `
          0 0 20px rgba(255,138,61,0.35)
          `;
      }
    );

    link.addEventListener(
      "mouseleave",

      () => {

        link.style.boxShadow =
          "none";
      }
    );
  });


/* =========================================================
   CARD FLOAT FX
========================================================= */

document
  .querySelectorAll(".card")
  .forEach(card => {

    card.addEventListener(
      "mousemove",

      e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX -
          rect.left;

        const y =
          e.clientY -
          rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          (y - centerY) / 30;

        const rotateY =
          (centerX - x) / 30;

        card.style.transform =
          `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
          `;
      }
    );

    card.addEventListener(
      "mouseleave",

      () => {

        card.style.transform =
          `
          rotateX(0deg)
          rotateY(0deg)
          translateY(0px)
          `;
      }
    );
  });


/* =========================================================
   SIMPLE POPUP
========================================================= */

function popup(text) {

  alert(text);
}


/* =========================================================
   AUTH HELPERS
========================================================= */

async function signUp(
  username,
  password
) {

  const fakeEmail =
    `${username}@vsunset.gg`;

  const {
    error
  } =
    await sb.auth.signUp({

      email: fakeEmail,
      password
    });

  if (error) {

    popup(error.message);

    return;
  }

  popup("Account created!");
}


async function logIn(
  username,
  password
) {

  const fakeEmail =
    `${username}@vsunset.gg`;

  const {
    error
  } =
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
}


async function logOut() {

  await sb.auth.signOut();

  popup("Logged out.");

  location.reload();
}


/* =========================================================
   GLOBAL EXPORTS
========================================================= */

window.signUp = signUp;

window.logIn = logIn;

window.logOut = logOut;


/* =========================================================
   INIT
========================================================= */

loadProfile();

console.log(
  "🌅 NPS vSUNSET initialized."
);
