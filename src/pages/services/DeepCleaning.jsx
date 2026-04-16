import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import FAQSection from '../../components/FAQSection';
import heroImage from '../../assets/professional-cleaning-service-person-using-steam-cleaner-office (1).jpg';

const DeepCleaning = () => {
  const features = [
    {
      icon: '🧽',
      title: 'Kitchen Deep Clean',
      description: 'Inside appliances, cabinets, grease removal, and sanitization.',
    },
    {
      icon: '🛁',
      title: 'Bathroom Deep Clean',
      description: 'Grout cleaning, descaling, disinfection, and mold removal.',
    },
    {
      icon: '🛋️',
      title: 'Living Areas',
      description: 'Behind furniture, baseboards, ceiling fans, and light fixtures.',
    },
    {
      icon: '🪟',
      title: 'Windows & Glass',
      description: 'Tracks, sills, frames, and streak-free glass cleaning.',
    },
  ];

  const includedServices = [
    'Inside all cabinets and drawers',
    'Behind and under furniture/appliances',
    'Baseboards and door frames',
    'Ceiling fans and light fixtures',
    'Wall spot cleaning and switch plates',
    'Inside microwave and oven',
    'Refrigerator interior cleaning',
    'Grout scrubbing and sealing',
    'Shower head descaling',
    'Vent and duct dusting',
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
            <span className="text-white font-semibold">✨ Deep Cleaning</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Intensive Deep Cleaning Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Reach every hidden corner with our thorough deep cleaning service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Book Now
            </Link>
            <a
              href="tel:5551234567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              (555) 123-4567
            </a>
          </div>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Hero Image */}
      <section className="relative -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={heroImage}
              alt="Deep cleaning service"
              className="w-full h-96 object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Detailed Cleaning</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              What Makes Deep Cleaning Different?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our deep cleaning goes beyond surface cleaning to tackle built-up dirt and grime
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1169a9]/5 to-[#F08A7F]/5 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#1169a9] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Thorough Service</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-6 mt-2">
                Deep Cleaning Checklist
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every deep cleaning service includes these comprehensive tasks for a truly spotless space.
              </p>
              <ul className="space-y-4">
                {includedServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-[#F08A7F] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Deep cleaning in progress"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#1169a9] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-90">Deep Clean Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Book */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Perfect For</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              When Should You Book Deep Cleaning?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🏠', title: 'Spring Cleaning', desc: 'Annual refresh of your entire home' },
              { icon: '📅', title: 'Seasonal', desc: 'Quarterly deep cleaning maintenance' },
              { icon: '🎉', title: 'Special Events', desc: 'Before or after hosting gatherings' },
              { icon: '🤧', title: 'Allergy Season', desc: 'Remove allergens and improve air quality' },
              { icon: '🔨', title: 'Post-Renovation', desc: 'Clean up construction dust and debris' },
              { icon: '🦠', title: 'Health Concerns', desc: 'Disinfect and sanitize thoroughly' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1169a9]/5 to-[#F08A7F]/5 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#1169a9] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready for a Deep Clean?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book your deep cleaning service today and experience the difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
            >
              Schedule Now
            </Link>
            <a
              href="tel:5551234567"
              className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (555) 123-4567
            </a>
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
};

export default DeepCleaning;
