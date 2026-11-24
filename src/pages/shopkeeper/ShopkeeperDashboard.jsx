// Shopkeeper Dashboard Shell
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BarChart3, Package, Users, Brain, Truck, CreditCard, User } from 'lucide-react';
import SKOverview from './SKOverview';
import SKProducts from './SKProducts';
import SKGroupOrders from './SKGroupOrders';
import SKAIInsights from './SKAIInsights';
import SKTracking from './SKTracking';
import SKPayments from './SKPayments';
import SKProfile from './SKProfile';

const tabs = [
  { label: 'Overview', path: 'overview', icon: BarChart3 },
  { label: 'Products', path: 'products', icon: Package },
  { label: 'Group Orders', path: 'group-orders', icon: Users },
  { label: 'AI Insights', path: 'ai-insights', icon: Brain },
  { label: 'Tracking', path: 'tracking', icon: Truck },
  { label: 'Payments', path: 'payments', icon: CreditCard },
  { label: 'Profile', path: 'profile', icon: User },
];

export default function ShopkeeperDashboard() {
  return (
    <DashboardLayout tabs={tabs} basePath="/dashboard/shopkeeper">
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<SKOverview />} />
        <Route path="products" element={<SKProducts />} />
        <Route path="group-orders" element={<SKGroupOrders />} />
        <Route path="ai-insights" element={<SKAIInsights />} />
        <Route path="tracking" element={<SKTracking />} />
        <Route path="payments" element={<SKPayments />} />
        <Route path="profile" element={<SKProfile />} />
      </Routes>
    </DashboardLayout>
  );
}
