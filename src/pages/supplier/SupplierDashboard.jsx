import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BarChart3, Package, Inbox, ShoppingBag, DollarSign, TrendingUp, User } from 'lucide-react';
import SupplierOverview from './SupplierOverview';
import SupplierInventory from './SupplierInventory';
import SupplierBulkRequests from './SupplierBulkRequests';
import SupplierOrders from './SupplierOrders';
import SupplierPricing from './SupplierPricing';
import SupplierEarnings from './SupplierEarnings';
import SupplierProfile from './SupplierProfile';

const tabs = [
  { label: 'Overview', path: 'overview', icon: BarChart3 },
  { label: 'Inventory', path: 'inventory', icon: Package },
  { label: 'Bulk Requests', path: 'bulk-requests', icon: Inbox },
  { label: 'Orders', path: 'orders', icon: ShoppingBag },
  { label: 'Pricing', path: 'pricing', icon: DollarSign },
  { label: 'Earnings', path: 'earnings', icon: TrendingUp },
  { label: 'Profile', path: 'profile', icon: User },
];

export default function SupplierDashboard() {
  return (
    <DashboardLayout tabs={tabs} basePath="/dashboard/supplier">
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<SupplierOverview />} />
        <Route path="inventory" element={<SupplierInventory />} />
        <Route path="bulk-requests" element={<SupplierBulkRequests />} />
        <Route path="orders" element={<SupplierOrders />} />
        <Route path="pricing" element={<SupplierPricing />} />
        <Route path="earnings" element={<SupplierEarnings />} />
        <Route path="profile" element={<SupplierProfile />} />
      </Routes>
    </DashboardLayout>
  );
}
