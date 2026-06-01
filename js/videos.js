// videos.js
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('player');
    const closeModal = document.getElementById('closeModal');
    const videoCards = document.querySelectorAll('.video-card');
    
    // Abrir modal al hacer clic en una tarjeta de video
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            player.src = videoSrc;
            modal.classList.add('active');
            player.play();
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        player.pause();
        player.src = '';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            player.pause();
            player.src = '';
        }
    });
    
    // Prevenir que el clic en el video cierre el modal
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Manejar el final del video
    player.addEventListener('ended', function() {
        setTimeout(() => {
            modal.classList.remove('active');
            player.src = '';
        }, 2000);
    });
});