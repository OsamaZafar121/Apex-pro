import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import FAQSection from '../../components/FAQSection';
import homeCleaning from '../../assets/man-doing-professional-home-cleaning-service (2).jpg';
import officeCleaning from '../../assets/professional-cleaning-service-people-working-together-office (1).jpg';

const MiamiCleaning = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Residential Cleaning',
      description: 'Professional home cleaning services in Miami.',
      path: '/services/residential',
    },
    {
      icon: '🏢',
      title: 'Commercial Cleaning',
      description: 'Office and business cleaning in Miami.',
      path: '/services/commercial',
    },
    {
      icon: '✨',
      title: 'Deep Cleaning',
      description: 'Thorough deep cleaning for Miami homes.',
      path: '/services/deep-cleaning',
    },
    {
      icon: '🪟',
      title: 'Window Cleaning',
      description: 'Crystal clear window cleaning services.',
      path: '/services/window',
    },
  ];

  const neighborhoods = [
    'South Beach', 'Brickell', 'Wynwood', 'Little Havana', 'Coconut Grove',
    'Coral Gables', 'Miami Beach', 'Downtown Miami', 'Edgewater', 'Design District',
    'Key Biscayne', 'Aventura', 'Kendall', 'Doral', 'Homestead',
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold">🌴 Miami, FL</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Best Cleaning Services in Miami
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professional cleaning services trusted by 5000+ Miami homes and businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Book Now
            </Link>
            <a
              href="tel:3051234567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              (305) 123-4567
            </a>
          </div>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Local Experts</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-6 mt-2">
                Miami's Trusted Cleaning Professionals
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Apex Pro Cleaners has been serving the greater Miami area for over 10 years. 
                We understand the unique cleaning needs of South Florida homes and businesses, 
                from beachfront condos in South Beach to corporate offices in Brickell.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our locally-trained team uses eco-friendly products and proven techniques 
                to keep your space spotless in Miami's tropical climate.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#1169a9]/10 to-[#F08A7F]/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#1169a9] mb-2">5000+</div>
                  <div className="text-gray-600">Happy Miami Clients</div>
                </div>
                <div className="bg-gradient-to-br from-[#1169a9]/10 to-[#F08A7F]/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#1169a9] mb-2">10+</div>
                  <div className="text-gray-600">Years in Miami</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={homeCleaning}
                alt="Professional cleaning in Miami"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#F08A7F] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-90">Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Cleaning Services in Miami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive cleaning solutions for Miami homes and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#1169a9] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-[#F08A7F] font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Service Areas</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Miami Neighborhoods We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional cleaning services throughout Miami-Dade County
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {neighborhoods.map((area, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1169a9]/5 to-[#F08A7F]/5 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-[#1169a9] font-medium">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-2">
              Miami's #1 Cleaning Service
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🌴', title: 'Local Miami Company', desc: 'Proudly serving Miami for 10+ years' },
              { icon: '👥', title: 'Bilingual Staff', desc: 'English and Spanish speaking cleaners' },
              { icon: '🛡️', title: 'Fully Insured', desc: 'Complete coverage for your peace of mind' },
              { icon: '🌿', title: 'Eco-Friendly', desc: 'Safe products for Miami families' },
              { icon: '⏰', title: 'Flexible Scheduling', desc: 'Same-day service available' },
              { icon: '⭐', title: '5-Star Rated', desc: 'Top-rated on Google and Yelp' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready for a Cleaner Miami Home?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book your professional cleaning service today and experience the Apex difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:3051234567"
              className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (305) 123-4567
            </a>
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
};

export default MiamiCleaning;
