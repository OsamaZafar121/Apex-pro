const WaveDivider = ({ variant = 'bottom', color = 'white' }) => {
  const wavePaths = {
    bottom: (
      <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill={color}/>
    ),
    top: (
      <path d="M0 0L60 15C120 30 240 60 360 75C480 90 600 90 720 82.5C840 75 960 60 1080 52.5C1200 45 1320 45 1380 45L1440 45V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill={color}/>
    ),
    waves: (
      <>
        <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill={color} opacity="0.5"/>
        <path d="M0 80L60 75C120 70 240 60 360 55C480 50 600 50 720 52.5C840 55 960 60 1080 62.5C1200 65 1320 65 1380 65L1440 65V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill={color}/>
      </>
    ),
    curve: (
      <path d="M0 60C120 40 240 20 360 30C480 40 600 80 720 90C840 100 960 80 1080 60C1200 40 1320 20 1440 30V120H0V60Z" fill={color}/>
    ),
  };

  return (
    <div className={`absolute ${variant === 'top' ? '-top-20' : '-bottom-20'} left-0 right-0 overflow-hidden leading-none`}>
      <svg 
        viewBox="0 0 1440 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-20"
        preserveAspectRatio="none"
      >
        {wavePaths[variant] || wavePaths.bottom}
      </svg>
    </div>
  );
};

export default WaveDivider;
