let noticias = [];

let categoriaActiva = "Todas";

let textoBusqueda = "";

async function inicializarPaginaNoticias() {
  noticias = await NoticiasService.obtenerNoticias();

  aplicarCategoriaDesdeUrl();

  configurarFiltros();

  configurarBuscador();

  renderizarNoticias();
}

function aplicarCategoriaDesdeUrl() {
  const params = new URLSearchParams(window.location.search);

  const categoria = params.get("categoria");

  if (!categoria) {
    return;
  }

  const categoriasValidas = ["Tecnología", "Educación", "Turismo", "Negocios"];

  if (!categoriasValidas.includes(categoria)) {
    return;
  }

  categoriaActiva = categoria;

  const botones = document.querySelectorAll(".filter-button");

  botones.forEach((boton) => {
    boton.classList.toggle("active", boton.dataset.category === categoria);
  });
}

function configurarFiltros() {
  const botones = document.querySelectorAll(".filter-button");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      categoriaActiva = boton.dataset.category;

      botones.forEach((item) => item.classList.remove("active"));

      boton.classList.add("active");

      renderizarNoticias();
    });
  });
}

function configurarBuscador() {
  const input = document.getElementById("news-search");

  if (!input) return;

  input.addEventListener("input", (event) => {
    textoBusqueda = event.target.value.trim().toLowerCase();

    renderizarNoticias();
  });
}

function obtenerNoticiasFiltradas() {
  return noticias.filter((noticia) => {
    const coincideCategoria =
      categoriaActiva === "Todas" || noticia.categoria === categoriaActiva;

    const texto = `
                    ${noticia.titulo}
                    ${noticia.descripcion}
                    ${noticia.autor}
                `.toLowerCase();

    const coincideBusqueda = texto.includes(textoBusqueda);

    return coincideCategoria && coincideBusqueda;
  });
}

function renderizarNoticias() {
  const container = document.getElementById("news-list");

  const counter = document.getElementById("news-count");

  const empty = document.getElementById("news-empty");

  if (!container) return;

  const filtradas = obtenerNoticiasFiltradas();

  counter.textContent = `${filtradas.length} noticia${
    filtradas.length === 1 ? "" : "s"
  } encontrada${filtradas.length === 1 ? "" : "s"}`;

  if (filtradas.length === 0) {
    container.innerHTML = "";

    empty.classList.remove("hidden");

    return;
  }

  empty.classList.add("hidden");

  container.innerHTML = filtradas
    .map((noticia) => NewsCard.crear(noticia))
    .join("");
  NewsCard.configurarFavoritos(container);
}

document.addEventListener("DOMContentLoaded", inicializarPaginaNoticias);
