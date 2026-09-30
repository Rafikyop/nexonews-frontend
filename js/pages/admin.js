function inicializarAdminLogin() {
  if (AuthService.esAdministrador()) {
    window.location.href = "noticias.html";

    return;
  }

  const form = document.getElementById("admin-login-form");

  if (!form) return;

  form.addEventListener("submit", manejarLogin);
}

function manejarLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("admin-email");

  const passwordInput = document.getElementById("admin-password");

  const emailError = document.getElementById("admin-email-error");

  const passwordError = document.getElementById("admin-password-error");

  const loginError = document.getElementById("admin-login-error");

  emailError.textContent = "";
  passwordError.textContent = "";

  loginError.classList.add("hidden");

  const email = emailInput.value.trim();

  const password = passwordInput.value.trim();

  let valido = true;

  if (!email) {
    emailError.textContent = "Este campo es obligatorio";

    valido = false;
  }

  if (!password) {
    passwordError.textContent = "Este campo es obligatorio";

    valido = false;
  }

  if (!valido) {
    return;
  }

  const accesoCorrecto = AuthService.iniciarSesion(email, password);

  if (!accesoCorrecto) {
    loginError.classList.remove("hidden");

    return;
  }

  window.location.href = "noticias.html";
}

document.addEventListener("DOMContentLoaded", inicializarAdminLogin);
