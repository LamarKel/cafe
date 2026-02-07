/* ===========================
   MENU DATA
=========================== */
const MENU_DATA = {
  trending: [
    {
      id: 1,
      name: "Caramel Macchiato",
      description: "Espresso con leche vaporizada, caramelo y vainilla.",
      price: "RD$ 225",
      image: "images/cafe.jpg",
      featured: true,
      details: { calories: "250", caffeine: "150mg", size: "Grande" }
    },
    {
      id: 2,
      name: "Iced Matcha Latte",
      description: "Matcha premium con leche y hielo.",
      price: "RD$ 195",
      image: "images/cafe2.jpg",
      featured: true,
      details: { calories: "180", caffeine: "80mg", size: "Grande" }
    },
    {
      id: 3,
      name: "Croissant de Almendra",
      description: "Crujiente croissant relleno de crema de almendra.",
      price: "RD$ 120",
      image: "images/cafe3.jpg",
      featured: true,
      details: { calories: "320", vegetarian: true }
    }
  ],

  "hot-coffee": [
    { id: 4, name: "Espresso", description: "Café puro y concentrado, servido en shot.", price: "RD$ 95", image: "images/cafe1.jpg",
      details: { calories: "5", caffeine: "75mg", size: "Solo" } },
    { id: 5, name: "Americano", description: "Espresso diluido con agua caliente.", price: "RD$ 125", image: "images/cafe2.jpg",
      details: { calories: "10", caffeine: "150mg", size: "Grande" } },
    { id: 6, name: "Cappuccino", description: "Espresso con leche vaporizada y espuma cremosa.", price: "RD$ 155", image: "images/cafe3.jpg",
      details: { calories: "120", caffeine: "150mg", size: "Grande" } },
    { id: 7, name: "Latte", description: "Espresso suave con leche vaporizada.", price: "RD$ 165", image: "images/cafe4.jpg",
      details: { calories: "190", caffeine: "150mg", size: "Grande" } },
    { id: 8, name: "Mocha", description: "Espresso con chocolate y leche vaporizada.", price: "RD$ 185", image: "images/cafe4.jpg",
      details: { calories: "290", caffeine: "175mg", size: "Grande" } },
    { id: 9, name: "Flat White", description: "Espresso ristretto con microespuma de leche.", price: "RD$ 175", image: "images/hot-coffee6.jpg",
      details: { calories: "150", caffeine: "130mg", size: "Mediano" } }
  ],

  "cold-coffee": [
    { id: 10, name: "Iced Americano", description: "Espresso sobre hielo con agua fría.", price: "RD$ 135", image: "images/cold-coffee1.jpg",
      details: { calories: "15", caffeine: "150mg", size: "Grande" } },
    { id: 11, name: "Cold Brew", description: "Café infusionado en frío por 20 horas.", price: "RD$ 165", image: "images/cold-coffee2.jpg",
      details: { calories: "5", caffeine: "200mg", size: "Grande" } },
    { id: 12, name: "Iced Latte", description: "Espresso con leche fría y hielo.", price: "RD$ 175", image: "images/cold-coffee3.jpg",
      details: { calories: "130", caffeine: "150mg", size: "Grande" } },
    { id: 13, name: "Iced Caramel Macchiato", description: "Leche fría, hielo, espresso y caramelo.", price: "RD$ 195", image: "images/cold-coffee4.jpg",
      details: { calories: "250", caffeine: "150mg", size: "Grande" } }
  ],

  matcha: [
    { id: 14, name: "Matcha Latte", description: "Matcha ceremonial con leche vaporizada.", price: "RD$ 185", image: "images/matcha1.jpg",
      details: { calories: "240", caffeine: "70mg", vegetarian: true } },
    { id: 15, name: "Iced Matcha Latte", description: "Matcha con leche fría y hielo.", price: "RD$ 195", image: "images/matcha2.jpg",
      details: { calories: "200", caffeine: "70mg", vegetarian: true } }
  ],

  bakery: [
    { id: 16, name: "Croissant Clásico", description: "Hojaldre tradicional francés.", price: "RD$ 85", image: "images/bakery1.jpg",
      details: { calories: "272", vegetarian: true } },
    { id: 17, name: "Pain au Chocolat", description: "Croissant con barritas de chocolate.", price: "RD$ 95", image: "images/bakery2.jpg",
      details: { calories: "340", vegetarian: true } },
    { id: 18, name: "Muffin de Arándanos", description: "Muffin esponjoso con arándanos frescos.", price: "RD$ 75", image: "images/bakery3.jpg",
      details: { calories: "420", vegetarian: true } }
  ],

  desserts: [
    { id: 19, name: "Tarta de Queso", description: "Clásica tarta de queso con base de galleta.", price: "RD$ 125", image: "images/dessert1.jpg",
      details: { calories: "480", vegetarian: true } },
    { id: 20, name: "Brownie de Chocolate", description: "Brownie húmedo con nueces.", price: "RD$ 95", image: "images/dessert2.jpg",
      details: { calories: "520", vegetarian: true } }
  ]
};

/* ===========================
   STATE + DOM
=========================== */
const MenuState = {
  currentCategory: "trending",
  selectedStore: null,
  cart: [],
  scrollTimeout: null
};

const MenuDOM = {
  sidebarLinks: () => document.querySelectorAll(".sidebar-link"),
  menuCategories: () => document.querySelectorAll(".menu-category"),
  categoryGrids: () => document.querySelectorAll(".category-grid"),
  sidebar: () => document.querySelector(".menu-sidebar"),

  storeSelector: () => document.getElementById("store-selector"),
  storeModal: () => document.getElementById("store-modal"),
  modalClose: () => document.getElementById("modal-close"),
  selectStoreBtns: () => document.querySelectorAll(".select-store-btn"),

  menuContent: () => document.querySelector(".menu-content")
};

/* ===========================
   INIT
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  initializeMenuNavigation();
  initializeStoreSelector();
  initializeMenuItems();

  initializeMobileSidebar();
  initializeCart();

  
 initializeCategoryObserver();
  initializeProductModal(); // ✅ modal 1 sola vez
});

/* ===========================
   HELPERS
=========================== */
function findProductById(productId) {
  const id = parseInt(productId, 10);
  for (const category in MENU_DATA) {
    const found = (MENU_DATA[category] || []).find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

function parseRDPrice(priceStr) {
  // "RD$ 225" -> 225
  const n = parseFloat(String(priceStr).replace("RD$","").trim());
  return isNaN(n) ? 0 : n;
}

/* ===========================
   SCROLL PROGRESS (desktop)
=========================== */
function initializeScrollProgress() {
  if (window.innerWidth <= 768) return;

  const menuContent = MenuDOM.menuContent();
  if (!menuContent) return;

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  menuContent.addEventListener("scroll", () => {
    const scrollTop = menuContent.scrollTop;
    const scrollHeight = menuContent.scrollHeight - menuContent.clientHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${percent}%`;
  });
}

/* ===========================
   NAVIGATION
=========================== */
function initializeMenuNavigation() {
  MenuDOM.sidebarLinks().forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const category = link.dataset.category;
      const target = document.getElementById(category);
      if (!target) return;

      // active link
      MenuDOM.sidebarLinks().forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      //active section
      MenuDOM.menuCategories().forEach(cat => cat.classList.remove("active"));
      target.classList.add("active"); 

      MenuState.currentCategory = category;

      if (window.innerWidth > 768) {
        const menuContent = MenuDOM.menuContent();
        if (menuContent) {
          menuContent.scrollTo({ top: target.offsetTop - 100, behavior: "smooth" });
        }
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMobileSidebar();
      }

      loadCategoryItems(category);
    });
  });
}

/* ===========================
   SCROLL DETECTION (desktop)
=========================== */
function initializeCategoryObserver() {
  const menuContent = document.querySelector('.menu-content');
  if (!menuContent) return;

  const sections = document.querySelectorAll('.menu-category');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const category = entry.target.dataset.category;

          sidebarLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.dataset.category === category
            );
          });

          MenuState.currentCategory = category;
        }
      });
    },
    {
      root: menuContent,        // 👈 el scroll es SOLO del menú
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));
}




/* ===========================
   STORE MODAL
=========================== */
function initializeStoreSelector() {
  const storeSelector = MenuDOM.storeSelector();
  const storeModal = MenuDOM.storeModal();
  const closeBtn = MenuDOM.modalClose();
  const buttons = MenuDOM.selectStoreBtns();

  if (!storeSelector || !storeModal) return;

  storeSelector.addEventListener("click", () => {
    storeModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn?.addEventListener("click", closeStoreModal);

  storeModal.addEventListener("click", (e) => {
    if (e.target === storeModal) closeStoreModal();
  });

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectStore(btn.dataset.store);
      closeStoreModal();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && storeModal.classList.contains("active")) closeStoreModal();
  });
}

function closeStoreModal() {
  const storeModal = MenuDOM.storeModal();
  if (!storeModal) return;
  storeModal.classList.remove("active");
  document.body.style.overflow = "";
}

function selectStore(storeId) {
  MenuState.selectedStore = storeId;

  const storeBtn = MenuDOM.storeSelector();
  const stores = {
    "1": "Atalia Café Centro",
    "2": "Atalia Café Norte",
    "3": "Atalia Café Este"
  };

  if (storeBtn && stores[storeId]) {
    storeBtn.innerHTML = `<span>${stores[storeId]}</span><i class="fas fa-check"></i>`;
    storeBtn.classList.add("selected");
    showNotification(`Tienda seleccionada: ${stores[storeId]}`, "success");
  }
}

/* ===========================
   MENU ITEMS (render)
=========================== */
function initializeMenuItems() {
  loadCategoryItems(MenuState.currentCategory);

  ["hot-coffee","cold-coffee","matcha","bakery","desserts"].forEach(category => {
    setTimeout(() => loadCategoryItems(category), 100);
  });
}

function loadCategoryItems(category) {
  const container = document.querySelector(`#${category} .category-grid`);
  if (!container) return;

  // ✅ Aquí corriges: estabas preguntando ".product-card" pero renderizas ".product-card-compact"
  if (container.querySelector(".product-card-compact")) return;

  const items = MENU_DATA[category] || [];

  if (!items.length) {
    container.innerHTML = `
      <div class="no-items-message">
        <i class="fas fa-coffee"></i>
        <h3>Próximamente</h3>
        <p>Estamos trabajando en nuevas opciones para esta categoría.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = Array(3).fill(`<div class="product-card skeleton"></div>`).join("");

  setTimeout(() => {
    container.innerHTML = items.map(createProductCard).join("");
    bindProductCardEvents(); // ✅ solo eventos, no crea modales
  }, 300);
}

function createProductCard(item) {
  const badge = item.featured ? `<span class="product-badge-compact">⭐</span>` : "";
  return `
    <article class="product-card-compact" data-id="${item.id}">
      <div class="product-image-compact">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        ${badge}
      </div>
      <div class="product-content-compact">
        <h3 class="product-name-compact">${item.name}</h3>
        <div class="product-price-compact">${item.price}</div>
        <button class="product-add-compact" type="button" data-id="${item.id}">
          <i class="fas fa-plus"></i> Añadir
        </button>
      </div>
    </article>
  `;
}

/* ===========================
   PRODUCT MODAL (single instance)
=========================== */
let ProductModal = {
  el: null,
  img: null,
  name: null,
  price: null,
  desc: null,
  qty: null,
  btnMinus: null,
  btnPlus: null,
  addBtn: null,
  closeBtn: null,
  sizeOptions: [],
  extrasContainer: null,
  sizeContainer: null
};

function initializeProductModal() {
  // ✅ Este modal se crea UNA sola vez y se reutiliza
  const productModal = document.createElement("div");
  productModal.className = "product-modal";
  productModal.innerHTML = `
    <div class="modal-product-content">
      <div class="modal-product-header">
        <img id="modal-product-image" src="" alt="">
        <button class="modal-close-btn" id="modal-product-close" type="button" aria-label="Cerrar">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-product-body">
        <h2 id="modal-product-name"></h2>
        <div id="modal-product-price" class="modal-product-price"></div>
        <p id="modal-product-description" class="modal-product-description"></p>

        <div class="customization-section">
          <h3 class="customization-title"><i class="fas fa-glass-whiskey"></i> Tamaño</h3>
          <div class="customization-options" id="size-options"></div>
        </div>

        <div class="customization-section">
          <h3 class="customization-title"><i class="fas fa-plus-circle"></i> Extras</h3>
          <div class="customization-options" id="extras-options"></div>
        </div>

        <div class="quantity-selector">
          <button class="quantity-btn" id="quantity-decrease" type="button">-</button>
          <span class="quantity-display" id="quantity-display">1</span>
          <button class="quantity-btn" id="quantity-increase" type="button">+</button>
        </div>

        <div class="modal-product-footer">
          <button class="modal-add-btn" id="modal-add-to-cart" type="button">
            <i class="fas fa-plus"></i> Añadir al carrito
          </button>
          <button class="modal-customize-btn" id="modal-save-favorite" type="button">
            <i class="far fa-heart"></i> Favorito
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(productModal);

  // cache
  ProductModal.el = productModal;
  ProductModal.img = document.getElementById("modal-product-image");
  ProductModal.name = document.getElementById("modal-product-name");
  ProductModal.price = document.getElementById("modal-product-price");
  ProductModal.desc = document.getElementById("modal-product-description");
  ProductModal.qty = document.getElementById("quantity-display");
  ProductModal.btnMinus = document.getElementById("quantity-decrease");
  ProductModal.btnPlus = document.getElementById("quantity-increase");
  ProductModal.addBtn = document.getElementById("modal-add-to-cart");
  ProductModal.closeBtn = document.getElementById("modal-product-close");
  ProductModal.sizeContainer = document.getElementById("size-options");
  ProductModal.extrasContainer = document.getElementById("extras-options");

  // events close
  ProductModal.closeBtn.addEventListener("click", closeProductModal);
  ProductModal.el.addEventListener("click", (e) => {
    if (e.target === ProductModal.el) closeProductModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && ProductModal.el.classList.contains("active")) closeProductModal();
  });

  // quantity
  ProductModal.btnMinus.addEventListener("click", () => {
    const current = parseInt(ProductModal.qty.textContent || "1", 10);
    ProductModal.qty.textContent = String(Math.max(1, current - 1));
  });
  ProductModal.btnPlus.addEventListener("click", () => {
    const current = parseInt(ProductModal.qty.textContent || "1", 10);
    ProductModal.qty.textContent = String(current + 1);
  });

  // size options
  renderSizeOptions(["pequeño", "mediano", "grande"], "mediano");

  // extras options
  renderExtrasOptions([
    { name: "Extra Café", price: "+RD$ 20" },
    { name: "Leche Almendra", price: "+RD$ 25" },
    { name: "Crema Batida", price: "+RD$ 15" },
    { name: "Shot Vainilla", price: "+RD$ 30" }
  ]);

  // add from modal
  ProductModal.addBtn.addEventListener("click", () => {
    const productId = ProductModal.addBtn.dataset.productId;
    if (!productId) return;

    const quantity = parseInt(ProductModal.qty.textContent || "1", 10);

    const selectedSizeBtn = ProductModal.sizeContainer.querySelector(".customization-option.selected");
    const size = selectedSizeBtn?.dataset.value || "mediano";

    const selectedExtras = [];
    ProductModal.extrasContainer.querySelectorAll(".customization-option.selected").forEach(btn => {
      selectedExtras.push({ name: btn.dataset.name, price: btn.dataset.price });
    });

    addToCart(productId, quantity, size, selectedExtras);
    closeProductModal();
  });
}

function renderSizeOptions(options, defaultValue) {
  ProductModal.sizeContainer.innerHTML = "";
  options.forEach(value => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "customization-option";
    btn.textContent = value[0].toUpperCase() + value.slice(1);
    btn.dataset.value = value;

    btn.addEventListener("click", () => {
      ProductModal.sizeContainer.querySelectorAll(".customization-option").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });

    ProductModal.sizeContainer.appendChild(btn);
  });

  // default
  const defaultBtn = ProductModal.sizeContainer.querySelector(`[data-value="${defaultValue}"]`);
  defaultBtn?.classList.add("selected");
}

function renderExtrasOptions(extras) {
  ProductModal.extrasContainer.innerHTML = "";
  extras.forEach(extra => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "customization-option";
    btn.innerHTML = `<span>${extra.name}</span><small>${extra.price}</small>`;
    btn.dataset.name = extra.name;
    btn.dataset.price = extra.price;
    btn.addEventListener("click", () => btn.classList.toggle("selected"));
    ProductModal.extrasContainer.appendChild(btn);
  });
}

function openProductModal(productId) {
  const product = findProductById(productId);
  if (!product) return;

  // fill
  ProductModal.img.src = product.image;
  ProductModal.img.alt = product.name;
  ProductModal.img.onerror = () => {
    ProductModal.img.onerror = null;
    ProductModal.img.src = "images/hero.jfif"; // fallback que exista
  };

  ProductModal.name.textContent = product.name;
  ProductModal.price.textContent = product.price;
  ProductModal.desc.textContent = product.description;

  // reset
  ProductModal.qty.textContent = "1";
  ProductModal.sizeContainer.querySelectorAll(".customization-option").forEach(b => b.classList.remove("selected"));
  ProductModal.sizeContainer.querySelector(`[data-value="mediano"]`)?.classList.add("selected");
  ProductModal.extrasContainer.querySelectorAll(".customization-option").forEach(b => b.classList.remove("selected"));

  // attach productId
  ProductModal.addBtn.dataset.productId = String(productId);

  // open
  ProductModal.el.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  ProductModal.el.classList.remove("active");
  document.body.style.overflow = "";
}

/* ===========================
   BIND EVENTS (cards)
=========================== */
function bindProductCardEvents() {
  const menuContent = document.querySelector(".menu-content");
  if (!menuContent) return;

  // ⚠️ evita duplicarlo si ya fue inicializado
  if (menuContent.dataset.bound === "1") return;
  menuContent.dataset.bound = "1";

  menuContent.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".product-add-compact");
    const card = e.target.closest(".product-card-compact");

    // Click en botón "Añadir" -> agrega directo
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();

      const productId = addBtn.dataset.id;
      addToCart(productId, 1, "mediano", []);

      // feedback
      addBtn.innerHTML = '<i class="fas fa-check"></i> Añadido';
      addBtn.disabled = true;
      setTimeout(() => {
        addBtn.innerHTML = '<i class="fas fa-plus"></i> Añadir';
        addBtn.disabled = false;
      }, 700);

      return;
    }

    // Click en la tarjeta -> abre modal
    if (card) {
      const productId = card.dataset.id;
      openProductModal(productId);
    }
  });
}


/* ===========================
   MOBILE SIDEBAR
=========================== */
function initializeMobileSidebar() {
  if (window.innerWidth > 768) return;

  const sidebar = MenuDOM.sidebar();
  if (!sidebar) return;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "sidebar-toggle";
  toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
  toggleBtn.setAttribute("aria-label", "Abrir menú de categorías");
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => sidebar.classList.toggle("active"));

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
  });
}

function closeMobileSidebar() {
  const sidebar = MenuDOM.sidebar();
  sidebar?.classList.remove("active");
}

/* ===========================
   CART
=========================== */
function initializeCart() {
  const saved = localStorage.getItem("atalia_cart");
  if (saved) {
    try { MenuState.cart = JSON.parse(saved); }
    catch { MenuState.cart = []; }
  }
  updateCartCount();
}

// ✅ ÚNICA FUNCIÓN addToCart (NO duplicada)
function addToCart(productId, quantity = 1, size = "mediano", extras = []) {
  if (!MenuState.selectedStore) {
    showNotification("Por favor, selecciona una tienda primero", "warning");
    MenuDOM.storeSelector()?.click();
    return;
  }

  const product = findProductById(productId);
  if (!product) {
    showNotification("Producto no encontrado", "error");
    return;
  }

  const basePrice = parseRDPrice(product.price);
  const extrasPrice = extras.reduce((sum, ex) => sum + parseRDPrice(ex.price.replace("+","")), 0);
  const totalUnit = basePrice + extrasPrice;

  MenuState.cart.push({
    ...product,
    quantity,
    size,
    extras,
    totalPrice: `RD$ ${totalUnit}`,
    store: MenuState.selectedStore
  });

  localStorage.setItem("atalia_cart", JSON.stringify(MenuState.cart));
  updateCartCount();

  showNotification(`${product.name} x${quantity} añadido al carrito`, "success");
}

function updateCartCount() {
  const count = MenuState.cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? "flex" : "none";
  }
}

/* ===========================
   NOTIFICATIONS
=========================== */
function showNotification(message, type = "info") {
  document.querySelector(".notification")?.remove();

  const colors = {
    success: "#6B7F5A",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8"
  };

  const icon =
    type === "success" ? "check-circle" :
    type === "error" ? "exclamation-circle" :
    type === "warning" ? "exclamation-triangle" : "info-circle";

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${icon}"></i>
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

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// estilos animación (1 vez)
(function injectNotificationStylesOnce() {
  if (document.getElementById("notification-styles")) return;

  const style = document.createElement("style");
  style.id = "notification-styles";
  style.textContent = `
    @keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes slideOut { from{transform:translateX(0);opacity:1} to{transform:translateX(100%);opacity:0} }
    .notification-content{display:flex;align-items:center;gap:10px}
    .notification-content i{font-size:1.2rem}
  `;
  document.head.appendChild(style);
})();

/* ===========================
   EXPORTS
=========================== */
window.selectStore = selectStore;
window.addToCart = addToCart;
