import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import WaveDivider from '../components/WaveDivider';
import { api } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    setSubmitError('');
    setSubmitSuccess('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      await api.createContact(formData);
      setSubmitSuccess('Thank you for your inquiry. We will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        address: '',
        message: '',
      });
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Residential Cleaning',
    'Commercial Cleaning',
    'Deep Cleaning',
    'Move In/Out Cleaning',
    'Carpet Cleaning',
    'Window Cleaning',
    'Other',
  ];

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: 'Phone',
      content: '(555) 123-4567',
      subtext: 'Mon-Fri: 8am - 6pm',
      color: 'from-[#F08A7F] to-[#F08A7F]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      title: 'Email',
      content: 'info@apexprocleaners.com',
      subtext: 'We respond within 24 hours',
      color: 'from-[#F08A7F] to-[#F08A7F]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Address',
      content: '123 Clean Street',
      subtext: 'City, State 12345',
      color: 'from-[#F08A7F] to-[#F08A7F]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Business Hours',
      content: 'Mon-Fri: 8am - 6pm',
      subtext: 'Saturday: 9am - 4pm',
      color: 'from-[#F08A7F] to-[#F08A7F]',
    },
  ];

  return (
    <div>
      {/* Hero Banner - Clenix Style */}
      <section className="relative bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-white font-semibold">Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Contact{' '}
            <span className="text-[#1169a9]">Us Today</span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto px-2">
            Get in touch with us for a free quote or any questions about our services
          </p>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 sm:py-12 bg-white -mt-16 sm:-mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1169a9] mb-1">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 font-semibold break-words">{item.content}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
                <div className="mb-6 sm:mb-8">
                  <span className="text-[#F08A7F] font-semibold text-xs sm:text-sm uppercase tracking-wider">Request a Quote</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1169a9] mt-2">Get Your Free Estimate</h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-2">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {submitSuccess && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                      {submitSuccess}
                    </div>
                  )}

                  {submitError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 font-medium mb-2">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent transition-all text-sm sm:text-base"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-2">
                      Service Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Your address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-2">
                      Additional Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent transition-all resize-none text-sm sm:text-base"
                      placeholder="Tell us about your cleaning needs..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white font-bold py-3 sm:py-4 rounded-lg hover:from-[#0f5a8f] hover:to-[#e07868] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Form & Map */}
            <div className="space-y-6 sm:space-y-8">
              {/* Map Placeholder */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1169a9] mb-4">Our Location</h3>
                <div className="bg-gradient-to-br from-[#1169a9] to-[#F08A7F] rounded-2xl h-48 sm:h-64 flex items-center justify-center shadow-lg">
                  <div className="text-center text-white px-4">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-semibold text-sm sm:text-base">Interactive Map</p>
                    <p className="text-xs sm:text-sm opacity-80">Add your Google Map here</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1169a9] mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:5551234567" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-[#F08A7F] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Call Us</p>
                      <p className="font-bold text-[#1169a9]">(555) 123-4567</p>
                    </div>
                  </a>
                  <a href="mailto:info@apexprocleaners.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-[#F08A7F] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email Us</p>
                      <p className="font-bold text-[#1169a9] text-sm break-all">info@apexprocleaners.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[#F08A7F] font-semibold text-xs sm:text-sm uppercase tracking-wider">Coverage</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1169a9] mb-3 sm:mb-4 mt-2">
              Service Areas
            </h2>
            <p className="text-sm sm:text-base sm:text-lg text-gray-600 px-4">
              We proudly serve the following cities and surrounding communities
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              'Miami, FL',
              'Florida',
              'New York, NY',
              'Los Angeles, CA',
              'Dallas, TX',
              'Chicago, IL',
            ].map((area, index) => (
              <Link
                key={index}
                to={
                  area === 'Miami, FL' ? '/locations/miami' :
                  area === 'Florida' ? '/locations/florida' :
                  area === 'New York, NY' ? '/locations/new-york' :
                  area === 'Los Angeles, CA' ? '/locations/los-angeles' :
                  area === 'Dallas, TX' ? '/locations/dallas' :
                  '/locations/chicago'
                }
                className="bg-gradient-to-r from-[#1169a9]/5 to-[#F08A7F]/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm text-gray-700 font-medium hover:from-[#1169a9] hover:to-[#F08A7F] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-white font-semibold">🎁 Special Offer: Book Today & Save 20%</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Contact us today for a free quote. Our professional team is ready to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="tel:5551234567"
              className="bg-white text-[#1169a9] px-6 sm:px-10 py-3 sm:py-5 rounded-lg font-bold text-sm sm:text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now: (555) 123-4567
            </a>
            <a
              href="mailto:info@apexprocleaners.com"
              className="border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-5 rounded-lg font-bold text-sm sm:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
