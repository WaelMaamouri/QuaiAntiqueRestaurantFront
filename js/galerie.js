const galerieImage = document.getElementById("allImages");

// Exemple de titre et source image
let titre = "<img src=x onerror=\"window.location.replace('https://google.com')\">";
let imgSource = "../images/chef.jpg";

let monImage = createImageCard(titre, imgSource);
galerieImage.appendChild(monImage);

function sanitizeText(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}

function createImageCard(titre, urlImage) {
    // Sécurisation du texte
    titre = sanitizeText(titre);

    // Création des éléments DOM
    const col = document.createElement("div");
    col.className = "col p-3";

    const card = document.createElement("div");
    card.className = "image-card text-white";

    const img = document.createElement("img");
    img.src = urlImage;
    img.className = "rounded w-100";

    const p = document.createElement("p");
    p.className = "titre-image";
    p.textContent = titre;

    const actions = document.createElement("div");
    actions.className = "action-image-buttons";
    actions.setAttribute("data-show", "admin");

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-outline-light";
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#editionPhotoModal");
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-outline-light";
    deleteBtn.setAttribute("data-bs-toggle", "modal");
    deleteBtn.setAttribute("data-bs-target", "#deletePhotoModal");
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';

    // Construction
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(actions);

    col.appendChild(card);

    return col;
}
