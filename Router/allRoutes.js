import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route("/galerie", "La galerie", "/pages/galerie.html",[],"js/galerie.js",),
  new Route("/signin", "Connexion", "/pages/Auth/signin.html",["disconnected"],"js/auth/signin.js",),
  new Route("/signup", "Inscription", "/pages/Auth/signup.html",["disconnected"],"js/Auth/signup.js",),
  new Route("/account", "Mon compte", "/pages/Auth/account.html",["client","admin"]),
  new Route("/editPassword", "Changement de mot de passe", "/pages/Auth/editPassword.html",["client","admin"]),
  new Route("/allResa", "Vos réservations", "/pages/Reservations/allResa.html",["client"]),
  new Route("/reserver", "Réserver", "/pages/Reservations/reserver.html",["client"]),

];


//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
