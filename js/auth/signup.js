const inputNom = document.getElementById('NomInput');
const inputPrenom = document.getElementById('PrenomInput');
const inputMail = document.getElementById('EmailInput');
const inputPassword = document.getElementById('PasswordInput');
const inputValidatePassword = document.getElementById('ValidatePasswordInput');
const btnValidation = document.getElementById('btn-validation-inscription');
const formInscription = document.getElementById('formulaireInscription');


[inputNom, inputPrenom, inputMail, inputPassword, inputValidatePassword]
  .forEach(input => input.addEventListener("keyup", validateForm));

function validateForm() {  
  const nomOk = validateRequired(inputNom);
  const prenomOk = validateRequired(inputPrenom);
  const emailOk = validateMail(inputMail);
  const passwordOk = validatePassword(inputPassword);
  const passwordConfirmOk = validatePasswordConfirmation(inputPassword, inputValidatePassword);

  btnValidation.disabled = !(nomOk && prenomOk && emailOk && passwordOk && passwordConfirmOk);
}

function validateMail(input) {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return toggleValidation(input, mailRegex.test(input.value));
}

function validatePassword(input) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-]).{8,}$/;
  return toggleValidation(input, passwordRegex.test(input.value));
}

function validatePasswordConfirmation(inputPwd, inputValidatePwd) {
  if (inputValidatePwd.value.trim() === '') return toggleValidation(inputValidatePwd, false);
  return toggleValidation(inputValidatePwd, inputPwd.value === inputValidatePwd.value);
}

function validateRequired(input) {
  return toggleValidation(input, input.value.trim() !== '');
}

function toggleValidation(input, isValid) {
  if (isValid) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
  }
  return isValid;
}

btnValidation.addEventListener('click', (e) => {
    e.preventDefault();
    if (!btnValidation.disabled) {
        InscrireUtilisateur();
    }
});

async function InscrireUtilisateur() {
  let dataform = new FormData(formInscription);

  console.log("InscrireUtilisateur appelé");
 let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
  "firstName": dataform.get('Nom'),
  "lastName": dataform.get('Prenom'),
  "email": dataform.get('Email'),
  "password": dataform.get('Password')
});


let requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(apiUrl + "registration", requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription. Code HTTP : " + response.status);
    }
    return response.json();
  })
  .then(result => {
    alert("Bravo " + dataform.get('Prenom') , "Vous êtes inscrit avec succès ! Vous pouvez maintenant vous connecter.");
    document.location.href = "/signin.html";
  })
  .catch(error => {
    console.error("Erreur front:", error);
    alert("Erreur lors de l'inscription. Veuillez réessayer.");
  });
}
