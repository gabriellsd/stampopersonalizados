import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { stampo } from '../data/site';
import { getProductImage, PLACEHOLDER_IMAGE } from '../utils/product';
import { fmt } from '../utils/format';

const STORAGE_CART = 'stampo_cart';

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}

const SIZES = ['P', 'M', 'G', 'GG'];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [addingToCart, setAddingToCart] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CART);
      if (raw) setCart(JSON.parse(raw));
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
    } catch (_) {}
  }, [cart]);

  useEffect(() => {
    if (!announcement) return;
    const t = setTimeout(() => setAnnouncement(''), 1500);
    return () => clearTimeout(t);
  }, [announcement]);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    const t = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2800);
    return () => clearTimeout(t);
  }, []);

  const openProduct = useCallback((product) => {
    setModalProduct(product);
    setSelectedSize(null);
    setAnnouncement(`Aberto: ${product.name}`);
  }, []);

  const closeModal = useCallback(() => {
    setModalProduct(null);
    setSelectedSize(null);
  }, []);

  const addToCart = useCallback(() => {
    if (!modalProduct || !selectedSize) return;
    setAddingToCart(true);
    const key = `${modalProduct.id}_${selectedSize}`;
    const name = modalProduct.name;
    const size = selectedSize;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          name: modalProduct.name,
          size: selectedSize,
          price: modalProduct.price,
          img: getProductImage(modalProduct),
          quantity: 1,
        },
      ];
    });
    setAnnouncement(`${name} (tamanho ${size}) adicionado ao carrinho`);
    showToast(`${name} (Tam. ${size}) adicionado!`);
    closeModal();
    setCartOpen(true);
    setTimeout(() => setAddingToCart(false), 400);
  }, [modalProduct, selectedSize, showToast, closeModal]);

  const changeQty = useCallback((key, delta) => {
    setCart((prev) => {
      const item = prev.find((i) => i.key === key);
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) return prev.filter((i) => i.key !== key);
      return prev.map((i) => (i.key === key ? { ...i, quantity: newQty } : i));
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart((prev) => {
      if (!prev.length) return prev;
      if (window.confirm('Tem certeza que deseja limpar o pedido?')) return [];
      return prev;
    });
  }, []);

  const checkoutWhatsApp = useCallback(() => {
    if (!cart.length) {
      showToast('Adicione peças ao pedido primeiro!');
      return;
    }
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    let msg = '🛍️ *Solicitação de Orçamento — Stampô*\n\n';
    cart.forEach((i) => {
      msg += `• ${i.name} — Tam. ${i.size} × ${i.quantity} = R$ ${fmt(i.price * i.quantity)}\n`;
    });
    msg += `\n*Total estimado: R$ ${fmt(total)}*`;
    window.open(`https://wa.me/${stampo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  }, [cart, showToast]);

  const cartTotalQty = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const value = {
    cart,
    cartOpen,
    setCartOpen,
    cartTotalQty,
    cartTotalPrice,
    modalProduct,
    selectedSize,
    setSelectedSize,
    toast,
    showToast,
    openProduct,
    closeModal,
    addToCart,
    addingToCart,
    changeQty,
    clearCart,
    checkoutWhatsApp,
    announcement,
    setAnnouncement,
    SIZES,
    PLACEHOLDER_IMAGE,
    fmt,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
