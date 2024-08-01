'use client'
import { useState, useEffect } from 'react';
import { getCart as fetchCartFromRedis, setCart as saveCartToRedis } from '@/lib/actions/cart.actions';
import { Analysis } from '@/lib/database/models/analysis.model';
import { Perfil } from '@/lib/database/models/perfil.model';

export type Cart = {
  items: {
    analysis: Analysis[],
    perfils: Perfil[],
  },
  tax: number
}

const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);


  useEffect(() => {
    const initializeCart = () => {
      setCart({
        items: { analysis: [], perfils: [] },
        tax: Number(process.env.TAX_PCT) || 0.16,
      });
    };
    initializeCart();
  }, []);

  const cartHasItem = (item: Analysis | Perfil) => {
    if (cart?.items.analysis.find(e => e._id === item._id))
      return true
    if (cart?.items.perfils.find(e => e._id === item._id))
      return true
    return false
  }

  const addItem = (item: Analysis | Perfil) => {
    setCart(prevCart => {
      if (!prevCart) return prevCart;
      const newCart = { ...prevCart };

      if (cartHasItem(item)) return newCart;
      if ((item as Perfil).total) {
        newCart.items.perfils.push(item as Perfil);
      } else {
        newCart.items.analysis.push(item as Analysis);
      }
      return newCart;
    });
  };

  const removeItem = (item: Analysis | Perfil) => {
    setCart(prevCart => {
      if (!prevCart) return prevCart;

      const newCart = { ...prevCart };
      if (!cartHasItem(item)) return newCart;
      newCart.items.analysis = newCart.items.analysis.filter(e => e._id?.toString() !== item._id?.toString());
      newCart.items.perfils = newCart.items.perfils.filter(e => e._id?.toString() !== item._id?.toString());
      return newCart;
    });
  };

  const saveCart = async () => {
    if (cart) {
      await saveCartToRedis(cart);
    }
  };

  return {
    cart,
    addItem,
    removeItem,
    cartHasItem,
    saveCart,
  };
};

export default useCart;
