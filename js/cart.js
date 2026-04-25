// ══════════════════════════════════════════════
//  ATALIA CAFÉ — cart.js
//  Maneja todo el carrito de compras
// ══════════════════════════════════════════════

const CART_KEY = 'atalia_cart';
const STORE_KEY = 'atalia_store';
const ITBIS_RATE = 0.18;
const SHIPPING_FEE = 150; // RD$ — solo aplica si delivery
const WA_NUMBER = '18091234567'; // ← Cambia por el número real

// ── Helpers de localStorage ──────────────────
function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function getStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); }
    catch { return null; }
}

// ── Agregar producto al carrito ──────────────
// Llama esto desde menu.js cuando el usuario hace clic en "Añadir"
window.addToCart = function (product) {
    // product = { id, name, price, image, size, customization }
    const cart = getCart();
    const index = cart.findIndex(i =>
        i.id === product.id &&
        i.size === product.size &&
        i.customization === product.customization
    );

    if (index > -1) {
        cart[index].qty = (cart[index].qty || 1) + 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart(cart);
    updateCartBadge();
    showCartToast(product.name);
};

// ── Badge del carrito en el header ──────────
function updateCartBadge() {
    const cart = getCart();
    const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
    document.querySelectorAll('.cart-badge').forEach(el => {
        el.textContent = total;
        el.style.display = total > 0 ? 'flex' : 'none';
    });
}

// ── Toast de confirmación ────────────────────
function showCartToast(name) {
    let toast = document.getElementById('cartToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cartToast';
        toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(80px);
      background:#2E2E2E; color:#fff; padding:12px 20px; border-radius:999px;
      font-family:'Poppins',sans-serif; font-size:14px; font-weight:500;
      box-shadow:0 8px 24px rgba(0,0,0,.25); z-index:9999;
      transition:transform .3s ease, opacity .3s ease; opacity:0;
      display:flex; align-items:center; gap:10px; white-space:nowrap;
    `;
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span style="color:#8fa87a;">✓</span> ${name} añadido al carrito`;
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    });
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(80px)';
        toast.style.opacity = '0';
    }, 2500);
}

// ══════════════════════════════════════════════
//  RENDERIZADO DEL CARRITO (cart.html)
// ══════════════════════════════════════════════
function renderCart() {
    const cartEl = document.getElementById('cartItems');
    const emptyEl = document.getElementById('emptyState');
    const clearBtn = document.getElementById('clearCartBtn');
    if (!cartEl) return; // No estamos en cart.html

    const cart = getCart();

    // Store label
    const store = getStore();
    const storeLbl = document.getElementById('storeLabel');
    if (storeLbl) {
        storeLbl.textContent = store
            ? `📍 ${store.name} — ${store.address}`
            : 'Selecciona una tienda en el menú si aún no lo hiciste.';
    }

    if (!cart.length) {
        cartEl.innerHTML = '';
        emptyEl.style.display = '';
        if (clearBtn) clearBtn.style.display = 'none';
        updateSummary(0);
        return;
    }

    emptyEl.style.display = 'none';
    if (clearBtn) clearBtn.style.display = '';

    cartEl.innerHTML = cart.map((item, idx) => `
    <div class="item" data-idx="${idx}">
      <div class="thumb">
        ${item.image
            ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px;">☕</div>`
        }
      </div>
      <div>
        <p class="name">${item.name}</p>
        <p class="meta">${[item.size, item.customization].filter(Boolean).join(' · ')}</p>
        <p class="price">$${((item.price || 0) * (item.qty || 1)).toFixed(2)}</p>
      </div>
      <div class="controls">
        <div class="qty">
          <button class="qbtn" onclick="changeQty(${idx}, -1)" aria-label="Reducir">−</button>
          <span class="qnum">${item.qty || 1}</span>
          <button class="qbtn" onclick="changeQty(${idx}, +1)" aria-label="Aumentar">+</button>
        </div>
        <button class="linkbtn" onclick="removeItem(${idx})">
          <i class="fas fa-trash-alt" style="font-size:12px;margin-right:4px;"></i> Eliminar
        </button>
      </div>
    </div>
  `).join('');

    const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
    updateSummary(subtotal);
}

function updateSummary(subtotal) {
    const cart = getCart();
    const tax = subtotal * ITBIS_RATE;
    const total = subtotal + tax; // Envío se calcula en checkout según tipo pedido

    const fmt = n => `$${n.toFixed(2)}`;

    const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
    setText('itemsCount', `${count} producto${count !== 1 ? 's' : ''}`);
    setText('subtotal', fmt(subtotal));
    setText('tax', fmt(tax));
    setText('shipping', 'Se calcula en checkout');
    setText('total', fmt(total));

    // Deshabilitar checkout si carrito vacío
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = !cart.length;
        checkoutBtn.style.opacity = cart.length ? '1' : '0.5';
    }
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

// ── Cambiar cantidad ─────────────────────────
window.changeQty = function (idx, delta) {
    const cart = getCart();
    if (!cart[idx]) return;
    cart[idx].qty = Math.max(1, (cart[idx].qty || 1) + delta);
    saveCart(cart);
    renderCart();
    updateCartBadge();
};

// ── Eliminar item ────────────────────────────
window.removeItem = function (idx) {
    const cart = getCart();
    cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
    updateCartBadge();
};

// ── Vaciar carrito ───────────────────────────
function clearCart() {
    if (!confirm('¿Seguro que quieres vaciar el carrito?')) return;
    saveCart([]);
    renderCart();
    updateCartBadge();
}

// ── Ir al checkout ───────────────────────────
function goToCheckout() {
    const cart = getCart();
    if (!cart.length) {
        alert('Tu carrito está vacío. Agrega productos antes de continuar.');
        return;
    }
    window.location.href = 'checkout.html';
}

// ── WhatsApp directo desde carrito ───────────
function cartToWhatsApp() {
    const cart = getCart();
    if (!cart.length) return;

    const lines = cart.map(i => `• ${i.name} × ${i.qty || 1} — $${((i.price || 0) * (i.qty || 1)).toFixed(2)}`).join('\n');
    const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
    const tax = subtotal * ITBIS_RATE;
    const total = subtotal + tax;
    const store = getStore();

    const msg = `🍵 *Pedido - Atalia Café*
${store ? `📍 Tienda: ${store.name}` : ''}

${lines}

💰 Subtotal: $${subtotal.toFixed(2)}
🧾 Tax (18%): $${tax.toFixed(2)}
✅ Total: $${total.toFixed(2)}

_(Precio de envío por confirmar)_`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartBadge();

    document.getElementById('clearCartBtn')?.addEventListener('click', clearCart);
    document.getElementById('checkoutBtn')?.addEventListener('click', goToCheckout);
    document.getElementById('whatsBtn')?.addEventListener('click', cartToWhatsApp);
});