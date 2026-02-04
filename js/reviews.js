class ReviewsCarousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.options = {
            autoplay: true,
            autoplayInterval: 5000,
            showDots: true,
            showArrows: true,
            itemsPerView: 1,
            ...options
        };
        
        this.state = {
            currentIndex: 0,
            isAnimating: false,
            autoplayTimer: null,
            reviews: []
        };
        
        this.init();
    }
    
    async init() {
        this.renderLoading();
        
        try {
            await this.loadReviews();
            this.renderCarousel();
            this.setupEventListeners();
            
            if (this.options.autoplay) {
                this.startAutoplay();
            }
            
            this.updateCarousel();
        } catch (error) {
            this.renderError(error);
        }
    }
    
    async loadReviews() {
        // Intentar cargar reseñas de Google Places API
        if (CONFIG.GOOGLE_API_KEY && CONFIG.PLACE_ID) {
            try {
                this.state.reviews = await this.loadGoogleReviews();
            } catch (error) {
                console.warn('No se pudieron cargar reseñas de Google:', error);
                this.state.reviews = this.getSimulatedReviews();
            }
        } else {
            this.state.reviews = this.getSimulatedReviews();
        }
    }
    
    async loadGoogleReviews() {
        return new Promise((resolve, reject) => {
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                reject(new Error('Google Maps API no está disponible'));
                return;
            }
            
            const service = new google.maps.places.PlacesService(document.createElement('div'));
            
            service.getDetails({
                placeId: CONFIG.PLACE_ID,
                fields: ['reviews']
            }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
                    const reviews = place.reviews.slice(0, 5).map(review => ({
                        id: review.time,
                        author: review.author_name,
                        rating: review.rating,
                        text: review.text,
                        photo: review.profile_photo_url,
                        date: new Date(review.time * 1000).toLocaleDateString('es-ES')
                    }));
                    resolve(reviews);
                } else {
                    reject(new Error('No se pudieron obtener las reseñas'));
                }
            });
        });
    }
    
    getSimulatedReviews() {
        return [
            {
                id: 1,
                author: 'María López',
                rating: 5,
                text: 'El mejor café de la ciudad. Atención impecable y ambiente acogedor.',
                photo: 'images/cafe1.jpg',
                date: '15/03/2024'
            },
            {
                id: 2,
                author: 'Carlos Méndez',
                rating: 4,
                text: 'Excelente variedad y sabores auténticos. Volveré por el croissant.',
                photo: 'images/cafe2.jpg',
                date: '12/03/2024'
            },
            {
                id: 3,
                author: 'Ana Ruiz',
                rating: 5,
                text: 'Mi lugar favorito para trabajar y disfrutar de un buen espresso.',
                photo: 'images/cafe3.jpg',
                date: '10/03/2024'
            },
            {
                id: 4,
                author: 'Jorge Pérez',
                rating: 4,
                text: 'Buena música, buen café. Recomendado para pasar la tarde.',
                photo: 'images/hero.jfif',
                date: '08/03/2024'
            },
            {
                id: 5,
                author: 'Laura González',
                rating: 5,
                text: 'Los postres son increíbles, especialmente la tarta del día.',
                photo: 'images/cafe4.jfif',
                date: '05/03/2024'
            }
        ];
    }
    
    renderLoading() {
        this.container.innerHTML = `
            <div class="loading-reviews">
                <div class="spinner"></div>
                <p>Cargando reseñas...</p>
            </div>
        `;
    }
    
    renderError(error) {
        this.container.innerHTML = `
            <div class="error-reviews">
                <i class="fas fa-exclamation-circle"></i>
                <p>No se pudieron cargar las reseñas en este momento.</p>
                <button class="retry-btn" onclick="window.location.reload()">Reintentar</button>
                <div class="simulated-reviews">
                    ${this.getSimulatedReviews().map(review => this.renderReviewCard(review)).join('')}
                </div>
            </div>
        `;
    }
    
    renderCarousel() {
        this.container.innerHTML = `
            <div class="reviews-carousel">
                <div class="reviews-track" role="region" aria-label="Reseñas de clientes">
                    ${this.state.reviews.map(review => `
                        <div class="review-slide" role="group" aria-label="Reseña ${review.author}">
                            ${this.renderReviewCard(review)}
                        </div>
                    `).join('')}
                </div>
                
                ${this.options.showArrows ? `
                    <button class="carousel-nav carousel-prev" aria-label="Reseña anterior">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="carousel-nav carousel-next" aria-label="Reseña siguiente">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                ` : ''}
                
                ${this.options.showDots ? `
                    <div class="carousel-dots" role="tablist">
                        ${this.state.reviews.map((_, index) => `
                            <button class="dot ${index === 0 ? 'active' : ''}" 
                                    role="tab" 
                                    aria-label="Ir a reseña ${index + 1}"
                                    aria-selected="${index === 0}">
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        this.track = this.container.querySelector('.reviews-track');
        this.slides = this.container.querySelectorAll('.review-slide');
        this.updateSlideWidths();
    }
    
    renderReviewCard(review) {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        return `
            <article class="review-card">
                <div class="review-header">
                    <img src="${review.photo}" alt="Foto de ${review.author}" class="review-avatar">
                    <div class="review-meta">
                        <h4 class="review-author">${review.author}</h4>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-stars" aria-label="Calificación: ${review.rating} de 5 estrellas">
                    ${stars}
                </div>
                <p class="review-text">${review.text}</p>
            </article>
        `;
    }
    
    updateSlideWidths() {
        const slideWidth = 100 / this.options.itemsPerView;
        this.slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}%`;
        });
    }
    
    setupEventListeners() {
        // Botones de navegación
        const prevBtn = this.container.querySelector('.carousel-prev');
        const nextBtn = this.container.querySelector('.carousel-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }
        
        // Dots
        const dots = this.container.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goTo(index));
        });
        
        // Pausar autoplay al interactuar
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        
        // Navegación con teclado
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Responsive: actualizar items por vista al redimensionar
        window.addEventListener('resize', () => {
            this.updateItemsPerView();
            this.updateSlideWidths();
            this.updateCarousel();
        });
    }
    
    updateItemsPerView() {
        const width = window.innerWidth;
        
        if (width >= 1200) {
            this.options.itemsPerView = 3;
        } else if (width >= 768) {
            this.options.itemsPerView = 2;
        } else {
            this.options.itemsPerView = 1;
        }
    }
    
    prev() {
        if (this.state.isAnimating) return;
        
        this.state.currentIndex--;
        if (this.state.currentIndex < 0) {
            this.state.currentIndex = this.state.reviews.length - this.options.itemsPerView;
        }
        
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    next() {
        if (this.state.isAnimating) return;
        
        this.state.currentIndex++;
        if (this.state.currentIndex > this.state.reviews.length - this.options.itemsPerView) {
            this.state.currentIndex = 0;
        }
        
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    goTo(index) {
        if (this.state.isAnimating || index === this.state.currentIndex) return;
        
        this.state.currentIndex = Math.max(0, Math.min(index, this.state.reviews.length - this.options.itemsPerView));
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    updateCarousel() {
        if (!this.track) return;
        
        this.state.isAnimating = true;
        
        const slideWidth = 100 / this.options.itemsPerView;
        const translateX = this.state.currentIndex * slideWidth;
        
        this.track.style.transform = `translateX(-${translateX}%)`;
        
        // Actualizar dots
        const dots = this.container.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            const isActive = index >= this.state.currentIndex && 
                            index < this.state.currentIndex + this.options.itemsPerView;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive);
        });
        
        // Actualizar accesibilidad de slides
        this.slides.forEach((slide, index) => {
            const isVisible = index >= this.state.currentIndex && 
                             index < this.state.currentIndex + this.options.itemsPerView;
            slide.setAttribute('aria-hidden', !isVisible);
        });
        
        // Reset animating state
        setTimeout(() => {
            this.state.isAnimating = false;
        }, 500);
    }
    
    startAutoplay() {
        if (!this.options.autoplay) return;
        
        this.state.autoplayTimer = setInterval(() => {
            this.next();
        }, this.options.autoplayInterval);
    }
    
    pauseAutoplay() {
        if (this.state.autoplayTimer) {
            clearInterval(this.state.autoplayTimer);
            this.state.autoplayTimer = null;
        }
    }
    
    resumeAutoplay() {
        if (this.options.autoplay && !this.state.autoplayTimer) {
            this.startAutoplay();
        }
    }
    
    resetAutoplay() {
        this.pauseAutoplay();
        this.resumeAutoplay();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el contenedor existe
    const reviewsContainer = document.getElementById('reviews-container');
    if (reviewsContainer) {
        // Inicializar carousel con configuración responsive
        new ReviewsCarousel('reviews-container', {
            autoplay: true,
            autoplayInterval: 5000,
            showDots: true,
            showArrows: true,
            itemsPerView: 1 // Se actualizará automáticamente en updateItemsPerView()
        });
        
        // Actualizar items por vista inicial
        setTimeout(() => {
            const carouselInstance = new ReviewsCarousel('reviews-container');
            if (carouselInstance.updateItemsPerView) {
                carouselInstance.updateItemsPerView();
                carouselInstance.updateSlideWidths();
                carouselInstance.updateCarousel();
            }
        }, 100);
    }
});

// Exportar para uso global si es necesario
window.ReviewsCarousel = ReviewsCarousel;