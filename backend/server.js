const express = require("express");
const pool = require("./db");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// Verificar que la API responde.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    servicio: "nexonews-api",
  });
});

// Obtener todas las noticias.
app.get("/api/noticias", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM noticias ORDER BY id DESC",
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error consultando noticias:", error.message);

    res.status(500).json({
      error: "No fue posible consultar las noticias",
    });
  }
});

// Crear una noticia.
app.post("/api/noticias", async (req, res) => {
  const { titulo, descripcion, categoria, autor } = req.body || {};

  if (
    ![titulo, descripcion, categoria, autor].every(
      (valor) => typeof valor === "string" && valor.trim().length > 0,
    )
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios",
    });
  }

  if (titulo.length > 200 || categoria.length > 100 || autor.length > 150) {
    return res.status(400).json({
      error: "Uno o más campos superan la longitud permitida",
    });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO noticias
        (titulo, descripcion, categoria, autor)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo.trim(), descripcion.trim(), categoria.trim(), autor.trim()],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error("Error creando noticia:", error.message);

    res.status(500).json({
      error: "No fue posible crear la noticia",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
