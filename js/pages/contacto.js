const ContactForm = (() => {
  const fields = {
    name: null,
    email: null,
    subject: null,
    message: null,
  };

  const errors = {
    name: null,
    email: null,
    subject: null,
    message: null,
  };

  function init() {
    const form = document.getElementById("contact-form");

    if (!form) return;

    fields.name = document.getElementById("name");

    fields.email = document.getElementById("email");

    fields.subject = document.getElementById("subject");

    fields.message = document.getElementById("message");

    errors.name = document.getElementById("error-name");

    errors.email = document.getElementById("error-email");

    errors.subject = document.getElementById("error-subject");

    errors.message = document.getElementById("error-message");

    configurarValidacionEnTiempoReal();

    form.addEventListener("submit", manejarEnvio);
  }

  function validarNombre() {
    const value = fields.name.value.trim();

    if (!value) {
      mostrarError("name", "Este campo es obligatorio");

      return false;
    }

    if (value.length < 3) {
      mostrarError("name", "El nombre debe tener al menos 3 caracteres");

      return false;
    }

    limpiarError("name");

    return true;
  }

  function validarEmail() {
    const value = fields.email.value.trim();

    if (!value) {
      mostrarError("email", "Este campo es obligatorio");

      return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(value)) {
      mostrarError("email", "Ingrese un correo electrónico válido");

      return false;
    }

    limpiarError("email");

    return true;
  }

  function validarAsunto() {
    const value = fields.subject.value;

    if (!value) {
      mostrarError("subject", "Seleccione un asunto");

      return false;
    }

    limpiarError("subject");

    return true;
  }

  function validarMensaje() {
    const value = fields.message.value.trim();

    if (!value) {
      mostrarError("message", "Este campo es obligatorio");

      return false;
    }

    if (value.length < 10) {
      mostrarError("message", "El mensaje debe tener al menos 10 caracteres");

      return false;
    }

    limpiarError("message");

    return true;
  }

  function mostrarError(fieldName, message) {
    fields[fieldName].classList.add("form-control--error");

    errors[fieldName].textContent = message;
  }

  function limpiarError(fieldName) {
    fields[fieldName].classList.remove("form-control--error");

    errors[fieldName].textContent = "";
  }

  function validarFormulario() {
    const nombreValido = validarNombre();

    const emailValido = validarEmail();

    const asuntoValido = validarAsunto();

    const mensajeValido = validarMensaje();

    return nombreValido && emailValido && asuntoValido && mensajeValido;
  }

  function configurarValidacionEnTiempoReal() {
    fields.name.addEventListener("blur", validarNombre);

    fields.email.addEventListener("blur", validarEmail);

    fields.subject.addEventListener("change", validarAsunto);

    fields.message.addEventListener("blur", validarMensaje);
  }

  function manejarEnvio(event) {
    event.preventDefault();

    const success = document.getElementById("form-success");

    success.classList.add("hidden");

    if (!validarFormulario()) {
      return;
    }

    success.classList.remove("hidden");

    event.target.reset();

    Object.keys(fields).forEach((field) => limpiarError(field));
  }

  return {
    init,
  };
})();

document.addEventListener("DOMContentLoaded", ContactForm.init);
