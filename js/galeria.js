document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.getElementById('close-lightbox');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const imagenes = document.querySelectorAll('.imagen-item');

  const imagenesArray = Array.from(imagenes);
  let currentIndex = 0;

  const esMovil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // ============================
  // Modo móvil
  // ============================
  if (esMovil) {
    imagenes.forEach(item => {
      const src = item.getAttribute('data-src');
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(src, '_blank');
      });
    });
    return;
  }

  // ============================
  // Modo escritorio - Lightbox
  // ============================
  function abrirLightbox(index) {
    currentIndex = index;
    lightboxImg.src = imagenesArray[currentIndex].getAttribute('data-src');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    actualizarFlechas();
  }

  function cerrarLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => lightboxImg.src = '', 300);
    document.body.style.overflow = '';
  }

  function anterior() {
    if (currentIndex > 0) {
      currentIndex--;
      lightboxImg.src = imagenesArray[currentIndex].getAttribute('data-src');
      actualizarFlechas();
    }
  }

  function siguiente() {
    if (currentIndex < imagenesArray.length - 1) {
      currentIndex++;
      lightboxImg.src = imagenesArray[currentIndex].getAttribute('data-src');
      actualizarFlechas();
    }
  }

  function actualizarFlechas() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === imagenesArray.length - 1;
  }

  imagenes.forEach((item, index) => {
    item.addEventListener('click', () => abrirLightbox(index));
  });

  closeLightbox.addEventListener('click', cerrarLightbox);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') cerrarLightbox();
    else if (e.key === 'ArrowLeft') anterior();
    else if (e.key === 'ArrowRight') siguiente();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) cerrarLightbox();
  });

  prevBtn.addEventListener('click', anterior);
  nextBtn.addEventListener('click', siguiente);

  actualizarFlechas();
});
