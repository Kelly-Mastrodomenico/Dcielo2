import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck, Award, Star, Quote, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BenefitBadge } from '../components/BenefitIcons';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const HERO_IMG  = "https://images.unsplash.com/photo-1754746392365-f93acacb4d13?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";
const ABOUT_IMG = "https://images.unsplash.com/photo-1648228726568-8f51ac243842?crop=entropy&cs=srgb&fm=jpg&q=85&w=900";
const HENS_IMG  = "https://images.unsplash.com/photo-1709629107779-23f79b9661e1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";
const CTA_IMG   = "https://images.unsplash.com/photo-1758589421131-435f459c7f57?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: 'Certificado Ecológico EU' },
  { icon: Leaf,        text: 'Sin antibióticos ni hormonas' },
  { icon: Award,       text: 'Marca 0 · Código ecológico' },
  { icon: Truck,       text: 'Reparto directo 24-48h' },
];

const TESTIMONIOS = [
  { nombre: 'María G.', ciudad: 'Cáceres',
    texto: 'Desde que descubrí DCielo no compro huevos en el supermercado. La yema es de un naranja intenso y el sabor… no tiene comparación.', estrellas: 5 },
  { nombre: 'Restaurante El Roble', ciudad: 'Cáceres',
    texto: 'Los usamos en toda nuestra carta. Nuestros clientes notan la diferencia y nos preguntan de dónde vienen. El servicio de reparto es impecable.', estrellas: 5 },
  { nombre: 'Carlos M.', ciudad: 'Plasencia',
    texto: 'Pedí por primera vez sin muchas expectativas y quedé impresionado. Llevo 4 meses recibiendo mi docena quincenal. No los cambio por nada.', estrellas: 5 },
];

const STATS = [
  { numero: 500, sufijo: '+', label: 'Huevos diarios' },
  { numero: 300, sufijo: '+', label: 'Gallinas felices' },
  { numero: 800, sufijo: '+', label: 'Clientes satisfechos' },
  { numero: 20,  sufijo: '+', label: 'Años de experiencia' },
];

const FAQS = [
  { pregunta: '¿Qué significa el código 0 en el huevo?',
    respuesta: 'El código 0 es el más alto estándar de producción. Significa que las gallinas son criadas en régimen ecológico certificado por la UE: alimentación 100% ecológica, acceso libre al campo, sin antibióticos ni hormonas. Es la garantía más exigente que existe en Europa.' },
  { pregunta: '¿Cuánto tarda el envío en llegar?',
    respuesta: 'Los pedidos se procesan el mismo día y se envían en 24-48 horas laborables. Recibirás un email de confirmación con el seguimiento. Para pedidos de hostelería, también ofrecemos entregas programadas semanales.' },
  { pregunta: '¿Cómo se conservan los huevos?',
    respuesta: 'Los huevos frescos ecológicos se conservan perfectamente a temperatura ambiente alejados del sol durante 3-4 semanas. También puedes guardarlos en el frigorífico, donde duran hasta 5 semanas. No los laves hasta el momento de usarlos: su película natural los protege.' },
  { pregunta: '¿Tienen tarifas especiales para restaurantes?',
    respuesta: 'Sí. Ofrecemos tarifas mayoristas, pedidos recurrentes con entrega programada y facturación empresarial. Contáctanos por WhatsApp o a través del formulario y te preparamos una propuesta a medida.' },
  { pregunta: '¿Puedo recoger los huevos en la granja?',
    respuesta: 'Por supuesto. La granja está en Cáceres y podéis pasar a recoger de lunes a viernes de 9:00 a 14:00 y sábados de 9:00 a 13:00. Os recomendamos llamar antes para confirmar disponibilidad.' },
];

// ── Contador animado ──
function ContadorAnimado({ numero, sufijo }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const iniciado = useRef(false);

  useEffect(function() {
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !iniciado.current) {
        iniciado.current = true;
        var startTime = null;
        var duration = 1800;
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * numero));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(numero);
        }
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return function() { observer.disconnect(); };
  }, [numero]);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl font-bold text-[#C69B1A]">
      {count}{sufijo}
    </span>
  );
}

// ── FAQ item con accordion ──
function FaqItem({ pregunta, respuesta, abierto, onToggle }) {
  return (
    <div className="border-b border-[#E8DFCC] last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="font-serif text-lg font-semibold text-[#1A1208] group-hover:text-[#C69B1A] transition-colors">
          {pregunta}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-[#C69B1A] flex items-center justify-center text-[#C69B1A]">
          {abierto ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[#5C5040] leading-relaxed pb-5 pr-8">{respuesta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const HomePage = () => {
  const [faqAbierto, setFaqAbierto] = useState(null);

  const scrollToContent = () => {
    document.getElementById('about-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div data-testid="home-page">

      {/* ── HERO ── */}
      <section data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Granja DCielo Extremadura" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1208]/60 via-[#1A1208]/30 to-[#1A1208]/70" />
        </div>
        <div className="relative z-10 container-custom text-center text-white px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-handwriting text-2xl md:text-3xl text-[#C69B1A] mb-4">
            Desde las dehesas de Cáceres, Extremadura
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Huevos Ecológicos<br /><span className="text-[#C69B1A]">de verdad.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Código 0 certificado. Gallinas en libertad. Reparto directo desde la granja. Sin intermediarios, sin sorpresas.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tienda">
              <Button className="bg-[#C69B1A] hover:bg-[#9A7510] text-[#1A1208] font-bold rounded-full px-10 py-6 text-lg font-serif shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                Comprar Ahora <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/granja">
              <Button variant="outline" className="border-2 border-white/70 text-white hover:bg-white/10 rounded-full px-10 py-6 text-lg font-serif">
                Conoce la Granja
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="mt-12 flex flex-wrap justify-center gap-3">
            {TRUST_ITEMS.map(function(item) {
              var Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-2 bg-[#1A1208]/50 backdrop-blur-sm border border-[#C69B1A]/30 px-4 py-2 rounded-full text-white/90 text-sm">
                  <Icon className="w-4 h-4 text-[#C69B1A]" /><span>{item.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
        <motion.button onClick={scrollToContent}
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C69B1A] cursor-pointer">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </section>

      {/* ── QUIÉNES SOMOS ── */}
      <section id="about-preview" className="section-padding bg-[#FAF6EC]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={ABOUT_IMG} alt="Gallinas DCielo en libertad" className="w-full h-[450px] object-cover" />
              </div>
              {/* Badge pequeño estilo Emergent */}
              <div className="absolute top-4 left-4 bg-[#1A1208]/80 backdrop-blur-sm hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C69B1A]/40">
                <Award className="w-3.5 h-3.5 text-[#C69B1A]" />
                <span className="text-white/90 text-xs font-medium">Código 0 · Ecológico certificado</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
              <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Quiénes Somos</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1208] leading-tight">
                Una familia dedicada a la<br /><span className="text-[#C69B1A]">producción ecológica real</span>
              </h2>
              <p className="text-[#5C5040] text-lg leading-relaxed">
                DCielo es una granja familiar en Cáceres, Extremadura. Nuestras gallinas viven en libertad
                entre encinas centenarias, alimentándose de forma natural. Cuando se trabaja con cariño,
                salen productos con corazón.
              </p>
              {/* Cita natural — borde izquierdo dorado sutil */}
              <div className="border-l-2 border-[#C69B1A] pl-4 py-1">
                <p className="font-serif text-lg italic text-[#5C5040] leading-relaxed">
                  "Come natural, come sano. Cada huevo DCielo lleva el trabajo de toda una familia."
                </p>
                <p className="text-[#C69B1A] font-semibold text-sm mt-2">— Cielo Mar Figueras, Fundadora</p>
              </div>
              <div className="flex flex-wrap gap-5 pt-2">
                <div className="flex items-center gap-2">
                  <BenefitBadge benefit="ecologico" showLabel={false} size="md" />
                  <span className="text-sm font-medium text-[#1A1208]">Certificado EU</span>
                </div>
                <div className="flex items-center gap-2">
                  <BenefitBadge benefit="crianza_libre" showLabel={false} size="md" />
                  <span className="text-sm font-medium text-[#1A1208]">Crianza Libre</span>
                </div>
                <div className="flex items-center gap-2">
                  <BenefitBadge benefit="marca_0" showLabel={false} size="md" />
                  <span className="text-sm font-medium text-[#1A1208]">Marca 0</span>
                </div>
              </div>
              {/* Botón estilo Emergent: outline dorado, hover fondo dorado */}
              <Link to="/nosotros">
                <button className="bg-transparent border-2 border-[#C69B1A] text-[#C69B1A] hover:bg-[#C69B1A] hover:text-[#1A1208] px-8 py-3 rounded font-bold transition-all duration-300 flex items-center gap-2 group">
                  Conocer Nuestra Historia
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS ── */}
      <section className="section-padding bg-[#F0E9D6]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Tienda Online</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1208] mt-3 mb-4">Elige tu pack perfecto</h2>
            <p className="text-[#5C5040] max-w-lg mx-auto">Directamente de la granja a tu puerta. Sin intermediarios, con la frescura garantizada.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRODUCTS.map(function(product, index) {
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
                  <ProductCard product={product} />
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/tienda">
              <Button className="bg-[#C69B1A] hover:bg-[#9A7510] text-[#1A1208] font-bold rounded-full px-10 py-4 text-lg font-serif">
                Ver Todos los Productos <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="section-padding bg-[#FAF6EC]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Testimonios</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1208] mt-3 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-[#5C5040] max-w-lg mx-auto">El primer bocado lo dice todo. Estos son algunos de los que ya lo han comprobado.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIOS.map(function(t, i) {
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="bg-white border border-[#E8DFCC] rounded-2xl p-6 hover:border-[#C69B1A]/50 hover:shadow-lg transition-all">
                  <Quote className="w-8 h-8 text-[#C69B1A]/40 mb-4" />
                  <p className="text-[#5C5040] leading-relaxed mb-5 font-serif italic">"{t.texto}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C69B1A] font-bold text-sm">{t.nombre}</p>
                      <p className="text-[#8C7A60] text-xs">{t.ciudad}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(t.estrellas)].map(function(_, j) {
                        return <Star key={j} className="w-4 h-4 fill-[#C69B1A] text-[#C69B1A]" />;
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARCAMOS LA DIFERENCIA — contadores animados ── */}
      <section className="py-24 bg-[#1A1208]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Nuestros números</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3">Marcamos la diferencia</h2>
            <p className="text-white/60 mt-4 max-w-lg mx-auto">
              Años de dedicación, cuidado y respeto por la naturaleza en cada cifra.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(function(stat, i) {
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <ContadorAnimado numero={stat.numero} sufijo={stat.sufijo} />
                  <p className="text-white/60 mt-2 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL Jevashoes ── */}
      <section className="bg-white">
        <div className="relative h-[60vh] min-h-[380px] overflow-hidden">
          <img src={HENS_IMG} alt="Gallinas libres en la dehesa de Cáceres" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        </div>
        <div className="container-custom max-w-2xl text-center py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1208] leading-tight mb-6">
              La Calidad Que Mereces en Tu Mesa
            </h2>
            <p className="text-[#5C5040] text-lg leading-relaxed mb-3">
              Ya sea que estés cocinando para tu familia, creando en tu restaurante o simplemente buscando
              el mejor ingrediente, nuestros huevos te acompañarán con un sabor que no encontrarás en ningún supermercado.
            </p>
            <p className="text-[#8C7A60] font-serif italic">No comprometas tu bienestar. Elige DCielo.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section id="faq" className="py-20 bg-[#FAF6EC]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28">
              <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Preguntas frecuentes</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1208] mt-3 mb-6 leading-tight">
                Todo lo que necesitas saber
              </h2>
              <p className="text-[#5C5040] text-lg leading-relaxed mb-8">
                Hemos recogido las preguntas más habituales para que puedas tener respuesta inmediata.
                Si tienes cualquier otra duda, escríbenos por WhatsApp.
              </p>
              <Link to="/contacto">
                <button className="bg-transparent border-2 border-[#C69B1A] text-[#C69B1A] hover:bg-[#C69B1A] hover:text-[#1A1208] px-6 py-3 rounded font-bold transition-all duration-300">
                  Contactar con nosotros
                </button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md border border-[#E8DFCC] px-8 py-4">
              {FAQS.map(function(faq, i) {
                return (
                  <FaqItem key={i} pregunta={faq.pregunta} respuesta={faq.respuesta}
                    abierto={faqAbierto === i}
                    onToggle={function() { setFaqAbierto(faqAbierto === i ? null : i); }}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL — estilo Emergent: parallax + fondo oscuro ── */}
      <section className="relative py-36 overflow-hidden"
        style={{ backgroundImage: 'url(' + CTA_IMG + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container-custom text-center text-white">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl font-bold mb-6">
            ¿Listo para probar la diferencia?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/90 text-xl max-w-xl mx-auto mb-10">
            Huevos ecológicos de verdad, directos de nuestra granja a tu mesa.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to="/tienda">
              <button className="bg-[#C69B1A] hover:bg-[#9A7510] text-[#1A1208] px-12 py-5 rounded font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105">
                Hacer mi Primer Pedido
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
