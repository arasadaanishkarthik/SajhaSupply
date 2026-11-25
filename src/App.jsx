import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicNavbar from './components/navigation/PublicNavbar';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import FeaturesPage from './pages/public/FeaturesPage';
import ExplorePage from './pages/public/ExplorePage';
import ContactPage from './pages/public/ContactPage';

// Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Dashboards
import ShopkeeperDashboard from './pages/shopkeeper/ShopkeeperDashboard';
import SupplierDashboard from './pages/supplier/SupplierDashboard';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function PublicLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { borderRadius: '12px', fontSize: '14px' },
              success: { style: { background: '#E8F2EA', color: '#174C38', border: '1px solid #C5DFC9' } },
              error: { style: { background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FCA5A5' } },
            }}
          />
          <Routes>
            {/* Public (persistent navbar shell preserves LiquidNavbar physics across pages) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Dashboards */}
            <Route
              path="/dashboard/shopkeeper/*"
              element={
                <ProtectedRoute role="shopkeeper">
                  <ShopkeeperDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/supplier/*"
              element={
                <ProtectedRoute role="supplier">
                  <SupplierDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/delivery/*"
              element={
                <ProtectedRoute role="delivery">
                  <DeliveryDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
