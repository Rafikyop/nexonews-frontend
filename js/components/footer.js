async function loadFooter() {
  const container = document.getElementById("footer");

  if (!container) return;

  try {
    const response = await fetch("components/footer.html");

    if (!response.ok) {
      throw new Error("No se pudo cargar el footer.");
    }

    container.innerHTML = await response.text();

    setCurrentYear();
  } catch (error) {
    console.error("Error cargando footer:", error);
  }
}

function setCurrentYear() {
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

loadFooter();
