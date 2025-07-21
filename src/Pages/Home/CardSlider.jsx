import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Users, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardSlider = () => {
  const navigate= useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const autoSlideRef = useRef(null);
  const minSwipeDistance = 50;
  const autoSlideInterval = 5000; // 5 seconds

  const cards = [
    {
      heading: "Buyer Benefits",
      type: "buyer",
      subtitle: "Group Up. Drive Demand. Save on Your Dream Home.",
      description: "With BrickPool, buyers unite to get the best builder quotes — at prices lower than the market.",
      color: "bg-purple-50",
      accentColor: "purple-600",
      ctaText: "Join Pool",
      ctaIcon: Users,
      advantages: [
        { icon: "💰", title: "Group Discounts", description: "Save up to 15% by joining group purchases with other buyers." },
        { icon: "📍", title: "Local Pools", description: "Connect with buyers in your area for convenient coordination." },
        { icon: "🛡️", title: "Verified Builders", description: "All projects are thoroughly vetted and verified for quality." },
        { icon: "⚡", title: "Priority Access", description: "Get early access to new projects and premium locations." },
        { icon: "🤝", title: "Negotiation Power", description: "Leverage collective bargaining for better terms and prices." },
        { icon: "📊", title: "Market Insights", description: "Access detailed market reports and property analytics." },
        { icon: "🔒", title: "Secure Transactions", description: "Protected payments with escrow and legal documentation." },
        { icon: "🎯", title: "Personalized Matching", description: "AI-powered recommendations based on your preferences." },
      ]
    },
    {
      heading: "Broker Benefits",
      type: "broker",
      subtitle: "Maximize your earnings and grow your business",
      description: "Join our network of successful brokers and unlock new revenue opportunities.",
      color: "bg-green-50",
      accentColor: "green-600",
      ctaText: "Become Broker",
      ctaIcon: Briefcase,
      advantages: [
        { icon: "💼", title: "High Commissions", description: "Earn competitive commissions on every successful group deal." },
        { icon: "🎁", title: "Milestone Rewards", description: "Unlock bonus payments as you hit quarterly targets." },
        { icon: "🚀", title: "Instant Payouts", description: "Receive payments within 24 hours of deal completion." },
        { icon: "📈", title: "Performance Analytics", description: "Track your sales metrics and optimize your strategies." },
        { icon: "🌐", title: "Lead Generation", description: "Access our pool of qualified, ready-to-buy customers." },
        { icon: "🎓", title: "Training & Support", description: "Comprehensive training programs and ongoing support." },
        { icon: "📱", title: "Mobile CRM", description: "Manage clients and deals on-the-go with our mobile app." },
        { icon: "🏆", title: "Recognition Program", description: "Top performers get featured and additional incentives." },
      ]
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % cards.length);
      }, autoSlideInterval);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isPaused, cards.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume auto-slide after 3 seconds
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume auto-slide after 3 seconds
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume auto-slide after 3 seconds
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    } else {
      setTimeout(() => setIsPaused(false), 1000);
    }
  };

  const handleCTAClick = () => {
    // Simulate navigation - in real app would use navigate('/register')
    console.log(`Navigating to register as ${currentCard.type}`);
    alert(`Redirecting to ${currentCard.type} registration...`);
  };

  const currentCard = cards[currentSlide];
  const CtaIcon = currentCard.ctaIcon;

  // Add color class mappings for accent colors
  const accentColorMap = {
    'purple-600': 'bg-purple-600 focus:ring-purple-600',
    'green-600': 'bg-green-600 focus:ring-green-600',
  };
  const indicatorBgMap = {
    'purple-600': 'bg-purple-600',
    'green-600': 'bg-green-600',
  };
  const indicatorRingMap = {
    'purple-600': 'bg-purple-600',
    'green-600': 'bg-green-600',
  };
  const accentClass = accentColorMap[currentCard.accentColor] || 'bg-gray-600 focus:ring-gray-600';
  const indicatorBg = indicatorBgMap[currentCard.accentColor] || 'bg-gray-600';
  const indicatorRing = indicatorRingMap[currentCard.accentColor] || 'bg-gray-600';

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-white">
      {/* Header Section */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className={`text-2xl sm:text-4xl font-bold text-${currentCard.accentColor} mb-2 sm:mb-4 transition-colors duration-500`}>
          {currentCard.heading}
        </h1>
        <h2 className="text-lg sm:text-xl text-gray-800 font-semibold mb-1 sm:mb-2">
          {currentCard.subtitle}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          {currentCard.description}
        </p>
      </div>

      {/* Benefits Container with Swipe Support */}
      <div 
        className={`${currentCard.color} rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative transition-all duration-500 touch-pan-y`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Auto-slide progress bar */}
        <div className="absolute top-2 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-${currentCard.accentColor} transition-all duration-100 ${isPaused ? 'animate-pulse' : ''}`}
            style={{
              width: isPaused ? '100%' : '0%',
              animation: isPaused ? 'none' : `progress ${autoSlideInterval}ms linear infinite`
            }}
          />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-6">
          {currentCard.advantages.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto">
                <span className="text-xl sm:text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on small screens */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 items-center justify-center hover:scale-110"
        >
          <ChevronLeft className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 items-center justify-center hover:scale-110"
        >
          <ChevronRight className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Swipe Indicator for Mobile */}
        <div className="sm:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
          Swipe to explore
        </div>
      </div>

      {/* Bottom Section - CTA and Indicators */}
      <div className="flex flex-col items-center space-y-6 mt-6 sm:mt-8">
        {/* Slide Indicators */}
        <div className="flex space-x-3">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? `${indicatorBg} scale-125 shadow-lg` 
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentSlide === index && (
                <div className={`absolute inset-0 ${indicatorRing} rounded-full animate-ping opacity-30`} />
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Call to Action Button */}
        <div className="relative group">
          <button 
            onClick={()=>navigate('/register')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${accentClass} text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            <CtaIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{currentCard.ctaText}</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Additional info text */}
        <p className="text-gray-500 text-sm text-center max-w-md">
          {currentCard.type === 'buyer' 
            ? "Join thousands of smart buyers saving money together" 
            : "Start earning more with our proven broker network"
          }
        </p>
      </div>
    </div>
  );
};

export default CardSlider;