import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Toaster } from "./components/ui/sonner";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FarmPage from "./pages/FarmPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage, { CheckoutSuccessPage } from "./pages/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App min-h-screen flex flex-col bg-[#FDFCF0]">
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/granja" element={<FarmPage />} />
              <Route path="/tienda" element={<ShopPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
