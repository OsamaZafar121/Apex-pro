import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import FAQSection from '../../components/FAQSection';
import officeCleaning from '../../assets/professional-cleaning-service-people-working-together-office (1).jpg';
import cafeCleaning from '../../assets/closeup-waitress-disinfecting-tables-outdoor-cafe.jpg';

const CommercialCleaning = () => {
  const features = [
    {
      icon: '🏢',
      title: 'Office Cleaning',
      description: 'Daily, weekly, or monthly office cleaning to maintain a professional workspace.',
    },
    {
      icon: '🏪',
      title: 'Retail Cleaning',
      description: 'Keep your retail space clean and inviting for customers.',
    },
    {
      icon: '🏥',
      title: 'Medical Facilities',
      description: 'Specialized cleaning for healthcare environments with strict hygiene standards.',
    },
    {
      icon: '🏫',
      title: 'Educational Facilities',
      description: 'Comprehensive cleaning for schools, daycares, and educational institutions.',
    },
  ];

  const includedServices = [
    'Desk and workstation cleaning and sanitization',
    'Conference room cleaning and setup',
    'Break room and kitchen cleaning',
    'Restroom cleaning and sanitization',
    'Floor care (vacuuming, mopping, buffing)',
    'Trash removal and recycling',
    'Window cleaning (interior)',
    'Dusting of all surfaces',
    'Light fixture and vent cleaning',
    'Entryway and lobby maintenance',
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
            <span className="text-white font-semibold">🏢 Commercial Cleaning</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional Business Cleaning Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Create a clean, healthy, and productive work environment with our commercial cleaning solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Quote
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
              src={officeCleaning}
              alt="Commercial cleaning service"
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
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Industries We Serve</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Commercial Cleaning Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tailored cleaning services for various business types and industries
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
              <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Complete Service</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-6 mt-2">
                What's Included in Commercial Cleaning?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our commercial cleaning service maintains your business space to the highest standards of cleanliness and professionalism.
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
                src={cafeCleaning}
                alt="Professional commercial cleaner"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Benefits of Professional Commercial Cleaning
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💼',
                title: 'Professional Image',
                description: 'A clean office creates a positive impression on clients and visitors.',
              },
              {
                icon: '👥',
                title: 'Employee Health',
                description: 'Reduce sick days with a cleaner, healthier work environment.',
              },
              {
                icon: '📈',
                title: 'Productivity Boost',
                description: 'Employees are more productive in a clean, organized workspace.',
              },
              {
                icon: '🛡️',
                title: 'Fully Insured',
                description: 'Complete coverage for peace of mind during cleaning services.',
              },
              {
                icon: '⏰',
                title: 'Flexible Scheduling',
                description: 'After-hours and weekend cleaning to avoid business disruption.',
              },
              {
                icon: '💰',
                title: 'Cost Effective',
                description: 'Save on overhead costs compared to in-house cleaning staff.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1169a9]/5 to-[#F08A7F]/5 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[#1169a9] mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today for a customized commercial cleaning quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
            >
              Request Quote
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

export default CommercialCleaning;
