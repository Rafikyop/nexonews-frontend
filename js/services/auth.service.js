const AuthService = (() => {
  const SESSION_KEY = "nexonews_admin_session";

  // Credenciales simuladas para el prototipo académico
  const ADMIN_EMAIL = "admin@nexonews.com";
  const ADMIN_PASSWORD = "nexo2026";

  function iniciarSesion(email, password) {
    const credencialesValidas =
      email === ADMIN_EMAIL && password === ADMIN_PASSWORD;

    if (!credencialesValidas) {
      return false;
    }

    const session = {
      email: ADMIN_EMAIL,
      role: "admin",
      loggedIn: true,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return true;
  }

  function cerrarSesion() {
    localStorage.removeItem(SESSION_KEY);
  }

  function obtenerSesion() {
    const data = localStorage.getItem(SESSION_KEY);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error leyendo la sesión:", error);

      return null;
    }
  }

  function esAdministrador() {
    const session = obtenerSesion();

    return Boolean(session && session.loggedIn && session.role === "admin");
  }

  return {
    iniciarSesion,
    cerrarSesion,
    obtenerSesion,
    esAdministrador,
  };
})();
