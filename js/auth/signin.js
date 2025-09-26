const EmailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

// URL de l'API (à adapter si besoin)
const apiUrl = "http://127.0.0.1:8000/api/";

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(e) {

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    username: EmailInput.value,   // <-- récupère directement les inputs
    password: PasswordInput.value
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl + "login", requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } 
      else {
        EmailInput.classList.add("is-invalid");
        PasswordInput.classList.add("is-invalid");
      }
    })
    .then(result => {
      const token = result.apiToken;
      setToken(token);
      setCookie(RoleCookieName, result.roles[0], 7);
      window.location.replace("/#");
    })
    .catch(error => console.log('error', error));
}