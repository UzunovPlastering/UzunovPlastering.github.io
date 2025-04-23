document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navMenu.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Gallery Lightbox
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    const lightboxClose = document.createElement('span');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = '&times;';
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    
    const lightboxNav = document.createElement('div');
    lightboxNav.className = 'lightbox-nav';
    
    const lightboxPrev = document.createElement('span');
    lightboxPrev.className = 'lightbox-prev';
    lightboxPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const lightboxNext = document.createElement('span');
    lightboxNext.className = 'lightbox-next';
    lightboxNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    lightboxNav.appendChild(lightboxPrev);
    lightboxNav.appendChild(lightboxNext);
    
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(lightboxClose);
    lightboxContent.appendChild(lightboxCaption);
    lightboxContent.appendChild(lightboxNav);
    
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Gallery item click event
    let currentIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Update lightbox content
    function updateLightbox() {
        const item = galleryItems[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h3').textContent;
        const desc = item.querySelector('.gallery-overlay p').textContent;
        
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    }
    
    // Lightbox navigation
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    lightboxPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });
    
    lightboxNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let testimonialIndex = 0;
    
    // Hide all slides except the first one
    testimonialSlides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Show slide function
    function showSlide(index) {
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        testimonialSlides[index].style.display = 'block';
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        showSlide(testimonialIndex);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        testimonialIndex = (testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(testimonialIndex);
    });
    
    // Auto slide change
    setInterval(function() {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        showSlide(testimonialIndex);
    }, 5000);
    
    // Contact Form Submission
    const contactForm = document.getElementById('quote-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this example, we'll just show a success message
            
            const formSuccess = document.createElement('div');
            formSuccess.className = 'form-success';
            formSuccess.textContent = 'Thank you for your inquiry! We will contact you shortly.';
            
            contactForm.prepend(formSuccess);
            formSuccess.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll Animation
    const fadeElements = document.querySelectorAll('.services-grid, .gallery-grid, .video-grid, .contact-grid');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // Check on initial load
});
