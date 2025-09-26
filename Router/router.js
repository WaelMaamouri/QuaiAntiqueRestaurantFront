import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Route 404
const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

// Récupérer la route correspondant à l'URL
const getRouteByUrl = (url) => {
  let currentRoute = null;
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });
  return currentRoute || route404;
};

// Fonction pour ouvrir la modal d'édition/suppression
function openReservationModal(reservationId) {
  const modalEl = document.getElementById('editionReservation');
  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);

  // Remplir le champ avec la réservation
  const reservationInput = document.getElementById('ReservationInput');
  reservationInput.value = `Réservation n°${reservationId}`; // À adapter avec tes données réelles

  // Bouton modifier
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      console.log(`Modification réservation ${reservationId}`);
      modal.hide();
    };
  }

  // Bouton supprimer
  const deleteBtn = document.getElementById('deleteBtn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      console.log(`Suppression réservation ${reservationId}`);
      modal.hide();
    };
  }

  // Affiche la modal
  modal.show();
}

// Charger le contenu de la page
const LoadContentPage = async () => {
  const path = window.location.hash.replace("#", "") || "/";
  const actualRoute = getRouteByUrl(path);

  //Vérification des droits d'accès
  const allRolesArray = actualRoute.authorize;

  if (allRolesArray.length > 0) {
    if (allRolesArray.includes("disconnected")) {
      if (isConnected){
        window.location.replace("/#");
      }
    }
    else {
      const roleUser = getRole();
      if (allRolesArray.includes(roleUser)) {
        window.location.replace = "/#";
    }
  }}

  // Charger le HTML
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  // Charger le JS spécifique
  if (actualRoute.pathJS != "") {
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);
    document.querySelector("body").appendChild(scriptTag);
  }

  // Changer le titre
  document.title = actualRoute.title + " - " + websiteName;

  //Afficher et masquer en fonction du role
  showHideElementsForRoles();

  // Si la route correspond à une réservation, ouvrir la modal
  if (path.startsWith("/reservation/")) {
    const reservationId = path.split("/")[2];
    openReservationModal(reservationId);
  }
};

// Gestion des clics sur les liens
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  LoadContentPage();
};

// Historique et chargement initial
window.onpopstate = LoadContentPage;
window.route = routeEvent;
LoadContentPage();



var titi= 'dodo'