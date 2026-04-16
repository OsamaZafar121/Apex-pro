import { useState } from 'react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import WaveDivider from '../components/WaveDivider';

// Import all gallery images
import bedroom from '../assets/bedroom-620x672.jpg';
import officeCleaning from '../assets/professional-cleaning-service-people-working-together-office (1).jpg';
import steamCleaner from '../assets/professional-cleaning-service-person-using-steam-cleaner-office (1).jpg';
import floor from '../assets/floor-620x672.jpg';
import window from '../assets/window-620x672.jpg';
import cleaningStaff from '../assets/cheerful-asian-male-janitor-walking-into-hotel-room-carrying-supplies-bucket.jpg';
import vacuumCleaner from '../assets/professional-cleaning-service-person-using-vacuum-cleaner-office (1).jpg';
import house5 from '../assets/house5-620x672.jpg';

const Gallery = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'deep-cleaning', label: 'Deep Cleaning' },
    { id: 'carpet', label: 'Carpet' },
    { id: 'windows', label: 'Windows' },
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'residential',
      title: 'Living Room Transformation',
      description: 'Complete living room deep clean',
      image: bedroom,
    },
    {
      id: 2,
      category: 'commercial',
      title: 'Office Space Cleaning',
      description: 'Professional office cleaning service',
      image: officeCleaning,
    },
    {
      id: 3,
      category: 'deep-cleaning',
      title: 'Kitchen Deep Clean',
      description: 'Thorough kitchen sanitization',
      image: steamCleaner,
    },
    {
      id: 4,
      category: 'residential',
      title: 'Bedroom Refresh',
      description: 'Complete bedroom cleaning',
      image: bedroom,
    },
    {
      id: 5,
      category: 'carpet',
      title: 'Carpet Restoration',
      description: 'Professional carpet cleaning',
      image: floor,
    },
    {
      id: 6,
      category: 'windows',
      title: 'Window Cleaning',
      description: 'Crystal clear windows',
      image: window,
    },
    {
      id: 7,
      category: 'residential',
      title: 'Bathroom Sanitization',
      description: 'Complete bathroom deep clean',
      image: cleaningStaff,
    },
    {
      id: 8,
      category: 'commercial',
      title: 'Conference Room',
      description: 'Meeting room maintenance',
      image: vacuumCleaner,
    },
    {
      id: 9,
      category: 'deep-cleaning',
      title: 'Move-Out Cleaning',
      description: 'Full property deep clean',
      image: house5,
    },
    {
      id: 10,
      category: 'residential',
      title: 'Dining Area Polish',
      description: 'Dining room deep cleaning',
      image: bedroom,
    },
    {
      id: 11,
      category: 'carpet',
      title: 'Office Carpets',
      description: 'Commercial carpet care',
      image: floor,
    },
    {
      id: 12,
      category: 'windows',
      title: 'Exterior Windows',
      description: 'Commercial window service',
      image: window,
    },
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const beforeAfterImages = [
    {
      before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
      after: 'https://images.unsplash.com/photo-1527512860163-54090e9e8372?w=800',
      title: 'Living Room Deep Clean',
    },
    {
      before: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      after: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800',
      title: 'Kitchen Transformation',
    },
    {
      before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
      after: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800',
      title: 'Bedroom Refresh',
    },
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
            <span className="text-white font-semibold">Our Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            See Our{' '}
            <span className="text-[#1169a9]">Amazing Results</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Browse through our gallery of before & after transformations
          </p>
        </div>
        
        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Before/After Slider Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">Interactive Gallery</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4 mt-2">
              Before & After Comparisons
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-[#1169a9] hover:to-[#F08A7F] hover:text-white border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-[#F08A7F] text-xs font-semibold uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-white font-bold text-lg mt-1">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#1169a9] mb-2">No projects found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 5000, suffix: '+', label: 'Projects Completed' },
              { number: 98, suffix: '%', label: 'Client Satisfaction' },
              { number: 50, suffix: '+', label: 'Team Members' },
              { number: 10, suffix: '+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
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
            Want to See Your Space Transformed?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today for a free quote and let our professionals handle your cleaning needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-[#1169a9] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1"
            >
              Get a Free Quote
            </a>
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

export default Gallery;
