import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Eye, Plus, Minus, X,
  Leaf, Sun, Heart, Shield, Award, Sparkles,
  MapPin, Tag, Thermometer, Clock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BenefitsList } from './BenefitIcons';
import { Button } from './ui/button';

const BENEFITS_DATA = {
  ecologico:        { icon: Leaf,     label: 'Ecológico',       desc: 'Certificado ecológico EU',           color: 'bg-green-50  text-green-700  border-green-200'  },
  crianza_libre:    { icon: Sun,      label: 'Crianza Libre',   desc: 'Gallinas en libertad total',         color: 'bg-amber-50  text-amber-700  border-amber-200'  },
  omega3:           { icon: Heart,    label: 'Omega-3',         desc: 'Alto en ácidos grasos esenciales',   color: 'bg-rose-50   text-rose-700   border-rose-200'   },
  sin_antibioticos: { icon: Shield,   label: 'Sin Antibióticos',desc: 'Sin tratamientos químicos',          color: 'bg-blue-50   text-blue-700   border-blue-200'   },
  marca_0:          { icon: Award,    label: 'Marca 0',         desc: 'Máxima categoría de producción',     color: 'bg-purple-50 text-purple-700 border-purple-200' },
  fresco:           { icon: Sparkles, label: 'Fresco del Día',  desc: 'Recolectados a diario',              color: 'bg-teal-50   text-teal-700   border-teal-200'   },
};

const NUTRITION = [
  { val: '90',  unit: 'kcal', label: 'Calorías'  },
  { val: '6.5', unit: 'g',    label: 'Proteínas' },
  { val: '6.4', unit: 'g',    label: 'Grasas'    },
  { val: '0.6', unit: 'g',    label: 'Carbos'    },
];

const PRODUCT_DETAILS = [
  { icon: MapPin,      label: 'Origen',       value: 'Cáceres, Extremadura' },
  { icon: Award,      label: 'Categoría',    value: 'A (Extra Frescos)'    },
  { icon: Thermometer, label: 'Conservación', value: 'Refrigerar (< 20°C)' },
  { icon: Clock,       label: 'Consumir en',  value: '21 días desde puesta' },
  { icon: Tag,         label: 'Código',       value: '0-ES-10-XXXXX'       },
];

export const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
    setIsModalOpen(false);
  };

  const pricePerUnit = (product.price / product.quantity).toFixed(2);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        data-testid={"product-card-" + product.id}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#E8DFCC] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-52 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <button
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
            data-testid={"view-details-" + product.id}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
          >
            <Eye className="w-5 h-5 text-[#1A1208]" />
          </button>
          <div className="absolute top-4 left-4 bg-[#1A1208] text-white px-3 py-1 rounded-full text-sm font-medium">{product.quantity} uds</div>
          {product.tag && (
            <div className="absolute bottom-4 right-4 bg-[#C69B1A] text-white px-3 py-1 rounded-full text-xs font-bold">{product.tag}</div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-serif text-xl font-semibold text-[#1A1208] mb-1">{product.name}</h3>
          <p className="text-[#5C5040] text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="mb-4">
            <BenefitsList benefits={product.benefits.slice(0, 3)} showLabels={false} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif text-2xl font-bold text-[#C69B1A]">{product.price.toFixed(2)}€</p>
              <p className="text-xs text-[#78716C]">{pricePerUnit}€/ud</p>
            </div>
            <Button
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
              data-testid={"add-to-cart-btn-" + product.id}
              className="bg-[#1A1208] hover:bg-[#2C3B2B] text-white rounded-full px-5 py-2 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Añadir</span>
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="bg-[#FAF6EC] rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {/* 1. FOTO */}
                <div className="h-60 overflow-hidden rounded-t-3xl">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <span className="text-xs font-bold text-[#C69B1A] uppercase tracking-widest">Detalles del producto</span>
                  <h3 className="font-serif text-3xl font-bold text-[#1A1208] mt-1">{product.name}</h3>
                  <p className="text-[#5C5040] mt-1">{product.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* COLUMNA IZQUIERDA */}
                  <div className="space-y-6">

                    {/* 2. CARACTERÍSTICAS */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#1A1208] mb-3">Características del producto</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {product.benefits.map((benefit) => {
                          const b = BENEFITS_DATA[benefit];
                          if (!b) return null;
                          const Icon = b.icon;
                          return (
                            <div key={benefit} className={"flex items-center gap-2 p-2.5 rounded-xl border " + b.color}>
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              <span className="text-xs font-semibold leading-tight">{b.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. INFORMACIÓN NUTRICIONAL */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#1A1208] mb-3">Información nutricional</h4>
                      <div className="bg-white border border-[#E8DFCC] rounded-2xl p-4">
                        <p className="text-xs text-[#78716C] mb-3">Por huevo (aprox. 63g)</p>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {NUTRITION.map((n) => (
                            <div key={n.label} className="bg-[#F0E9D6] rounded-xl p-2">
                              <span className="font-serif text-xl font-bold text-[#1A1208] block leading-tight">{n.val}</span>
                              <span className="text-[10px] text-[#78716C]">{n.unit}</span>
                              <p className="text-[10px] text-[#5C5040] mt-0.5 font-medium">{n.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COLUMNA DERECHA */}
                  <div className="space-y-6">

                    {/* 4. INFO DEL PRODUCTO */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#1A1208] mb-3">Información del producto</h4>
                      <div className="bg-white border border-[#E8DFCC] rounded-2xl divide-y divide-[#E7E5E4] overflow-hidden">
                        {PRODUCT_DETAILS.map(function(item) {
                          var Icon = item.icon;
                          return (
                            <div key={item.label} className="flex items-center gap-3 px-4 py-3">
                              <div className="w-8 h-8 rounded-lg bg-[#1A1208]/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-[#1A1208]" />
                              </div>
                              <div className="flex-1 flex justify-between items-center gap-2">
                                <span className="text-xs text-[#78716C] whitespace-nowrap">{item.label}</span>
                                <span className="text-xs font-semibold text-[#1A1208] text-right">{item.value}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* CANTIDAD */}
                    <div>
                      <label className="text-sm font-semibold text-[#5C5040] mb-2 block">Cantidad</label>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#E8DFCC] rounded-full overflow-hidden bg-white">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} data-testid="modal-decrease-quantity" className="px-4 py-2.5 hover:bg-[#F2F0E6] transition-colors">
                            <Minus className="w-4 h-4 text-[#1A1208]" />
                          </button>
                          <span className="w-10 text-center font-bold text-[#1A1208]">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} data-testid="modal-increase-quantity" className="px-4 py-2.5 hover:bg-[#F2F0E6] transition-colors">
                            <Plus className="w-4 h-4 text-[#1A1208]" />
                          </button>
                        </div>
                        <span className="text-[#78716C] font-medium">= {(product.price * quantity).toFixed(2)}€</span>
                      </div>
                    </div>

                    {/* PRECIO + CTA */}
                    <div className="pt-2">
                      <p className="font-serif text-4xl font-bold text-[#C69B1A]">{product.price.toFixed(2)}€</p>
                      <p className="text-xs text-[#78716C] mb-4">{pricePerUnit}€/unidad · IVA incluido</p>
                      <Button
                        onClick={handleAddToCart}
                        data-testid="modal-add-to-cart"
                        className="w-full bg-[#1A1208] hover:bg-[#2C3B2B] text-white rounded-full py-4 text-base font-serif flex items-center justify-center gap-3"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Añadir a la Cesta
                      </Button>
                      <p className="text-center text-xs text-[#78716C] mt-2">🔒 Pago seguro · Entrega 24-48h</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
