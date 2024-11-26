document.addEventListener('DOMContentLoaded', function() {
    // Handle amount button selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customInput = document.querySelector('.custom-amount input');

    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update input value
            customInput.value = this.textContent.replace('₮', '');
        });
    });

    // Handle form submission
    const donateBtn = document.querySelector('.donate-btn');
    donateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your payment processing logic here
        alert('Төлбөр төлөх хэсэг руу шилжиж байна...');
    });
}); 