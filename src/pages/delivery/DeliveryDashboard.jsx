import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BarChart3, Truck, Navigation, History, User } from 'lucide-react';
import DeliveryOverview from './DeliveryOverview';
import DeliveryAssigned from './DeliveryAssigned';
import DeliveryRoutes from './DeliveryRoutes';
import DeliveryHistory from './DeliveryHistory';
import DeliveryProfile from './DeliveryProfile';

const tabs = [
  { label: 'Overview', path: 'overview', icon: BarChart3 },
  { label: 'Assigned Deliveries', path: 'assigned', icon: Truck },
  { label: 'Routes', path: 'routes', icon: Navigation },
  { label: 'Delivery History', path: 'history', icon: History },
  { label: 'Profile', path: 'profile', icon: User },
];

export default function DeliveryDashboard() {
  return (
    <DashboardLayout tabs={tabs} basePath="/dashboard/delivery">
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DeliveryOverview />} />
        <Route path="assigned" element={<DeliveryAssigned />} />
        <Route path="routes" element={<DeliveryRoutes />} />
        <Route path="history" element={<DeliveryHistory />} />
        <Route path="profile" element={<DeliveryProfile />} />
      </Routes>
    </DashboardLayout>
  );
}
