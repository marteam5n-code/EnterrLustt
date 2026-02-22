import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Award, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1765009433753-c7462637d21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE2MDAyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="About"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Sobre EnterrLusst
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Más que ropa, un estilo de vida urbano auténtico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-700"
          >
            <p>
              EnterrLusst nació en 2020 con una misión clara: redefinir el streetwear contemporáneo
              combinando diseño minimalista, calidad premium y autenticidad urbana.
            </p>
            <p>
              Creemos que la moda debe ser más que solo tendencias pasajeras. Cada pieza de nuestra
              colección está cuidadosamente diseñada para durar, tanto en estilo como en calidad,
              utilizando materiales sostenibles y procesos de producción éticos.
            </p>
            <p>
              Nuestra comunidad es el corazón de todo lo que hacemos. Diseñamos para personas que
              valoran la individualidad, la calidad y la expresión personal a través de la moda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Autenticidad</h3>
              <p className="text-gray-600">
                Diseños únicos que reflejan la verdadera cultura urbana.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Calidad</h3>
              <p className="text-gray-600">
                Solo utilizamos materiales premium y de primera calidad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Comunidad</h3>
              <p className="text-gray-600">
                Construimos una familia de personas con visión compartida.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Sostenibilidad</h3>
              <p className="text-gray-600">
                Comprometidos con prácticas responsables y éticas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un grupo de creativos apasionados por el diseño y la cultura urbana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Rodríguez', role: 'Fundador & Director Creativo' },
              { name: 'María González', role: 'Directora de Diseño' },
              { name: 'Carlos Martínez', role: 'Director de Producción' },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};