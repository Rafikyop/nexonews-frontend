const StorageService = (() => {
  const FAVORITES_KEY = "nexonews_favorites";

  function obtenerFavoritos() {
    const data = localStorage.getItem(FAVORITES_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error leyendo favoritos:", error);

      return [];
    }
  }

  function guardarFavoritos(favoritos) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
  }

  function esFavorito(id) {
    const favoritos = obtenerFavoritos();

    return favoritos.includes(Number(id));
  }

  function agregarFavorito(id) {
    const noticiaId = Number(id);

    const favoritos = obtenerFavoritos();

    if (favoritos.includes(noticiaId)) {
      return favoritos;
    }

    favoritos.push(noticiaId);

    guardarFavoritos(favoritos);

    return favoritos;
  }

  function eliminarFavorito(id) {
    const noticiaId = Number(id);

    const favoritos = obtenerFavoritos().filter((item) => item !== noticiaId);

    guardarFavoritos(favoritos);

    return favoritos;
  }

  function alternarFavorito(id) {
    if (esFavorito(id)) {
      eliminarFavorito(id);

      return false;
    }

    agregarFavorito(id);

    return true;
  }

  return {
    obtenerFavoritos,
    guardarFavoritos,
    esFavorito,
    agregarFavorito,
    eliminarFavorito,
    alternarFavorito,
  };
})();
