import { Link } from 'react-router-dom';
import PricingTables from '../components/PricingTables';
import FAQSection from '../components/FAQSection';
import WaveDivider from '../components/WaveDivider';
import heroImage from '../assets/professional-cleaning-service-person-using-steam-cleaner-office (1).jpg';
import cleaningStaff from '../assets/cheerful-asian-male-janitor-walking-into-hotel-room-carrying-supplies-bucket.jpg';
import officeCleaning from '../assets/professional-cleaning-service-people-working-together-office (1).jpg';
import cafeCleaning from '../assets/closeup-waitress-disinfecting-tables-outdoor-cafe.jpg';
import homeCleaning from '../assets/man-doing-professional-home-cleaning-service (2).jpg';
import headerbg from '../assets/headerbg.jpg';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: '🏠',
      title: 'Residential Cleaning',
      description: 'Our comprehensive residential cleaning service covers every corner of your home, ensuring a fresh and hygienic living environment.',
      features: [
        'Kitchen cleaning (counters, appliances, floors)',
        'Bathroom sanitization',
        'Bedroom dusting and vacuuming',
        'Living room cleaning',
        'Dusting and mopping',
        'Trash removal',
      ],
      path: '/services/residential',
      image: homeCleaning,
    },
    {
      id: 2,
      icon: '🏢',
      title: 'Commercial Cleaning',
      description: 'Professional cleaning solutions for offices, retail spaces, and commercial buildings designed to create a productive work environment.',
      features: [
        'Office deep cleaning',
        'Conference room cleaning',
        'Restroom sanitization',
        'Kitchen/break room cleaning',
        'Floor care (vacuuming, mopping)',
        'Window washing',
      ],
      path: '/services/commercial',
      image: officeCleaning,
    },
    {
      id: 3,
      icon: '✨',
      title: 'Deep Cleaning',
      description: 'Our intensive deep cleaning service reaches every hidden spot and detail, perfect for seasonal cleaning or special occasions.',
      features: [
        'Inside cabinet cleaning',
        'Appliance deep clean',
        'Baseboard cleaning',
        'Ceiling fan dusting',
        'Light fixture cleaning',
        'Behind furniture cleaning',
      ],
      path: '/services/deep-cleaning',
      image: heroImage,
    },
    {
      id: 4,
      icon: '📦',
      title: 'Move In/Out Cleaning',
      description: 'Make your move smoother with our thorough move-in or move-out cleaning service. We ensure your new home is ready or your deposit is protected.',
      features: [
        'Complete interior cleaning',
        'Appliance cleaning (inside/out)',
        'Cabinet and closet cleaning',
        'Wall spot cleaning',
        'Floor deep cleaning',
        'Window treatment cleaning',
      ],
      path: '/services/move-cleaning',
      image: cleaningStaff,
    },
    {
      id: 5,
      icon: '🧹',
      title: 'Carpet Cleaning',
      description: 'Our advanced carpet cleaning techniques remove stains, dirt, and allergens, restoring your carpets to their original beauty.',
      features: [
        'Hot water extraction',
        'Stain treatment',
        'Odor elimination',
        'Fabric protection',
        'Quick drying process',
        'All carpet types handled',
      ],
      path: '/services/carpet',
      image: cafeCleaning,
    },
    {
      id: 6,
      icon: '🪟',
      title: 'Window Cleaning',
      description: 'Crystal clear windows that enhance your view and let in more natural light. Interior and exterior window cleaning available.',
      features: [
        'Interior window cleaning',
        'Exterior window cleaning',
        'Screen cleaning',
        'Frame and sill cleaning',
        'Streak-free finish',
        'Hard water stain removal',
      ],
      path: '/services/window',
      image: headerbg,
    },
  ];

  const additionalServices = [
    { name: 'Upholstery Cleaning', icon: '🛋️' },
    { name: 'Tile & Grout Cleaning', icon: '🔲' },
    { name: 'Post-Construction Cleaning', icon: '🏗️' },
    { name: 'Event Cleanup', icon: '🎉' },
    { name: 'Organization Services', icon: '📋' },
    { name: 'Air Duct Cleaning', icon: '💨' },
  ];

  return (
    <div>
      {/* Hero Banner - Clenix Style */}
      <section className="relative bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold">Our Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional Cleaning{' '}
            <span className="text-[#1169a9]">Solutions</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Comprehensive cleaning services tailored to your needs
          </p>
        </div>
        
        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Main Services - Card Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Our Premium Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From residential to commercial cleaning, we have the perfect solution for your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1169a9]/20 to-[#F08A7F]/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{service.icon}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1169a9] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#1169a9] mb-2">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600 text-sm">
                          <svg className="w-4 h-4 text-[#F08A7F] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={service.path}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#0f5a8f] hover:to-[#e07868] transition-all group"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center bg-[#1169a9] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#14566d] transition-all shadow-lg hover:shadow-xl"
            >
              Request Custom Quote
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">More Options</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600">
              We also offer these specialized cleaning services
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="font-semibold text-[#1169a9] text-sm">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <PricingTables />

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Simple Booking Process
            </h2>
            <p className="text-lg text-gray-600">Getting your space cleaned is easy</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: '1', 
                title: 'Book Online', 
                desc: 'Fill out our contact form or call us to schedule your service',
                icon: '📅'
              },
              { 
                step: '2', 
                title: 'We Arrive', 
                desc: 'Our professional team arrives on time with all equipment',
                icon: '🚐'
              },
              { 
                step: '3', 
                title: 'Deep Clean', 
                desc: 'We thoroughly clean your space using proven techniques',
                icon: '✨'
              },
              { 
                step: '4', 
                title: 'You Relax', 
                desc: 'Enjoy your sparkling clean home or office!',
                icon: '🎉',
                highlight: true
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#1169a9] to-[#F08A7F]"></div>
                )}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl relative z-10 ${
                  item.highlight ? 'bg-gradient-to-r from-[#F08A7F] to-[#F08A7F] text-white' : 'bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white'
                }`}>
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-[#F08A7F] mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-[#1169a9] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Services */}
      <section className="py-20 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-2">
                Professional Service You Can Trust
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Our trained professionals use the latest cleaning techniques and eco-friendly products to deliver exceptional results.
              </p>
              <div className="space-y-4">
                {[
                  'Certified & Trained Professionals',
                  'Eco-Friendly Cleaning Products',
                  'Flexible Scheduling Options',
                  '100% Satisfaction Guarantee',
                  'Competitive Pricing',
                  'Same-Day Service Available',
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-[#F08A7F] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '5000+', label: 'Happy Clients' },
                  { number: '10+', label: 'Years Experience' },
                  { number: '50+', label: 'Expert Staff' },
                  { number: '100%', label: 'Satisfaction' },
                ].map((stat, index) => (
                  <div key={index} className="text-center bg-white/10 rounded-xl p-6">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-sm text-white/90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold">🎁 Special Offer: Book Today & Save 20%</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Book Your Cleaning?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today for a free quote and let our experts handle your cleaning needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1"
            >
              Get a Free Quote
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
    </div>
  );
};

export default Services;
