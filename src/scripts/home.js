document.addEventListener('DOMContentLoaded', () => {

    // 1. SPLASH SCREEN
    const video = document.getElementById('intro-video');
    const overlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');
    const skipBtn = document.getElementById('skip-intro');

    function finalizarIntro() {
        if(!overlay || !mainContent) return;
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        mainContent.style.opacity = '1';
        setTimeout(() => { overlay.style.display = 'none'; }, 700);
    }

    if (video) {
        video.onended = finalizarIntro;
        skipBtn?.addEventListener('click', finalizarIntro);
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => { console.log("Autoplay bloqueado"); });
        }
    } else {
        finalizarIntro();
    }

    // 2. NAVBAR SCROLL & MOBILE MENU
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
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

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            document.body.style.overflow = '';
            menuBtn?.classList.remove('menu-open');
            mobileMenu?.classList.add('translate-x-full');
        });
    });

    // 3. SLIDER PORTAFOLIO
    const sliderTrack = document.getElementById('slider-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.indicator-dot');

    if (sliderTrack && prevBtn && nextBtn) {
        const totalItems = 5;
        let currentIndex = 0;
        let autoSlideInterval;

        const updateSlider = () => {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                if(idx === currentIndex) {
                    dot.classList.remove('bg-white/20');
                    dot.classList.add('bg-yellow-400', 'scale-125');
                } else {
                    dot.classList.add('bg-white/20');
                    dot.classList.remove('bg-yellow-400', 'scale-125');
                }
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateSlider();
        };

        const startTimer = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 4000);
        };

        const resetTimer = () => {
            startTimer();
        };

        nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index || '0');
                currentIndex = index;
                updateSlider();
                resetTimer();
            });
        });

        const sliderContainer = sliderTrack.parentElement?.parentElement;
        sliderContainer?.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderContainer?.addEventListener('mouseleave', startTimer);

        updateSlider();
        startTimer();
    }
});