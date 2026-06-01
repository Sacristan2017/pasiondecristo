const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menú y animación hamburguesa
hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
  hamburger.classList.toggle('open');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
    hamburger.classList.remove('open');
  });
});
