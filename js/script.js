const tokenCookieName = "accessToken";
const roleCookieName = "role";
const apiBaseUrl = "http://127.0.0.1:8000/api/";
getInfoUser();


// --- Bouton déconnexion ---
const signoutBtn = document.getElementById("signout-btn");
if (signoutBtn) {
  signoutBtn.addEventListener("click", signout);
}

// --- Récupère le rôle stocké dans le cookie ---
function getRole() {
  return getCookie(roleCookieName);
}

// --- Déconnexion ---
function signout() {
  eraseCookie(tokenCookieName);
  eraseCookie(roleCookieName);
  window.location.reload();
}

// --- Gestion du token ---
function setToken(token) {
  setCookie(tokenCookieName, token, 7); // expire dans 7 jours
}

function getToken() {
  return getCookie(tokenCookieName);
}

// --- Gestion des cookies ---
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (const cRaw of ca) {
    const c = cRaw.trim();
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

// --- Vérifie la connexion ---
function isConnected() {
  const token = getToken();
  return !(token === null || token === undefined || token === "");
}

// --- Affiche ou cache des éléments selon le rôle ---
function showHideElementsForRoles() {
  const userConnected = isConnected();
  const role = getRole();


  console.log("Debug show/hide →", {
    userConnected,
    role,
    token: getToken(),
  });

  const allElementsToEdit = document.querySelectorAll("[data-show]");

  allElementsToEdit.forEach((element) => {
    // Réinitialiser l'affichage à chaque appel
    element.classList.remove("d-none");

    switch (element.dataset.show) {
      case "disconnected":
        if (userConnected) element.classList.add("d-none");
        break;
      case "connected":
        if (!userConnected) element.classList.add("d-none");
        break;
      case "admin":
        if (!userConnected || role !== "admin") element.classList.add("d-none");
        break;
      case "client":
        if (!userConnected || role !== "client") element.classList.add("d-none");
        break;
    }
  });
}

// --- Appel initial après chargement du DOM ---
document.addEventListener("DOMContentLoaded", () => {
  showHideElementsForRoles();
});

function getInfoUser() {
  console.log("Récupération des informations utilisateur...");

  let myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(apiBaseUrl + "account/me", requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Impossible de récuperer les informations de l'utilisateur");
      }
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log("erreur lors de la récupération des informations de l'utilisateur", error));
}

// --- Fin getInfoUser ---