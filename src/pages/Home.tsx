import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Truck, Shield, Star } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const { products } = useStore();
  
  const featuredProducts = products.filter(p => p.featured && p.visible).slice(0, 4);
  const saleProducts = products.filter(p => p.onSale && p.visible).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1635650805015-2fa50682873a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldHdlYXIlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzcxNTg1NTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Estilo Urbano
              <br />
              Auténtico
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Descubre la nueva colección de streetwear diseñada para los que marcan tendencia.
            </p>
            <Button size="lg" className="text-lg" asChild>
              <Link to="/catalog">
                Comprar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Envío Gratis</h3>
              <p className="text-sm text-gray-600">En compras superiores a $100</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Compra Segura</h3>
              <p className="text-sm text-gray-600">Pago 100% protegido</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Calidad Premium</h3>
              <p className="text-sm text-gray-600">Materiales de primera calidad</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
              <p className="text-gray-600">Lo mejor de nuestra colección</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/catalog">Ver Todo</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/catalog">Ver Todo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Ofertas Especiales</h2>
                <p className="text-gray-600">Aprovecha estos precios únicos</p>
              </div>
              <Button variant="outline" asChild className="hidden md:flex">
                <Link to="/catalog?filter=sale">Ver Ofertas</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" asChild>
                <Link to="/catalog?filter=sale">Ver Ofertas</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Únete a la Comunidad EnterrLusst
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Sé el primero en conocer nuevos lanzamientos, ofertas exclusivas y tendencias urbanas.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Contactar</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};