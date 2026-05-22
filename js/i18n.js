// ============================================================
//  ATALIA CAFÉ — js/i18n.js
//  Bilingual system: English (default) / Spanish
//  Usage: import { t, initI18n, toggleLang } from './i18n.js'
// ============================================================

import { getCurrentLang, setLang } from './supabase.js';

// ============================================================
//  TRANSLATIONS
// ============================================================
const translations = {

    en: {
        // ── NAV ──
        'nav.home': 'Home',
        'nav.menu': 'Menu',
        'nav.experience': 'Experience',
        'nav.order': 'Order',
        'nav.contact': 'Contact',
        'nav.cart': 'Cart',

        // ── HERO ──
        'hero.title': 'Your favorite café, freshly prepared every day',
        'hero.cta_menu': 'View menu',
        'hero.cta_order': 'Order online',

        // ── MENU SECTION (index) ──
        'menu.title': 'Our Menu',
        'menu.subtitle': 'Select a category to explore our products',
        'menu.view_all': 'View full menu',
        'menu.add': 'Add to cart',
        'menu.added': 'Added!',
        'menu.sold_out': 'Sold out',
        'menu.featured': 'Featured',
        'menu.vegetarian': 'Vegetarian',
        'menu.no_products': 'No products in this category yet.',

        // ── EXPERIENCE SECTION ──
        'exp.badge': 'Beyond the coffee',
        'exp.title': 'Taste the difference',
        'exp.lead': 'Authentic in every bean, every face, every moment.',
        'exp.f1_title': 'Daily coffee',
        'exp.f1_desc': 'Freshly brewed coffee, ready to go',
        'exp.f2_title': 'Homemade sweets',
        'exp.f2_desc': 'Pair your coffee with our house-made treats',
        'exp.f3_title': 'Passion for craft',
        'exp.f3_desc': 'Every product made with love and dedication',
        'exp.cta': 'Order now',

        // ── ORDER MODES ──
        'order.eyebrow': 'Order your way',
        'order.title': 'Your coffee, your way',
        'order.desc': 'Choose how to enjoy Atalia Café: pick it up, take it with you, or get it delivered.',
        'order.pickup': 'Store pickup',
        'order.pickup_d': 'Order online and skip the line.',
        'order.togo': 'To go',
        'order.togo_d': 'Your coffee ready to walk out.',
        'order.delivery': 'Delivery',
        'order.delivery_d': 'Delivered to your home or office.',
        'order.cta': 'View menu & order',

        // ── DELIVERY PARTNERS ──
        'delivery.title': 'Order online now',
        'delivery.desc': 'Get our coffee delivered through our partners',

        // ── REVIEWS ──
        'reviews.title': 'What our customers say',
        'reviews.loading': 'Loading reviews...',

        // ── CONTACT ──
        'contact.title': 'Visit us',
        'contact.hours': 'Hours',
        'contact.closed': 'Closed',

        // ── FOOTER ──
        'footer.tagline': 'Quality coffee since 2023',
        'footer.nav': 'Navigation',
        'footer.legal': 'Legal',
        'footer.follow': 'Follow us',
        'footer.terms': 'Terms & conditions',
        'footer.privacy': 'Privacy policy',
        'footer.refund': 'Refund policy',
        'footer.copy': '© 2026 Atalia Café. All rights reserved.',

        // ── MENU PAGE ──
        'menu_page.all': 'All',
        'menu_page.search': 'Search products...',
        'menu_page.no_results': 'No products match your search.',
        'menu_page.calories': 'cal',
        'menu_page.size': 'Size',
        'menu_page.extras': 'Extras',
        'menu_page.qty': 'Quantity',
        'menu_page.add_cart': 'Add to cart',
        'menu_page.select_store': 'Select a store first',
        'menu_page.store_label': 'Pick up at',
        'menu_page.change_store': 'Change',

        // ── CART PAGE ──
        'cart.title': 'Your cart',
        'cart.empty': 'Your cart is empty',
        'cart.empty_sub': 'Add some items from our menu',
        'cart.go_menu': 'Browse menu',
        'cart.remove': 'Remove',
        'cart.clear': 'Clear cart',
        'cart.subtotal': 'Subtotal',
        'cart.tax': 'Sales Tax',
        'cart.delivery': 'Delivery',
        'cart.free': 'Free',
        'cart.total': 'Total',
        'cart.checkout': 'Proceed to checkout',
        'cart.whatsapp': 'Order via WhatsApp',
        'cart.calculated': 'Calculated at checkout',
        'cart.items': 'item',
        'cart.items_pl': 'items',

        // ── CHECKOUT PAGE ──
        'checkout.title': 'Checkout',
        'checkout.how': 'How would you like to receive your order?',
        'checkout.pickup': 'Store pickup',
        'checkout.pickup_sub': 'Ready in 10–15 min, no extra charge.',
        'checkout.delivery': 'Delivery',
        'checkout.delivery_sub': 'Delivered to your address.',
        'checkout.where': 'Where to pick up?',
        'checkout.your_info': 'Your information',
        'checkout.name': 'Full name',
        'checkout.phone': 'Phone number',
        'checkout.email': 'Email (optional)',
        'checkout.address': 'Delivery address',
        'checkout.address_ph': 'Street, number, apt',
        'checkout.city': 'City',
        'checkout.state': 'State',
        'checkout.zip': 'ZIP Code',
        'checkout.note': 'Note for the barista (optional)',
        'checkout.note_ph': 'e.g. no sugar, extra hot, oat milk…',
        'checkout.promo': 'Promo code',
        'checkout.promo_ph': 'Enter code',
        'checkout.apply': 'Apply',
        'checkout.payment': 'Payment method',
        'checkout.cash': 'Cash on pickup',
        'checkout.cash_sub': 'Pay when you arrive at the store',
        'checkout.cash_note': 'Your order will be reserved. Pay in cash when you arrive.',
        'checkout.card': 'Credit / Debit card',
        'checkout.card_sub': 'Secure online payment',
        'checkout.card_note': 'Your data is protected with SSL encryption.',
        'checkout.confirm': 'Place order',
        'checkout.whatsapp': 'Confirm via WhatsApp',
        'checkout.processing': 'Processing...',
        'checkout.summary': 'Order summary',
        'checkout.shipping': 'Shipping',
        'checkout.discount': 'Discount',

        // ── CONFIRMATION ──
        'confirm.title': 'Order confirmed!',
        'confirm.pickup': 'Stop by the store in 10–15 minutes. Your order will be ready.',
        'confirm.delivery': 'Your order is on its way! We\'ll deliver it to your address shortly.',
        'confirm.cash': '💵 Remember to bring cash when you pick up.',
        'confirm.card': '💳 Card payment recorded.',
        'confirm.home': 'Back to home',
        'confirm.track': 'Track order',

        // ── ORDER TRACKING ──
        'track.title': 'Track your order',
        'track.placeholder': 'Enter your order code (e.g. ATL-K9X2)',
        'track.search': 'Track',
        'track.not_found': 'Order not found. Check your code and try again.',
        'track.pending': 'Pending',
        'track.preparing': 'Preparing',
        'track.ready': 'Ready for pickup',
        'track.delivered': 'Delivered',
        'track.cancelled': 'Cancelled',

        // ── COMMON ──
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong. Please try again.',
        'common.close': 'Close',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.add': 'Add',
        'common.active': 'Active',
        'common.inactive': 'Inactive',
        'common.yes': 'Yes',
        'common.no': 'No',
    },

    es: {
        // ── NAV ──
        'nav.home': 'Inicio',
        'nav.menu': 'Menú',
        'nav.experience': 'Experiencia',
        'nav.order': 'Ordenar',
        'nav.contact': 'Contacto',
        'nav.cart': 'Carrito',

        // ── HERO ──
        'hero.title': 'Tu café favorito, recién preparado todos los días',
        'hero.cta_menu': 'Ver menú',
        'hero.cta_order': 'Ordenar online',

        // ── MENU SECTION (index) ──
        'menu.title': 'Nuestro Menú',
        'menu.subtitle': 'Selecciona una categoría para ver nuestros productos',
        'menu.view_all': 'Ver menú completo',
        'menu.add': 'Añadir al carrito',
        'menu.added': '¡Añadido!',
        'menu.sold_out': 'Agotado',
        'menu.featured': 'Destacado',
        'menu.vegetarian': 'Vegetariano',
        'menu.no_products': 'No hay productos en esta categoría todavía.',

        // ── EXPERIENCE SECTION ──
        'exp.badge': 'Más allá del café',
        'exp.title': 'Saborea la diferencia',
        'exp.lead': 'Auténtico en cada grano, en cada rostro, en cada instante.',
        'exp.f1_title': 'Café diario',
        'exp.f1_desc': 'Café recién preparado, listo para llevar',
        'exp.f2_title': 'Dulces caseros',
        'exp.f2_desc': 'Acompaña tu café con nuestros dulces hechos en casa',
        'exp.f3_title': 'Pasión por lo artesanal',
        'exp.f3_desc': 'Cada producto hecho con amor y dedicación',
        'exp.cta': 'Ordenar ahora',

        // ── ORDER MODES ──
        'order.eyebrow': 'Ordena como prefieras',
        'order.title': 'Tu café, a tu manera',
        'order.desc': 'Elige cómo disfrutar Atalia Café: pasa a recogerlo, llévalo contigo o recíbelo donde estés.',
        'order.pickup': 'Recoger en tienda',
        'order.pickup_d': 'Ordena online y pasa sin hacer fila.',
        'order.togo': 'Para llevar',
        'order.togo_d': 'Tu café listo para salir.',
        'order.delivery': 'Delivery',
        'order.delivery_d': 'Recíbelo en casa u oficina.',
        'order.cta': 'Ver menú y ordenar',

        // ── DELIVERY PARTNERS ──
        'delivery.title': 'Ordena en línea ahora',
        'delivery.desc': 'Recibe nuestro café a través de nuestros socios',

        // ── REVIEWS ──
        'reviews.title': 'Lo que dicen nuestros clientes',
        'reviews.loading': 'Cargando reseñas...',

        // ── CONTACT ──
        'contact.title': 'Visítanos',
        'contact.hours': 'Horario',
        'contact.closed': 'Cerrado',

        // ── FOOTER ──
        'footer.tagline': 'Café de calidad desde 2023',
        'footer.nav': 'Navegación',
        'footer.legal': 'Legal',
        'footer.follow': 'Síguenos',
        'footer.terms': 'Términos y condiciones',
        'footer.privacy': 'Política de privacidad',
        'footer.refund': 'Política de reembolso',
        'footer.copy': '© 2026 Atalia Café. Todos los derechos reservados.',

        // ── MENU PAGE ──
        'menu_page.all': 'Todos',
        'menu_page.search': 'Buscar productos...',
        'menu_page.no_results': 'No hay productos que coincidan.',
        'menu_page.calories': 'cal',
        'menu_page.size': 'Tamaño',
        'menu_page.extras': 'Extras',
        'menu_page.qty': 'Cantidad',
        'menu_page.add_cart': 'Añadir al carrito',
        'menu_page.select_store': 'Selecciona una tienda primero',
        'menu_page.store_label': 'Recoger en',
        'menu_page.change_store': 'Cambiar',

        // ── CART PAGE ──
        'cart.title': 'Tu carrito',
        'cart.empty': 'Tu carrito está vacío',
        'cart.empty_sub': 'Agrega productos desde nuestro menú',
        'cart.go_menu': 'Ver menú',
        'cart.remove': 'Eliminar',
        'cart.clear': 'Vaciar carrito',
        'cart.subtotal': 'Subtotal',
        'cart.tax': 'Sales Tax',
        'cart.delivery': 'Envío',
        'cart.free': 'Gratis',
        'cart.total': 'Total',
        'cart.checkout': 'Ir al checkout',
        'cart.whatsapp': 'Ordenar por WhatsApp',
        'cart.calculated': 'Calculado en el checkout',
        'cart.items': 'producto',
        'cart.items_pl': 'productos',

        // ── CHECKOUT PAGE ──
        'checkout.title': 'Finalizar pedido',
        'checkout.how': '¿Cómo quieres recibir tu pedido?',
        'checkout.pickup': 'Recoger en tienda',
        'checkout.pickup_sub': 'Listo en 10–15 min, sin cargo extra.',
        'checkout.delivery': 'Delivery',
        'checkout.delivery_sub': 'Recíbelo en tu dirección.',
        'checkout.where': '¿Dónde recoger?',
        'checkout.your_info': 'Tus datos',
        'checkout.name': 'Nombre completo',
        'checkout.phone': 'Teléfono',
        'checkout.email': 'Email (opcional)',
        'checkout.address': 'Dirección de entrega',
        'checkout.address_ph': 'Calle, número, apto',
        'checkout.city': 'Ciudad',
        'checkout.state': 'Estado',
        'checkout.zip': 'ZIP Code',
        'checkout.note': 'Nota para el barista (opcional)',
        'checkout.note_ph': 'Ej. sin azúcar, extra caliente, leche de avena…',
        'checkout.promo': 'Código promocional',
        'checkout.promo_ph': 'Ingresa el código',
        'checkout.apply': 'Aplicar',
        'checkout.payment': 'Método de pago',
        'checkout.cash': 'Efectivo al recoger',
        'checkout.cash_sub': 'Paga cuando llegues a la tienda',
        'checkout.cash_note': 'Tu pedido quedará reservado. Paga en efectivo al llegar.',
        'checkout.card': 'Tarjeta de crédito / débito',
        'checkout.card_sub': 'Pago seguro en línea',
        'checkout.card_note': 'Tus datos están protegidos con encriptación SSL.',
        'checkout.confirm': 'Confirmar pedido',
        'checkout.whatsapp': 'Confirmar por WhatsApp',
        'checkout.processing': 'Procesando...',
        'checkout.summary': 'Resumen del pedido',
        'checkout.shipping': 'Envío',
        'checkout.discount': 'Descuento',

        // ── CONFIRMATION ──
        'confirm.title': '¡Pedido confirmado!',
        'confirm.pickup': 'Pasa por la tienda en 10–15 minutos. Tu pedido estará listo.',
        'confirm.delivery': 'Tu pedido está en camino. Te lo entregamos pronto.',
        'confirm.cash': '💵 Recuerda llevar efectivo al recoger.',
        'confirm.card': '💳 Pago con tarjeta registrado.',
        'confirm.home': 'Ir al inicio',
        'confirm.track': 'Rastrear pedido',

        // ── ORDER TRACKING ──
        'track.title': 'Rastrear pedido',
        'track.placeholder': 'Ingresa tu código (ej. ATL-K9X2)',
        'track.search': 'Buscar',
        'track.not_found': 'Pedido no encontrado. Verifica tu código e intenta de nuevo.',
        'track.pending': 'Pendiente',
        'track.preparing': 'Preparando',
        'track.ready': 'Listo para recoger',
        'track.delivered': 'Entregado',
        'track.cancelled': 'Cancelado',

        // ── COMMON ──
        'common.loading': 'Cargando...',
        'common.error': 'Algo salió mal. Intenta de nuevo.',
        'common.close': 'Cerrar',
        'common.save': 'Guardar',
        'common.cancel': 'Cancelar',
        'common.delete': 'Eliminar',
        'common.edit': 'Editar',
        'common.add': 'Agregar',
        'common.active': 'Activo',
        'common.inactive': 'Inactivo',
        'common.yes': 'Sí',
        'common.no': 'No',
    }
};

// ============================================================
//  TRANSLATE FUNCTION
//  t('hero.title') → 'Your favorite café...'
//  t('cart.items', { count: 3 }) → '3 items'
// ============================================================
export function t(key, vars = {}) {
    const lang = getCurrentLang();
    const dict = translations[lang] || translations['en'];
    let text = dict[key] || translations['en'][key] || key;

    // Replace variables: t('cart.count', { n: 3 }) → '3 items'
    Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{${k}}`, 'g'), v);
    });

    return text;
}

// ============================================================
//  APPLY TRANSLATIONS TO DOM
//  Reads all elements with data-i18n attribute
//  <h1 data-i18n="hero.title"></h1>
//  <input data-i18n-placeholder="checkout.name">
// ============================================================
export function applyTranslations() {
    const lang = getCurrentLang();

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });

    // ARIA labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        el.setAttribute('aria-label', t(key));
    });

    // Title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = t(key);
    });

    // Update lang toggle button
    updateLangButton(lang);

    // Update <html lang="">
    document.documentElement.lang = lang;
}

// ============================================================
//  TOGGLE LANGUAGE
// ============================================================
export function toggleLang() {
    const current = getCurrentLang();
    const next = current === 'en' ? 'es' : 'en';
    setLang(next);
    applyTranslations();

    // Smooth flash effect on body
    document.body.style.opacity = '0.8';
    setTimeout(() => { document.body.style.opacity = '1'; }, 150);
}

function updateLangButton(lang) {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = lang === 'en' ? 'ES' : 'EN';
        btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés');
        btn.setAttribute('title', lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés');
    });
}

// ============================================================
//  INIT — call this at the top of each page script
// ============================================================
export function initI18n() {
    applyTranslations();

    // Wire up all lang toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.addEventListener('click', toggleLang);
    });
}