import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import FAQSection from '../../components/FAQSection';
import homeCleaning from '../../assets/man-doing-professional-home-cleaning-service (2).jpg';

const LosAngelesCleaning = () => {
  const areas = [
    'Downtown LA', 'Hollywood', 'Beverly Hills', 'Santa Monica', 'Venice',
    'West Hollywood', 'Pasadena', 'Long Beach', 'Burbank', 'Glendale',
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
            <span className="text-white font-semibold">🌴 Los Angeles, CA</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Best Cleaning Services in Los Angeles
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Premium cleaning services for LA homes, condos, and offices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Book Now
            </Link>
            <a
              href="tel:3101234567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              (310) 123-4567
            </a>
          </div>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-6">
                LA's Trusted Cleaning Professionals
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                From beachfront properties in Santa Monica to luxury estates in 
                Beverly Hills, Apex Pro Cleaners delivers exceptional service 
                throughout the greater Los Angeles area.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our eco-friendly cleaning solutions are perfect for LA's 
                health-conscious residents. We use sustainable products that 
                are safe for your family, pets, and California's environment.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#1169a9]/10 to-[#F08A7F]/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#1169a9] mb-2">6000+</div>
                  <div className="text-gray-600">LA Clients</div>
                </div>
                <div className="bg-gradient-to-br from-[#1169a9]/10 to-[#F08A7F]/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#1169a9] mb-2">100%</div>
                  <div className="text-gray-600">Eco-Friendly</div>
                </div>
              </div>
            </div>
            <img
              src={homeCleaning}
              alt="Professional cleaning in Los Angeles"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4">
              Areas We Serve in LA
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {areas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition-all">
                <div className="text-[#1169a9] font-medium">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4">
              Los Angeles Cleaning Services
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏡', title: 'Home Cleaning', desc: 'All property types' },
              { icon: '🏢', title: 'Office Cleaning', desc: 'Commercial spaces' },
              { icon: '🌿', title: 'Green Cleaning', desc: 'Eco-friendly options' },
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
            Experience LA's Best Cleaning
          </h2>
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

export default LosAngelesCleaning;
