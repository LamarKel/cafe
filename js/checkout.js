const CART_KEY = "atalia_cart";
const LAST_ORDER_KEY = "atalia_last_order";

function parseMoney(str) {
  const s = String(str || "").replace(/[^\d.]/g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}
function money(n) {
  const val = Math.max(0, Math.round(n));
  return `RD$ ${val}`;
}
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function saveLastOrder(order) {
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}
function getStoreName(storeId) {
  const stores = { "1":"Atalia Café Centro", "2":"Atalia Café Norte", "3":"Atalia Café Este" };
  return stores[String(storeId)] || "Sin tienda";
}

function calcTotals(cart, orderType) {
  const subtotal = cart.reduce((sum, item) => {
    const qty = Number(item.quantity) || 1;
    const unit = item.totalPrice ? parseMoney(item.totalPrice) : parseMoney(item.price);
    return sum + unit * qty;
  }, 0);

  const tax = Math.round(subtotal * 0.18); // ajusta ITBIS si deseas
  const shipping = (orderType === "delivery" && subtotal > 0) ? 0 : 0; // por ahora 0
  const total = subtotal + tax + shipping;

  const itemsCount = cart.reduce((t, i) => t + (Number(i.quantity) || 1), 0);

  return { subtotal, tax, shipping, total, itemsCount };
}

function buildWhatsMessage(order) {
  const lines = order.cart.map((item) => {
    const qty = Number(item.quantity) || 1;
    const size = item.size ? ` (${item.size})` : "";
    const extras = Array.isArray(item.extras) && item.extras.length
      ? ` + ${item.extras.map(e => e.name).join(", ")}`
      : "";
    const unit = item.totalPrice ? parseMoney(item.totalPrice) : parseMoney(item.price);
    return `• ${qty} x ${item.name}${size}${extras} = ${money(unit * qty)}`;
  });

  const head = [
    `Pedido Atalia Café`,
    `Tienda: ${order.storeName}`,
    `Tipo: ${order.orderType === "delivery" ? "Delivery" : "Recoger en tienda"}`,
    `Cliente: ${order.name}`,
    `Tel: ${order.phone}`,
  ];

  if (order.orderType === "delivery") {
    head.push(`Dirección: ${order.address || "-"}`);
    head.push(`Referencia: ${order.reference || "-"}`);
  }

  head.push("");
  head.push(...lines);
  head.push("");
  head.push(`Subtotal: ${money(order.totals.subtotal)}`);
  head.push(`ITBIS: ${money(order.totals.tax)}`);
  head.push(`Envío: ${money(order.totals.shipping)}`);
  head.push(`TOTAL: ${money(order.totals.total)}`);
  if (order.note) head.push(`Nota: ${order.note}`);

  return head.join("\n");
}

function setValidation(msg) {
  const box = document.getElementById("validationMsg");
  if (!box) return;
  if (!msg) {
    box.style.display = "none";
    box.textContent = "";
    return;
  }
  box.style.display = "block";
  box.textContent = msg;
}

function render() {
  const cart = loadCart();
  if (!cart.length) {
    // si no hay carrito, vuelve a cart
    window.location.href = "cart.html";
    return;
  }

  const storeLabel = document.getElementById("storeLabel");
  const storeName = getStoreName(cart[0]?.store);
  storeLabel.textContent = `Tienda: ${storeName}`;

  const summaryItems = document.getElementById("summaryItems");
  summaryItems.innerHTML = cart.map((item) => {
    const qty = Number(item.quantity) || 1;
    const unit = item.totalPrice ? parseMoney(item.totalPrice) : parseMoney(item.price);
    const size = item.size ? `Tamaño: ${item.size}` : null;
    const extras = Array.isArray(item.extras) && item.extras.length
      ? `Extras: ${item.extras.map(e => e.name).join(", ")}`
      : null;

    return `
      <div class="item">
        <div class="thumb">
          <img src="${item.image || "images/hero.jfif"}" alt="${item.name || "Producto"}"
               onerror="this.onerror=null;this.src='images/hero.jfif';">
        </div>
        <div>
          <p class="iname">${item.name || "Producto"}</p>
          <p class="imeta">${[size, extras].filter(Boolean).join(" · ") || "Sin personalización"}</p>
        </div>
        <div class="iprice">${money(unit * qty)}</div>
      </div>
    `;
  }).join("");

  // order type
  const activeTypeBtn = document.querySelector("#orderType .chip.active");
  const orderType = activeTypeBtn?.dataset.type || "pickup";

  const totals = calcTotals(cart, orderType);

  document.getElementById("itemsCount").textContent = `${totals.itemsCount} item${totals.itemsCount === 1 ? "" : "s"}`;
  document.getElementById("subtotal").textContent = money(totals.subtotal);
  document.getElementById("tax").textContent = money(totals.tax);
  document.getElementById("shipping").textContent = money(totals.shipping);
  document.getElementById("total").textContent = money(totals.total);
  document.getElementById("miniTotal").textContent = money(totals.total);
}

function setOrderType(type) {
  document.querySelectorAll("#orderType .chip").forEach(b => b.classList.toggle("active", b.dataset.type === type));

  const showDelivery = type === "delivery";
  document.getElementById("addressField").style.display = showDelivery ? "block" : "none";
  document.getElementById("referenceField").style.display = showDelivery ? "block" : "none";
  render();
}

function validateForm(orderType) {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name) return "Escribe tu nombre.";
  if (!phone) return "Escribe tu teléfono.";

  if (orderType === "delivery") {
    const address = document.getElementById("address").value.trim();
    if (!address) return "Para delivery, escribe la dirección.";
  }

  return null;
}

function buildOrderObject(orderType) {
  const cart = loadCart();
  const storeName = getStoreName(cart[0]?.store);

  const totals = calcTotals(cart, orderType);

  return {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    storeName,
    orderType,
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    reference: document.getElementById("reference").value.trim(),
    note: document.getElementById("note").value.trim(),
    payment: document.getElementById("payment").value,
    cart,
    totals
  };
}

document.addEventListener("click", (e) => {
  const typeBtn = e.target.closest("#orderType .chip");
  if (typeBtn) {
    setOrderType(typeBtn.dataset.type);
  }
});

document.getElementById("confirmBtn")?.addEventListener("click", () => {
  const activeTypeBtn = document.querySelector("#orderType .chip.active");
  const orderType = activeTypeBtn?.dataset.type || "pickup";

  const err = validateForm(orderType);
  if (err) return setValidation(err);

  setValidation(null);

  const order = buildOrderObject(orderType);
  saveLastOrder(order);

  // aquí luego conectamos con backend
  alert(`✅ Pedido confirmado (frontend)\n\nOrden: ${order.id}\nTotal: ${money(order.totals.total)}`);

  // opcional: limpiar carrito
  // localStorage.removeItem(CART_KEY);

  window.location.href = "cart.html";
});

document.getElementById("whatsBtn")?.addEventListener("click", () => {
  const activeTypeBtn = document.querySelector("#orderType .chip.active");
  const orderType = activeTypeBtn?.dataset.type || "pickup";

  const err = validateForm(orderType);
  if (err) return setValidation(err);

  setValidation(null);

  const order = buildOrderObject(orderType);
  saveLastOrder(order);

  const msg = buildWhatsMessage(order);

  // si quieres, aquí pones tu número en formato internacional: 1809..., 1829..., etc.
  const phone = "";
  const url = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    : `https://wa.me/?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");
});

document.addEventListener("DOMContentLoaded", () => {
  // default pickup visible
  setOrderType("pickup");
  render();
});
window.addEventListener("storage", (e) => {
  if (e.key === CART_KEY) render();
});
