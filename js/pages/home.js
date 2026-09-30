async function cargarNoticiasDestacadas() {
  const container = document.getElementById("featured-news");

  if (!container) return;

  const noticias = await NoticiasService.obtenerDestacadas();

  if (noticias.length === 0) {
    container.innerHTML = `
            <p>
                No hay noticias destacadas disponibles.
            </p>
        `;
    return;
  }

  container.innerHTML = noticias
    .map((noticia) => NewsCard.crear(noticia))
    .join("");

  NewsCard.configurarFavoritos(container);
}

document.addEventListener("DOMContentLoaded", cargarNoticiasDestacadas);
