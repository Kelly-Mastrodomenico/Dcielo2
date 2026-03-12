import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Users, Award, MapPin, Calendar } from 'lucide-react';

const IMAGES = {
  story: "https://images.unsplash.com/photo-1709629107779-23f79b9661e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxiZWF1dGlmdWwlMjBydXN0aWMlMjBvcmdhbmljJTIwZmFybSUyMGxhbmRzY2FwZSUyMHNwYWluJTIwZXh0cmVtYWR1cmF8ZW58MHx8fHwxNzczMjM4MjAxfDA&ixlib=rb-4.1.0&q=85",
  hens: "https://images.unsplash.com/photo-1648228726568-8f51ac243842?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxoZW5zJTIwb24lMjBncmFzc3xlbnwwfHx8fDE3NzMyMzgyMTZ8MA&ixlib=rb-4.1.0&q=85",
};

const values = [
  {
    icon: Leaf,
    title: 'Sostenibilidad',
    description: 'Cuidamos la tierra para las generaciones futuras con prácticas agrícolas responsables.'
  },
  {
    icon: Heart,
    title: 'Bienestar Animal',
    description: 'Nuestras gallinas viven libres y felices, como debe ser.'
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Apoyamos a productores locales y fortalecemos la economía de nuestra región.'
  },
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Cada huevo es seleccionado a mano para garantizar la excelencia.'
  }
];

const timeline = [
  {
    year: '1985',
    title: 'Los Comienzos',
    description: 'La familia González inicia una pequeña granja con 50 gallinas en las afueras de Cáceres.'
  },
  {
    year: '1998',
    title: 'Certificación Ecológica',
    description: 'Obtenemos la primera certificación ecológica de la Unión Europea.'
  },
  {
    year: '2010',
    title: 'Expansión',
    description: 'Ampliamos nuestras instalaciones para atender la creciente demanda de productos ecológicos.'
  },
  {
    year: '2020',
    title: 'Dcielo Nace',
    description: 'Lanzamos nuestra marca Dcielo para llevar huevos premium directamente al consumidor.'
  },
  {
    year: 'Hoy',
    title: 'Mirando al Futuro',
    description: 'Continuamos innovando mientras mantenemos nuestros valores tradicionales.'
  }
];

const AboutPage = () => {
  return (
    <div data-testid="about-page">
      {/* Hero */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.story}
            alt="Nuestra granja"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3A4D39]/90 to-[#3A4D39]/60" />
        </div>
        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-white"
          >
            <span className="text-[#C69B1A] font-medium uppercase tracking-wider text-sm">
              Quiénes Somos
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4 mb-6">
              Nuestra Historia
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              Desde las dehesas de Cáceres, llevamos más de tres décadas 
              produciendo huevos ecológicos con pasión, respeto por la 
              naturaleza y un compromiso inquebrantable con la calidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-[#FAF6EC]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1208]">
                Una Tradición Familiar en las Dehesas de Extremadura
              </h2>
              <p className="text-[#5C5040] leading-relaxed">
                Todo comenzó con una pequeña granja familiar y el sueño de producir 
                alimentos de la más alta calidad. Mi abuelo, Pedro González, siempre 
                decía que "los mejores huevos vienen de gallinas felices", y esa 
                filosofía sigue siendo el corazón de todo lo que hacemos.
              </p>
              <p className="text-[#5C5040] leading-relaxed">
                En Dcielo, nuestras gallinas disfrutan de más de 10 hectáreas de 
                dehesa extremeña, donde pueden picotear libremente entre encinas 
                centenarias, alimentarse de insectos y hierbas naturales, y vivir 
                como la naturaleza manda.
              </p>
              <p className="text-[#5C5040] leading-relaxed">
                Cada huevo que llega a tu mesa es el resultado de ese compromiso 
                con el bienestar animal, la sostenibilidad y la tradición. Es un 
                trozo de nuestra tierra, nuestra historia y nuestro amor por lo 
                que hacemos.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <MapPin className="w-5 h-5 text-[#C69B1A]" />
                <span className="text-[#5C5040]">Cáceres, Extremadura, España</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={IMAGES.hens}
                alt="Gallinas en libertad"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#1A1208] text-white p-6 rounded-xl shadow-xl hidden md:block">
                <p className="font-handwriting text-2xl">"Del cielo a tu mesa"</p>
                <p className="text-sm text-white/80 mt-2">- Familia González</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NUESTRA MISIÓN ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">
              Nuestra Misión
            </span>
            <blockquote className="font-serif text-3xl md:text-5xl font-bold text-[#1A1208] mt-6 leading-snug">
              "Producir huevos ecológicos de la máxima calidad respetando la naturaleza y el bienestar animal."
            </blockquote>
            <div className="w-16 h-1 bg-[#C69B1A] mx-auto mt-10 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#F0E9D6]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C69B1A] font-medium uppercase tracking-wider text-sm">
              Nuestros Valores
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1208] mt-4">
              Lo Que Nos Define
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md text-center group hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-[#1A1208]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1A1208] transition-colors">
                  <value.icon className="w-8 h-8 text-[#1A1208] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1208] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#5C5040] text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORIA — Cards apiladas tipo Amalgama ── */}
      <section className="bg-[#FAF6EC] pt-20 pb-0">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs">Nuestra Historia</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1208] mt-4">El Camino Recorrido</h2>
          </motion.div>
        </div>

        {/* Contenedor sticky — sin padding bottom para que las cards peguen */}
        <div className="max-w-3xl mx-auto px-4 md:px-8 pb-32">
          {timeline.map(function(item, index) {
            // Cada card tiene un top diferente para el efecto de apilado visible
            var topOffset = 72 + index * 18;
            // Color de fondo progresivo: las más viejas más oscuras
            var bgColors = ['#FFFFFF', '#FAF6EC', '#F5EFE2', '#F0E9D6', '#EBE3CF'];
            var bg = bgColors[index] || '#FAF6EC';

            return (
              <div
                key={item.year}
                style={{
                  position: 'sticky',
                  top: topOffset,
                  zIndex: 10 + index,
                  backgroundColor: bg,
                  marginBottom: '0px',
                }}
                className="rounded-2xl shadow-xl border border-[#E8DFCC] overflow-hidden"
              >
                {/* Franja dorada superior — más gruesa en la primera, se reduce */}
                <div
                  style={{ height: index === 0 ? 6 : 4 }}
                  className="bg-[#C69B1A] w-full"
                />

                <div className="p-7 md:p-10 flex gap-6 items-start">
                  {/* Año — badge grande dorado */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#C69B1A] flex items-center justify-center shadow-lg">
                      <span className="font-serif text-[#1A1208] font-bold text-sm text-center leading-tight px-1">
                        {item.year}
                      </span>
                    </div>
                    {/* Número de hito */}
                    <span className="text-[#C69B1A]/40 text-xs font-bold mt-2">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1A1208] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#5C5040] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Número grande decorativo derecha */}
                  <div className="hidden md:block flex-shrink-0 self-center">
                    <span className="font-serif text-7xl font-bold text-[#E8DFCC] leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats — fondo crema oscuro en lugar de negro */}
      <section className="py-20 bg-[#1A1208]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '20+', label: 'Años de Experiencia' },
              { value: '10k+', label: 'Clientes Satisfechos' },
              { value: '100%', label: 'Ecológico' },
              { value: '0', label: 'Químicos' },
            ].map(function(stat, index) {
              return (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="text-center">
                  <p className="font-serif text-4xl md:text-5xl font-bold text-[#C69B1A] mb-2">{stat.value}</p>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
