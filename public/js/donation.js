document.addEventListener('DOMContentLoaded', function() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const customAmountWrapper = document.querySelector('.custom-amount');
    let selectedAmount = null;

    // Handle amount button clicks
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.dataset.amount;
            
            // Remove selection from all buttons
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Clear custom amount
            customAmountInput.value = '';
            customAmountWrapper.classList.remove('active');
            
            // Select clicked button
            this.classList.add('selected');
            selectedAmount = amount;
            
            // Format amount with commas
            updateSelectedAmount(amount);
        });
    });

    // Handle custom amount input
    customAmountInput.addEventListener('focus', function() {
        // Remove selection from buttons
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        customAmountWrapper.classList.add('active');
    });

    customAmountInput.addEventListener('blur', function() {
        if (!this.value) {
            customAmountWrapper.classList.remove('active');
        }
    });

    customAmountInput.addEventListener('input', function(e) {
        // Remove non-numeric characters
        let value = this.value.replace(/[^0-9]/g, '');
        
        // Format number with commas
        if (value) {
            value = parseInt(value).toLocaleString('en-US');
            selectedAmount = value.replace(/,/g, '');
        } else {
            selectedAmount = null;
        }
        
        this.value = value;
    });

    function updateSelectedAmount(amount) {
        const formattedAmount = parseInt(amount).toLocaleString('en-US');
        console.log(`Selected amount: ${formattedAmount}₮`);
        // You can update any UI elements showing the selected amount here
    }

    // Optional: Add validation before submission
    const donateButton = document.querySelector('.donate-button');
    if (donateButton) {
        donateButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!selectedAmount) {
                alert('Хандивлах дүнгээ сонгоно уу.');
                return;
            }

            // Proceed with donation
            console.log(`Processing donation of ${selectedAmount}₮`);
        });
    }
}); 