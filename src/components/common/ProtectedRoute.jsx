import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const rolePaths = {
  shopkeeper: '/dashboard/shopkeeper',
  supplier: '/dashboard/supplier',
  delivery: '/dashboard/delivery',
  admin: '/dashboard/admin',
};

export default function ProtectedRoute({ children, role }) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-forest-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  if (role && currentUser.role !== role) {
    return <Navigate to={rolePaths[currentUser.role] || '/'} replace />;
  }

  return children;
}
