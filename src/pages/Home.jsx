import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PricingTables from '../components/PricingTables';
import StatsSection from '../components/StatsSection';
import FAQSection from '../components/FAQSection';
import TeamSection from '../components/TeamSection';
import PartnersSection from '../components/PartnersSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import WaveDivider from '../components/WaveDivider';
import headerbg from '../assets/headerbg.jpg';
import heroImage from '../assets/professional-cleaning-service-person-using-steam-cleaner-office (1).jpg';
import cleaningStaff from '../assets/cheerful-asian-male-janitor-walking-into-hotel-room-carrying-supplies-bucket.jpg';
import officeCleaning from '../assets/professional-cleaning-service-people-working-together-office (1).jpg';
import cafeCleaning from '../assets/closeup-waitress-disinfecting-tables-outdoor-cafe.jpg';
import homeCleaning from '../assets/man-doing-professional-home-cleaning-service (2).jpg';

const Home = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Residential Cleaning',
      description: 'Complete home cleaning services tailored to your needs. We make your living space sparkle.',
      image: homeCleaning,
    },
    {
      icon: '🏢',
      title: 'Commercial Cleaning',
      description: 'Professional cleaning for offices, retail spaces, and commercial buildings.',
      image: officeCleaning,
    },
    {
      icon: '✨',
      title: 'Deep Cleaning',
      description: 'Thorough deep cleaning service that reaches every corner and hidden spot.',
      image: heroImage,
    },
    {
      icon: '📦',
      title: 'Move In/Out Cleaning',
      description: 'Get your old place spotless or your new home ready with our comprehensive cleaning.',
      image: cleaningStaff,
    },
    {
      icon: '🧹',
      title: 'Carpet Cleaning',
      description: 'Advanced carpet cleaning techniques to remove stains and refresh your carpets.',
      image: cafeCleaning,
    },
    {
      icon: '🪟',
      title: 'Window Cleaning',
      description: 'Crystal clear windows that transform the look of your home or office.',
      image: headerbg,
    },
  ];

  const features = [
    { number: '10+', label: 'Years Experience' },
    { number: '5000+', label: 'Happy Clients' },
    { number: '50+', label: 'Professional Staff' },
    { number: '100%', label: 'Satisfaction Guaranteed' },
  ];

  const beforeAfterImages = [
    {
      before: cafeCleaning,
      after: officeCleaning,
      title: 'Living Room Deep Clean',
    },
    {
      before: homeCleaning,
      after: cleaningStaff,
      title: 'Kitchen Transformation',
    },
    {
      before: headerbg,
      after: heroImage,
      title: 'Bedroom Refresh',
    },
  ];

  const galleryImages = [
    cleaningStaff,
    officeCleaning,
    cafeCleaning,
    homeCleaning,
    heroImage,
    headerbg,
    cleaningStaff,
    officeCleaning,
  ];

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#1169a9] overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={headerbg}
            alt="Clean office"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1169a9]/90 to-[#1169a9]/70"></div>
        </div>
        
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1169a9]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F08A7F]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#1169a9]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-[#F08A7F] backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span className="text-sm font-semibold text-white">🎉 20% OFF Your First Cleaning!</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in leading-tight text-white">
              Professional House{' '}
              <span className="text-[#F08A7F]">Cleaning Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in text-white/90" style={{ animationDelay: '0.2s' }}>
              We bring the sparkle back to your space with our expert cleaning solutions. 
              Trusted by 5000+ happy clients.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 bg-[#F08A7F]/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#F08A7F]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Trusted by 5000+ Customers</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 bg-[#F08A7F]/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#F08A7F]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 bg-[#F08A7F]/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#F08A7F]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Eco-Friendly Products</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link
                to="/booking"
                className="bg-[#F08A7F] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e07868] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Book Now
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
        
        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Our Work Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">Our Work Gallery</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the transformation we bring to every space
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading={index < 4 ? 'eager' : 'lazy'}
                  fetchPriority={index < 2 ? 'high' : 'auto'}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <svg className="w-6 h-6 text-[#1169a9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-block bg-[#1169a9] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0d5586] transition-all shadow-lg hover:shadow-xl"
            >
              View All Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">Our Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of cleaning services to meet all your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:border-[#1169a9]/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    fetchPriority={index < 1 ? 'high' : 'auto'}
                    decoding="async"
                  />
                </div>
                <div className="p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1169a9] mb-3 group-hover:text-[#1169a9] transition-colors">{service.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{service.description}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center mt-4 text-[#F08A7F] font-semibold group-hover:text-[#F08A7F] transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center bg-[#1169a9] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0f5a8f] transition-all shadow-lg hover:shadow-xl"
            >
              View All Services
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After Gallery Section - Clenix Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">See the Difference</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">Before & After Results</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Drag the slider to see our amazing cleaning transformations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterImages.map((image, index) => (
              <div key={index}>
                <BeforeAfterSlider
                  beforeImage={image.before}
                  afterImage={image.after}
                  title={image.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Animated Counters */}
      <StatsSection />

      {/* Pricing Tables Section */}
      <PricingTables />

      {/* Why Choose Us Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-2">
                What Makes Us the Best Cleaning Service?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                We take pride in delivering exceptional cleaning services that exceed expectations.
                Our team is trained, vetted, and dedicated to providing the best possible service.
              </p>
              <div className="space-y-4">
                {[
                  'Fully Insured & Bonded',
                  'Eco-Friendly Products Available',
                  'Flexible Scheduling',
                  '100% Satisfaction Guarantee',
                  'Trained & Verified Staff',
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
              <Link
                to="/about"
                className="inline-block mt-10 bg-white text-[#1169a9] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3">{feature.number}</div>
                  <div className="text-white/90">{feature.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Testimonial Carousel - Clenix Style */}
      <TestimonialCarousel />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold">🎁 Special Offer: Book Today & Save 20%</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Your Space Sparkling Clean?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today for a free quote. Our professional team is ready to transform your space!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1"
            >
              Get Your Free Quote
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

      {/* Service Areas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Coverage</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Service Areas
            </h2>
            <p className="text-lg text-gray-600">
              We proudly serve the following cities and surrounding communities
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
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
                className="bg-gradient-to-r from-[#1169a9]/5 to-[#F08A7F]/5 px-6 py-3 rounded-full text-gray-700 font-medium hover:from-[#1169a9] hover:to-[#F08A7F] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;