document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR (Mismo comportamiento que Home)
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    window.addEventListener('scroll', () => {
        if (isMenuOpen) return;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            navbar?.classList.remove('-translate-y-full');
            navbar?.classList.add('shadow-lg');
        } else {
            navbar?.classList.remove('shadow-lg');
        }
    }, { passive: true });

    menuBtn?.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        menuBtn.classList.toggle('menu-open');
        if (isMenuOpen) {
            mobileMenu?.classList.remove('translate-x-full');
        } else {
            mobileMenu?.classList.add('translate-x-full');
        }
    });

    // 2. CARRUSEL DE ARTÍCULOS
    const track = document.getElementById('blog-track');
    const prevBtn = document.getElementById('blog-prev');
    const nextBtn = document.getElementById('blog-next');

    if (track && prevBtn && nextBtn) {
        // Desplazamiento manual simple por tarjeta
        const scrollAmount = () => {
            // Ancho de tarjeta + gap
            const card = track.querySelector('article');
            return card ? card.offsetWidth + 32 : 400;
        };

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
    }
});