import { useState } from 'react';
import { users } from '../../data/users';
import { Search, Shield, Check, X, UserPlus, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [userList, setUserList] = useState(users);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = userList
    .filter(u => roleFilter === 'all' || u.role === roleFilter)
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const toggleVerification = (id) => {
    setUserList(prev => prev.map(u => u.id === id ? { ...u, isVerified: !u.isVerified } : u));
    toast.success('User status updated');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500">Manage registered shopkeepers, suppliers, and delivery partners</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            className="input pl-10"
            placeholder="Search by user name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select className="input sm:w-48" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="shopkeeper">Shopkeepers</option>
          <option value="supplier">Suppliers</option>
          <option value="delivery">Delivery Partners</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Village / Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Verification</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600 text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">{u.name}</div>
                    <div className="text-xs text-gray-400">{u.email}</div>
                  </td>
                  <td className="py-3 px-4 capitalize">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      u.role === 'shopkeeper' ? 'bg-forest-50 text-forest-700' : u.role === 'supplier' ? 'bg-amber-50 text-amber-700' : u.role === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{u.village || u.location || 'Central Admin'}</td>
                  <td className="py-3 px-4 text-gray-600 font-mono text-xs">{u.mobile}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${u.isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.isVerified ? '✓ Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleVerification(u.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                        u.isVerified ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {u.isVerified ? 'Suspend' : 'Verify'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
