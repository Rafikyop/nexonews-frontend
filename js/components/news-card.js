const NewsCard = (() => {
  function obtenerClaseCategoria(categoria) {
    const clases = {
      Tecnología: "category-badge--technology",
      Educación: "category-badge--education",
      Turismo: "category-badge--tourism",
      Negocios: "category-badge--business",
    };

    return clases[categoria] || "";
  }

  function formatearFecha(fecha) {
    const date = new Date(`${fecha}T00:00:00`);

    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  function crear(noticia) {
    const categoriaClass = obtenerClaseCategoria(noticia.categoria);

    const esFavorito = StorageService.esFavorito(noticia.id);

    const esAdmin =
      typeof AuthService !== "undefined" && AuthService.esAdministrador();

    return `
        <article
            class="news-card"
            data-id="${noticia.id}"
        >

            <div class="news-card__image-wrapper">

                <img
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                    class="news-card__image"
                >


                <button
                    class="
                        news-card__favorite
                        ${esFavorito ? "active" : ""}
                    "
                    type="button"
                    data-favorite-id="${noticia.id}"
                    aria-label="${
                      esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"
                    }"
                >
                    ${esFavorito ? "♥" : "♡"}
                </button>

            </div>


            <div class="news-card__content">

                <span
                    class="
                        category-badge
                        ${categoriaClass}
                    "
                >
                    ${noticia.categoria}
                </span>


                <h2 class="news-card__title">

                    <a
                        href="detalle.html?id=${noticia.id}"
                    >
                        ${noticia.titulo}
                    </a>

                </h2>


                <p class="news-card__description">
                    ${noticia.descripcion}
                </p>


                <div class="news-card__meta">

                    <span>
                        ${noticia.autor}
                    </span>

                    <span>
                        ${formatearFecha(noticia.fecha)}
                    </span>

                </div>


                <a
                    href="detalle.html?id=${noticia.id}"
                    class="news-card__read-more"
                >
                    Leer noticia completa →
                </a>


                ${
                  esAdmin
                    ? `
                            <div class="news-card__admin-actions">

                                <a
                                    href="crear-noticia.html?id=${noticia.id}"
                                    class="news-card__edit"
                                >
                                    Editar
                                </a>

                                <button
                                    type="button"
                                    class="news-card__delete"
                                    data-delete-id="${noticia.id}"
                                >
                                    Eliminar
                                </button>

                            </div>
                        `
                    : ""
                }

            </div>

        </article>
    `;
  }

  function configurarFavoritos(container = document) {
    const botones = container.querySelectorAll("[data-favorite-id]");

    botones.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        event.preventDefault();

        const id = boton.dataset.favoriteId;

        const activo = StorageService.alternarFavorito(id);

        boton.classList.toggle("active", activo);

        boton.textContent = activo ? "♥" : "♡";

        boton.setAttribute(
          "aria-label",
          activo ? "Quitar de favoritos" : "Agregar a favoritos",
        );
      });
    });
  }
  return {
    crear,
    configurarFavoritos,
  };
})();
