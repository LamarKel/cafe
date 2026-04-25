// ══════════════════════════════════════════════
//  ATALIA CAFÉ — checkout.js
//  Conecta el carrito con el checkout
// ══════════════════════════════════════════════

const CART_KEY = 'atalia_cart';
const STORE_KEY = 'atalia_store';
const ITBIS_RATE = 0.18;
const SHIPPING_FEE = 5.00;  // USD — solo aplica si delivery
const WA_NUMBER = '18091234567'; // ← Cambia por el número real

// ── Helpers ──────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}
function getStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); }
  catch { return null; }
}
function fmt(n) { return `$${Number(n).toFixed(2)}`; }
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── Estado global ─────────────────────────────
let orderType = 'pickup';
let paymentMethod = 'cash';

// ══════════════════════════════════════════════
//  RESUMEN DEL PEDIDO
// ══════════════════════════════════════════════
function renderSummary() {
  const cart = getCart();
  const listEl = document.getElementById('summaryItems');
  const countEl = document.getElementById('itemsCount');
  if (!listEl) return;

  if (!cart.length) {
    listEl.innerHTML = `<p style="opacity:.5;text-align:center;padding:20px 0;">No hay productos en el carrito.</p>`;
    recalcTotals(0);
    return;
  }

  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  if (countEl) countEl.textContent = `${total} producto${total !== 1 ? 's' : ''}`;

  listEl.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-thumb">
        ${item.image
      ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;background:rgba(0,0,0,.05);">☕</div>`
    }
      </div>
      <div>
        <div class="order-name">${item.name}</div>
        <div class="order-meta">${[item.size, item.customization].filter(Boolean).join(' · ')} × ${item.qty || 1}</div>
      </div>
      <div class="order-price">${fmt((item.price || 0) * (item.qty || 1))}</div>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  recalcTotals(subtotal);
}

function recalcTotals(subtotal) {
  const tax = subtotal * ITBIS_RATE;
  const shipping = orderType === 'delivery' ? SHIPPING_FEE : 0;
  const total = subtotal + tax + shipping;

  setText('subtotal', fmt(subtotal));
  setText('tax', fmt(tax));
  setText('shipping', shipping ? fmt(shipping) : 'Free');
  setText('total', fmt(total));
}

// ══════════════════════════════════════════════
//  TIPO DE PEDIDO
// ══════════════════════════════════════════════
function initOrderType() {
  const chips = document.getElementById('orderTypeChips');
  if (!chips) return;

  chips.addEventListener('click', e => {
    const chip = e.target.closest('[data-type]');
    if (!chip) return;

    orderType = chip.dataset.type;
    chips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const isDelivery = orderType === 'delivery';
    document.getElementById('addressField').style.display = isDelivery ? '' : 'none';
    document.getElementById('referenceField').style.display = isDelivery ? '' : 'none';

    // Recalcular con subtotal actual
    const cart = getCart();
    const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
    recalcTotals(subtotal);
  });
}

// ══════════════════════════════════════════════
//  MÉTODO DE PAGO
// ══════════════════════════════════════════════
window.selectPayment = function (method) {
  paymentMethod = method;
  document.querySelectorAll('.pay-option').forEach(el => {
    el.classList.toggle('active', el.dataset.method === method);
  });
};

// ── Formato de tarjeta ────────────────────────
window.formatCardNumber = function (input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
  const display = v.padEnd(16, '•');
  setText('previewNumber', display.replace(/(.{4})/g, '$1 ').trim());
};

window.formatExpiry = function (input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
  input.value = v;
  setText('previewExp', v || 'MM/YY');
};

// ══════════════════════════════════════════════
//  VALIDACIÓN
// ══════════════════════════════════════════════
function showError(msg) {
  const el = document.getElementById('validationMsg');
  const text = document.getElementById('validationText');
  if (!el) return;
  if (text) text.textContent = msg;
  el.style.display = 'flex';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function clearError() {
  const el = document.getElementById('validationMsg');
  if (el) el.style.display = 'none';
}

function validate() {
  const name = document.getElementById('name')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();

  if (!name) { showError('Please enter your full name.'); return false; }
  if (!phone) { showError('Please enter your phone number.'); return false; }

  if (orderType === 'delivery') {
    const addr = document.getElementById('address')?.value.trim();
    if (!addr) { showError('Please enter your delivery address.'); return false; }
  }

  if (paymentMethod === 'card') {
    const num = document.getElementById('cardNumber')?.value.replace(/\s/g, '') || '';
    const cnam = document.getElementById('cardName')?.value.trim() || '';
    const exp = document.getElementById('cardExp')?.value.trim() || '';
    const cvv = document.getElementById('cardCvv')?.value.trim() || '';

    if (num.length < 16) { showError('Invalid card number.'); return false; }
    if (!cnam) { showError('Please enter the cardholder name.'); return false; }
    if (!/^\d{2}\/\d{2}$/.test(exp)) { showError('Invalid expiry date (MM/YY).'); return false; }
    if (cvv.length < 3) { showError('Invalid CVV.'); return false; }
  }

  const cart = getCart();
  if (!cart.length) { showError('Your cart is empty.'); return false; }

  clearError();
  return true;
}

// ══════════════════════════════════════════════
//  CONFIRMAR PEDIDO
// ══════════════════════════════════════════════
function generateCode() {
  return 'ATL-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

window.handleConfirm = function () {
  if (!validate()) return;

  const code = generateCode();

  // Ocultar checkout, mostrar confirmación
  document.getElementById('checkoutLayout').style.display = 'none';
  const screen = document.getElementById('confirmScreen');
  screen.classList.add('show');

  setText('confirmCode', code);

  const isDelivery = orderType === 'delivery';
  setText('confirmSubtitle', isDelivery
    ? 'Your order is on its way! We\'ll deliver it to your address shortly.'
    : 'Your order is being prepared. Pick it up at the store in 10–15 minutes.'
  );
  setText('confirmPayNote', paymentMethod === 'cash'
    ? '💵 Remember to bring cash when you pick up your order.'
    : '💳 Card payment recorded. We\'ll process it when your order is ready.'
  );

  // Limpiar carrito
  try { localStorage.removeItem(CART_KEY); } catch (e) { }
};

// ══════════════════════════════════════════════
//  WHATSAPP
// ══════════════════════════════════════════════
window.handleWhatsApp = function () {
  if (!validate()) return;

  const cart = getCart();
  const name = document.getElementById('name')?.value.trim() || '';
  const phone = document.getElementById('phone')?.value.trim() || '';
  const note = document.getElementById('note')?.value.trim() || '';
  const addr = orderType === 'delivery' ? (document.getElementById('address')?.value.trim() || '') : '';
  const ref = orderType === 'delivery' ? (document.getElementById('reference')?.value.trim() || '') : '';
  const store = getStore();

  const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const tax = subtotal * ITBIS_RATE;
  const shipping = orderType === 'delivery' ? SHIPPING_FEE : 0;
  const total = subtotal + tax + shipping;

  const lines = cart.map(i =>
    `• ${i.name}${i.size ? ' (' + i.size + ')' : ''} × ${i.qty || 1} — ${fmt((i.price || 0) * (i.qty || 1))}`
  ).join('\n');

  const payLabel = paymentMethod === 'cash' ? 'Cash on pickup' : 'Credit/Debit card';

  const msg =
    `☕ *New Order — Atalia Café*
${store ? `📍 Store: ${store.name}` : ''}

👤 *Name:* ${name}
📱 *Phone:* ${phone}
📦 *Type:* ${orderType === 'pickup' ? 'Pickup' : 'Delivery'}
${addr ? `📍 *Address:* ${addr}` : ''}
${ref ? `🗺️ *Reference:* ${ref}` : ''}

🛒 *Items:*
${lines}

💰 Subtotal: ${fmt(subtotal)}
🧾 Tax (18%): ${fmt(tax)}
🚗 Shipping: ${shipping ? fmt(shipping) : 'Free'}
✅ *Total: ${fmt(total)}*

💳 *Payment:* ${payLabel}
${note ? `📝 *Note:* ${note}` : ''}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Redirigir si el carrito está vacío
  const cart = getCart();
  if (!cart.length) {
    // Opcional: comentar estas líneas si prefieres no redirigir
    // window.location.href = 'cart.html';
    // return;
  }

  // Store label
  const store = getStore();
  setText('storeLabel', store ? `📍 ${store.name}` : '📍 Atalia Café');

  renderSummary();
  initOrderType();
});