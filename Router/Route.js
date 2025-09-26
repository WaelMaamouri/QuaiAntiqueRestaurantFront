export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}

/*
[] - tout le monde
["disconnected"] - utilisateur déconnecté
["client"] - utilisateur connecté avec role clients
["admin"] - administrateur connecté
["client","admin"] - utilisateur client ou admin connecté
*/