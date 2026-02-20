import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { motion } from 'motion/react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      category: 'Pedidos y Envíos',
      questions: [
        {
          q: '¿Cuánto tarda en llegar mi pedido?',
          a: 'Los pedidos se procesan en 24-48 horas. El envío estándar tarda 3-5 días hábiles dentro del país. Ofrecemos envío express de 1-2 días hábiles con costo adicional.',
        },
        {
          q: '¿El envío es gratis?',
          a: 'Sí, ofrecemos envío gratis en todas las compras superiores a $100. Para compras menores, el costo de envío es de $10.',
        },
        {
          q: '¿Hacen envíos internacionales?',
          a: 'Actualmente solo realizamos envíos dentro de Argentina. Pronto estaremos expandiendo a otros países de Latinoamérica.',
        },
        {
          q: '¿Cómo puedo rastrear mi pedido?',
          a: 'Una vez que tu pedido sea despachado, recibirás un email con el número de seguimiento para rastrear tu envío en tiempo real.',
        },
      ],
    },
    {
      category: 'Devoluciones y Cambios',
      questions: [
        {
          q: '¿Cuál es la política de devoluciones?',
          a: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar sin usar, con etiquetas y en su empaque original.',
        },
        {
          q: '¿Cómo puedo hacer un cambio de talle?',
          a: 'Puedes solicitar un cambio de talle contactándonos por email o WhatsApp. Procesamos el cambio sin costo adicional dentro de los 30 días.',
        },
        {
          q: '¿Quién paga el envío de la devolución?',
          a: 'Los envíos de devolución son gratuitos. Te enviaremos una etiqueta de envío prepaga para que devuelvas el producto.',
        },
        {
          q: '¿Cuándo recibiré mi reembolso?',
          a: 'Los reembolsos se procesan dentro de 5-7 días hábiles después de recibir el producto devuelto. El dinero se acreditará en el método de pago original.',
        },
      ],
    },
    {
      category: 'Productos',
      questions: [
        {
          q: '¿Cómo sé qué talle elegir?',
          a: 'En cada producto encontrarás una guía de talles detallada. Si tienes dudas, no dudes en contactarnos y te ayudaremos a elegir el talle perfecto.',
        },
        {
          q: '¿Los productos son de algodón orgánico?',
          a: 'La mayoría de nuestros productos están confeccionados con algodón orgánico certificado. Verificamos cada prenda para asegurar la mejor calidad y sostenibilidad.',
        },
        {
          q: '¿Cómo debo cuidar mis prendas?',
          a: 'Recomendamos lavar a máquina en agua fría, no usar lejía, secar al aire libre y planchar a baja temperatura si es necesario. Cada prenda incluye instrucciones específicas de cuidado.',
        },
        {
          q: '¿Repondrán productos agotados?',
          a: 'Sí, regularmente reponemos nuestros productos más populares. Puedes suscribirte a notificaciones de stock para recibir un aviso cuando el producto esté disponible nuevamente.',
        },
      ],
    },
    {
      category: 'Pagos',
      questions: [
        {
          q: '¿Qué métodos de pago aceptan?',
          a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias y Mercado Pago.',
        },
        {
          q: '¿Es seguro comprar en su sitio?',
          a: 'Absolutamente. Utilizamos encriptación SSL y procesadores de pago certificados para garantizar la seguridad de tus datos.',
        },
        {
          q: '¿Puedo pagar en cuotas?',
          a: 'Sí, ofrecemos planes de cuotas sin interés con tarjetas de crédito seleccionadas. Las opciones de cuotas se mostrarán al momento del pago.',
        },
        {
          q: '¿Emiten factura?',
          a: 'Sí, emitimos factura electrónica para todas las compras. La recibirás por email una vez confirmado tu pedido.',
        },
      ],
    },
    {
      category: 'Cuenta y Membresía',
      questions: [
        {
          q: '¿Necesito crear una cuenta para comprar?',
          a: 'No es obligatorio, pero crear una cuenta te permite guardar tus direcciones, rastrear pedidos fácilmente y recibir ofertas exclusivas.',
        },
        {
          q: '¿Cómo puedo modificar mi información personal?',
          a: 'Puedes actualizar tu información desde tu cuenta en la sección "Mi Perfil". Si tienes problemas, contáctanos y te ayudaremos.',
        },
        {
          q: 'Tienen programa de fidelidad?',
          a: 'Estamos trabajando en un programa de recompensas para nuestros clientes más fieles. ¡Suscríbete al newsletter para ser el primero en conocerlo!',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas saber sobre EnterrLusst
          </p>
        </motion.div>

        <div className="space-y-8">
          {faqs.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
              
              <Accordion type="single" collapsible className="space-y-2">
                {section.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${sectionIndex}-${faqIndex}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-black text-white rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">¿No encontraste tu respuesta?</h2>
          <p className="text-gray-300 mb-6">
            Nuestro equipo está aquí para ayudarte
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </div>
  );
};