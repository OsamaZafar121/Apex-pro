import { useState } from 'react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import WaveDivider from '../components/WaveDivider';

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'deep-cleaning', label: 'Deep Cleaning' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Local Homeowner',
      rating: 5,
      text: 'Apex Pro Cleaners have been amazing! My home has never looked better. The team is professional, punctual, and thorough. I recommend them to everyone looking for quality cleaning services.',
      category: 'residential',
      date: 'January 2024',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Office Manager, Tech Corp',
      rating: 5,
      text: "We've been using Apex Pro for our office cleaning for over a year now. They never disappoint. The workspace is always spotless when we arrive in the morning. Great service!",
      category: 'commercial',
      date: 'February 2024',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Jennifer Martinez',
      location: 'Local Resident',
      rating: 5,
      text: 'The deep cleaning service was incredible! They cleaned areas I didn\'t even know needed attention. My house feels brand new. Worth every penny!',
      category: 'deep-cleaning',
      date: 'January 2024',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 4,
      name: 'David Williams',
      location: 'Business Owner',
      rating: 5,
      text: 'As a business owner, I need my retail space to be spotless for customers. Apex Pro Cleaners delivers every time. Professional, reliable, and excellent results.',
      category: 'commercial',
      date: 'March 2024',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 5,
      name: 'Emily Thompson',
      location: 'Homeowner',
      rating: 5,
      text: 'I\'ve tried many cleaning services over the years, and Apex Pro is by far the best. They pay attention to detail and truly care about customer satisfaction.',
      category: 'residential',
      date: 'February 2024',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 6,
      name: 'Robert Garcia',
      location: 'Property Manager',
      rating: 5,
      text: 'Managing multiple properties, I need a reliable cleaning service. Apex Pro has been fantastic for our move-in/move-out cleanings. Always thorough and on time.',
      category: 'deep-cleaning',
      date: 'January 2024',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 7,
      name: 'Amanda Lee',
      location: 'Local Resident',
      rating: 5,
      text: 'The team did an amazing job on my carpets. They removed stains I thought were permanent. My carpets look brand new again!',
      category: 'residential',
      date: 'March 2024',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 8,
      name: 'James Wilson',
      location: 'CEO, Wilson & Associates',
      rating: 5,
      text: 'Professional office cleaning is crucial for our client meetings. Apex Pro understands this and always delivers exceptional results. Highly recommended!',
      category: 'commercial',
      date: 'February 2024',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const filteredTestimonials = activeFilter === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === activeFilter);

  const stats = [
    { number: '4.9', label: 'Average Rating', icon: '⭐' },
    { number: '500+', label: '5-Star Reviews', icon: '💬' },
    { number: '98%', label: 'Would Recommend', icon: '👍' },
    { number: '5000+', label: 'Happy Clients', icon: '😊' },
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
            <span className="text-white font-semibold">Client Reviews</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What Our Clients{' '}
            <span className="text-[#1169a9]">Say About Us</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Real reviews from real customers who trust us with their cleaning needs
          </p>
        </div>
        
        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#1169a9] mb-1">{stat.number}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel - Main Feature */}
      <TestimonialCarousel />

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-[#1169a9] hover:to-[#F08A7F] hover:text-white border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              More Client Feedback
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#F08A7F]"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold text-[#1169a9]">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                  <span className="bg-[#1169a9]/10 text-[#1169a9] px-3 py-1 rounded-full font-medium capitalize">
                    {testimonial.category.replace('-', ' ')}
                  </span>
                  <span className="text-gray-400">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#1169a9] mb-2">No reviews found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-red-50 px-6 py-3 rounded-full mb-6">
            <svg className="w-8 h-8 text-red-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span className="text-gray-700 font-semibold">Google Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-6">
            More Reviews on Google
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're proud to have earned hundreds of 5-star reviews on Google
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#0f5a8f] hover:to-[#e07868] transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            See All Google Reviews
          </a>
        </div>
      </section>

      {/* Write a Review CTA */}
      <section className="py-24 bg-gradient-to-r from-[#1169a9] via-[#F08A7F] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold">Share Your Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Had a Great Experience?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            We'd love to hear from you! Leave us a review to help others know about your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1"
            >
              Write a Review
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
