import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarCheck, FaUsers, FaCog, FaSignOutAlt, FaArrowLeft, FaEnvelope, FaWrench } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import NotificationBell from './NotificationBell';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <FaCalendarCheck /> },
    { name: 'Customers', path: '/admin/customers', icon: <FaUsers /> },
    { name: 'Contacts', path: '/admin/contacts', icon: <FaEnvelope /> },
    { name: 'Services', path: '/admin/services', icon: <FaWrench /> },
    { name: 'Settings', path: '/admin/settings', icon: <FaCog /> },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#1169a9] to-[#0a4f85] text-white flex flex-col shadow-xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold">Apex Admin</h2>
          <p className="text-sm text-blue-200 mt-1">Management Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-white/20 shadow-md'
                  : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/20 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all text-blue-200 hover:text-white"
          >
            <FaArrowLeft />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-red-500/20 transition-all text-red-200 hover:text-red-100"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-md px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {navItems.find((item) => isActive(item.path))?.name || 'Admin'}
            </h1>
            <div className="flex items-center gap-4">
              <NotificationBell />
              <div className="text-right">
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-800">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
