// Enhanced dropdown animations and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menu animations
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        const parent = toggle.parentElement;
        const menu = parent.querySelector('.dropdown-menu');
        
        // Add hover animations
        parent.addEventListener('mouseenter', function() {
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.opacity = '1';
                menu.style.transform = 'translateY(0)';
            }, 10);
        });
        
        parent.addEventListener('mouseleave', function() {
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(10px)';
            setTimeout(() => {
                menu.style.display = '';
            }, 300);
        });
        
        // Mobile toggle functionality
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (window.innerWidth <= 768) {
                menu.classList.toggle('show');
                
                // Toggle arrow direction
                const arrow = toggle.querySelector('::after');
                if (arrow) {
                    arrow.style.transform = menu.classList.contains('show') ? 'rotate(180deg)' : '';
                }
            }
        });
    });
    
    // Mobile menu toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggle && navbarCollapse) {
        navbarToggle.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (navbarCollapse.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && e.target !== navbarToggle) {
                navbarCollapse.classList.remove('show');
                
                // Reset hamburger icon
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                        
                        // Reset hamburger icon
                        const spans = navbarToggle.querySelectorAll('span');
                        spans[0].style.transform = '';
                        spans[1].style.opacity = '';
                        spans[2].style.transform = '';
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link highlighting
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            
            const linkPath = link.getAttribute('href');
            if (linkPath && (currentPath.endsWith(linkPath) || (currentPath === '/' && linkPath === 'index.html'))) {
                link.classList.add('active');
                
                // If in dropdown, also highlight parent
                const dropdownParent = link.closest('.dropdown-menu');
                if (dropdownParent) {
                    const parentLink = dropdownParent.previousElementSibling;
                    if (parentLink && parentLink.classList.contains('dropdown-toggle')) {
                        parentLink.classList.add('active');
                    }
                }
            }
        });
    }
    
    // Set active link on page load
    setActiveNavLink();
});
