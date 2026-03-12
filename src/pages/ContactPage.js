import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  MessageCircle, ArrowRight, Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import heroContacto from '../assets/hero-contacto.jpg';

const INFO = [
  {
    icon: Phone,
    label: 'Llámanos',
    lines: ['+34 615 36 92 94', 'Lunes a Viernes, de 8:00 a 18:00'],
  },
  {
    icon: Mail,
    label: 'Correo Electrónico',
    lines: ['hola@dcielo.es', 'Respondemos tus dudas comerciales y técnicas'],
  },
  {
    icon: MapPin,
    label: 'Nuestra Granja',
    lines: ['Ctra. de Casar, S/N', '10190 Cáceres, España'],
  },
  {
    icon: Clock,
    label: 'Horario de Recogida',
    lines: ['Sábados: 09:00 – 13:00', 'Para pedidos confirmados previamente'],
  },
];

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm(function(prev) { return Object.assign({}, prev, { [e.target.name]: e.target.value }); });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div data-testid="contact-page">

      {/* ── HERO ── */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroContacto} alt="Contacto DCielo" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1208]/60 via-[#1A1208]/35 to-[#1A1208]/70" />
          {/* Círculo decorativo sutil encima */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#C69B1A]/20 hidden md:block" />
          <div className="absolute right-32 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[#C69B1A]/15 hidden md:block" />
        </div>
        <div className="container-custom max-w-4xl relative z-10">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#C69B1A] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C69B1A] inline-block" />
            Estamos aquí para ayudarte
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold text-white mt-4 leading-tight max-w-xl">
            Contacta con <span className="text-[#C69B1A]">nosotros</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/85 text-lg mt-4 max-w-md leading-relaxed">
            Ya seas un restaurante buscando el mejor producto local o un particular que aprecia la calidad, nos encantará escucharte.
          </motion.p>
        </div>
      </section>

      {/* ── CUERPO PRINCIPAL ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">

          {/* ── BLOQUE MISIÓN arriba del formulario ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#C69B1A] px-8 py-10 text-center mb-12">
            <span className="text-[#1A1208]/60 font-bold uppercase tracking-widest text-xs">Nuestra Misión</span>
            <blockquote className="font-serif text-xl md:text-3xl font-bold text-[#1A1208] mt-4 leading-snug max-w-2xl mx-auto">
              "Producir huevos ecológicos de la máxima calidad respetando la naturaleza y el bienestar animal."
            </blockquote>
            <div className="w-14 h-1 bg-[#1A1208]/30 mx-auto mt-6 rounded-full" />
            <p className="text-[#1A1208]/70 mt-5 text-sm max-w-xl mx-auto leading-relaxed">
              Cada decisión en DCielo —desde cómo viven nuestras gallinas hasta cómo llegan los huevos a tu puerta— nace de ese compromiso.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">

            {/* COLUMNA IZQUIERDA — info + WhatsApp + testimonio */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#1A1208]">Información Directa</h2>

              {INFO.map(function(item) {
                var Icon = item.icon;
                return (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6EC] border border-[#E8DFCC] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#C69B1A]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1208] text-sm">{item.label}</p>
                      {item.lines.map(function(line) {
                        return <p key={line} className="text-[#5C5040] text-sm">{line}</p>;
                      })}
                    </div>
                  </motion.div>
                );
              })}

              {/* WhatsApp */}
              <div className="bg-[#FAF6EC] border border-[#E8DFCC] rounded-2xl p-5 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-[#1A1208] text-sm uppercase tracking-wide">¿Prefieres WhatsApp?</span>
                </div>
                <p className="text-[#5C5040] text-sm mb-4 leading-relaxed">
                  Si necesitas una respuesta inmediata sobre disponibilidad o envíos, escríbenos directamente por WhatsApp.
                </p>
                <a
                  href="https://wa.me/34615369294?text=Hola%20DCielo%2C%20me%20gustar%C3%ADa%20informarme%20sobre%20vuestros%20huevos"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar por WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Testimonio chef */}
              <div className="bg-[#FAF6EC] rounded-2xl p-5 border border-[#E8DFCC]">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(function(i) { return <Star key={i} className="w-4 h-4 fill-[#C69B1A] text-[#C69B1A]" />; })}
                </div>
                <p className="font-serif italic text-[#5C5040] text-sm leading-relaxed">
                  "Los huevos de DCielo son la base de mi repostería. La frescura es inmejorable."
                </p>
                <p className="text-[#C69B1A] font-bold text-xs mt-3">— Roberto García, Chef Ejecutivo</p>
              </div>
            </div>

            {/* COLUMNA DERECHA — formulario */}
            <div className="lg:col-span-3">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FAF6EC] rounded-2xl p-10 border border-[#E8DFCC] text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1208] mb-3">¡Mensaje enviado!</h3>
                  <p className="text-[#5C5040] mb-6 max-w-xs">Prometemos responderte en menos de 24 horas laborables.</p>
                  <Button onClick={() => setSent(false)} variant="outline"
                    className="border-[#C69B1A] text-[#C69B1A] rounded-full px-6 hover:bg-[#C69B1A] hover:text-[#1A1208]">
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#FAF6EC] rounded-2xl p-8 border border-[#E8DFCC]">
                  <h2 className="font-serif text-2xl font-bold text-[#1A1208] mb-1">Envíanos un mensaje</h2>
                  <p className="text-[#5C5040] text-sm mb-7">Prometemos responderte en menos de 24 horas laborables.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Nombre completo</Label>
                        <Input required name="name" value={form.name} onChange={handleChange}
                          placeholder="Ej. Juan Pérez"
                          className="rounded-xl bg-white border-[#E8DFCC] focus:border-[#C69B1A] text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Correo electrónico</Label>
                        <Input required name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder="juan@ejemplo.com"
                          className="rounded-xl bg-white border-[#E8DFCC] focus:border-[#C69B1A] text-sm" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Asunto</Label>
                      <Input name="subject" value={form.subject} onChange={handleChange}
                        placeholder="¿En qué podemos ayudarte?"
                        className="rounded-xl bg-white border-[#E8DFCC] focus:border-[#C69B1A] text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Tu mensaje</Label>
                      <textarea required name="message" value={form.message} onChange={handleChange}
                        rows={5} placeholder="Cuéntanos más sobre tu pedido o consulta..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFCC] text-sm text-[#1A1208] placeholder:text-[#8C7A60] focus:outline-none focus:border-[#C69B1A] resize-none" />
                    </div>
                    <Button type="submit"
                      className="w-full bg-[#C69B1A] hover:bg-[#9A7510] text-[#1A1208] font-bold rounded-xl py-4 text-sm flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Enviar Mensaje
                    </Button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAPA ── */}
      <section className="section-padding bg-[#FAF6EC]">
        <div className="container-custom max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-[#1A1208]">Visítanos en Cáceres</h2>
            <p className="text-[#5C5040] mt-3 max-w-md mx-auto text-sm">
              Nuestra granja se encuentra en un entorno privilegiado, rodeada de dehesas donde nuestras gallinas disfrutan del aire libre.
            </p>
          </motion.div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DFCC]">
            <iframe
              title="Mapa Granja DCielo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48953.15!2d-6.3725!3d39.4753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd15e2ab7f4ed0d5%3A0x3f91bef69a3fc0e!2sC%C3%A1ceres!5e0!3m2!1ses!2ses!4v1"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-5 left-5 bg-white rounded-xl shadow-lg px-5 py-4 border border-[#E8DFCC] max-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#C69B1A]" />
                <p className="font-bold text-[#1A1208] text-sm">Granja DCielo</p>
              </div>
              <p className="text-[#5C5040] text-xs">Ctra. de Casar, S/N, 10190 Cáceres</p>
              <a href="https://maps.google.com/?q=Caceres+Spain" target="_blank" rel="noreferrer"
                className="text-[#C69B1A] text-xs font-semibold mt-2 block hover:underline">
                Ver en Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
