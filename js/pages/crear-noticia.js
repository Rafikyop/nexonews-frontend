let noticiaEditando = null;

async function inicializarFormularioAdmin() {
  if (!AuthService.esAdministrador()) {
    window.location.href = "admin.html";

    return;
  }

  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  if (id) {
    noticiaEditando = await NoticiasService.obtenerNoticiaPorId(id);

    if (!noticiaEditando) {
      alert("La noticia no existe.");

      window.location.href = "noticias.html";

      return;
    }

    cargarDatosEdicion(noticiaEditando);
  }

  const form = document.getElementById("news-admin-form");

  form?.addEventListener("submit", guardarNoticia);
}

function cargarDatosEdicion(noticia) {
  document.getElementById("admin-form-title").textContent = "Editar noticia";

  document.getElementById("news-title").value = noticia.titulo;

  document.getElementById("news-category").value = noticia.categoria;

  document.getElementById("news-image").value = noticia.imagen;

  document.getElementById("news-description").value = noticia.descripcion;

  document.getElementById("news-content").value =
    noticia.contenido.join("\n\n");
}

async function guardarNoticia(event) {
  event.preventDefault();

  const titulo = document.getElementById("news-title").value.trim();

  const categoria = document.getElementById("news-category").value;

  const imagen = document.getElementById("news-image").value.trim();

  const descripcion = document.getElementById("news-description").value.trim();

  const contenidoTexto = document.getElementById("news-content").value.trim();

  if (!titulo || !categoria || !imagen || !descripcion || !contenidoTexto) {
    alert("Todos los campos son obligatorios.");

    return;
  }

  const contenido = contenidoTexto
    .split(/\n\s*\n/)
    .map((parrafo) => parrafo.trim())
    .filter(Boolean);

  const datos = {
    titulo,
    categoria,
    imagen,
    descripcion,
    contenido,

    fecha: new Date().toISOString().split("T")[0],

    autor: noticiaEditando ? noticiaEditando.autor : "Administrador NexoNews",

    tiempoLectura: noticiaEditando ? noticiaEditando.tiempoLectura : "5 min",
  };

  if (noticiaEditando) {
    await NoticiasService.actualizarNoticia(noticiaEditando.id, datos);
  } else {
    await NoticiasService.crearNoticia(datos);
  }

  window.location.href = "noticias.html";
}

document.addEventListener("DOMContentLoaded", inicializarFormularioAdmin);
