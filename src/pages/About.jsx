import { Link } from 'react-router-dom';
import StatsSection from '../components/StatsSection';
import TeamSection from '../components/TeamSection';
import WaveDivider from '../components/WaveDivider';
import PartnersSection from '../components/PartnersSection';

const About = () => {
  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'With over 15 years in the cleaning industry, John founded Apex Pro Cleaners with a vision to provide exceptional cleaning services.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Sarah ensures every job meets our high standards and that our team delivers consistent, quality results.',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Technician',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      bio: 'Michael brings 10 years of experience and specializes in advanced cleaning techniques and training.',
    },
    {
      name: 'Emily Davis',
      role: 'Customer Relations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
      bio: 'Emily is dedicated to ensuring client satisfaction and handling any concerns with care and efficiency.',
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We strive for perfection in every job, no matter the size.',
    },
    {
      icon: '💎',
      title: 'Quality',
      description: 'We use only the best products and techniques for lasting results.',
    },
    {
      icon: '🤝',
      title: 'Reliability',
      description: 'We show up on time, every time, as promised.',
    },
    {
      icon: '❤️',
      title: 'Integrity',
      description: 'Honest, transparent service with no hidden fees.',
    },
  ];

  const stats = [
    { number: 10, suffix: '+', label: 'Years Experience' },
    { number: 5000, suffix: '+', label: 'Happy Clients' },
    { number: 50, suffix: '+', label: 'Professional Staff' },
    { number: 100, suffix: '%', label: 'Satisfaction Guaranteed' },
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
            <span className="text-xs sm:text-sm text-white font-semibold">About Our Company</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            We're Your Trusted {' '}
            <span className="text-[#1169a9]">Cleaning Partners</span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto px-2">
            Learn more about our company and our commitment to excellence in every clean
          </p>
        </div>

        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Our Story */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="text-[#F08A7F] font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 sm:mb-6 mt-2">
                Building a Cleaner Future Since 2014
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                Founded in 2014, Apex Pro Cleaners began with a simple mission: to provide
                exceptional cleaning services that transform homes and offices into pristine,
                welcoming spaces.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                What started as a small family business has grown into one of the most
                trusted cleaning companies in the area. Our commitment to quality, reliability,
                and customer satisfaction has earned us thousands of loyal clients.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                Today, we continue to invest in training, equipment, and eco-friendly
                solutions to ensure we deliver the best possible service to every client.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#F08A7F] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Eco-Friendly Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#F08A7F] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#F08A7F] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Background Checked</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-block mt-8 sm:mt-10 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:from-[#0f5a8f] hover:to-[#e07868] transition-all shadow-lg hover:shadow-xl"
              >
                Work With Us
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1169a9] to-[#F08A7F] rounded-2xl p-4 sm:p-6 md:p-8 text-white">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6">
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">{stat.number}{stat.suffix}</div>
                      <div className="text-xs sm:text-sm text-white/90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#F08A7F] rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[#F08A7F] font-semibold text-xs sm:text-sm uppercase tracking-wider">Core Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1169a9] mb-3 sm:mb-4 mt-2">
              What Drives Us Forward
            </h2>
            <p className="text-sm sm:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              These core values guide everything we do at Apex Pro Cleaners
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1169a9] mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Animated */}
      <StatsSection />

      {/* Our Team - Using Enhanced Team Component */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[#F08A7F] font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1169a9] mb-3 sm:mb-4 mt-2">
              Meet The Professionals
            </h2>
            <p className="text-sm sm:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              The dedicated professionals behind Apex Pro Cleaners
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1169a9]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-6">
                    <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
                      <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#F08A7F] hover:text-white transition-colors">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1169a9] mb-1">{member.name}</h3>
                  <p className="text-[#F08A7F] font-medium text-sm sm:text-base mb-2 sm:mb-3">{member.role}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-white">
              <span className="text-[#F08A7F] font-semibold text-xs sm:text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 mt-2">
                What Makes Us the Best?
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    title: 'Fully Insured & Bonded',
                    desc: 'Your property is protected with our comprehensive insurance coverage.',
                  },
                  {
                    title: 'Eco-Friendly Options',
                    desc: 'We offer green cleaning products upon request for environmentally conscious clients.',
                  },
                  {
                    title: 'Flexible Scheduling',
                    desc: 'We work around your schedule, including evenings and weekends.',
                  },
                  {
                    title: 'Satisfaction Guaranteed',
                    desc: "If you're not happy with our service, we'll make it right - guaranteed.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#F08A7F] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-bold text-white text-sm sm:text-base md:text-lg">{item.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/services"
                className="inline-block mt-6 sm:mt-8 md:mt-10 bg-white text-[#1169a9] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Our Services
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: '🏆', title: 'Award Winning', desc: 'Industry recognized' },
                { icon: '🌿', title: 'Eco Friendly', desc: 'Green products' },
                { icon: '⏰', title: 'On Time', desc: 'Always punctual' },
                { icon: '💯', title: 'Top Rated', desc: '5-star reviews' },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="text-white font-bold">{item.title}</div>
                  <div className="text-white/70 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
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
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold">🎁 Special Offer: Book Today & Save 20%</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today to learn more about our services and get a free quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
