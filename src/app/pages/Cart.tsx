import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useStore } from '../contexts/StoreContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, applyDiscount } = useStore();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = getCartTotal();
  const discount = (subtotal * appliedDiscount) / 100;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount + shipping;

  const handleApplyDiscount = () => {
    const discountPercentage = applyDiscount(discountCode);
    if (discountPercentage > 0) {
      setAppliedDiscount(discountPercentage);
      toast.success(`Código aplicado: ${discountPercentage}% de descuento`);
    } else {
      toast.error('Código de descuento inválido');
    }
  };

  const handleCheckout = () => {
    toast.success('Redirigiendo a la pasarela de pago...');
    // Aquí se integraría con la pasarela de pago
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">
            Descubre nuestros productos y comienza a comprar
          </p>
          <Button size="lg" asChild>
            <Link to="/catalog">
              Ir al Catálogo
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 flex gap-6"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">
                        <Link to={`/product/${item.product.id}`} className="hover:text-gray-600">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">Talle: {item.size}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id, item.size)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateCartQuantity(
                          item.product.id,
                          item.size,
                          item.quantity - 1
                        )}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateCartQuantity(
                          item.product.id,
                          item.size,
                          item.quantity + 1
                        )}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${item.product.price.toFixed(2)} c/u
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

              {/* Discount Code */}
              <div className="mb-6">
                <Label htmlFor="discount" className="mb-2 block">
                  Código de Descuento
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="discount"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="CÓDIGO"
                  />
                  <Button variant="outline" onClick={handleApplyDiscount}>
                    Aplicar
                  </Button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    Descuento de {appliedDiscount}% aplicado
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Descuento ({appliedDiscount}%)</span>
                    <span className="font-medium text-green-600">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping > 0 && subtotal < 100 && (
                  <p className="text-xs text-gray-600">
                    Agrega ${(100 - subtotal).toFixed(2)} más para envío gratis
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>

              <Button
                size="lg"
                className="w-full mb-3"
                onClick={handleCheckout}
              >
                Proceder al Pago
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/catalog">Continuar Comprando</Link>
              </Button>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-3">Métodos de pago aceptados:</p>
                <div className="flex gap-2">
                  <div className="h-8 w-12 border rounded flex items-center justify-center text-xs font-medium">
                    VISA
                  </div>
                  <div className="h-8 w-12 border rounded flex items-center justify-center text-xs font-medium">
                    MC
                  </div>
                  <div className="h-8 w-12 border rounded flex items-center justify-center text-xs font-medium">
                    AMEX
                  </div>
                  <div className="h-8 w-12 border rounded flex items-center justify-center text-xs font-medium">
                    MP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
