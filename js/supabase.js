// ============================================================
//  ATALIA CAFÉ — js/supabase.js
//  Shared Supabase client — import this on every page
//  Never put the service_role key here — anon key only
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ── Connection ───────────────────────────────────────────────
const SUPABASE_URL = 'https://cvmdrixxsnwcgzrndhcy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bWRyaXh4c253Y2d6cm5kaGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjkzMzgsImV4cCI6MjA5MzI0NTMzOH0.lFFDkbR6nc44ib11fNOSlUAG7QlNlnxTOlIRIidMA4w';

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

// ============================================================
//  BUSINESS SETTINGS
//  Loaded once and cached — used across all pages
//  Provides: tax rate, currency, delivery config, hours, etc.
// ============================================================
let _settings = null;

export async function getSettings() {
    if (_settings) return _settings;
    const { data, error } = await sb
        .from('business_settings')
        .select('*')
        .single();
    if (error) {
        console.error('[Supabase] Failed to load business settings:', error.message);
        return getDefaultSettings();
    }
    _settings = data;
    return _settings;
}

// Fallback if Supabase is unreachable
function getDefaultSettings() {
    return {
        business_name: 'Atalia Café',
        tagline: 'Your daily ritual',
        currency_symbol: '$',
        tax_rate: 8.5,
        tax_label: 'Sales Tax',
        delivery_enabled: true,
        delivery_fee: 3.99,
        free_delivery_min: 25.00,
        cash_enabled: true,
        card_enabled: true,
        default_language: 'en',
        whatsapp_enabled: true,
        whatsapp_number: '',
    };
}

// ============================================================
//  LANGUAGE HELPER
//  Returns current language from localStorage or settings
// ============================================================
export function getCurrentLang() {
    return localStorage.getItem('atalia_lang') || 'en';
}

export function setLang(lang) {
    localStorage.setItem('atalia_lang', lang);
}

// ============================================================
//  FORMATTING HELPERS
//  Always use these — never hardcode currency or tax
// ============================================================
export function formatPrice(amount, settings) {
    const symbol = settings?.currency_symbol || '$';
    return `${symbol}${Number(amount).toFixed(2)}`;
}

export function calcTax(subtotal, settings) {
    const rate = settings?.tax_rate || 8.5;
    return Math.round(subtotal * (rate / 100) * 100) / 100;
}

export function calcDelivery(subtotal, settings) {
    if (!settings?.delivery_enabled) return 0;
    if (subtotal >= (settings?.free_delivery_min || 25)) return 0;
    return settings?.delivery_fee || 3.99;
}

export function calcTotal(subtotal, settings, isDelivery = false) {
    const tax = calcTax(subtotal, settings);
    const delivery = isDelivery ? calcDelivery(subtotal, settings) : 0;
    return Math.round((subtotal + tax + delivery) * 100) / 100;
}

// ============================================================
//  CART HELPERS
//  localStorage key: 'atalia_cart'
//  Format: [{ id, name_en, name_es, price, image_url,
//             category_slug, size, extras[], qty }]
// ============================================================
const CART_KEY = 'atalia_cart';

export function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch event so all tabs update
    window.dispatchEvent(new CustomEvent('atalia:cart-updated', { detail: cart }));
}

export function getCartCount() {
    return getCart().reduce((s, i) => s + (i.qty || 1), 0);
}

export function getCartSubtotal() {
    return getCart().reduce((s, i) => {
        const base = parseFloat(i.price) || 0;
        const extras = (i.extras || []).reduce((es, e) => es + (parseFloat(e.price) || 0), 0);
        return s + (base + extras) * (i.qty || 1);
    }, 0);
}

export function addToCart(product) {
    // product = { id, name_en, name_es, price, image_url,
    //             category_slug, size?, extras?, qty? }
    const cart = getCart();
    const match = cart.findIndex(i =>
        i.id === product.id &&
        i.size === (product.size || null) &&
        JSON.stringify(i.extras) === JSON.stringify(product.extras || [])
    );
    if (match > -1) {
        cart[match].qty = (cart[match].qty || 1) + (product.qty || 1);
    } else {
        cart.push({ ...product, qty: product.qty || 1 });
    }
    saveCart(cart);
}

export function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

export function updateQty(index, qty) {
    const cart = getCart();
    if (!cart[index]) return;
    if (qty <= 0) { removeFromCart(index); return; }
    cart[index].qty = qty;
    saveCart(cart);
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new CustomEvent('atalia:cart-updated', { detail: [] }));
}

// ============================================================
//  ORDER CODE GENERATOR
//  Format: ATL-XXXX (e.g. ATL-K9X2)
// ============================================================
export function generateOrderCode() {
    return 'ATL-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// ============================================================
//  XSS SANITIZATION
//  Always sanitize before inserting into the DOM
// ============================================================
export function sanitize(str) {
    if (typeof str !== 'string') return String(str ?? '');
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

export function sanitizeInput(str) {
    return String(str || '').replace(/[<>"'`]/g, '').trim().substring(0, 500);
}

// ============================================================
//  NAVBAR CART BADGE
//  Call this on every page to keep the badge in sync
// ============================================================
export function updateCartBadge() {
    const count = getCartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// ============================================================
//  AUTH HELPERS (admin only)
// ============================================================
export async function getAdminSession() {
    const { data: { session } } = await sb.auth.getSession();
    return session;
}

export async function requireAdmin() {
    const session = await getAdminSession();
    if (!session) {
        window.location.href = 'admin.html';
        return null;
    }
    return session;
}