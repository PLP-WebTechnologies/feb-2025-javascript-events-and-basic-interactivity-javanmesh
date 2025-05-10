// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== EVENT HANDLING SECTION ==========
    
    // Button click event
    const launchBtn = document.getElementById('launch-btn');
    let isLaunched = false;
    
    launchBtn.addEventListener('click', function() {
        isLaunched = !isLaunched;
        if (isLaunched) {
            this.textContent = 'Mission Active 🌌';
            this.classList.add('launched');
            // Add some animation to the page for fun
            document.body.style.background = 'linear-gradient(135deg, #000428, #004e92)';
        } else {
            this.textContent = 'Launch Rocket';
            this.classList.remove('launched');
            document.body.style.background = 'linear-gradient(135deg, #171b30, #2c3e50)';
        }
    });
    
    // Hover effect
    const hoverArea = document.getElementById('hover-area');
    const factDisplay = document.getElementById('fact-display');
    
    // Array of space facts
    const spaceFacts = [
        "A day on Venus is longer than a year on Venus.",
        "The hottest planet in our solar system is Venus.",
        "There is a planet made of diamonds twice the size of Earth.",
        "The Sun makes up 99.86% of the mass in the solar system.",
        "The Moon is moving away from the Earth at a rate of 3.8 cm per year."
    ];
    
    hoverArea.addEventListener('mouseenter', function() {
        // Display a random space fact
        const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
        factDisplay.textContent = `Space Fact: ${randomFact}`;
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        factDisplay.textContent = '';
    });
    
    // Keypress detection
    const keyDisplay = document.getElementById('key-display');
    
    document.addEventListener('keydown', function(event) {
        keyDisplay.textContent = `Key pressed: ${event.key}`;
        
        // Add a little animation to the key display
        keyDisplay.classList.add('shake');
        setTimeout(() => {
            keyDisplay.classList.remove('shake');
        }, 300);
        
        // Space navigation with arrow keys (for gallery)
        if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        }
    });
    
    // Secret double-click action
    const secretArea = document.getElementById('secret-area');
    
    secretArea.addEventListener('dblclick', function() {
        this.textContent = '🚀 Secret mission activated! Check the console for coordinates.';
        this.style.backgroundColor = 'rgba(142, 84, 233, 0.2)';
        this.style.color = '#3a1c71';
        this.style.fontWeight = 'bold';
        
        // Actually do something fun in the console
        console.log('🛸 Secret mission coordinates: Alpha Centauri, 4.37 light years away');
        console.log('Mission details loading...');
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.textContent = 'Double-click for a secret mission';
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            this.style.color = '';
            this.style.fontWeight = '';
        }, 3000);
    });
    
    // ========== INTERACTIVE ELEMENTS SECTION ==========
    
    // Image Gallery/Slideshow
    const galleryImg = document.getElementById('gallery-img');
    const imageCaption = document.getElementById('image-caption');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Image gallery data (using placeholder images with different dimensions)
    const galleryImages = [
        { src: '/api/placeholder/800/400', caption: 'Explore the cosmos' },
        { src: '/api/placeholder/800/400', caption: 'The Red Planet: Mars' },
        { src: '/api/placeholder/800/400', caption: 'The International Space Station' },
        { src: '/api/placeholder/800/400', caption: 'Saturn and its magnificent rings' },
        { src: '/api/placeholder/800/400', caption: 'The Stunning Aurora Borealis' }
    ];
    
    let currentImageIndex = 0;
    
    // Function to update the gallery image and caption
    function updateGallery() {
        const currentImage = galleryImages[currentImageIndex];
        
        // Apply a fade-out effect
        galleryImg.style.opacity = '0';
        
        // Change the image and caption after a short delay
        setTimeout(() => {
            galleryImg.src = currentImage.src;
            imageCaption.textContent = currentImage.caption;
            
            // Fade the image back in
            galleryImg.style.opacity = '1';
        }, 300);
    }
    
    // Function to go to the next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGallery();
    }
    
    // Function to go to the previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGallery();
    }
    
    // Add event listeners to the gallery buttons
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Add transition for smooth fade effect
    galleryImg.style.transition = 'opacity 0.3s ease';
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to activate
            const tabToActivate = this.getAttribute('data-tab');
            
            // Activate the corresponding panel
            document.getElementById(`${tabToActivate}-panel`).classList.add('active');
        });
    });
    
    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the parent accordion item
            const accordionItem = this.parentElement;
            accordionItem.classList.toggle('active');
        });
    });
    
    // ========== FORM VALIDATION SECTION ==========
    
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const missionSelect = document.getElementById('mission');
    const termsCheckbox = document.getElementById('terms');
    
    // Form error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const missionError = document.getElementById('mission-error');
    const termsError = document.getElementById('terms-error');
    
    // Password strength elements
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    // Submission message
    const submissionMessage = document.getElementById('submission-message');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            nameError.textContent = 'Name is required';
            this.classList.add('invalid');
            this.classList.remove('valid');
        } else if (this.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            this.classList.add('invalid');
            this.classList.remove('valid');
        } else {
            nameError.textContent = '';
            this.classList.remove('invalid');
            this.classList.add('valid');
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            emailError.textContent = 'Email is required';
            this.classList.add('invalid');
            this.classList.remove('valid');
        } else if (!emailPattern.test(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
            this.classList.add('invalid');
            this.classList.remove('valid');
        } else {
            emailError.textContent = '';
            this.classList.remove('invalid');
            this.classList.add('valid');
        }
    });
    
    // Real-time validation and strength meter for password
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let feedback = '';
        
        // Check password requirements
        if (password === '') {
            feedback = 'Password is required';
            strengthBar.className = 'strength-bar';
            strengthText.textContent = 'Password strength';
            this.classList.add('invalid');
            this.classList.remove('valid');
        } else {
            // Check password length
            if (password.length < 8) {
                feedback = 'Password must be at least 8 characters';
                this.classList.add('invalid');
                this.classList.remove('valid');
            } else {
                this.classList.remove('invalid');
                this.classList.add('valid');
                feedback = '';
                
                // Calculate password strength
                strength += password.length >= 8 ? 1 : 0;
                strength += /[A-Z]/.test(password) ? 1 : 0;
                strength += /[a-z]/.test(password) ? 1 : 0;
                strength += /[0-9]/.test(password) ? 1 : 0;
                strength += /[^A-Za-z0-9]/.test(password) ? 1 : 0;
                
                // Update strength indicator
                if (strength <= 2) {
                    strengthBar.className = 'strength-bar weak';
                    strengthText.textContent = 'Weak';
                    strengthText.style.color = '#dc3545';
                } else if (strength <= 3) {
                    strengthBar.className = 'strength-bar medium';
                    strengthText.textContent = 'Medium';
                    strengthText.style.color = '#ffc107';
                } else {
                    strengthBar.className = 'strength-bar strong';
                    strengthText.textContent = 'Strong';
                    strengthText.style.color = '#28a745';
                }
            }
        }
        
        passwordError.textContent = feedback;
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('invalid');
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('invalid');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('invalid');
            isValid = false;
        }
        
        // Validate password
        if (passwordInput.value === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('invalid');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('invalid');
            isValid = false;
        }
        
        // Validate mission selection
        if (missionSelect.value === '') {
            missionError.textContent = 'Please select a mission';
            missionSelect.classList.add('invalid');
            isValid = false;
        } else {
            missionError.textContent = '';
            missionSelect.classList.remove('invalid');
            missionSelect.classList.add('valid');
        }
        
        // Validate terms checkbox
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the terms';
            isValid = false;
        } else {
            termsError.textContent = '';
        }
        
        // If the form is valid, display a success message
        if (isValid) {
            submissionMessage.textContent = `Mission registration successful! Welcome aboard, ${nameInput.value}!`;
            submissionMessage.className = 'success';
            
            // Reset the form
            setTimeout(() => {
                form.reset();
                submissionMessage.textContent = '';
                submissionMessage.className = '';
                
                // Clear validation classes
                const formInputs = form.querySelectorAll('input, select');
                formInputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
                
                // Reset password strength indicator
                strengthBar.className = 'strength-bar';
                strengthText.textContent = 'Password strength';
                strengthText.style.color = '';
            }, 3000);
        }
    });
    
    // Auto-validate mission select on change
    missionSelect.addEventListener('change', function() {
        if (this.value === '') {
            missionError.textContent = 'Please select a mission';
            this.classList.add('invalid');
            this.classList.remove('valid');
        } else {
            missionError.textContent = '';
            this.classList.remove('invalid');
            this.classList.add('valid');
        }
    });
    
    // Auto-validate terms checkbox on change
    termsCheckbox.addEventListener('change', function() {
        if (!this.checked) {
            termsError.textContent = 'You must agree to the terms';
        } else {
            termsError.textContent = '';
        }
    });
    
    // Set up an image slide show timer
    setInterval(nextImage, 5000);
});