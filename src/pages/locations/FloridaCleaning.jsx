import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import FAQSection from '../../components/FAQSection';
import homeCleaning from '../../assets/man-doing-professional-home-cleaning-service (2).jpg';

const FloridaCleaning = () => {
  const cities = [
    'Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale',
    'West Palm Beach', 'Naples', 'Sarasota', 'St. Petersburg', 'Clearwater',
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
            <span className="text-white font-semibold">☀️ Florida</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Best Cleaning Services in Florida
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professional cleaning services trusted by 10,000+ Florida homes and businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Book Now
            </Link>
            <a
              href="tel:8001234567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              (800) 123-4567
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-6">
                Florida's Most Trusted Cleaning Company
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Apex Pro Cleaners has been serving the Sunshine State for over 10 years. 
                From the Panhandle to the Keys, we deliver exceptional cleaning services 
                tailored to Florida's unique climate and lifestyle.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our trained professionals understand Florida's challenges - from 
                humidity and sand to hurricane season prep. We use specialized 
                techniques and eco-friendly products safe for your family and pets.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#1169a9]/10 to-[#F08A7F]/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#1169a9] mb-2">10,000+</div>
                  <div className="text-gray-600">Happy Florida Clients</div>
                </div>
                <div className="bg-gradient-to-br from-[#1169a9]/10 to-[#F08A7F]/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#1169a9] mb-2">50+</div>
                  <div className="text-gray-600">Cities Served</div>
                </div>
              </div>
            </div>
            <img
              src={homeCleaning}
              alt="Professional cleaning in Florida"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4">
              Cities We Serve Across Florida
            </h2>
            <p className="text-lg text-gray-600">Professional cleaning in your neighborhood</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cities.map((city, index) => (
              <Link
                key={index}
                to={city === 'Miami' ? '/locations/miami' : '/contact'}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-3xl mb-2">🌴</div>
                <h3 className="font-bold text-[#1169a9] group-hover:text-[#F08A7F] transition-colors">{city}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4">
              Our Florida Cleaning Services
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏠', title: 'Residential', desc: 'Home cleaning all sizes' },
              { icon: '🏢', title: 'Commercial', desc: 'Office & business cleaning' },
              { icon: '✨', title: 'Deep Cleaning', desc: 'Thorough top-to-bottom' },
              { icon: '📦', title: 'Move In/Out', desc: 'Deposit protection guaranteed' },
              { icon: '🧹', title: 'Carpet Cleaning', desc: 'Stain & odor removal' },
              { icon: '🪟', title: 'Window Cleaning', desc: 'Interior & exterior' },
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-[#1169a9]/5 to-[#F08A7F]/5 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#1169a9] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Serving All of Florida
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Get a free quote for cleaning services anywhere in Florida
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Get Free Quote
          </Link>
        </div>
      </section>

      <FAQSection />
    </div>
  );
};

export default FloridaCleaning;
