document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons with safety check
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                attrs: {
                    'class': 'lucide',
                    'stroke-width': 2
                }
            });
        }
    };
    initIcons();

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Navbar Scroll Effect
    const header = document.getElementById('main-nav');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-overlay nav a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Simple Toast notification system
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '100px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#0F172A';
        toast.style.color = 'white';
        toast.style.padding = '1rem 2rem';
        toast.style.borderRadius = '50px';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        toast.style.zIndex = '3000';
        toast.style.fontSize = '0.9rem';
        toast.style.fontWeight = '600';
        toast.text = message;
        toast.innerHTML = `<div style="display:flex; align-items:center; gap:0.5rem">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ${message}
        </div>`;
        
        document.body.appendChild(toast);
        
        // Anim entry
        toast.animate([
            { transform: 'translateX(-50%) translateY(20px)', opacity: 0 },
            { transform: 'translateX(-50%) translateY(0)', opacity: 1 }
        ], { duration: 300, easing: 'ease-out' });

        setTimeout(() => {
            toast.animate([
                { transform: 'translateX(-50%) translateY(0)', opacity: 1 },
                { transform: 'translateX(-50%) translateY(20px)', opacity: 0 }
            ], { duration: 300, easing: 'ease-in' }).onfinish = () => {
                toast.remove();
            };
        }, 3000);
    };

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Glassmorphism hover effect for cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Lightbox Functionality
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const body = document.body;

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <button class="lightbox-close"><i data-lucide="x"></i></button>
        <div class="lightbox-content">
            <img src="" alt="Enlarged Project Work">
            <div class="lightbox-caption"></div>
        </div>
    `;
    body.appendChild(lightbox);
    
    // Refresh lucide for the close icon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons({
            attrs: {
                'class': 'lucide',
                'stroke-width': 2
            },
            nameAttr: 'data-lucide'
        });
    }

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    showcaseItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.showcase-overlay span').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        if (!mobileMenu.classList.contains('active')) {
            body.style.overflow = '';
        }
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            closeLightbox();
        }
    });
});

