import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  stock: number;
  onSale: boolean;
  featured: boolean;
  visible: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];

  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;

  getCartTotal: () => number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(()=>{
    localStorage.setItem("products", JSON.stringify(products));
  },[products]);

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart]);

  /* ---------------- PRODUCTS ---------------- */

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...updates } : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  /* ---------------- CART ---------------- */

  const addToCart = (product: Product, size: string, quantity: number) => {

    if(product.stock < quantity){
      alert("Stock insuficiente 👑");
      return;
    }

    const existing = cart.find(
      item => item.product.id === product.id && item.size === size
    );

    if(existing){
      updateCartQuantity(product.id,size,existing.quantity + quantity);
    }else{
      setCart(prev => [...prev,{ product, size, quantity }]);
    }
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const updateCartQuantity = (productId:string,size:string,quantity:number) => {

    if(quantity <= 0){
      removeFromCart(productId,size);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total,item)=> total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,

      addProduct,
      updateProduct,
      deleteProduct,

      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,

      getCartTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if(!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
};