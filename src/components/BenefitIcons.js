import React from 'react';
import { 
  Leaf, 
  Sun, 
  Heart, 
  Shield, 
  Award, 
  Sparkles,
  CircleDot
} from 'lucide-react';

const BENEFITS = {
  ecologico: {
    icon: Leaf,
    label: 'Ecológico',
    color: 'bg-green-100 text-green-700 border-green-200',
    description: 'Certificado ecológico EU'
  },
  crianza_libre: {
    icon: Sun,
    label: 'Crianza Libre',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    description: 'Gallinas en libertad'
  },
  omega3: {
    icon: Heart,
    label: 'Rico en Omega-3',
    color: 'bg-rose-100 text-rose-700 border-rose-200',
    description: 'Alto contenido en ácidos grasos'
  },
  sin_antibioticos: {
    icon: Shield,
    label: 'Sin Antibióticos',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Sin tratamientos químicos'
  },
  marca_0: {
    icon: Award,
    label: 'Marca 0',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Máxima categoría de producción'
  },
  fresco: {
    icon: Sparkles,
    label: 'Fresco del Día',
    color: 'bg-teal-100 text-teal-700 border-teal-200',
    description: 'Recolectados a diario'
  }
};

export const BenefitBadge = ({ benefit, showLabel = true, size = 'md' }) => {
  const benefitData = BENEFITS[benefit];
  
  if (!benefitData) return null;
  
  const Icon = benefitData.icon;
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div 
        className={`${sizeClasses[size]} rounded-full ${benefitData.color} border-2 flex items-center justify-center`}
        title={benefitData.description}
      >
        <Icon className={iconSizes[size]} />
      </div>
      {showLabel && (
        <span className="text-xs text-center text-[#5C5040] font-medium max-w-[60px] leading-tight">
          {benefitData.label}
        </span>
      )}
    </div>
  );
};

export const BenefitsList = ({ benefits, showLabels = true, size = 'md' }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {benefits.map((benefit) => (
        <BenefitBadge 
          key={benefit} 
          benefit={benefit} 
          showLabel={showLabels}
          size={size}
        />
      ))}
    </div>
  );
};

export const BenefitDetail = ({ benefit }) => {
  const benefitData = BENEFITS[benefit];
  
  if (!benefitData) return null;
  
  const Icon = benefitData.icon;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E8DFCC]">
      <div className={`w-10 h-10 rounded-full ${benefitData.color} border-2 flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium text-[#1A1208]">{benefitData.label}</p>
        <p className="text-sm text-[#78716C]">{benefitData.description}</p>
      </div>
    </div>
  );
};

export const NutritionLabel = ({ product }) => {
  return (
    <div 
      data-testid="nutrition-label"
      className="bg-white border-2 border-[#292524] rounded-lg p-6 max-w-sm mx-auto"
    >
      {/* Header */}
      <div className="border-b-4 border-[#292524] pb-2 mb-4">
        <h3 className="font-serif text-2xl font-bold text-center">Información del Producto</h3>
      </div>
      
      {/* Product Name */}
      <div className="border-b border-[#292524] pb-2 mb-3">
        <p className="text-lg font-bold text-center">{product.name}</p>
        <p className="text-sm text-center text-[#5C5040]">{product.quantity} unidades</p>
      </div>
      
      {/* Benefits Grid */}
      <div className="border-b border-[#292524] pb-4 mb-4">
        <p className="text-xs font-bold uppercase tracking-wider mb-3 text-center">Características</p>
        <div className="grid grid-cols-3 gap-3">
          {product.benefits.map((benefit) => (
            <BenefitBadge key={benefit} benefit={benefit} size="sm" />
          ))}
        </div>
      </div>
      
      {/* Details */}
      <div className="space-y-2 text-sm border-b border-[#292524] pb-4 mb-4">
        <div className="flex justify-between">
          <span className="text-[#5C5040]">Origen</span>
          <span className="font-medium">Cáceres, Extremadura</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5C5040]">Categoría</span>
          <span className="font-medium">A (Extra Frescos)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5C5040]">Código</span>
          <span className="font-medium">0-ES-10-XXXXX</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5C5040]">Conservación</span>
          <span className="font-medium">Refrigerar</span>
        </div>
      </div>
      
      {/* Price */}
      <div className="text-center">
        <p className="text-xs text-[#78716C] mb-1">Precio por unidad</p>
        <div className="flex items-center justify-center gap-2">
          <CircleDot className="w-4 h-4 text-[#1A1208]" />
          <span className="font-serif text-3xl font-bold text-[#1A1208]">
            {product.price.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
};

export { BENEFITS };
