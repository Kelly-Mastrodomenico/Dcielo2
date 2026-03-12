import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Check, ChevronRight, Zap, Droplets, Leaf } from 'lucide-react';
import heroGranja from '../assets/hero-granja.jpg';

const PROCESS_STEPS = [
  {
    id: 'gallinas',
    title: 'Nuestras Gallinas',
    subtitle: 'Crianza en Libertad',
    image: 'https://images.unsplash.com/photo-1648228726568-8f51ac243842?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    description: 'Nuestras gallinas viven en completa libertad en más de 10 hectáreas de dehesa extremeña. Disfrutan del sol, picotean entre las encinas y llevan una vida natural, como debe ser.',
    features: ['Más de 4m² de espacio por gallina','Acceso libre al exterior durante todo el día','Nidales cómodos y naturales','Perchas de madera a diferentes alturas'],
  },
  {
    id: 'alimentacion',
    title: 'Alimentación Natural',
    subtitle: 'Sin Químicos ni Aditivos',
    image: 'https://images.unsplash.com/photo-1709629107779-23f79b9661e1?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    description: 'La alimentación es fundamental para obtener huevos de calidad. Nuestras gallinas se alimentan de cereales ecológicos, insectos naturales y hierbas de la dehesa.',
    features: ['Cereales 100% ecológicos certificados','Complemento natural de insectos y lombrices','Sin antibióticos ni hormonas','Agua fresca de manantial'],
  },
  {
    id: 'recoleccion',
    title: 'Recolección',
    subtitle: 'Selección Manual Diaria',
    image: 'https://images.unsplash.com/photo-1728894703381-b2b6effd5ff2?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    description: 'Cada mañana, nuestro equipo recoge los huevos a mano, uno por uno. Esta atención al detalle nos permite seleccionar solo los mejores huevos para nuestros clientes.',
    features: ['Recolección dos veces al día','Inspección visual de cada huevo','Clasificación por tamaño y peso','Descarte de huevos imperfectos'],
  },
  {
    id: 'empaquetado',
    title: 'Empaquetado',
    subtitle: 'Cuidado y Sostenibilidad',
    image: 'https://images.unsplash.com/photo-1553163584-bb580f139274?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    description: 'Utilizamos envases de cartón reciclado y reciclable, respetando el medio ambiente. Cada caja incluye la fecha de puesta y toda la información de trazabilidad.',
    features: ['Envases 100% reciclables','Etiquetado con fecha de puesta','Código de trazabilidad individual','Certificación ecológica visible'],
  },
  {
    id: 'mesa',
    title: 'Tu Mesa',
    subtitle: 'Frescura Garantizada',
    image: 'https://images.unsplash.com/photo-1766596737206-214abffe65bf?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    description: 'En menos de 48 horas desde la puesta, nuestros huevos llegan a tu hogar. La frescura se nota en el color intenso de la yema y en el sabor incomparable.',
    features: ['Entrega en 24-48 horas','Embalaje especial para transporte','Garantía de frescura','Satisfacción 100% garantizada'],
  },
];

const GALERIA = [
  { src: 'https://images.unsplash.com/photo-1648228726568-8f51ac243842?q=85&w=1200', alt: 'Gallinas en libertad' },
  { src: 'https://images.unsplash.com/photo-1709629107779-23f79b9661e1?q=85&w=1200', alt: 'Dehesa extremeña' },
  { src: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=85&w=1200', alt: 'Huevos frescos' },
  { src: 'https://images.unsplash.com/photo-1680513196853-33851aa5b16d?q=85&w=1200', alt: 'Envase DCielo' },
  { src: 'https://images.unsplash.com/photo-1551112649-5f012491a5c4?q=85&w=1200', alt: 'Pack familiar' },
  { src: 'https://images.unsplash.com/photo-1729093577461-8afc78cad688?q=85&w=1200', alt: 'Gallinas en la mañana' },
];

// ── Galería interactiva: imagen grande + thumbnails + lightbox ──
function GaleriaInteractiva() {
  var [activa, setActiva] = useState(0);
  var [lightbox, setLightbox] = useState(false);

  function anterior() { setActiva(function(a) { return (a - 1 + GALERIA.length) % GALERIA.length; }); }
  function siguiente() { setActiva(function(a) { return (a + 1) % GALERIA.length; }); }

  return (
    <section className="section-padding bg-[#FAF6EC]">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">En imágenes</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1208] mt-3">La granja por dentro</h2>
          <p className="text-[#5C5040] mt-3 max-w-md mx-auto">
            Haz clic en una imagen para verla ampliada. Usa las flechas o los thumbnails para navegar.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Imagen principal + flechas laterales */}
          <div className="relative mb-4" style={{ height: '420px' }}>

            {/* Flecha izquierda — visible siempre */}
            <button
              onClick={anterior}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-[#E8DFCC] flex items-center justify-center text-[#1A1208] hover:bg-[#C69B1A] hover:text-white hover:border-[#C69B1A] transition-all duration-200"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Imagen con transición */}
            <div className="w-full h-full overflow-hidden rounded-2xl cursor-zoom-in shadow-xl group" onClick={function() { setLightbox(true); }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activa}
                  src={GALERIA[activa].src}
                  alt={GALERIA[activa].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>
              {/* Icono ampliar al hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg className="w-5 h-5 text-[#1A1208]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              {/* Contador */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                {activa + 1} / {GALERIA.length}
              </div>
            </div>

            {/* Flecha derecha — visible siempre */}
            <button
              onClick={siguiente}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-[#E8DFCC] flex items-center justify-center text-[#1A1208] hover:bg-[#C69B1A] hover:text-white hover:border-[#C69B1A] transition-all duration-200"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-2">
            {GALERIA.map(function(img, i) {
              return (
                <button
                  key={i}
                  onClick={function() { setActiva(i); }}
                  className={'relative overflow-hidden rounded-xl transition-all duration-300 ' + (activa === i ? 'ring-2 ring-[#C69B1A] ring-offset-2 ring-offset-[#FAF6EC]' : 'opacity-55 hover:opacity-85')}
                  style={{ height: '72px' }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  {activa === i && <div className="absolute inset-0 bg-[#C69B1A]/10" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={function() { setLightbox(false); }}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
              onClick={function() { setLightbox(false); }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Flecha izquierda */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all"
              onClick={function(e) { e.stopPropagation(); setActiva(function(a) { return (a - 1 + GALERIA.length) % GALERIA.length; }); }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.img
              key={'lb-' + activa}
              src={GALERIA[activa].src}
              alt={GALERIA[activa].alt}
              className="max-w-4xl max-h-[85vh] w-full object-contain rounded-xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={function(e) { e.stopPropagation(); }}
            />

            {/* Flecha derecha */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all"
              onClick={function(e) { e.stopPropagation(); setActiva(function(a) { return (a + 1) % GALERIA.length; }); }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pie con thumbnails en lightbox */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {GALERIA.map(function(_, i) {
                return (
                  <button
                    key={i}
                    onClick={function(e) { e.stopPropagation(); setActiva(i); }}
                    className={'w-2 h-2 rounded-full transition-all ' + (activa === i ? 'bg-[#C69B1A] w-6' : 'bg-white/40 hover:bg-white/70')}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const PLANETA = [
  {
    icon: Zap,
    titulo: 'Energía Renovable',
    desc: 'Nuestras instalaciones operan al 100% con paneles solares fotovoltaicos.',
  },
  {
    icon: Droplets,
    titulo: 'Gestión de Agua',
    desc: 'Sistemas de recuperación de agua de lluvia y pozos sostenibles filtrados naturalmente.',
  },
  {
    icon: Leaf,
    titulo: 'Residuo Cero',
    desc: 'El guano se composta para fertilizar nuestras propias praderas de pastoreo.',
  },
];

const FarmPage = () => {
  const [activeTab, setActiveTab] = useState('gallinas');

  return (
    <div data-testid="farm-page">

      {/* ── HERO ── */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        {/* Foto de fondo con transparencia */}
        <div className="absolute inset-0">
          <img src={heroGranja} alt="Nuestra granja DCielo" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1208]/65 via-[#1A1208]/40 to-[#1A1208]/75" />
        </div>
        <div className="relative z-10 container-custom text-center text-white">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">
            Nuestra Granja
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold mt-4 mb-6">
            Del Campo a Tu Mesa
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/85 text-lg max-w-2xl mx-auto">
            Descubre cada paso de nuestro proceso de producción, desde el cuidado de nuestras gallinas hasta que el huevo llega a tu hogar.
          </motion.p>
        </div>
      </section>

      {/* ── LEGADO FAMILIAR EN CÁCERES — primero enfatizamos la familia ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Texto izquierda */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Granja familiar</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1208] mt-3 mb-5">
                Un Legado Familiar en Cáceres
              </h2>
              <p className="text-[#5C5040] leading-relaxed mb-4">
                DCielo nació de un sueño compartido en el corazón de Extremadura. Como proyecto familiar, nos propusimos recuperar la autenticidad del campo, alejándonos de la producción industrial para volver a los orígenes.
              </p>
              <p className="text-[#5C5040] leading-relaxed mb-8">
                Nuestra ubicación en Cáceres no es casual; el microclima y la pureza de sus dehesas proporcionan el entorno ideal para que nuestras gallinas vivan en armonía, traduciendo ese bienestar en huevos de una calidad gastronómica inigualable.
              </p>

              {/* Stats dorados */}
              <div className="flex gap-10">
                <div>
                  <p className="font-serif text-4xl font-bold text-[#C69B1A]">20+</p>
                  <p className="text-[#8C7A60] text-xs uppercase tracking-widest mt-1">Años de tradición</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-[#C69B1A]">100%</p>
                  <p className="text-[#8C7A60] text-xs uppercase tracking-widest mt-1">Origen natural</p>
                </div>
              </div>
            </motion.div>

            {/* Foto derecha con card fundadora */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=85&w=700"
                  alt="Familia DCielo en la granja"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              {/* Card fundadora flotante */}
              <div className="absolute -bottom-5 -right-3 md:-right-8 bg-white rounded-2xl shadow-xl px-5 py-4 border border-[#E8DFCC] flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#F0E9D6] overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=85&w=100"
                    alt="Cielo Mar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#1A1208] text-sm">Cielo Mar Figueras</p>
                  <p className="text-[#C69B1A] text-xs font-bold uppercase tracking-wide">Fundadora de DCielo</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TABS DEL PROCESO ── */}
      <section className="section-padding bg-[#FAF6EC]">
        <div className="container-custom">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="hidden md:flex w-full justify-between bg-[#F0E9D6] p-2 rounded-xl mb-12">
              {PROCESS_STEPS.map((step, index) => (
                <TabsTrigger key={step.id} value={step.id} data-testid={"tab-" + step.id}
                  className="flex-1 py-4 px-4 rounded-lg data-[state=active]:bg-[#1A1208] data-[state=active]:text-white transition-all">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-sm font-bold">{index + 1}</span>
                    <span className="hidden lg:inline text-sm">{step.title}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="md:hidden mb-8 overflow-x-auto">
              <div className="flex gap-2 min-w-max pb-2">
                {PROCESS_STEPS.map((step, index) => (
                  <button key={step.id} onClick={() => setActiveTab(step.id)}
                    className={"px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap " +
                      (activeTab === step.id ? 'bg-[#1A1208] text-white' : 'bg-[#F0E9D6] text-[#5C5040]')}>
                    {index + 1}. {step.title}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {PROCESS_STEPS.map((step) => (
                <TabsContent key={step.id} value={step.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                  >
                    <div className="relative">
                      <motion.img key={step.image} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }} src={step.image} alt={step.title}
                        className="w-full h-[400px] object-cover rounded-2xl shadow-2xl" />
                      <div className="absolute -top-4 -left-4 bg-[#C69B1A] text-[#1A1208] p-4 rounded-xl shadow-lg hidden md:flex items-center justify-center">
                        <span className="font-serif text-3xl font-bold">{PROCESS_STEPS.findIndex(s => s.id === step.id) + 1}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">{step.subtitle}</span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1208] mt-2">{step.title}</h2>
                      </div>
                      <p className="text-[#5C5040] text-lg leading-relaxed">{step.description}</p>
                      <div className="space-y-3">
                        {step.features.map((feature, i) => (
                          <motion.div key={feature} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#C69B1A] flex items-center justify-center flex-shrink-0">
                              <Check className="w-3.5 h-3.5 text-[#1A1208]" />
                            </div>
                            <span className="text-[#5C5040]">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        {PROCESS_STEPS.findIndex(s => s.id === step.id) > 0 && (
                          <button onClick={() => setActiveTab(PROCESS_STEPS[PROCESS_STEPS.findIndex(s => s.id === step.id) - 1].id)}
                            className="text-[#5C5040] hover:text-[#1A1208] transition-colors flex items-center gap-1 text-sm">
                            <ChevronRight className="w-4 h-4 rotate-180" /> Anterior
                          </button>
                        )}
                        {PROCESS_STEPS.findIndex(s => s.id === step.id) < PROCESS_STEPS.length - 1 && (
                          <button onClick={() => setActiveTab(PROCESS_STEPS[PROCESS_STEPS.findIndex(s => s.id === step.id) + 1].id)}
                            className="text-[#1A1208] font-medium hover:text-[#C69B1A] transition-colors flex items-center gap-1 ml-auto text-sm">
                            Siguiente <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* ── GALERÍA DE LA GRANJA — imagen grande + thumbnails + lightbox ── */}
      <GaleriaInteractiva />

      {/* ── COMPROMISO CON EL PLANETA ── */}
      <section className="section-padding bg-[#FAF6EC]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">

            {/* Texto */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Sostenibilidad</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1208] mt-3 mb-4">
                Compromiso con el Planeta
              </h2>
              <p className="text-[#5C5040] leading-relaxed mb-8">
                En DCielo, entendemos la granja como un sistema cerrado y regenerativo.
                No solo producimos huevos; protegemos el ecosistema que nos permite hacerlo.
              </p>
              <div className="space-y-6">
                {PLANETA.map(function(item) {
                  var Icon = item.icon;
                  return (
                    <div key={item.titulo} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#C69B1A]/15 border border-[#C69B1A]/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#C69B1A]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1A1208] mb-0.5">{item.titulo}</p>
                        <p className="text-[#5C5040] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="mt-8 border border-[#C69B1A] text-[#C69B1A] hover:bg-[#C69B1A] hover:text-[#1A1208] font-semibold px-6 py-3 rounded-full transition-all duration-200 text-sm">
                Ver Informe de Impacto
              </button>
            </motion.div>

            {/* Imagen paneles solares */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=85&w=700"
                  alt="Paneles solares granja DCielo"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Badge flotante */}
              <div className="absolute -bottom-5 -left-5 bg-[#1A1208] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#C69B1A]/30">
                <p className="text-[#C69B1A] font-bold text-2xl font-serif">100%</p>
                <p className="text-white/70 text-xs">Energía renovable</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICACIÓN ── */}
      <section className="section-padding bg-[#F0E9D6]">
        <div className="container-custom">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[#E8DFCC] max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Certificación</span>
                <h2 className="font-serif text-3xl font-bold text-[#1A1208] mt-2 mb-4">Huevos Certificados Marca 0</h2>
                <p className="text-[#5C5040] leading-relaxed mb-6">
                  El código que aparece en cada huevo DCielo comienza con "0", lo que indica que proviene de gallinas criadas en producción ecológica. El estándar más alto de bienestar animal en Europa.
                </p>
                <div className="bg-[#F0E9D6] p-4 rounded-xl inline-block">
                  <p className="font-mono text-xl font-bold text-[#1A1208]">0-ES-10-XXXXX</p>
                  <p className="text-sm text-[#5C5040] mt-1">Ejemplo de código en nuestros huevos</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { code: '0', label: 'Ecológico', desc: 'Máximo bienestar' },
                  { code: 'ES', label: 'España', desc: 'Origen nacional' },
                  { code: '10', label: 'Cáceres', desc: 'Extremadura' },
                  { code: 'XXXXX', label: 'Granja', desc: 'ID única' },
                ].map(function(item) {
                  return (
                    <div key={item.code} className="bg-[#F0E9D6] p-4 rounded-xl text-center border border-[#E8DFCC]">
                      <p className="font-mono text-2xl font-bold text-[#1A1208]">{item.code}</p>
                      <p className="font-medium text-[#1A1208] mt-1 text-sm">{item.label}</p>
                      <p className="text-xs text-[#8C7A60]">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmPage;
