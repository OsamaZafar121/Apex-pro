import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={counterRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const stats = [
    { number: 10, suffix: '+', label: 'Years Experience', icon: '🏆' },
    { number: 5000, suffix: '+', label: 'Happy Clients', icon: '😊' },
    { number: 50, suffix: '+', label: 'Professional Staff', icon: '👥' },
    { number: 100, suffix: '%', label: 'Satisfaction Guaranteed', icon: '⭐' },
    { number: 15000, suffix: '+', label: 'Cleanings Completed', icon: '✨' },
    { number: 24, suffix: '/7', label: 'Support Available', icon: '📞' },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-white font-semibold text-sm uppercase tracking-wider bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-4">Our Stats</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Trusted by thousands of homes and businesses across the region
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 w-auto lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl min-w-[180px]"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-xs text-white/90 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
