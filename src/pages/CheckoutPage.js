import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ShoppingBag, Truck, Lock, ArrowLeft, CheckCircle, Loader2, Mail, Package } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, confirmarPedido } = useCart();
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postalCode: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (items.length === 0 && !pedidoConfirmado) navigate('/tienda');
  }, [items, navigate, pedidoConfirmado]);

  const validate = () => {
    var errs = {};
    if (!form.name.trim())       errs.name       = 'El nombre es obligatorio';
    if (!form.email.trim())      errs.email      = 'El email es obligatorio';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email no válido';
    if (!form.address.trim())    errs.address    = 'La dirección es obligatoria';
    if (!form.city.trim())       errs.city       = 'La ciudad es obligatoria';
    if (!form.postalCode.trim()) errs.postalCode = 'El código postal es obligatorio';
    return errs;
  };

  const handleChange = (e) => {
    setForm(function(prev) { return Object.assign({}, prev, { [e.target.name]: e.target.value }); });
    setErrors(function(prev) { return Object.assign({}, prev, { [e.target.name]: undefined }); });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);
    // Simular proceso de pago (1.5s)
    setTimeout(function() {
      var pedido = confirmarPedido(form);
      setPedidoConfirmado(pedido);
      setIsSubmitting(false);
    }, 1500);
  };

  var envio        = totalPrice >= 40 ? 0 : 4.95;
  var totalFinal   = (totalPrice + envio).toFixed(2);

  // ── PANTALLA DE ÉXITO ──
  if (pedidoConfirmado) {
    return (
      <div className="pt-20 min-h-screen bg-[#FAF6EC] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full"
        >
          {/* Cabecera */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1208] mb-2">¡Pedido confirmado!</h1>
            <p className="text-[#5C5040]">Gracias, <strong>{pedidoConfirmado.nombre}</strong>. Tu pedido está en camino.</p>
          </div>

          {/* Caja número de pedido */}
          <div className="bg-[#1A1208] rounded-2xl p-6 mb-6 text-center border border-[#C69B1A]/30">
            <p className="text-[#C69B1A]/70 text-xs uppercase tracking-widest mb-1">Número de pedido</p>
            <p className="font-mono text-2xl font-bold text-[#C69B1A] tracking-widest">
              {pedidoConfirmado.numeroPedido}
            </p>
            <p className="text-white/50 text-xs mt-2">Guarda este número para cualquier consulta</p>
          </div>

          {/* Aviso email */}
          <div className="bg-white rounded-xl p-5 mb-6 border border-[#E7E5E4] flex items-start gap-4">
            <div className="w-10 h-10 bg-[#C69B1A]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#C69B1A]" />
            </div>
            <div>
              <p className="font-semibold text-[#1A1208] text-sm">Email de confirmación enviado</p>
              <p className="text-[#5C5040] text-sm mt-0.5">
                Hemos enviado un resumen del pedido a <strong>{pedidoConfirmado.email}</strong> con el número de pedido y los detalles de entrega.
              </p>
            </div>
          </div>

          {/* Resumen */}
          <div className="bg-white rounded-xl p-5 mb-6 border border-[#E7E5E4]">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-[#C69B1A]" />
              <p className="font-semibold text-[#1A1208] text-sm">Resumen del pedido</p>
            </div>
            {pedidoConfirmado.items.map(function(item) {
              return (
                <div key={item.product.id} className="flex justify-between text-sm text-[#5C5040] mb-1">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span className="font-medium">{(item.product.price * item.quantity).toFixed(2)}€</span>
                </div>
              );
            })}
            <div className="border-t border-[#E7E5E4] mt-3 pt-3 flex justify-between font-bold text-[#1A1208]">
              <span>Total pagado</span>
              <span className="text-[#C69B1A] font-serif text-lg">{pedidoConfirmado.total}€</span>
            </div>
          </div>

          {/* Entrega info */}
          <div className="bg-[#FAF6EC] rounded-xl p-4 mb-8 border border-[#C69B1A]/20 flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#C69B1A] flex-shrink-0" />
            <p className="text-sm text-[#5C5040]">
              Entrega estimada en <strong>24-48 horas</strong> en <strong>{pedidoConfirmado.direccion}</strong>
            </p>
          </div>

          <Button onClick={() => navigate('/')} className="w-full bg-[#1A1208] hover:bg-[#C69B1A] text-white hover:text-[#1A1208] rounded-full py-4 font-serif text-base transition-all duration-300">
            Volver al inicio
          </Button>
          <p className="text-center text-xs text-[#78716C] mt-4">
            ¿Algún problema? Contáctanos indicando tu número de pedido: <a href="mailto:hola@dcielo.es" className="text-[#C69B1A] underline">hola@dcielo.es</a>
          </p>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div data-testid="checkout-page" className="pt-20 min-h-screen bg-[#FAF6EC]">
      <div className="container-custom py-12 max-w-5xl">
        <button onClick={() => navigate('/tienda')} className="flex items-center gap-2 text-[#5C5040] hover:text-[#1A1208] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a la tienda
        </button>
        <h1 className="font-serif text-3xl font-bold text-[#1A1208] mb-10">Finalizar pedido</h1>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── FORMULARIO ── */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Datos personales */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E7E5E4]">
                <h2 className="font-serif text-xl font-semibold text-[#1A1208] mb-5 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C69B1A]" /> Datos personales
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Nombre completo *</Label>
                    <Input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre"
                      className={"rounded-xl border-[#E7E5E4] focus:border-[#C69B1A] " + (errors.name ? 'border-red-400' : '')} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Email *</Label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com"
                      className={"rounded-xl border-[#E7E5E4] focus:border-[#C69B1A] " + (errors.email ? 'border-red-400' : '')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Teléfono</Label>
                    <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+34 600 000 000"
                      className="rounded-xl border-[#E7E5E4] focus:border-[#C69B1A]" />
                  </div>
                </div>
                <p className="text-xs text-[#78716C] mt-4 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C69B1A]" />
                  Recibirás un email con el número de pedido y los detalles de entrega.
                </p>
              </div>

              {/* Dirección */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E7E5E4]">
                <h2 className="font-serif text-xl font-semibold text-[#1A1208] mb-5 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#C69B1A]" /> Dirección de entrega
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Dirección completa *</Label>
                    <Input name="address" value={form.address} onChange={handleChange} placeholder="Calle, número, piso..."
                      className={"rounded-xl border-[#E7E5E4] focus:border-[#C69B1A] " + (errors.address ? 'border-red-400' : '')} />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Ciudad *</Label>
                      <Input name="city" value={form.city} onChange={handleChange} placeholder="Ciudad"
                        className={"rounded-xl border-[#E7E5E4] focus:border-[#C69B1A] " + (errors.city ? 'border-red-400' : '')} />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label className="text-xs text-[#5C5040] uppercase tracking-wide mb-1.5 block">Código Postal *</Label>
                      <Input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="10001"
                        className={"rounded-xl border-[#E7E5E4] focus:border-[#C69B1A] " + (errors.postalCode ? 'border-red-400' : '')} />
                      {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting}
                className="w-full bg-[#C69B1A] hover:bg-[#9A7510] text-[#1A1208] font-bold rounded-full py-6 text-lg font-serif flex items-center justify-center gap-3 transition-all">
                {isSubmitting
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</>
                  : <><Lock className="w-5 h-5" /> Confirmar pedido · {totalFinal}€</>
                }
              </Button>
              <p className="text-center text-xs text-[#78716C]">🔒 Pago seguro · Recibirás confirmación por email</p>
            </form>
          </div>

          {/* ── RESUMEN ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E7E5E4] p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-[#1A1208] mb-5">Resumen</h2>
              <div className="space-y-4 mb-6">
                {items.map(function(item) {
                  return (
                    <div key={item.product.id} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-[#1A1208] text-sm">{item.product.name}</p>
                        <p className="text-xs text-[#78716C]">{item.product.quantity} uds · x{item.quantity}</p>
                        <p className="font-serif font-bold text-[#C69B1A] mt-1">{(item.product.price * item.quantity).toFixed(2)}€</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-[#E7E5E4] pt-4 space-y-2">
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Subtotal</span><span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Envío</span>
                  <span className={envio === 0 ? 'text-green-600 font-medium' : ''}>
                    {envio === 0 ? 'Gratis' : envio.toFixed(2) + '€'}
                  </span>
                </div>
                {envio > 0 && (
                  <p className="text-xs text-[#78716C] bg-[#FAF6EC] rounded-lg p-2 text-center">
                    Añade {(40 - totalPrice).toFixed(2)}€ más para envío gratuito
                  </p>
                )}
                <div className="flex justify-between font-bold text-lg text-[#1A1208] pt-2 border-t border-[#E7E5E4]">
                  <span>Total</span>
                  <span className="font-serif text-[#C69B1A]">{totalFinal}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-20 min-h-screen bg-[#FAF6EC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1A1208] mb-4">¡Pago completado!</h1>
        <p className="text-[#5C5040] mb-8">Gracias por tu pedido. Recibirás un email de confirmación con tu número de pedido.</p>
        <Button onClick={() => navigate('/')} className="bg-[#1A1208] hover:bg-[#C69B1A] text-white hover:text-[#1A1208] rounded-full px-8 py-4 font-serif transition-all duration-300">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
