import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { api } from '../../utils/api';
import { SERVICES, compareDateValues, displayBookingTime, formatDate, toDateKey } from '../../utils/booking';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaCog,
  FaEnvelope,
  FaUsers,
  FaWrench,
} from 'react-icons/fa';

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getCustomerName = (booking) => booking.customer?.name || 'Unknown customer';

const AdminDashboard = () => {
  const { bookings, customers } = useBooking();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadContacts() {
      try {
        const data = await api.getContacts();
        if (isMounted) {
          setContacts(data);
        }
      } catch {
        if (isMounted) {
          setContacts([]);
        }
      }
    }

    loadContacts();

    return () => {
      isMounted = false;
    };
  }, []);

  const dashboard = useMemo(() => {
    const today = getToday();
    const todayKey = toDateKey(today);
    const confirmed = bookings.filter((booking) => booking.status === 'confirmed');
    const upcoming = confirmed
      .filter((booking) => compareDateValues(booking.date, today) >= 0)
      .sort((left, right) => compareDateValues(left.date, right.date));

    const nextBooking = upcoming[0] || null;

    return {
      todayCount: confirmed.filter((booking) => toDateKey(booking.date) === todayKey).length,
      upcomingCount: upcoming.length,
      bookingsCount: bookings.length,
      customersCount: customers.length,
      contactsCount: contacts.length,
      nextBooking,
      recentBookings: [...bookings]
        .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
        .slice(0, 4),
    };
  }, [bookings, contacts, customers]);

  const mainSections = [
    {
      title: 'Bookings',
      value: dashboard.bookingsCount,
      to: '/admin/bookings',
      icon: <FaCalendarCheck className="text-2xl text-[#1169a9]" />,
    },
    {
      title: 'Customers',
      value: dashboard.customersCount,
      to: '/admin/customers',
      icon: <FaUsers className="text-2xl text-green-600" />,
    },
    {
      title: 'Contacts',
      value: dashboard.contactsCount,
      to: '/admin/contacts',
      icon: <FaEnvelope className="text-2xl text-[#F08A7F]" />,
    },
    {
      title: 'Services',
      value: Object.keys(SERVICES).length,
      to: '/admin/services',
      icon: <FaWrench className="text-2xl text-purple-600" />,
    },
    {
      title: 'Settings',
      value: 'Open',
      to: '/admin/settings',
      icon: <FaCog className="text-2xl text-slate-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="A simple overview of today’s work and the main admin sections."
        stats={[
          { label: 'Today', value: dashboard.todayCount },
          { label: 'Upcoming', value: dashboard.upcomingCount },
          { label: 'Customers', value: dashboard.customersCount },
        ]}
      />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {mainSections.map((section) => (
          <Link
            key={section.title}
            to={section.to}
            className="rounded-2xl bg-white p-3 sm:p-5 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gray-50">
                {section.icon}
              </div>
              <span className="text-sm font-semibold text-gray-500">{section.value}</span>
            </div>
            <h3 className="mt-3 sm:mt-4 text-sm sm:text-lg font-semibold text-gray-900">{section.title}</h3>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl bg-white shadow-md">
          <div className="border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Next Booking</h3>
          </div>
          <div className="p-4 sm:p-6">
            {dashboard.nextBooking ? (
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-lg font-semibold text-gray-900">{getCustomerName(dashboard.nextBooking)}</p>
                <p className="mt-2 text-gray-600">{formatDate(dashboard.nextBooking.date)}</p>
                <p className="text-sm text-gray-500">{displayBookingTime(dashboard.nextBooking.time)}</p>
                <p className="mt-3 text-sm text-gray-500">
                  {SERVICES[dashboard.nextBooking.service]?.name || dashboard.nextBooking.service}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming bookings.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-sm font-medium text-[#1169a9] hover:underline">
              View all
            </Link>
          </div>
          <div className="p-6">
            {dashboard.recentBookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {dashboard.recentBookings.map((booking) => (
                  <div key={booking.id} className="rounded-2xl bg-gray-50 px-4 py-3">
                    <p className="font-medium text-gray-900">{getCustomerName(booking)}</p>
                    <p className="text-sm text-gray-500">{formatDate(booking.date)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <a
        href="/booking"
        className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-md transition hover:shadow-lg"
      >
        <span className="flex items-center gap-3 font-medium text-gray-900">
          <FaCalendarAlt className="text-[#1169a9]" />
          Open Public Booking Page
        </span>
        <span className="text-sm font-medium text-[#1169a9]">Open</span>
      </a>
    </div>
  );
};

export default AdminDashboard;
