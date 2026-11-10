const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    servicio: "nexonews-api",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
