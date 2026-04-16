import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import FAQSection from '../../components/FAQSection';
import homeCleaning from '../../assets/man-doing-professional-home-cleaning-service (2).jpg';
import cleaningStaff from '../../assets/cheerful-asian-male-janitor-walking-into-hotel-room-carrying-supplies-bucket.jpg';
import officeCleaning from '../../assets/professional-cleaning-service-people-working-together-office (1).jpg';

const ResidentialCleaning = () => {
  const features = [
    {
      icon: '🧹',
      title: 'Regular Cleaning',
      description: 'Weekly, bi-weekly, or monthly cleaning services to keep your home consistently clean.',
    },
    {
      icon: '✨',
      title: 'Deep Cleaning',
      description: 'Thorough top-to-bottom cleaning that reaches every corner and hidden spot.',
    },
    {
      icon: '🏠',
      title: 'Move In/Out',
      description: 'Complete cleaning for empty homes before you move in or after you move out.',
    },
    {
      icon: '🌿',
      title: 'Eco-Friendly',
      description: 'Green cleaning options using environmentally safe products for your family.',
    },
  ];

  const includedServices = [
    'Dusting all surfaces including ceilings, walls, and baseboards',
    'Vacuuming and mopping all floors',
    'Kitchen cleaning (counters, appliances, sink, exterior cabinets)',
    'Bathroom sanitization (toilets, showers, tubs, sinks, mirrors)',
    'Bedroom cleaning (dusting, vacuuming, bed making)',
    'Living room cleaning (furniture, electronics, floors)',
    'Window sills and tracks cleaning',
    'Light switch plates and door handles disinfection',
    'Trash removal and bin cleaning',
    'Organization of common areas',
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'The residential cleaning service has been a game-changer for our busy family. Our home is always spotless!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Working Professional',
      content: 'Professional, reliable, and thorough. I trust them completely with my home. Highly recommend!',
      rating: 5,
    },
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
            <span className="text-white font-semibold">🏠 Residential Cleaning</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional Home Cleaning Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Transform your house into a sparkling clean home with our comprehensive residential cleaning services
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
              src={homeCleaning}
              alt="Residential cleaning service"
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
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Our Residential Cleaning Options
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Flexible cleaning services designed to fit your lifestyle and budget
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
                What's Included in Our Residential Cleaning?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive cleaning service covers every room in your home, ensuring a spotless and healthy living environment for you and your family.
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
                src={cleaningStaff}
                alt="Professional cleaner"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#1169a9] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-90">Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Affordable Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Residential Cleaning Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Get the best value for professional home cleaning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Studio/1 Bedroom',
                price: '$120',
                size: 'Up to 800 sq ft',
                features: ['1-2 hours', 'All rooms included', 'Kitchen & bathroom', 'Vacuum & mop'],
              },
              {
                name: '2-3 Bedrooms',
                price: '$180',
                size: '800-1500 sq ft',
                features: ['2-4 hours', 'All rooms included', 'Deep kitchen clean', 'Windows & mirrors'],
                popular: true,
              },
              {
                name: '4+ Bedrooms',
                price: '$250+',
                size: '1500+ sq ft',
                features: ['4+ hours', 'All rooms included', 'Premium service', 'Custom checklist'],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#1169a9] to-[#F08A7F] text-white shadow-2xl scale-105'
                    : 'bg-gray-50 text-gray-900 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#1169a9] px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-[#1169a9]'}`}>
                  {plan.name}
                </h3>
                <div className="text-sm opacity-80 mb-4">{plan.size}</div>
                <div className={`text-5xl font-bold mb-6 ${plan.popular ? 'text-white' : 'text-[#1169a9]'}`}>
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className={`w-5 h-5 mr-3 ${plan.popular ? 'text-white' : 'text-[#F08A7F]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-white text-[#1169a9] hover:bg-gray-100'
                      : 'bg-[#1169a9] text-white hover:bg-[#0d5586]'
                  }`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.175 1.688 1.54 1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#1169a9] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-[#1169a9]">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
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
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold">🎁 Special Offer: Book Today & Save 20%</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready for a Spotless Home?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today for a free quote and let our professionals handle your cleaning needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
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

      <FAQSection />
    </div>
  );
};

export default ResidentialCleaning;
