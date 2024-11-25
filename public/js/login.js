document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        updateDots();
    }

    // Auto-play functionality
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // Change slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slide.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // Modal Controls
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');

    if (!loginBtn || !loginModal || !closeModal) {
        console.error('Required elements not found');
        return;
    }

    // Open modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
        // Force reflow
        loginModal.offsetHeight;
        loginModal.classList.add('active');
    });

    // Close modal
    function closeLoginModal() {
        loginModal.classList.add('closing');
        loginModal.classList.remove('active');
        
        setTimeout(() => {
            loginModal.style.display = 'none';
            loginModal.classList.remove('closing');
        }, 300);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.style.display === 'flex') {
            closeLoginModal();
        }
    });

    closeModal.addEventListener('click', closeLoginModal);

    // Close on outside click
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });

    // Prevent closing when clicking inside modal
    loginModal.querySelector('.modal-container').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}); 