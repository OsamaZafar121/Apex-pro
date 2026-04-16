import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { BookingProvider } from './context/BookingContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

// Lazy load pages for better initial load time
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Testimonials = React.lazy(() => import('./pages/Testimonials'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Contact = React.lazy(() => import('./pages/Contact'));
const BookingEngine = React.lazy(() => import('./pages/BookingEngine'));
const MyBookings = React.lazy(() => import('./pages/MyBookings'));
const CRM = React.lazy(() => import('./pages/CRM'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));

// Admin pages
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const AdminBookings = React.lazy(() => import('./pages/admin/Bookings'));
const AdminBookingDetail = React.lazy(() => import('./pages/admin/BookingDetail'));
const AdminCustomers = React.lazy(() => import('./pages/admin/Customers'));
const AdminContacts = React.lazy(() => import('./pages/admin/Contacts'));
const AdminServices = React.lazy(() => import('./pages/admin/Services'));
const AdminSettings = React.lazy(() => import('./pages/admin/Settings'));

// Service pages - lazy loaded
const ResidentialCleaning = React.lazy(() => import('./pages/services/ResidentialCleaning'));
const CommercialCleaning = React.lazy(() => import('./pages/services/CommercialCleaning'));
const DeepCleaning = React.lazy(() => import('./pages/services/DeepCleaning'));
const MoveInMoveOutCleaning = React.lazy(() => import('./pages/services/MoveInMoveOutCleaning'));
const CarpetCleaning = React.lazy(() => import('./pages/services/CarpetCleaning'));
const WindowCleaning = React.lazy(() => import('./pages/services/WindowCleaning'));

// Location pages - lazy loaded
const MiamiCleaning = React.lazy(() => import('./pages/locations/MiamiCleaning'));
const FloridaCleaning = React.lazy(() => import('./pages/locations/FloridaCleaning'));
const NewYorkCleaning = React.lazy(() => import('./pages/locations/NewYorkCleaning'));
const LosAngelesCleaning = React.lazy(() => import('./pages/locations/LosAngelesCleaning'));
const DallasCleaning = React.lazy(() => import('./pages/locations/DallasCleaning'));
const ChicagoCleaning = React.lazy(() => import('./pages/locations/ChicagoCleaning'));

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#1169a9] border-t-[#F08A7F] rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <BookingProvider>
      <AdminAuthProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main Site Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />

                {/* Individual Service Pages */}
                <Route path="services/residential" element={<ResidentialCleaning />} />
                <Route path="services/commercial" element={<CommercialCleaning />} />
                <Route path="services/deep-cleaning" element={<DeepCleaning />} />
                <Route path="services/move-cleaning" element={<MoveInMoveOutCleaning />} />
                <Route path="services/carpet" element={<CarpetCleaning />} />
                <Route path="services/window" element={<WindowCleaning />} />

                {/* Location Pages */}
                <Route path="locations/miami" element={<MiamiCleaning />} />
                <Route path="locations/florida" element={<FloridaCleaning />} />
                <Route path="locations/new-york" element={<NewYorkCleaning />} />
                <Route path="locations/los-angeles" element={<LosAngelesCleaning />} />
                <Route path="locations/dallas" element={<DallasCleaning />} />
                <Route path="locations/chicago" element={<ChicagoCleaning />} />

                <Route path="gallery" element={<Gallery />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="blog" element={<Blog />} />
                <Route path="contact" element={<Contact />} />

                {/* Booking System Routes */}
                <Route path="booking" element={<BookingEngine />} />
              </Route>

              {/* Admin Routes - Outside Layout for full-page display */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="bookings/:bookingId" element={<AdminBookingDetail />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="crm" element={<CRM />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AdminAuthProvider>
    </BookingProvider>
  );
}

export default App;
