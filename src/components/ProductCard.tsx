import React from 'react';
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../contexts/StoreContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {product.onSale && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              -{discountPercentage}%
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary">Agotado</Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-sm group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
            {product.sizes.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </Link>

      <Button
        className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
        variant="outline"
        asChild
      >
        <Link to={`/product/${product.id}`}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ver Producto
        </Link>
      </Button>
    </motion.div>
  );
};
