// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Alternar entre tema claro y oscuro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cargar el tema guardado en localStorage (si existe)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'light-theme' ? '🌙' : '☀️';
}

// Alternar tema al hacer clic en el botón
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark-theme');
        themeToggle.textContent = '🌙';
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        themeToggle.textContent = '☀️';
    }
});

// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = [
            'img/img1.jpg',
            'img/img2.jpg',
            'img/img3.jpg'
        ];
        this.currentSlide = 0;
        this.sliderContainer = document.querySelector('.hero-slider');
        this.autoPlayInterval = null;
        this.initSlider();
        this.startAutoPlay();
    }

    initSlider() {
        // Limpiar el contenedor
        this.sliderContainer.innerHTML = '';
        
        // Crear las imágenes
        this.slides.forEach((slide, index) => {
            const img = document.createElement('img');
            img.src = slide;
            img.className = index === 0 ? 'active' : '';
            this.sliderContainer.appendChild(img);
        });

        // Añadir controles de navegación
        this.addNavigation();
    }

    addNavigation() {
        // Botones prev/next
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        
        prevBtn.className = 'slider-nav prev';
        nextBtn.className = 'slider-nav next';
        
        prevBtn.innerHTML = '&#10094;';
        nextBtn.innerHTML = '&#10095;';

        prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });

        this.sliderContainer.appendChild(prevBtn);
        this.sliderContainer.appendChild(nextBtn);

        // Indicadores
        const indicators = document.createElement('div');
        indicators.className = 'slider-indicators';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
            indicators.appendChild(dot);
        });

        this.sliderContainer.appendChild(indicators);
    }

    nextSlide() {
        this.goToSlide((this.currentSlide + 1) % this.slides.length);
    }

    prevSlide() {
        this.goToSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
    }

    goToSlide(index) {
        const images = this.sliderContainer.querySelectorAll('img');
        const dots = this.sliderContainer.querySelectorAll('.dot');
        
        images[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');

        this.currentSlide = index;

        images[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    let isValid = true;
    formData.forEach((value, key) => {
        if (!value.trim()) {
            isValid = false;
        }
    });

    if (isValid) {
        alert('Mensaje enviado correctamente');
        contactForm.reset();
    } else {
        alert('Por favor, complete todos los campos');
    }
});

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});

// Animaciones al hacer scroll
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.3 }); // Se activa cuando el 30% del elemento es visible

elementsToAnimate.forEach((el) => observer.observe(el));
