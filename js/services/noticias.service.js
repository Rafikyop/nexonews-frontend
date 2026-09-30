const NoticiasService = (() => {
  const DATA_URL = "data/noticias.json";
  const STORAGE_KEY = "nexonews_news";

  let noticiasCache = null;

  async function obtenerNoticias() {
    if (noticiasCache) {
      return noticiasCache;
    }

    const noticiasGuardadas = localStorage.getItem(STORAGE_KEY);

    if (noticiasGuardadas) {
      try {
        noticiasCache = JSON.parse(noticiasGuardadas);

        return noticiasCache;
      } catch (error) {
        console.error("Error leyendo noticias guardadas:", error);
      }
    }

    try {
      const response = await fetch(DATA_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      noticiasCache = await response.json();

      return noticiasCache;
    } catch (error) {
      console.error("Error cargando noticias:", error);

      return [];
    }
  }

  function guardarNoticias(noticias) {
    noticiasCache = noticias;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias));
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

  async function crearNoticia(datos) {
    const noticias = await obtenerNoticias();

    const nuevoId =
      noticias.length > 0
        ? Math.max(...noticias.map((noticia) => noticia.id)) + 1
        : 1;

    const nuevaNoticia = {
      id: nuevoId,
      ...datos,
      vistas: 0,
      destacada: false,
    };

    const actualizadas = [nuevaNoticia, ...noticias];

    guardarNoticias(actualizadas);

    return nuevaNoticia;
  }

  async function actualizarNoticia(id, datos) {
    const noticias = await obtenerNoticias();

    const actualizadas = noticias.map((noticia) =>
      noticia.id === Number(id)
        ? {
            ...noticia,
            ...datos,
            id: noticia.id,
          }
        : noticia,
    );

    guardarNoticias(actualizadas);

    return obtenerNoticiaPorId(id);
  }

  async function eliminarNoticia(id) {
    const noticias = await obtenerNoticias();

    const actualizadas = noticias.filter(
      (noticia) => noticia.id !== Number(id),
    );

    guardarNoticias(actualizadas);
  }

  return {
    obtenerNoticias,
    obtenerNoticiaPorId,
    obtenerDestacadas,
    obtenerPorCategoria,
    crearNoticia,
    actualizarNoticia,
    eliminarNoticia,
  };
})();
