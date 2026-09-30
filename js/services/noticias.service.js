const NoticiasService = (() => {
  const DATA_URL = "data/noticias.json";

  let noticiasCache = null;

  async function obtenerNoticias() {
    if (noticiasCache) {
      return noticiasCache;
    }

    try {
      const response = await fetch(DATA_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const noticias = await response.json();

      noticiasCache = noticias;

      return noticias;
    } catch (error) {
      console.error("Error al cargar las noticias:", error);

      return [];
    }
  }

  async function obtenerNoticiaPorId(id) {
    const noticias = await obtenerNoticias();

    return noticias.find((noticia) => noticia.id === Number(id));
  }

  async function obtenerDestacadas() {
    const noticias = await obtenerNoticias();

    return noticias.filter((noticia) => noticia.destacada);
  }

  async function obtenerPorCategoria(categoria) {
    const noticias = await obtenerNoticias();

    if (!categoria || categoria === "Todas") {
      return noticias;
    }

    return noticias.filter((noticia) => noticia.categoria === categoria);
  }

  return {
    obtenerNoticias,
    obtenerNoticiaPorId,
    obtenerDestacadas,
    obtenerPorCategoria,
  };
})();
