import { Link } from 'react-router-dom';

const PricingTables = () => {
  const plans = [
    {
      name: 'Basic Clean',
      price: '99',
      description: 'Perfect for regular maintenance cleaning',
      features: [
        'Dusting & Vacuuming',
        'Bathroom Cleaning',
        'Kitchen Surface Cleaning',
        'Floor Mopping',
        'Trash Removal',
        'Up to 2 Bedrooms',
      ],
      popular: false,
    },
    {
      name: 'Premium Clean',
      price: '179',
      description: 'Our most popular comprehensive cleaning package',
      features: [
        'Everything in Basic +',
        'Deep Carpet Cleaning',
        'Window Cleaning (Interior)',
        'Appliance Cleaning',
        'Baseboards & Door Frames',
        'Up to 4 Bedrooms',
        'Eco-Friendly Products',
      ],
      popular: true,
    },
    {
      name: 'Deep Clean',
      price: '299',
      description: 'Complete top-to-bottom deep cleaning',
      features: [
        'Everything in Premium +',
        'Inside Cabinets & Drawers',
        'Behind Furniture',
        'Light Fixtures Cleaning',
        'Wall Washing',
        'Unlimited Bedrooms',
        'Move In/Out Ready',
        'Same-Day Service',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect cleaning package for your needs. No hidden fees, just sparkling results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular ? 'ring-4 ring-[#F08A7F] scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#F08A7F] to-[#F08A7F] text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#1169a9] mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#1169a9]">${plan.price}</span>
                  <span className="text-gray-600">/session</span>
                </div>

                <Link
                  to="/contact"
                  className={`w-full block text-center py-4 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white hover:from-[#0f5a8f] hover:to-[#e07868] shadow-lg'
                      : 'bg-gray-100 text-[#1169a9] hover:bg-[#1169a9] hover:text-white'
                  }`}
                >
                  Book Now
                </Link>
              </div>

              <div className="border-t border-gray-100 p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                          plan.popular ? 'text-[#F08A7F]' : 'text-[#1169a9]'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom cleaning solution?</p>
          <Link
            to="/contact"
            className="inline-flex items-center text-[#1169a9] font-semibold hover:text-[#F08A7F] transition-colors"
          >
            Contact us for a personalized quote
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

export default PricingTables;
