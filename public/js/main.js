// Add staggered animation to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.campaign-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Optional: Add intersection observer for animation when cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
});
document.getElementById('donateBtn').addEventListener('click', function() {
    window.location.href = '/campaign-detail.html';
});
