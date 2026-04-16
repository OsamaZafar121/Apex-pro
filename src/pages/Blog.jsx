import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import WaveDivider from '../components/WaveDivider';

// Import blog images
import bedroom from '../assets/bedroom-620x672.jpg';
import floor from '../assets/floor-620x672.jpg';
import window from '../assets/window-620x672.jpg';
import house5 from '../assets/house5-620x672.jpg';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Keeping Your Home Clean Between Professional Cleanings',
      excerpt: 'Learn how to maintain a clean and organized home with these simple tips from our cleaning experts.',
      category: 'Cleaning Tips',
      author: 'Sarah Johnson',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: bedroom,
      featured: true,
    },
    {
      id: 2,
      title: 'Why Professional Deep Cleaning is Essential Before Moving',
      excerpt: 'Discover why a deep cleaning service is crucial when moving to ensure you get your security deposit back.',
      category: 'Services',
      author: 'Michael Chen',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: 'March 10, 2024',
      readTime: '4 min read',
      image: floor,
    },
    {
      id: 3,
      title: 'The Benefits of Regular Commercial Cleaning for Your Business',
      excerpt: 'A clean workplace boosts productivity, improves employee health, and creates a positive impression on clients.',
      category: 'Commercial',
      author: 'Emily Davis',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      date: 'March 5, 2024',
      readTime: '6 min read',
      image: window,
    },
    {
      id: 4,
      title: 'How to Remove Stubborn Stains from Your Carpets',
      excerpt: 'Expert tips on tackling tough carpet stains using household items and professional techniques.',
      category: 'DIY Cleaning',
      author: 'John Smith',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      date: 'February 28, 2024',
      readTime: '7 min read',
      image: house5,
    },
    {
      id: 5,
      title: 'Eco-Friendly Cleaning: Better for Your Home and the Planet',
      excerpt: 'Explore the benefits of green cleaning products and how they can improve your indoor air quality.',
      category: 'Green Cleaning',
      author: 'Sarah Johnson',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      date: 'February 20, 2024',
      readTime: '5 min read',
      image: bedroom,
    },
    {
      id: 6,
      title: 'Seasonal Cleaning Checklist: Spring Edition',
      excerpt: 'Get your home ready for spring with this comprehensive cleaning checklist from the experts.',
      category: 'Cleaning Tips',
      author: 'Michael Chen',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: 'February 15, 2024',
      readTime: '8 min read',
      image: floor,
    },
  ];

  const categories = [
    { name: 'All Posts', count: 12, icon: '📋' },
    { name: 'Cleaning Tips', count: 4, icon: '💡' },
    { name: 'Services', count: 3, icon: '🛠️' },
    { name: 'Commercial', count: 2, icon: '🏢' },
    { name: 'DIY Cleaning', count: 2, icon: '🔧' },
    { name: 'Green Cleaning', count: 1, icon: '🌿' },
  ];

  const recentPosts = [
    { title: '10 Tips for Keeping Your Home Clean', date: 'March 15, 2024', icon: '🏠' },
    { title: 'Why Professional Deep Cleaning is Essential', date: 'March 10, 2024', icon: '✨' },
    { title: 'Benefits of Regular Commercial Cleaning', date: 'March 5, 2024', icon: '🏢' },
    { title: 'How to Remove Stubborn Carpet Stains', date: 'February 28, 2024', icon: '🧹' },
  ];

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter(post => !post.featured);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term)
      );
    }

    if (selectedCategory && selectedCategory !== 'All Posts') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    return posts;
  }, [blogPosts, searchTerm, selectedCategory]);

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
            <span className="text-white font-semibold">Our Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Cleaning Tips &{' '}
            <span className="text-[#1169a9]">Insights</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Expert advice, guides, and insights from our cleaning professionals
          </p>
        </div>
        
        <WaveDivider variant="bottom" color="white" />
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              {/* Featured Post */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-12 hover:shadow-2xl transition-shadow">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ✨ Featured Post
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#F08A7F] font-semibold text-sm uppercase tracking-wider">{featuredPost.category}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1169a9] mb-4 hover:text-[#F08A7F] cursor-pointer transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-[#1169a9] text-sm">{featuredPost.author}</p>
                        <p className="text-gray-500 text-xs">{featuredPost.date}</p>
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      className="text-[#1169a9] font-semibold hover:text-[#F08A7F] transition-colors flex items-center gap-2"
                    >
                      Read More
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#F08A7F] font-semibold text-xs uppercase tracking-wider">{post.category}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-xs">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1169a9] mb-3 hover:text-[#F08A7F] cursor-pointer transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-gray-600 text-xs">{post.author}</span>
                        </div>
                        <span className="text-gray-400 text-xs">{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="bg-white text-[#1169a9] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200">
                  Load More Articles
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Search */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-[#1169a9] mb-4">Search Articles</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1169a9] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-[#1169a9] mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex justify-between items-center transition-colors group ${
                          selectedCategory === category.name || (!selectedCategory && category.name === 'All Posts')
                            ? 'text-[#1169a9] font-semibold'
                            : 'text-gray-600 hover:text-[#1169a9]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-[#1169a9] mb-4">Recent Posts</h3>
                <ul className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex items-start gap-3 hover:text-[#1169a9] transition-colors group"
                      >
                        <span className="text-2xl">{post.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-700 group-hover:text-[#1169a9] text-sm line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#1169a9] to-[#F08A7F] rounded-2xl p-6 shadow-lg text-white">
                <div className="text-4xl mb-4">📬</div>
                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                <p className="text-white/90 text-sm mb-4">
                  Subscribe to our newsletter for cleaning tips and exclusive offers.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800"
                />
                <button className="w-full bg-white text-[#1169a9] font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                  Subscribe
                </button>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-[#1169a9] mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['Home Cleaning', 'Eco-Friendly', 'Tips', 'Commercial', 'Carpet', 'Windows', 'Deep Clean', 'Organization'].map((tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-xs font-medium hover:bg-[#1169a9] hover:text-white transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
            Need Professional Cleaning Help?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let our experts handle your cleaning needs while you focus on what matters most
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

export default Blog;
