# DCielo Web — Huevos Ecológicos de Extremadura

Proyecto React (CRA + CRACO) combinando lo mejor de Emergent y Lovable.

## ▶️ Cómo arrancar

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en desarrollo
npm start
```

Abre http://localhost:3000 en el navegador.

## 📁 Estructura

```
src/
├── components/
│   ├── ProductCard.js     ← Modal mejorado: foto + características + nutricional + info
│   ├── CartDrawer.js      ← Carrito lateral (de Emergent)
│   ├── Navbar.js          ← Navbar con contador carrito
│   └── BenefitIcons.js
├── context/
│   └── CartContext.js     ← Estado global del carrito (localStorage)
├── data/
│   └── products.js        ← Datos de productos (sin backend necesario)
└── pages/
    ├── HomePage.js
    ├── ShopPage.js        ← Con ProductCard mejorado
    ├── FarmPage.js        ← Tabs del proceso (de Emergent)
    ├── AboutPage.js
    ├── ContactPage.js
    └── CheckoutPage.js    ← Formulario con validación
```

## 🛒 Flujo de compra

1. Usuario ve productos en Home o /tienda
2. Click en producto → modal con: **foto → características → nutricional → info + carrito**
3. Añadir al carrito → CartDrawer lateral se abre
4. Ir a /checkout → formulario de datos → pedido confirmado

## 🔧 Para producción

Cuando tengas WooCommerce, reemplaza los datos de `src/data/products.js`
con llamadas a la API REST de WordPress.
