// Configuración global
const CONFIG = {
    GOOGLE_API_KEY: '',
    PLACE_ID: '',
    MENU_ITEMS: [
        {
            id: 1,
            name: "Cappuccino",
            description: "Café espresso con leche vaporizada y espuma suave.",
            price: "RD$ 195",
            category: "cafes",
            image: "images/cafe1.jfif"
        },
        {
            id: 2,
            name: "Latte Vainilla",
            description: "Leche cremosa con un toque dulce de vainilla.",
            price: "RD$ 215",
            category: "cafes",
            image: "images/cafe2.jfif"
        },
        {
            id: 3,
            name: "Mocha",
            description: "Chocolate, espresso y leche perfectamente mezclados.",
            price: "RD$ 225",
            category: "cafes",
            image: "images/cafe3.jfif"
        },
        {
            id: 4,
            name: "Iced Latte",
            description: "Leche fría y espresso con hielo.",
            price: "RD$ 175",
            category: "bebidas",
            image: "images/hero.jfif"
        },
        {
            id: 5,
            name: "Croissant",
            description: "Crujiente por fuera, suave por dentro.",
            price: "RD$ 85",
            category: "panaderia",
            image: "images/cafe4.jfif"
        },
        {
            id: 6,
            name: "Tarta del día",
            description: "Tarta casera con ingredientes frescos.",
            price: "RD$ 120",
            category: "postres",
            image: "images/cafe2.jfif"
        }
    ]
};

// Estado de la aplicación
const AppState = {
    currentCategory: 'cafes',
    isMenuOpen: false
};

// Elementos DOM
const DOM = {
    hamburger: document.getElementById('hamburger'),
    navLinks: document.getElementById('nav-links'),
    menuTabs: document.querySelector('.tabs'),
    menuPanels: document.querySelectorAll('.tab-panel'),
    menuGrids: document.querySelectorAll('.menu-grid')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeMenuTabs();
    initializeMenuItems();
    initializeScrollAnimations();
    initializeSmoothScroll();
});

// Navegación móvil
function initializeNavigation() {
    if (!DOM.hamburger || !DOM.navLinks) return;
    
    DOM.hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú al hacer clic en enlace
    DOM.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && AppState.isMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    AppState.isMenuOpen = !AppState.isMenuOpen;
    DOM.navLinks.classList.toggle('active');
    DOM.hamburger.setAttribute('aria-expanded', AppState.isMenuOpen);
    
    // Animación de hamburguesa a X
    const lines = DOM.hamburger.querySelectorAll('.hamburger-line');
    if (AppState.isMenuOpen) {
        lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
}

function closeMobileMenu() {
    AppState.isMenuOpen = false;
    DOM.navLinks.classList.remove('active');
    DOM.hamburger.setAttribute('aria-expanded', 'false');
    
    const lines = DOM.hamburger.querySelectorAll('.hamburger-line');
    lines[0].style.transform = 'none';
    lines[1].style.opacity = '1';
    lines[2].style.transform = 'none';
}

// Sistema de tabs del menú
function initializeMenuTabs() {
    if (!DOM.menuTabs) return;
    
    const tabButtons = DOM.menuTabs.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            switchTab(category, button);
        });
    });
}

function switchTab(category, clickedButton) {
    // Actualizar estado
    AppState.currentCategory = category;
    
    // Actualizar botones
    const tabButtons = DOM.menuTabs.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    clickedButton.classList.add('active');
    clickedButton.setAttribute('aria-selected', 'true');
    
    // Actualizar paneles
    DOM.menuPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
    });
    
    const activePanel = document.getElementById(`${category}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
        activePanel.setAttribute('aria-hidden', 'false');
    }
    
    // Cargar items si no están cargados
    if (activePanel && !activePanel.querySelector('.menu-card')) {
        loadMenuItems(category, activePanel);
    }
}

// Carga de items del menú
function initializeMenuItems() {
    // Cargar items iniciales
    const initialPanel = document.querySelector('.tab-panel.active');
    if (initialPanel) {
        loadMenuItems(AppState.currentCategory, initialPanel);
    }
    
    // Precargar otras categorías
    ['bebidas', 'panaderia', 'postres'].forEach(category => {
        const panel = document.getElementById(`${category}-panel`);
        if (panel) {
            loadMenuItems(category, panel);
        }
    });
}

function loadMenuItems(category, container) {
    const items = CONFIG.MENU_ITEMS.filter(item => item.category === category);
    
    if (items.length === 0) {
        container.innerHTML = '<p class="no-items">Próximamente disponible</p>';
        return;
    }
    
    const grid = container.querySelector('.menu-grid') || container;
    
    // Limpiar solo si no hay items ya cargados
    if (!grid.querySelector('.menu-card')) {
        grid.innerHTML = items.map(item => createMenuCard(item)).join('');
    }
    
    // Inicializar eventos de las tarjetas
    initializeMenuCardEvents();
}

function createMenuCard(item) {
    return `
        <article class="menu-card fade-in" data-category="${item.category}">
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-description">${item.description}</p>
                <span class="card-price">${item.price}</span>
            </div>
        </article>
    `;
}

function initializeMenuCardEvents() {
    const cards = document.querySelectorAll('.menu-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Aquí podrías implementar un modal o acción al hacer clic
            console.log('Card clicked:', card.querySelector('.card-title').textContent);
        });
        
        // Efecto hover con delay para evitar efectos no deseados en móvil
        let hoverTimeout;
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                hoverTimeout = setTimeout(() => {
                    card.style.transform = 'translateY(-4px)';
                }, 100);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            card.style.transform = 'translateY(0)';
        });
    });
}

// Animaciones al hacer scroll
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si es una tarjeta del menú, añadir delay escalonado
                if (entry.target.classList.contains('menu-card')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase fade-in
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    // Observar secciones
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Scroll suave para enlaces internos
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calcular posición considerando navbar fixed
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Manejo de errores
function handleError(error, context) {
    console.error(`Error en ${context}:`, error);
    
    // Mostrar mensaje amigable al usuario si es necesario
    if (context === 'menu') {
        const container = document.querySelector('.menu-grid');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Lo sentimos, no pudimos cargar el menú.</p>
                    <button onclick="location.reload()">Reintentar</button>
                </div>
            `;
        }
    }
}

// Exportar funciones necesarias globalmente
window.toggleMobileMenu = toggleMobileMenu;
window.switchTab = switchTab;

// Carrito en navbar
function initializeCartInNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Crear icono de carrito
    const cartLink = document.createElement('a');
    cartLink.href = 'cart.html';
    cartLink.className = 'nav-link';
    cartLink.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count" id="cart-count">0</span>
    `;
    cartLink.style.position = 'relative';
    
    // Insertar antes del hamburger button en móvil, o en nav-links en desktop
    if (window.innerWidth <= 768) {
        navbar.insertBefore(cartLink, DOM.hamburger);
    } else {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const li = document.createElement('li');
            li.appendChild(cartLink);
            navLinks.appendChild(li);
        }
    }
    
    // Actualizar contador del carrito
    updateCartCountInNavbar();
}

function updateCartCountInNavbar() {
    const cart = JSON.parse(localStorage.getItem('atalia_cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Llamar en DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...
    initializeCartInNavbar();
    
    // Actualizar contador cuando cambie el carrito
    window.addEventListener('storage', (e) => {
        if (e.key === 'atalia_cart') {
            updateCartCountInNavbar();
        }
    });
});