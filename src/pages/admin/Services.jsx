import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaHome, FaBuilding, FaMagic, FaBoxes, FaSoap, FaWindowMaximize, FaToggleOn, FaToggleOff, FaDollarSign } from 'react-icons/fa';
import AdminPageHeader from '../../components/admin/AdminPageHeader';

const SERVICE_ICONS = {
  residential: FaHome,
  commercial: FaBuilding,
  deep: FaMagic,
  moveinout: FaBoxes,
  carpet: FaSoap,
  window: FaWindowMaximize,
};

const DEFAULT_SERVICES = [
  { id: 'residential', name: 'Residential Cleaning', price: 150, duration: 120, icon: '🏠', isActive: true, showPrice: true },
  { id: 'commercial', name: 'Commercial Cleaning', price: 250, duration: 180, icon: '🏢', isActive: true, showPrice: true },
  { id: 'deep', name: 'Deep Cleaning', price: 300, duration: 240, icon: '🧹', isActive: true, showPrice: true },
  { id: 'moveinout', name: 'Move In/Out Cleaning', price: 220, duration: 180, icon: '📦', isActive: true, showPrice: true },
  { id: 'carpet', name: 'Carpet Cleaning', price: 120, duration: 90, icon: '🧼', isActive: true, showPrice: true },
  { id: 'window', name: 'Window Cleaning', price: 80, duration: 60, icon: '🪟', isActive: true, showPrice: true },
];

const AdminServices = () => {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', duration: '', icon: '🏠', isActive: true, showPrice: true });
  const handleAdd = () => {
    setEditingService(null);
    setFormData({ name: '', price: '', duration: '', icon: '🏠', isActive: true, showPrice: true });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({ ...service });
    setShowModal(true);
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    setServices(services.filter(s => s.id !== serviceId));
  };

  const handleToggleActive = (serviceId) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleTogglePrice = (serviceId) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, showPrice: !s.showPrice } : s
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.duration) return;

    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id ? { ...s, ...formData } : s
      ));
    } else {
      setServices([...services, { ...formData, id: formData.name.toLowerCase().replace(/\s+/g, '_') }]);
    }
    setShowModal(false);
  };

  const getIconComponent = (icon) => {
    const iconMap = { '🏠': FaHome, '🏢': FaBuilding, '🧹': FaMagic, '📦': FaBoxes, '🧼': FaSoap, '🪟': FaWindowMaximize };
    return iconMap[icon] || FaHome;
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Catalog"
        title="Services"
        description="Manage the service catalog, pricing visibility, and activation state inside the same dashboard visual system."
        stats={[
          { label: 'Services', value: services.length },
          { label: 'Active', value: services.filter((service) => service.isActive).length },
          { label: 'Visible Prices', value: services.filter((service) => service.showPrice).length },
        ]}
        actions={
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-medium text-gray-900 shadow-sm transition hover:bg-white/95"
          >
            <FaPlus />
            Add Service
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const Icon = getIconComponent(service.icon);
          return (
            <div key={service.id} className={`bg-white rounded-2xl shadow-md p-4 ${!service.isActive ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-xl text-[#1169a9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.duration} min</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleActive(service.id)}
                  className={`text-2xl ${service.isActive ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {service.isActive ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {service.showPrice ? (
                    <span className="text-2xl font-bold text-[#1169a9]">${service.price}</span>
                  ) : (
                    <span className="text-gray-500">Price hidden</span>
                  )}
                  <button
                    onClick={() => handleTogglePrice(service.id)}
                    className={`text-sm ${service.showPrice ? 'text-green-600' : 'text-gray-400'}`}
                    title="Toggle price visibility"
                  >
                    <FaDollarSign />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No services yet. Add your first service to get started.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                  placeholder="Residential Cleaning"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                    placeholder="120"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                >
                  <option value="🏠">🏠 Residential</option>
                  <option value="🏢">🏢 Commercial</option>
                  <option value="🧹">🧹 Deep Cleaning</option>
                  <option value="📦">📦 Move In/Out</option>
                  <option value="🧼">🧼 Carpet</option>
                  <option value="🪟">🪟 Window</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.showPrice}
                    onChange={(e) => setFormData({ ...formData, showPrice: e.target.checked })}
                  />
                  <span className="text-sm text-gray-700">Show Price</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f]"
                >
                  {editingService ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
