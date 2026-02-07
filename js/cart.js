const CART_KEY = "atalia_cart";

function money(n) {
    const val = Math.max(0, Math.round(n));
    return `RD$ ${val}`;
}
function parseMoney(str) {
    // "RD$ 195" / "+RD$ 20" -> 195 / 20
    const s = String(str || "").replace(/[^\d.]/g, "");
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
}

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
        return [];
    }
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getStoreName(storeId) {
    const stores = {
        "1": "Atalia Café Centro",
        "2": "Atalia Café Norte",
        "3": "Atalia Café Este"
    };
    return stores[String(storeId)] || null;
}

function render() {
    const cart = loadCart();

    const cartItems = document.getElementById("cartItems");
    const emptyState = document.getElementById("emptyState");
    const itemsCount = document.getElementById("itemsCount");

    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    const storeLabel = document.getElementById("storeLabel");

    if (!cart.length) {
        cartItems.innerHTML = "";
        emptyState.style.display = "block";
        itemsCount.textContent = "0 items";
        subtotalEl.textContent = money(0);
        taxEl.textContent = money(0);
        shippingEl.textContent = money(0);
        totalEl.textContent = money(0);
        storeLabel.textContent = "Selecciona una tienda en el menú si aún no lo hiciste.";
        return;
    }

    emptyState.style.display = "none";

    // tienda (tomamos la del primer item)
    const storeName = getStoreName(cart[0]?.store);
    storeLabel.textContent = storeName ? `Tienda: ${storeName}` : "Tienda no seleccionada (vuelve al menú).";

    // render items
    cartItems.innerHTML = cart.map((item, idx) => {
        const qty = item.quantity || 1;
        const size = item.size ? `Tamaño: ${item.size}` : null;
        const extras = Array.isArray(item.extras) && item.extras.length
            ? `Extras: ${item.extras.map(e => e.name).join(", ")}`
            : null;

        const unit = item.totalPrice ? parseMoney(item.totalPrice) : parseMoney(item.price);
        const lineTotal = unit * qty;

        return `
      <div class="item">
        <div class="thumb">
          <img src="${item.image || "images/hero.jfif"}" alt="${item.name || "Producto"}"
               onerror="this.onerror=null;this.src='images/hero.jfif';">
        </div>

        <div>
          <p class="name">${item.name || "Producto"}</p>
          <p class="meta">${[size, extras].filter(Boolean).join(" · ") || "Sin personalización"}</p>
          <div class="price">${money(lineTotal)}</div>
        </div>

        <div class="controls">
          <div class="qty">
            <button class="qbtn" data-action="dec" data-idx="${idx}">−</button>
            <span class="qnum">${qty}</span>
            <button class="qbtn" data-action="inc" data-idx="${idx}">+</button>
          </div>
          <button class="linkbtn" data-action="remove" data-idx="${idx}">Eliminar</button>
        </div>
      </div>
    `;
    }).join("");

    // totals
    const subtotal = cart.reduce((sum, item) => {
        const qty = item.quantity || 1;
        const unit = item.totalPrice ? parseMoney(item.totalPrice) : parseMoney(item.price);
        return sum + unit * qty;
    }, 0);

    const tax = Math.round(subtotal * 0.18); // ajusta si tu ITBIS es otro
    const shipping = 0; // si luego quieres delivery, lo cambias aquí
    const total = subtotal + tax + shipping;

    const totalQty = cart.reduce((t, i) => t + (Number(i.quantity) || 1), 0);


    itemsCount.textContent = `${totalQty} item${totalQty === 1 ? "" : "s"}`;
    subtotalEl.textContent = money(subtotal);
    taxEl.textContent = money(tax);
    shippingEl.textContent = money(shipping);
    totalEl.textContent = money(total);
}

function updateQty(idx, delta) {
    const cart = loadCart();
    if (!cart[idx]) return;

    cart[idx].quantity = (Number(cart[idx].quantity) || 1) + delta;
    if (cart[idx].quantity <= 0) cart.splice(idx, 1);

    saveCart(cart);
    render();
}

function removeItem(idx) {
    const cart = loadCart();
    cart.splice(idx, 1);
    saveCart(cart);
    render();
}

function clearCart() {
    saveCart([]);
    render();
}

function buildWhatsMessage() {
    const cart = loadCart();
    if (!cart.length) return null;

    const storeName = getStoreName(cart[0]?.store) || "Sin tienda";
    const lines = cart.map((item) => {
        const qty = item.quantity || 1;
        const size = item.size ? ` (${item.size})` : "";
        const extras = Array.isArray(item.extras) && item.extras.length
            ? ` + ${item.extras.map(e => e.name).join(", ")}`
            : "";
        const unit = item.totalPrice ? parseMoney(item.totalPrice) : parseMoney(item.price);
        return `• ${qty} x ${item.name}${size}${extras} = ${money(unit * qty)}`;
    });

    const subtotal = cart.reduce((sum, item) => {
        const qty = item.quantity || 1;
        const unit = item.totalPrice ? parseMoney(item.totalPrice) : parseMoney(item.price);
        return sum + unit * qty;
    }, 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    return `Pedido Atalia Café\nTienda: ${storeName}\n\n${lines.join("\n")}\n\nSubtotal: ${money(subtotal)}\nITBIS: ${money(tax)}\nTOTAL: ${money(total)}`;
}

document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const idx = parseInt(btn.dataset.idx, 10);

    if (action === "dec") updateQty(idx, -1);
    if (action === "inc") updateQty(idx, 1);
    if (action === "remove") removeItem(idx);
});

document.getElementById("clearCartBtn")?.addEventListener("click", () => clearCart());

document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    window.location.href = "checkout.html";
});

document.getElementById("whatsBtn")?.addEventListener("click", () => {
    const msg = buildWhatsMessage();
    if (!msg) return;

    // Pon tu número aquí en formato internacional: 1809..., 1829..., etc.
    const phone = "";
    const url = phone
        ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
        : `https://wa.me/?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
});

document.addEventListener("DOMContentLoaded", render);
window.addEventListener("storage", (e) => {
    if (e.key === CART_KEY) render();
});
