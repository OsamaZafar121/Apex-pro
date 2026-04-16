import { FaFacebookF, FaPinterestP, FaSnapchatGhost, FaTiktok, FaClock, FaShoppingBag, FaPhone, FaChevronDown, FaCalendarAlt, FaUserShield } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import apexlogo from '../assets/apexlogo (2).png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Locations', path: '/locations', hasDropdown: true },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const servicesDropdown = [
    { name: 'Residential Cleaning', path: '/services/residential', icon: '🏠' },
    { name: 'Commercial Cleaning', path: '/services/commercial', icon: '🏢' },
    { name: 'Deep Cleaning', path: '/services/deep-cleaning', icon: '✨' },
    { name: 'Move In/Out Cleaning', path: '/services/move-cleaning', icon: '📦' },
    { name: 'Carpet Cleaning', path: '/services/carpet', icon: '🧹' },
    { name: 'Window Cleaning', path: '/services/window', icon: '🪟' },
  ];

  const locationsDropdown = [
    { name: 'Miami', path: '/locations/miami', icon: '🌴' },
    { name: 'Florida', path: '/locations/florida', icon: '☀️' },
    { name: 'New York', path: '/locations/new-york', icon: '🗽' },
    { name: 'Los Angeles', path: '/locations/los-angeles', icon: '🎬' },
    { name: 'Dallas', path: '/locations/dallas', icon: '🤠' },
    { name: 'Chicago', path: '/locations/chicago', icon: '🏙️' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">

      {/* TOP BAR - Light Blue Theme */}
      <div className="bg-[#1169a9] text-white text-sm px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Social Icons */}
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-[#F08A7F] transition-colors" aria-label="Facebook">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#F08A7F] transition-colors" aria-label="Pinterest">
              <FaPinterestP className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#F08A7F] transition-colors" aria-label="Snapchat">
              <FaSnapchatGhost className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#F08A7F] transition-colors" aria-label="TikTok">
              <FaTiktok className="w-4 h-4" />
            </a>
          </div>

          {/* Timing */}
          <div className="hidden md:flex items-center gap-2">
            <FaClock className="w-4 h-4" />
            <span>Mon - Fri: 08.00am - 06.00pm</span>
          </div>

          {/* Button */}
          <div className="flex items-center gap-3">
            <Link to="/admin/login" className="hidden md:flex items-center gap-1 text-white/70 hover:text-white transition-colors text-xs" title="Admin Login">
              <FaUserShield className="w-3 h-3" />
              Admin
            </Link>
            <Link to="/booking" className="hidden md:inline-block">
              <button className="bg-[#F08A7F] text-white px-5 py-1.5 font-semibold rounded-full hover:bg-[#e07868] transition-all hover:shadow-lg transform hover:-translate-y-0.5">
                Book Cleaning
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR - Clenix Style with Theme Colors */}
      <div className="bg-[#EAF3FB] px-6 md:px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={apexlogo}
              alt="Apex Pro Cleaners Logo"
              className="h-16 w-60 object-contain"
            />
          </Link>

          {/* Menu - Desktop */}
          <nav className="hidden lg:flex gap-6 text-gray-700 font-medium items-center">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => {
                    if (link.name === 'Services') {
                      setIsServicesDropdownOpen(true);
                      setIsLocationsDropdownOpen(false);
                    } else if (link.name === 'Locations') {
                      setIsLocationsDropdownOpen(true);
                      setIsServicesDropdownOpen(false);
                    }
                  }}
                  onMouseLeave={() => {
                    setIsServicesDropdownOpen(false);
                    setIsLocationsDropdownOpen(false);
                  }}
                >
                  <button
                    className={`flex items-center gap-1 transition-colors ${
                      isActive(link.path) ||
                      (link.name === 'Services' && isServicesDropdownOpen) ||
                      (link.name === 'Locations' && isLocationsDropdownOpen)
                        ? 'text-[#1169a9]'
                        : 'text-gray-700 hover:text-[#1169a9]'
                    }`}
                  >
                    {link.name}
                    <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      (link.name === 'Services' && isServicesDropdownOpen) ||
                      (link.name === 'Locations' && isLocationsDropdownOpen)
                        ? 'rotate-180'
                        : ''
                    }`} />
                  </button>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] transition-all duration-300 ${
                    isActive(link.path) ||
                    (link.name === 'Services' && isServicesDropdownOpen) ||
                    (link.name === 'Locations' && isLocationsDropdownOpen)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}></span>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ${
                    (link.name === 'Services' && isServicesDropdownOpen) ||
                    (link.name === 'Locations' && isLocationsDropdownOpen)
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="py-2">
                      {(link.name === 'Services' ? servicesDropdown : locationsDropdown).map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-[#EAF3FB] transition-colors group/item"
                          onClick={() => {
                            setIsServicesDropdownOpen(false);
                            setIsLocationsDropdownOpen(false);
                          }}
                        >
                          <span className="text-xl group-hover/item:scale-110 transition-transform">{item.icon}</span>
                          <span className="text-gray-700 font-medium group-hover/item:text-[#1169a9]">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 p-3 bg-gray-50">
                      <Link
                        to={link.name === 'Locations' ? '/locations/miami' : link.path}
                        className="text-[#1169a9] font-semibold text-sm hover:text-[#F08A7F] transition-colors flex items-center gap-2"
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setIsLocationsDropdownOpen(false);
                        }}
                      >
                        View All {link.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : link.isButton ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white px-5 py-2 rounded-lg font-semibold hover:from-[#0f5a8f] hover:to-[#e07868] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative group transition-colors ${
                    isActive(link.path)
                      ? 'text-[#1169a9]'
                      : 'text-gray-700 hover:text-[#1169a9]'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] transition-all duration-300 group-hover:w-full ${
                    isActive(link.path) ? 'w-full' : ''
                  }`}></span>
                </Link>
              )
            ))}
            
            {/* Notification Bell */}
            
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Booking Calendar */}
            

            {/* Contact */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F08A7F] rounded-full flex items-center justify-center">
                <FaPhone className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Quick Contact</p>
                <p className="font-bold text-[#1169a9]">(555) 123-4567</p>
              </div>
            </div>
            <Link
              to="/booking"
              className="w-10 h-10 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              aria-label="Book Now"
            >
              <FaCalendarAlt className="text-white text-sm" />
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.name}>
                    <button
                      onClick={() => {
                        if (link.name === 'Services') {
                          setIsServicesDropdownOpen(!isServicesDropdownOpen);
                          setIsLocationsDropdownOpen(false);
                        } else if (link.name === 'Locations') {
                          setIsLocationsDropdownOpen(!isLocationsDropdownOpen);
                          setIsServicesDropdownOpen(false);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-lg font-medium transition-all text-gray-700 hover:bg-gray-50 hover:text-[#1169a9] flex items-center justify-between"
                    >
                      {link.name}
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        (link.name === 'Services' && isServicesDropdownOpen) ||
                        (link.name === 'Locations' && isLocationsDropdownOpen)
                          ? 'rotate-180'
                          : ''
                      }`} />
                    </button>
                    {((link.name === 'Services' && isServicesDropdownOpen) ||
                      (link.name === 'Locations' && isLocationsDropdownOpen)) && (
                      <div className="ml-4 mt-2 space-y-1">
                        {(link.name === 'Services' ? servicesDropdown : locationsDropdown).map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-[#EAF3FB] hover:text-[#1169a9] transition-colors"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                          </Link>
                        ))}
                        <Link
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-[#1169a9] font-semibold text-sm hover:text-[#F08A7F]"
                        >
                          View All {link.name} →
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#1169a9]'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Link
                to="/booking"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-[#EAF3FB] hover:text-[#1169a9] transition-colors"
              >
                <FaCalendarAlt className="text-base" />
                Book Now
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white px-6 py-3 rounded-lg font-semibold text-center shadow-lg"
              >
                Book Cleaning
              </Link>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
