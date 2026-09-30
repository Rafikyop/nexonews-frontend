async function cargarFavoritos() {
  const container = document.getElementById("favorites-list");

  const empty = document.getElementById("favorites-empty");

  if (!container || !empty) {
    return;
  }

  const idsFavoritos = StorageService.obtenerFavoritos();

  if (idsFavoritos.length === 0) {
    container.innerHTML = "";

    empty.classList.remove("hidden");

    return;
  }

  const noticias = await NoticiasService.obtenerNoticias();

  const favoritas = noticias.filter((noticia) =>
    idsFavoritos.includes(noticia.id),
  );

  if (favoritas.length === 0) {
    container.innerHTML = "";

    empty.classList.remove("hidden");

    return;
  }

  empty.classList.add("hidden");

  container.innerHTML = favoritas
    .map((noticia) => NewsCard.crear(noticia))
    .join("");

  configurarEliminacionFavoritos(container);
}

function configurarEliminacionFavoritos(container) {
  const botones = container.querySelectorAll("[data-favorite-id]");

  botones.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();

      const id = boton.dataset.favoriteId;

      StorageService.eliminarFavorito(id);

      cargarFavoritos();
    });
  });
}

document.addEventListener("DOMContentLoaded", cargarFavoritos);
