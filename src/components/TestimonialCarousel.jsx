import { Link } from 'react-router-dom';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      text: 'Apex Pro Cleaners have been amazing! My home has never looked better. The team is professional, punctual, and thorough. I especially love their attention to detail.',
      rating: 5,
      date: 'March 2025',
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      text: 'Professional, punctual, and thorough. They transformed our office space completely. Our employees and clients have noticed the difference!',
      rating: 5,
      date: 'February 2025',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      text: 'As a property manager, I rely on Apex Pro for all my turnover cleanings. They never disappoint and always deliver on time. Highly recommend!',
      rating: 5,
      date: 'January 2025',
    },
    
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">Real reviews from real customers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#F08A7F]"
                />
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-[#1169a9]">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-400">{testimonial.date}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </blockquote>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/testimonials"
            className="inline-flex items-center bg-[#1169a9] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0d5586] transition-colors shadow-lg"
          >
            View All Reviews
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
