async function loadNavbar() {
  const container = document.getElementById("navbar");

  if (!container) return;

  try {
    const response = await fetch("components/navbar.html");

    if (!response.ok) {
      throw new Error("No se pudo cargar el navbar.");
    }

    container.innerHTML = await response.text();

    setActiveNavLink();
    setupMobileMenu();
  } catch (error) {
    console.error("Error cargando navbar:", error);
  }
}

function setActiveNavLink() {
  const currentPage =
    window.location.pathname.split("/").pop().replace(".html", "") || "index";

  const navLinks = document.querySelectorAll("[data-page]");

  navLinks.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupMobileMenu() {
  const button = document.getElementById("mobile-menu-button");

  const menu = document.getElementById("mobile-menu");

  if (!button || !menu) return;

  button.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

loadNavbar();
