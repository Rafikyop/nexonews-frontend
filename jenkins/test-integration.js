const assert = require("node:assert/strict");

async function probarIntegracion() {
  const base = "http://web";

  const health = await fetch(`${base}/api/health`);
  assert.equal(health.status, 200);

  const nueva = {
    titulo: "Prueba Jenkins NexoNews",
    descripcion: "Integracion automatizada con PostgreSQL",
    categoria: "Tecnologia",
    autor: "Jenkins",
  };

  const post = await fetch(`${base}/api/noticias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nueva),
  });

  assert.equal(post.status, 201);

  const creada = await post.json();
  assert.ok(creada.id);

  const get = await fetch(`${base}/api/noticias`);
  assert.equal(get.status, 200);

  const noticias = await get.json();

  assert.ok(
    noticias.some((n) => n.id === creada.id),
    "La noticia no fue recuperada",
  );

  console.log("SUCCESS: noticia creada y recuperada");
  console.log("SUCCESS: comunicacion entre contenedores");
}

probarIntegracion().catch((error) => {
  console.error(error);
  process.exit(1);
});
