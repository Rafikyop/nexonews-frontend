async function cargarDetalleNoticia() {
  const container = document.getElementById("news-detail");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  if (!id) {
    mostrarNoticiaNoEncontrada(container);

    return;
  }

  const noticia = await NoticiasService.obtenerNoticiaPorId(id);

  if (!noticia) {
    mostrarNoticiaNoEncontrada(container);

    return;
  }

  actualizarTituloPagina(noticia.titulo);

  renderizarDetalle(container, noticia);

  configurarFavoritoDetalle(noticia);
}

function actualizarTituloPagina(titulo) {
  document.title = `${titulo} | NexoNews`;
}

function formatearFechaDetalle(fecha) {
  const date = new Date(`${fecha}T00:00:00`);

  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function obtenerClaseCategoriaDetalle(categoria) {
  const clases = {
    Tecnología: "category-badge--technology",

    Educación: "category-badge--education",

    Turismo: "category-badge--tourism",

    Negocios: "category-badge--business",
  };

  return clases[categoria] || "";
}

function renderizarDetalle(container, noticia) {
  const categoriaClass = obtenerClaseCategoriaDetalle(noticia.categoria);

  const contenido = noticia.contenido
    .map((parrafo) => `<p>${parrafo}</p>`)
    .join("");

  container.innerHTML = `
        <article class="news-detail">

            <div class="news-detail__breadcrumb">

                <a href="index.html">
                    Inicio
                </a>

                <span> / </span>

                <a
                    href="noticias.html?categoria=${encodeURIComponent(
                      noticia.categoria,
                    )}"
                >
                    ${noticia.categoria}
                </a>

                <span> / </span>

                <span>
                    Detalle
                </span>

            </div>


            <header class="news-detail__header">

                <span
                    class="
                        category-badge
                        ${categoriaClass}
                    "
                >
                    ${noticia.categoria}
                </span>


                <h1 class="news-detail__title">
                    ${noticia.titulo}
                </h1>


                <p class="news-detail__description">
                    ${noticia.descripcion}
                </p>


                <div class="news-detail__meta">

                    <span>
                        ${noticia.autor}
                    </span>

                    <span>•</span>

                    <span>
                        ${formatearFechaDetalle(noticia.fecha)}
                    </span>

                    <span>•</span>

                    <span>
                        ${noticia.tiempoLectura}
                    </span>

                    <span>•</span>

                    <span>
                        ${noticia.vistas.toLocaleString("es-CO")} vistas
                    </span>

                </div>

            </header>


            <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="news-detail__image"
            >


            <div class="news-detail__actions">

                <button
                    id="detail-favorite-button"
                    class="news-detail__favorite"
                    type="button"
                    data-news-id="${noticia.id}"
                >
                    ♡ Agregar a favoritos
                </button>

            </div>


            <div class="news-detail__content">
                ${contenido}
            </div>

        </article>
    `;
}

function mostrarNoticiaNoEncontrada(container) {
  container.innerHTML = `
        <div class="not-found">

            <h1>
                Noticia no encontrada
            </h1>

            <p>
                La noticia que buscas no existe
                o ya no está disponible.
            </p>

            <a
                href="noticias.html"
                class="button button--primary"
            >
                Volver a noticias
            </a>

        </div>
    `;
}

function configurarFavoritoDetalle(noticia) {
  const boton = document.getElementById("detail-favorite-button");

  if (!boton) return;

  function actualizarBoton() {
    const favorito = StorageService.esFavorito(noticia.id);

    boton.textContent = favorito
      ? "♥ Quitar de favoritos"
      : "♡ Agregar a favoritos";

    boton.classList.toggle("active", favorito);
  }

  actualizarBoton();

  boton.addEventListener("click", () => {
    StorageService.alternarFavorito(noticia.id);

    actualizarBoton();
  });
}

document.addEventListener("DOMContentLoaded", cargarDetalleNoticia);
