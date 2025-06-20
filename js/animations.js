// Enhanced animations for the Veteran Transition Platform
document.addEventListener('DOMContentLoaded', function() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                const animation = element.dataset.revealAnimation || 'fade-in';
                const delay = element.dataset.revealDelay || 0;
                
                setTimeout(() => {
                    element.classList.add('revealed');
                    element.classList.add(`animate-${animation}`);
                }, delay * 1000);
            }
        });
    }
    
    // Typing animation for hero heading
    const typingElements = document.querySelectorAll('.typing-animation');
    
    function startTypingAnimation(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';
        
        const speed = parseInt(element.dataset.typingSpeed) || 70;
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        
        typeChar();
    }
    
    // Parallax effect for hero image
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.dataset.parallaxSpeed || 0.5;
            
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
    
    // Tilt effect for cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = mouseY / -10;
            const rotateY = mouseX / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // Zoom effect on hover
    const zoomElements = document.querySelectorAll('.zoom-on-hover');
    
    zoomElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = '';
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Button animations
    const animatedButtons = document.querySelectorAll('.btn-animated');
    
    animatedButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            button.classList.add('pulse-animation');
        });
        
        button.addEventListener('mouseleave', function() {
            button.classList.remove('pulse-animation');
        });
    });
    
    // Dark mode toggle animation
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Toggle icon
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            
            // Save preference
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
    
    // Initialize animations on page load
    window.addEventListener('load', function() {
        // Start typing animations
        typingElements.forEach(element => {
            startTypingAnimation(element);
        });
        
        // Initial reveal check
        revealOnScroll();
        
        // Check back to top button
        toggleBackToTopButton();
    });
    
    // Update animations on scroll
    window.addEventListener('scroll', function() {
        revealOnScroll();
        updateParallax();
        toggleBackToTopButton();
    });
    
    // Add pulse animation class
    const style = document.createElement('style');
    style.textContent = `
        .pulse-animation {
            animation: pulse 0.5s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});
