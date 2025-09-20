import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/galerie", "La galerie", "/pages/galerie.html"),
  new Route("/signin", "Connexion", "/pages//Auth/signin.html"),
  new Route("/signup", "Inscription", "/pages/Auth/signup.html"),
  new Route("/account", "Mon compte", "/pages/Auth/account.html"),
  new Route("/editPassword", "Changement de mot de passe", "/pages/Auth/editPassword.html"),


];


//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
