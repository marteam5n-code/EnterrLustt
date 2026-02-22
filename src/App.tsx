import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StoreProvider } from "./contexts/StoreContext";
import { AuthProvider } from "./contexts/AuthContext";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Admin } from "./pages/Admin";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>

        <BrowserRouter>

          <div className="flex flex-col min-h-screen">

            <Header />

            <main className="flex-1">
              <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ⭐ Ruta protegida admin */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />

              </Routes>
            </main>

            <Footer />

            <Toaster position="top-right" />

          </div>

        </BrowserRouter>

      </StoreProvider>
    </AuthProvider>
  );
}