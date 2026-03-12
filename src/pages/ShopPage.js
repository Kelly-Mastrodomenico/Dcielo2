import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { Leaf, Award, Heart, Truck, ShieldCheck, Clock } from 'lucide-react';
import heroTienda from '../assets/hero-tienda.jpg';

const ShopPage = () => {
  return (
    <div data-testid="shop-page">

      {/* Hero tienda */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroTienda} alt="Huevos ecológicos DCielo" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1208]/55 via-[#1A1208]/35 to-[#1A1208]/70" />
        </div>
        <div className="relative z-10 container-custom text-center text-white">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">
            Tienda Online
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold mt-4 mb-6">
            Elige tu pack perfecto
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/85 text-lg max-w-xl mx-auto">
            Huevos ecológicos de gallinas felices, directos de nuestra granja a tu mesa. Sin intermediarios.
          </motion.p>
        </div>
      </section>

      {/* Barra de confianza */}
      <section className="py-6 bg-[#F0E9D6] border-b border-[#E8DFCC]">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { icon: Leaf,       text: '100% Ecológico' },
              { icon: Award,      text: 'Marca 0 Certificado' },
              { icon: Heart,      text: 'Bienestar Animal' },
              { icon: Truck,      text: 'Entrega 24-48h' },
              { icon: ShieldCheck,text: 'Pago Seguro' },
              { icon: Clock,      text: 'Siempre Fresco' },
            ].map(function(item) {
              var Icon = item.icon;
              return (
                <motion.div key={item.text}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#5C5040]"
                >
                  <Icon className="w-4 h-4 text-[#1A1208]" />
                  <span className="font-medium text-sm">{item.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="section-padding bg-[#FAF6EC]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRODUCTS.map(function(product) {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>

          {/* CTA restaurantes */}
          <div className="mt-16 bg-[#1A1208] rounded-2xl p-8 md:p-12 text-center text-white max-w-3xl mx-auto">
            <span className="text-[#C69B1A] text-sm font-bold uppercase tracking-widest">Hostelería y Restaurantes</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold mt-3 mb-4">Pedidos B2B y condiciones especiales</h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Si eres restaurante, bar o negocio de hostelería, contáctanos para obtener tarifas especiales,
              pedidos recurrentes y factura.
            </p>
            <a href="/contacto" className="inline-flex items-center gap-2 bg-[#F4CE14] text-[#1A1208] font-bold font-serif px-8 py-4 rounded-full hover:bg-[#F4CE14]/90 transition-all">
              Solicitar presupuesto profesional
            </a>
          </div>

          {/* Info cards */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Envío Refrigerado', desc: 'Todos nuestros envíos se realizan en condiciones óptimas de temperatura para garantizar la frescura.' },
              { title: 'Entrega en 24-48h', desc: 'Recibe tus huevos frescos en tu domicilio en un plazo máximo de 48 horas desde el pedido.' },
              { title: 'Garantía de Calidad', desc: 'Si no quedas satisfecho con la calidad de nuestros huevos, te devolvemos el dinero sin preguntas.' },
            ].map(function(item, index) {
              return (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-[#E8DFCC]"
                >
                  <h3 className="font-serif text-lg font-semibold text-[#1A1208] mb-2">{item.title}</h3>
                  <p className="text-[#5C5040] text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — enlace al FAQ del inicio */}
      <section className="py-14 bg-[#F0E9D6]">
        <div className="container-custom max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#5C5040] text-sm uppercase tracking-widest font-bold mb-3">¿Tienes dudas?</p>
            <h3 className="font-serif text-2xl font-bold text-[#1A1208] mb-4">Consulta nuestras preguntas frecuentes</h3>
            <p className="text-[#5C5040] mb-6 text-sm">Todo sobre conservación, envíos, certificación ecológica y tarifas para restaurantes.</p>
            <a href="/#faq" className="inline-block bg-transparent border-2 border-[#C69B1A] text-[#C69B1A] hover:bg-[#C69B1A] hover:text-[#1A1208] px-8 py-3 rounded font-bold transition-all duration-300 text-sm">
              Ver preguntas frecuentes
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
