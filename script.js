// Common JavaScript for MAV Egypt Website
document.addEventListener('DOMContentLoaded', function() {
    // Dropdown submenu functionality
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
    
    dropdownSubmenus.forEach(function(submenu) {
        const submenuToggle = submenu.querySelector('.dropdown-toggle');
        const submenuMenu = submenu.querySelector('.dropdown-menu');
        
        submenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other submenus
            dropdownSubmenus.forEach(function(otherSubmenu) {
                if (otherSubmenu !== submenu) {
                    otherSubmenu.classList.remove('show');
                }
            });
            
            // Toggle current submenu
            submenu.classList.toggle('show');
        });
    });
    
    // Close submenus when main dropdown closes
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.products-dropdown')) {
            dropdownSubmenus.forEach(function(submenu) {
                submenu.classList.remove('show');
            });
        }
    });

    // Floating Contact Widget Functionality
    const contactWidget = document.querySelector('.floating-contact-widget');
    if (contactWidget) {
        const contactToggle = document.querySelector('.contact-toggle');
        const contactOptions = document.querySelector('.contact-options');

        // Toggle contact options visibility
        contactToggle.addEventListener('click', function() {
            contactWidget.classList.toggle('active');
        });

        // Close contact options when clicking outside
        document.addEventListener('click', function(event) {
            if (!contactWidget.contains(event.target)) {
                contactWidget.classList.remove('active');
            }
        });

        // Add smooth entrance animation on page load
        setTimeout(() => {
            contactWidget.classList.add('show');
        }, 2000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-custom');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile menu close on link click
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    if (navCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // Product page animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.spec-card, .application-card, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
