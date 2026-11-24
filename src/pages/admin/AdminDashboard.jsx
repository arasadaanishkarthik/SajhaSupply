import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BarChart3, Users, Building2, ShoppingBag, MapPin, LineChart, Settings } from 'lucide-react';
import AdminOverview from './AdminOverview';
import AdminUsers from './AdminUsers';
import AdminSuppliers from './AdminSuppliers';
import AdminOrders from './AdminOrders';
import AdminVillages from './AdminVillages';
import AdminAnalytics from './AdminAnalytics';
import AdminSettings from './AdminSettings';

const tabs = [
  { label: 'Overview', path: 'overview', icon: BarChart3 },
  { label: 'Users', path: 'users', icon: Users },
  { label: 'Suppliers', path: 'suppliers', icon: Building2 },
  { label: 'Orders', path: 'orders', icon: ShoppingBag },
  { label: 'Villages', path: 'villages', icon: MapPin },
  { label: 'Analytics', path: 'analytics', icon: LineChart },
  { label: 'Settings', path: 'settings', icon: Settings },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout tabs={tabs} basePath="/dashboard/admin">
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="suppliers" element={<AdminSuppliers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="villages" element={<AdminVillages />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </DashboardLayout>
  );
}
