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

export interface DiscountCode {
  code: string;
  discount: number;
  active: boolean;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  discountCodes: DiscountCode[];
  categories: string[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  addDiscountCode: (code: DiscountCode) => void;
  updateDiscountCode: (code: string, updates: Partial<DiscountCode>) => void;
  deleteDiscountCode: (code: string) => void;
  addCategory: (category: string) => void;
  getCartTotal: () => number;
  applyDiscount: (code: string) => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Urban Black Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    description: 'Sudadera urbana premium con capucha. Confeccionada en algodón orgánico de alta calidad. Diseño minimalista con ajuste perfecto.',
    images: [
      'https://images.unsplash.com/photo-1659789726283-2a2e9d881d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcxNDk5NDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1080',
    ],
    category: 'Buzos',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    onSale: true,
    featured: true,
    visible: true,
  },
  {
    id: '2',
    name: 'Essential White Tee',
    price: 39.99,
    description: 'Remera básica de corte moderno. Algodón premium suave al tacto. Perfecto para cualquier ocasión.',
    images: [
      'https://images.unsplash.com/photo-1575436611232-44651b483d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMHN0cmVldCUyMHN0eWxlfGVufDF8fHx8MTc3MTYwMDIzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1080',
    ],
    category: 'Remeras',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 50,
    onSale: false,
    featured: true,
    visible: true,
  },
  {
    id: '3',
    name: 'Classic Denim Jeans',
    price: 99.99,
    originalPrice: 129.99,
    description: 'Jeans de mezclilla premium con corte recto. Diseño atemporal y versátil. Máxima durabilidad y comodidad.',
    images: [
      'https://images.unsplash.com/photo-1635815171008-5f1b358bb2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwdXJiYW58ZW58MXx8fHwxNzcxNjAwMjM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1080',
    ],
    category: 'Pantalones',
    sizes: ['28', '30', '32', '34', '36'],
    stock: 30,
    onSale: true,
    featured: false,
    visible: true,
  },
  {
    id: '4',
    name: 'Streetwear Cap',
    price: 29.99,
    description: 'Gorra urbana con diseño minimalista. Ajuste perfecto y materiales premium. Logo bordado.',
    images: [
      'https://images.unsplash.com/photo-1758745369561-e963bc5202fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwYWNjZXNzb3JpZXMlMjBjYXB8ZW58MXx8fHwxNzcxNTQwMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1080',
    ],
    category: 'Accesorios',
    sizes: ['One Size'],
    stock: 40,
    onSale: false,
    featured: true,
    visible: true,
  },
  {
    id: '5',
    name: 'Oversized Gray Hoodie',
    price: 94.99,
    description: 'Sudadera oversize de máxima comodidad. Diseño contemporáneo con corte holgado. Material premium.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1080',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1080',
    ],
    category: 'Buzos',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    onSale: false,
    featured: false,
    visible: true,
  },
  {
    id: '6',
    name: 'Black Cargo Pants',
    price: 89.99,
    originalPrice: 109.99,
    description: 'Pantalones cargo de estilo urbano. Múltiples bolsillos funcionales. Tela resistente y cómoda.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1080',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1080',
    ],
    category: 'Pantalones',
    sizes: ['28', '30', '32', '34', '36'],
    stock: 15,
    onSale: true,
    featured: false,
    visible: true,
  },
];

const initialDiscountCodes: DiscountCode[] = [
  { code: 'WELCOME10', discount: 10, active: true },
  { code: 'SUMMER20', discount: 20, active: true },
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(() => {
    const saved = localStorage.getItem('discountCodes');
    return saved ? JSON.parse(saved) : initialDiscountCodes;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : ['Remeras', 'Buzos', 'Pantalones', 'Accesorios'];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('discountCodes', JSON.stringify(discountCodes));
  }, [discountCodes]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setCart(cart.filter(item => item.product.id !== id));
  };

  const addToCart = (product: Product, size: string, quantity: number) => {
    const existingItem = cart.find(
      item => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      updateCartQuantity(product.id, size, existingItem.quantity + quantity);
    } else {
      setCart([...cart, { product, size, quantity }]);
    }
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(cart.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addDiscountCode = (code: DiscountCode) => {
    setDiscountCodes([...discountCodes, code]);
  };

  const updateDiscountCode = (code: string, updates: Partial<DiscountCode>) => {
    setDiscountCodes(discountCodes.map(dc => dc.code === code ? { ...dc, ...updates } : dc));
  };

  const deleteDiscountCode = (code: string) => {
    setDiscountCodes(discountCodes.filter(dc => dc.code !== code));
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const applyDiscount = (code: string) => {
    const discountCode = discountCodes.find(dc => dc.code === code && dc.active);
    return discountCode ? discountCode.discount : 0;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        discountCodes,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addDiscountCode,
        updateDiscountCode,
        deleteDiscountCode,
        addCategory,
        getCartTotal,
        applyDiscount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
