// Datos del menú
const MENU_DATA = {
    trending: [
        {
            id: 1,
            name: "Caramel Macchiato",
            description: "Espresso con leche vaporizada, caramelo y vainilla.",
            price: "RD$ 225",
            image: "images/cafe.jpg",
            featured: true,
            details: {
                calories: "250",
                caffeine: "150mg",
                size: "Grande"
            }
        },
        {
            id: 2,
            name: "Iced Matcha Latte",
            description: "Matcha premium con leche y hielo.",
            price: "RD$ 195",
            image: "images/cafe2.jpg",
            featured: true,
            details: {
                calories: "180",
                caffeine: "80mg",
                size: "Grande"
            }
        },
        {
            id: 3,
            name: "Croissant de Almendra",
            description: "Crujiente croissant relleno de crema de almendra.",
            price: "RD$ 120",
            image: "images/cafe3.jpg",
            featured: true,
            details: {
                calories: "320",
                vegetarian: true
            }
        }
    ],
    
    'hot-coffee': [
        {
            id: 4,
            name: "Espresso",
            description: "Café puro y concentrado, servido en shot.",
            price: "RD$ 95",
            image: "images/cafe1.jpg",
            details: {
                calories: "5",
                caffeine: "75mg",
                size: "Solo"
            }
        },
        {
            id: 5,
            name: "Americano",
            description: "Espresso diluido con agua caliente.",
            price: "RD$ 125",
            image: "images/cafe2.jpg",
            details: {
                calories: "10",
                caffeine: "150mg",
                size: "Grande"
            }
        },
        {
            id: 6,
            name: "Cappuccino",
            description: "Espresso con leche vaporizada y espuma cremosa.",
            price: "RD$ 155",
            image: "images/cafe3.jpg",
            details: {
                calories: "120",
                caffeine: "150mg",
                size: "Grande"
            }
        },
        {
            id: 7,
            name: "Latte",
            description: "Espresso suave con leche vaporizada.",
            price: "RD$ 165",
            image: "images/cafe4.jpg",
            details: {
                calories: "190",
                caffeine: "150mg",
                size: "Grande"
            }
        },
        {
            id: 8,
            name: "Mocha",
            description: "Espresso con chocolate y leche vaporizada.",
            price: "RD$ 185",
            image: "images/cafe4.jpg",
            details: {
                calories: "290",
                caffeine: "175mg",
                size: "Grande"
            }
        },
        {
            id: 9,
            name: "Flat White",
            description: "Espresso ristretto con microespuma de leche.",
            price: "RD$ 175",
            image: "images/hot-coffee6.jpg",
            details: {
                calories: "150",
                caffeine: "130mg",
                size: "Mediano"
            }
        }
    ],
    
    'cold-coffee': [
        {
            id: 10,
            name: "Iced Americano",
            description: "Espresso sobre hielo con agua fría.",
            price: "RD$ 135",
            image: "images/cold-coffee1.jpg",
            details: {
                calories: "15",
                caffeine: "150mg",
                size: "Grande"
            }
        },
        {
            id: 11,
            name: "Cold Brew",
            description: "Café infusionado en frío por 20 horas.",
            price: "RD$ 165",
            image: "images/cold-coffee2.jpg",
            details: {
                calories: "5",
                caffeine: "200mg",
                size: "Grande"
            }
        },
        {
            id: 12,
            name: "Iced Latte",
            description: "Espresso con leche fría y hielo.",
            price: "RD$ 175",
            image: "images/cold-coffee3.jpg",
            details: {
                calories: "130",
                caffeine: "150mg",
                size: "Grande"
            }
        },
        {
            id: 13,
            name: "Iced Caramel Macchiato",
            description: "Leche fría, hielo, espresso y caramelo.",
            price: "RD$ 195",
            image: "images/cold-coffee4.jpg",
            details: {
                calories: "250",
                caffeine: "150mg",
                size: "Grande"
            }
        }
    ],
    
    matcha: [
        {
            id: 14,
            name: "Matcha Latte",
            description: "Matcha ceremonial con leche vaporizada.",
            price: "RD$ 185",
            image: "images/matcha1.jpg",
            details: {
                calories: "240",
                caffeine: "70mg",
                vegetarian: true
            }
        },
        {
            id: 15,
            name: "Iced Matcha Latte",
            description: "Matcha con leche fría y hielo.",
            price: "RD$ 195",
            image: "images/matcha2.jpg",
            details: {
                calories: "200",
                caffeine: "70mg",
                vegetarian: true
            }
        }
    ],
    
    bakery: [
        {
            id: 16,
            name: "Croissant Clásico",
            description: "Hojaldre tradicional francés.",
            price: "RD$ 85",
            image: "images/bakery1.jpg",
            details: {
                calories: "272",
                vegetarian: true
            }
        },
        {
            id: 17,
            name: "Pain au Chocolat",
            description: "Croissant con barritas de chocolate.",
            price: "RD$ 95",
            image: "images/bakery2.jpg",
            details: {
                calories: "340",
                vegetarian: true
            }
        },
        {
            id: 18,
            name: "Muffin de Arándanos",
            description: "Muffin esponjoso con arándanos frescos.",
            price: "RD$ 75",
            image: "images/bakery3.jpg",
            details: {
                calories: "420",
                vegetarian: true
            }
        }
    ],
    
    desserts: [
        {
            id: 19,
            name: "Tarta de Queso",
            description: "Clásica tarta de queso con base de galleta.",
            price: "RD$ 125",
            image: "images/dessert1.jpg",
            details: {
                calories: "480",
                vegetarian: true
            }
        },
        {
            id: 20,
            name: "Brownie de Chocolate",
            description: "Brownie húmedo con nueces.",
            price: "RD$ 95",
            image: "images/dessert2.jpg",
            details: {
                calories: "520",
                vegetarian: true
            }
        }
    ]
};

// Estado de la aplicación
const MenuState = {
    currentCategory: 'trending',
    selectedStore: null,
    cart: [],
    isLoading: false
};

// Elementos DOM
const MenuDOM = {
    sidebarLinks: document.querySelectorAll('.sidebar-link'),
    menuCategories: document.querySelectorAll('.menu-category'),
    storeSelector: document.getElementById('store-selector'),
    storeModal: document.getElementById('store-modal'),
    modalClose: document.getElementById('modal-close'),
    selectStoreBtns: document.querySelectorAll('.select-store-btn'),
    categoryGrids: document.querySelectorAll('.category-grid'),
    sidebar: document.querySelector('.menu-sidebar')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeMenuNavigation();
    initializeStoreSelector();
    initializeMenuItems();
    initializeMobileSidebar();
    initializeCart();
    initializeScrollDetection();
    initializeScrollProgress();
    
});
function initializeScrollProgress() {
    if (window.innerWidth <= 768) return;
    
    const menuContent = document.querySelector('.menu-content');
    if (!menuContent) return;
    
    // Crear elemento de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    menuContent.addEventListener('scroll', () => {
        const scrollTop = menuContent.scrollTop;
        const scrollHeight = menuContent.scrollHeight - menuContent.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

// Navegación del menú
function initializeMenuNavigation() {
    MenuDOM.sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = link.dataset.category;
            const target = document.getElementById(category);
            
            if (target) {
                // Actualizar enlaces activos
                MenuDOM.sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Ocultar todas las categorías
                MenuDOM.menuCategories.forEach(cat => {
                    cat.classList.remove('active');
                });
                
                // Mostrar categoría seleccionada
                target.classList.add('active');
                MenuState.currentCategory = category;
                
                // Scroll suave a la categoría
                if (window.innerWidth > 768) {
                    // En desktop, hacer scroll dentro del menu-content
                    const menuContent = document.querySelector('.menu-content');
                    const offsetTop = target.offsetTop;
                    
                    menuContent.scrollTo({
                        top: offsetTop - 100, // Compensar con padding
                        behavior: 'smooth'
                    });
                } else {
                    // En móvil, scroll general de la página
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    closeMobileSidebar();
                }
                
                // Cargar items si no están cargados
                loadCategoryItems(category);
            }
        });
    });
}
// Detectar scroll para actualizar sidebar activo
function initializeScrollDetection() {
    if (window.innerWidth <= 768) return; // Solo en desktop
    
    const menuContent = document.querySelector('.menu-content');
    if (!menuContent) return;
    
    menuContent.addEventListener('scroll', () => {
        // Debounce para mejor performance
        clearTimeout(MenuState.scrollTimeout);
        MenuState.scrollTimeout = setTimeout(() => {
            updateActiveCategoryOnScroll();
        }, 100);
    });
}
function updateActiveCategoryOnScroll() {
    const menuContent = document.querySelector('.menu-content');
    if (!menuContent) return;
    
    const scrollPosition = menuContent.scrollTop + 150; // Offset para activar antes
    
    // Encontrar categoría visible
    let activeCategory = 'trending';
    MenuDOM.menuCategories.forEach(category => {
        const element = document.getElementById(category.dataset.category);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                activeCategory = category.dataset.category;
            }
        }
    });
    
    // Actualizar sidebar
    MenuDOM.sidebarLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.category === activeCategory);
    });
}

// Selector de tienda
function initializeStoreSelector() {
    if (!MenuDOM.storeSelector || !MenuDOM.storeModal) return;
    
    // Abrir modal
    MenuDOM.storeSelector.addEventListener('click', () => {
        MenuDOM.storeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    MenuDOM.modalClose.addEventListener('click', closeStoreModal);
    MenuDOM.storeModal.addEventListener('click', (e) => {
        if (e.target === MenuDOM.storeModal) {
            closeStoreModal();
        }
    });
    
    // Seleccionar tienda
    MenuDOM.selectStoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const storeId = btn.dataset.store;
            selectStore(storeId);
            closeStoreModal();
        });
    });
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && MenuDOM.storeModal.classList.contains('active')) {
            closeStoreModal();
        }
    });
}

function closeStoreModal() {
    MenuDOM.storeModal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectStore(storeId) {
    MenuState.selectedStore = storeId;
    
    // Actualizar UI
    const storeBtn = MenuDOM.storeSelector;
    const stores = {
        '1': 'Atalia Café Centro',
        '2': 'Atalia Café Norte',
        '3': 'Atalia Café Este'
    };
    
    if (stores[storeId]) {
        storeBtn.innerHTML = `
            <span>${stores[storeId]}</span>
            <i class="fas fa-check"></i>
        `;
        storeBtn.classList.add('selected');
        
        // Mostrar notificación
        showNotification(`Tienda seleccionada: ${stores[storeId]}`, 'success');
    }
}

// Carga de items del menú
function initializeMenuItems() {
    // Cargar categoría inicial
    loadCategoryItems(MenuState.currentCategory);
    
    // Precargar otras categorías
    ['hot-coffee', 'cold-coffee', 'matcha', 'bakery', 'desserts'].forEach(category => {
        setTimeout(() => loadCategoryItems(category), 100);
    });
}

function loadCategoryItems(category) {
    const container = document.querySelector(`#${category} .category-grid`);
    if (!container) return;
    
    // Verificar si ya hay items cargados
    if (container.querySelector('.product-card')) {
        return;
    }
    
    const items = MENU_DATA[category] || [];
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="no-items-message">
                <i class="fas fa-coffee"></i>
                <h3>Próximamente</h3>
                <p>Estamos trabajando en nuevas opciones para esta categoría.</p>
            </div>
        `;
        return;
    }
    
    // Mostrar skeleton mientras carga
    container.innerHTML = Array(3).fill(`
        <div class="product-card skeleton"></div>
    `).join('');
    
    // Simular carga (en producción sería una llamada API)
    setTimeout(() => {
        container.innerHTML = items.map(item => createProductCard(item)).join('');
        initializeProductCards();
    }, 500);
}

function createProductCard(item) {
    const isFeatured = item.featured || false;
    
    return `
        <article class="product-card-compact" data-id="${item.id}">
            <div class="product-image-compact">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                ${isFeatured ? '<span class="product-badge-compact">⭐</span>' : ''}
            </div>
            <div class="product-content-compact">
                <h3 class="product-name-compact">${item.name}</h3>
                <div class="product-price-compact">${item.price}</div>
                <button class="product-add-compact" data-id="${item.id}">
                    <i class="fas fa-plus"></i>
                    Añadir
                </button>
            </div>
        </article>
    `;
}

// En js/menu.js
function initializeProductCards() {
    // Modal de producto
    const productModal = document.createElement('div');
    productModal.className = 'product-modal';
    productModal.innerHTML = `
        <div class="modal-product-content">
            <div class="modal-product-header">
                <img id="modal-product-image" src="" alt="">
                <button class="modal-close-btn" id="modal-product-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-product-body">
                <h2 id="modal-product-name"></h2>
                <div id="modal-product-price" class="modal-product-price"></div>
                <p id="modal-product-description" class="modal-product-description"></p>
                
                <div class="customization-section" id="size-section">
                    <h3 class="customization-title">
                        <i class="fas fa-glass-whiskey"></i>
                        Tamaño
                    </h3>
                    <div class="customization-options" id="size-options">
                        <!-- Opciones de tamaño se generan dinámicamente -->
                    </div>
                </div>
                
                <div class="customization-section" id="extras-section">
                    <h3 class="customization-title">
                        <i class="fas fa-plus-circle"></i>
                        Extras
                    </h3>
                    <div class="customization-options" id="extras-options">
                        <!-- Opciones de extras se generan dinámicamente -->
                    </div>
                </div>
                
                <div class="quantity-selector">
                    <button class="quantity-btn" id="quantity-decrease">-</button>
                    <span class="quantity-display" id="quantity-display">1</span>
                    <button class="quantity-btn" id="quantity-increase">+</button>
                </div>
                
                <div class="modal-product-footer">
                    <button class="modal-add-btn" id="modal-add-to-cart">
                        <i class="fas fa-plus"></i>
                        Añadir al carrito
                    </button>
                    <button class="modal-customize-btn" id="modal-save-favorite">
                        <i class="far fa-heart"></i>
                        Favorito
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(productModal);
    
    // Event listeners para el modal
    const modalClose = document.getElementById('modal-product-close');
    const modal = document.querySelector('.product-modal');
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Event listeners para productos compactos
    document.querySelectorAll('.product-card-compact').forEach(card => {
        card.addEventListener('click', function(e) {
            // No abrir modal si se hace clic en el botón de añadir
            if (e.target.closest('.product-add-compact')) return;
            
            const productId = this.dataset.id;
            openProductModal(productId);
        });
    });
    
    // Botones de añadir compactos
    document.querySelectorAll('.product-add-compact').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que abra el modal
            const productId = this.dataset.id;
            openProductModal(productId);
        });
    });
    
    // Funcionalidad del modal
    document.getElementById('quantity-decrease').addEventListener('click', () => {
        const display = document.getElementById('quantity-display');
        let quantity = parseInt(display.textContent);
        if (quantity > 1) {
            display.textContent = quantity - 1;
        }
    });
    
    document.getElementById('quantity-increase').addEventListener('click', () => {
        const display = document.getElementById('quantity-display');
        let quantity = parseInt(display.textContent);
        display.textContent = quantity + 1;
    });
    
    // Opciones de tamaño
    const sizeOptions = ['Pequeño', 'Mediano', 'Grande'];
    const sizeContainer = document.getElementById('size-options');
    sizeOptions.forEach(size => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'customization-option';
        option.textContent = size;
        option.dataset.value = size.toLowerCase();
        option.addEventListener('click', function() {
            sizeContainer.querySelectorAll('.customization-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
        sizeContainer.appendChild(option);
    });
    
    // Seleccionar mediano por defecto
    setTimeout(() => {
        sizeContainer.querySelector('[data-value="mediano"]').click();
    }, 100);
    
    // Opciones de extras
    const extrasOptions = [
        { name: 'Extra Café', price: '+RD$ 20' },
        { name: 'Leche Almendra', price: '+RD$ 25' },
        { name: 'Crema Batida', price: '+RD$ 15' },
        { name: 'Shot Vainilla', price: '+RD$ 30' }
    ];
    
    const extrasContainer = document.getElementById('extras-options');
    extrasOptions.forEach(extra => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'customization-option';
        option.innerHTML = `
            <span>${extra.name}</span>
            <small>${extra.price}</small>
        `;
        option.dataset.name = extra.name;
        option.dataset.price = extra.price;
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
        extrasContainer.appendChild(option);
    });
    
    // Añadir al carrito desde modal
    document.getElementById('modal-add-to-cart').addEventListener('click', function() {
        const productId = this.dataset.productId;
        const quantity = parseInt(document.getElementById('quantity-display').textContent);
        const selectedSize = sizeContainer.querySelector('.selected')?.dataset.value || 'mediano';
        
        // Calcular extras seleccionados
        const selectedExtras = [];
        extrasContainer.querySelectorAll('.selected').forEach(extra => {
            selectedExtras.push({
                name: extra.dataset.name,
                price: extra.dataset.price
            });
        });
        
        addToCart(productId, quantity, selectedSize, selectedExtras);
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

function openProductModal(productId) {
    // Buscar producto
    let product = null;
    for (const category in MENU_DATA) {
        product = MENU_DATA[category].find(p => p.id === parseInt(productId));
        if (product) break;
    }
    
    if (!product) return;
    
    // Actualizar modal con datos del producto
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-image').alt = product.name;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = product.price;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-add-to-cart').dataset.productId = productId;
    
    // Resetear cantidad
    document.getElementById('quantity-display').textContent = '1';
    
    // Mostrar modal
    const modal = document.querySelector('.product-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function addToCart(productId, quantity = 1, size = 'mediano', extras = []) {
    // Verificar tienda seleccionada
    if (!MenuState.selectedStore) {
        showNotification('Por favor, selecciona una tienda primero', 'warning');
        document.getElementById('store-selector').click();
        return;
    }
    
    // Buscar producto
    let product = null;
    for (const category in MENU_DATA) {
        product = MENU_DATA[category].find(p => p.id === parseInt(productId));
        if (product) break;
    }
    
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Calcular precio con extras
    let basePrice = parseFloat(product.price.replace('RD$ ', ''));
    let extrasPrice = 0;
    extras.forEach(extra => {
        const extraPrice = parseFloat(extra.price.match(/\d+/)[0]);
        extrasPrice += extraPrice;
    });
    
    const totalPrice = basePrice + extrasPrice;
    
    // Añadir al carrito
    const cartItem = {
        ...product,
        quantity: quantity,
        size: size,
        extras: extras,
        totalPrice: `RD$ ${totalPrice}`,
        store: MenuState.selectedStore
    };
    
    MenuState.cart.push(cartItem);
    localStorage.setItem('atalia_cart', JSON.stringify(MenuState.cart));
    updateCartCount();
    
    showNotification(`${product.name} x${quantity} añadido al carrito`, 'success');
}



// Sidebar móvil
function initializeMobileSidebar() {
    if (window.innerWidth > 768) return;
    
    // Crear botón toggle para móvil
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.setAttribute('aria-label', 'Abrir menú de categorías');
    document.body.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', toggleMobileSidebar);
    
    // Cerrar sidebar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!MenuDOM.sidebar.contains(e.target) && 
            !toggleBtn.contains(e.target) &&
            MenuDOM.sidebar.classList.contains('active')) {
            closeMobileSidebar();
        }
    });
}

function toggleMobileSidebar() {
    MenuDOM.sidebar.classList.toggle('active');
}

function closeMobileSidebar() {
    MenuDOM.sidebar.classList.remove('active');
}

// Carrito de compras
function initializeCart() {
    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem('atalia_cart');
    if (savedCart) {
        try {
            MenuState.cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error cargando el carrito:', e);
            MenuState.cart = [];
        }
    }
    
    // Actualizar contador del carrito
    updateCartCount();
}

function addToCart(productId) {
    // Verificar si hay tienda seleccionada
    if (!MenuState.selectedStore) {
        showNotification('Por favor, selecciona una tienda primero', 'warning');
        MenuDOM.storeSelector.click();
        return;
    }
    
    // Buscar producto
    let product = null;
    for (const category in MENU_DATA) {
        product = MENU_DATA[category].find(p => p.id === productId);
        if (product) break;
    }
    
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Añadir al carrito
    const cartItem = {
        ...product,
        quantity: 1,
        store: MenuState.selectedStore,
        customization: {}
    };
    
    MenuState.cart.push(cartItem);
    
    // Guardar en localStorage
    localStorage.setItem('atalia_cart', JSON.stringify(MenuState.cart));
    
    // Actualizar UI
    updateCartCount();
    
    // Mostrar notificación
    showNotification(`${product.name} añadido al carrito`, 'success');
    
    // Animación del botón
    const addBtn = document.querySelector(`.product-add[data-id="${productId}"]`);
    if (addBtn) {
        addBtn.innerHTML = '<i class="fas fa-check"></i> Añadido';
        addBtn.style.background = 'var(--secondary-color)';
        
        setTimeout(() => {
            addBtn.innerHTML = '<i class="fas fa-plus"></i> Añadir';
            addBtn.style.background = '';
        }, 2000);
    }
}

function updateCartCount() {
    const count = MenuState.cart.reduce((total, item) => total + item.quantity, 0);
    
    // Actualizar en navbar (si existe)
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

function showCustomizationModal(productId) {
    // Implementar modal de personalización
    console.log('Personalizar producto:', productId);
    showNotification('Función de personalización en desarrollo', 'info');
}

// Notificaciones
function showNotification(message, type = 'info') {
    // Eliminar notificación anterior
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const colors = {
        success: '#6B7F5A',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'error' ? 'exclamation-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Añadir estilos para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    /* Contador del carrito en navbar */
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--secondary-color);
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: bold;
    }
`;
document.head.appendChild(notificationStyles);

// Exportar funciones necesarias
window.addToCart = addToCart;
window.selectStore = selectStore;