import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarCheck, FaUsers, FaCog, FaSignOutAlt, FaArrowLeft, FaEnvelope, FaWrench, FaBars, FaTimes } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import NotificationBell from './NotificationBell';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#1169a9] to-[#0a4f85] text-white flex flex-col shadow-xl transform transition-transform duration-300 lg:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-white/20 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Apex Admin</h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">Management Dashboard</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
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
        <div className="p-3 sm:p-4 border-t border-white/20 space-y-1 sm:space-y-2">
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-white/10 transition-all text-blue-200 hover:text-white text-sm sm:text-base"
          >
            <FaArrowLeft />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-red-500/20 transition-all text-red-200 hover:text-red-100 text-sm sm:text-base"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-md px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaBars className="text-gray-600 text-lg" />
              </button>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
                {navItems.find((item) => isActive(item.path))?.name || 'Admin'}
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <NotificationBell />
              <div className="hidden sm:block text-right">
                <p className="text-xs sm:text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-800 text-sm">Administrator</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
