const PartnersSection = () => {
  const partners = [
    { name: 'Company 1', logo: '🏢' },
    { name: 'Company 2', logo: '🏪' },
    { name: 'Company 3', logo: '🏨' },
    { name: 'Company 4', logo: '🏬' },
    { name: 'Company 5', logo: '🏭' },
    { name: 'Company 6', logo: '🏛️' },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-gray-500 font-medium">Trusted by leading companies</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-24 mx-8 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span className="text-5xl grayscale hover:grayscale-0 transition-all duration-300">
                  {partner.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
