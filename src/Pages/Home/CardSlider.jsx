import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Users, Briefcase, TrendingUp, Shield, Clock, Award, Sparkles } from 'lucide-react';

const BenefitsComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const autoSlideRef = useRef(null);
  const minSwipeDistance = 50;
  const autoSlideInterval = 4000; // 4 seconds

  const buyerBenefits = [
    { icon: TrendingUp, text: "Track how many buyers are joining your pool in real time." },
    { icon: Award, text: "Save 5–15% through exclusive group deals." },
    { icon: Users, text: "Get personalized quotes from top builders." },
    { icon: Clock, text: "Stay updated on every project milestone." },
    { icon: Shield, text: "Only verified and trusted builders are listed." },
    { icon: Briefcase, text: "Choose to buy directly or through your broker." },
    { icon: TrendingUp, text: "Compare multiple builder quotes before booking." },
  ];

  const brokerBenefits = [
    { icon: Award, text: "Earn commission on every confirmed booking." },
    { icon: TrendingUp, text: "Unlock bonuses by closing more deals." },
    { icon: Users, text: "Get featured on the top broker leaderboard." },
    { icon: Shield, text: "Access premium builder deals before others." },
    { icon: Clock, text: "Enjoy faster payouts with no delays." },
    { icon: Award, text: "Win rewards at 10, 25, and 50 deal milestones." },
    { icon: Briefcase, text: "Use free tools and training to close faster." }
  ];

  const slides = [
    {
      type: 'buyer',
      title: 'Buyer Benefits',
      benefits: buyerBenefits,
      gradient: 'from-blue-600 via-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
      accentColor: 'blue-600',
      ctaText: 'Join Pool',
      ctaIcon: Users
    },
    {
      type: 'broker',
      title: 'Broker Benefits',
      benefits: brokerBenefits,
      gradient: 'from-green-600 via-emerald-500 to-teal-600',
      bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
      accentColor: 'green-600',
      ctaText: 'Become Broker',
      ctaIcon: Briefcase
    }
  ];

  // Auto-slide functionality for mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && !isPaused) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, autoSlideInterval);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
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

  const currentSlideData = slides[currentSlide];
  const CtaIcon = currentSlideData.ctaIcon;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Large Screen Table Layout */}
      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Buyer Benefits Column */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-white/50 backdrop-blur-sm">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-row items-center gap-x-6 mb-8">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 group-hover:shadow-xl transition-all duration-300">
                  <Users className="w-10 h-10 text-white drop-shadow-sm" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                </div>
                <div className='flex flex-col justify-center items-start'>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 text-left">
                    Buyer Benefits
                  </h2>
                  <div className="flex items-center gap-2 text-blue-600/70">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Exclusive Advantages</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {buyerBenefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-blue-100/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <BenefitIcon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-200">
                          {benefit.text}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Users className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Join Pool</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Broker Benefits Column */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-8 shadow-xl border border-white/50 backdrop-blur-sm">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/30 to-green-200/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-row items-center gap-x-6 mb-8">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/25 group-hover:shadow-xl transition-all duration-300">
                  <Briefcase className="w-10 h-10 text-white drop-shadow-sm" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                </div>
                <div className='flex flex-col justify-center items-start'>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1 text-left">
                    Broker Benefits
                  </h2>
                  <div className="flex items-center gap-2 text-green-600/70">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Professional Rewards</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {brokerBenefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-green-100/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <BenefitIcon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-200">
                          {benefit.text}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Briefcase className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Become Broker</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small Screen Slider Layout */}
      <div className="lg:hidden">
        {/* Slide Header */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 transition-all duration-500 bg-gradient-to-r bg-clip-text text-transparent ${
            currentSlideData.type === 'buyer' ? 'from-blue-600 to-indigo-600' : 'from-green-600 to-emerald-600'
          }`}>
            {currentSlideData.title}
          </h2>
          <div className={`flex items-center justify-center gap-2 transition-all duration-500 ${
            currentSlideData.type === 'buyer' ? 'text-blue-600/70' : 'text-green-600/70'
          }`}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              {currentSlideData.type === 'buyer' ? 'Exclusive Advantages' : 'Professional Rewards'}
            </span>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          className={`relative overflow-hidden rounded-2xl p-6 shadow-xl border border-white/50 backdrop-blur-sm transition-all duration-500 bg-gradient-to-br ${currentSlideData.bgGradient}`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background decoration */}
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30 transition-all duration-500 ${
            currentSlideData.type === 'buyer' 
              ? 'bg-gradient-to-br from-blue-300 to-indigo-300' 
              : 'bg-gradient-to-br from-green-300 to-emerald-300'
          }`}></div>

          {/* Progress bar */}
          <div className="absolute top-3 left-6 right-6 h-1.5 bg-white/30 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-100 rounded-full shadow-sm ${
                currentSlideData.type === 'buyer' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
              } ${isPaused ? 'animate-pulse' : ''}`}
              style={{
                width: isPaused ? '100%' : '0%',
                animation: isPaused ? 'none' : `progress ${autoSlideInterval}ms linear infinite`
              }}
            />
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mt-6 relative z-10">
            {currentSlideData.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 active:scale-95">
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 bg-gradient-to-br ${
                      currentSlideData.type === 'buyer' 
                        ? 'from-blue-500 to-indigo-500' 
                        : 'from-green-500 to-emerald-500'
                    }`}>
                      <BenefitIcon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-200">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        
        </div>

        {/* Bottom Section - CTA and Indicators */}
        <div className="flex flex-col items-center space-y-6 mt-6">
          {/* Slide Indicators */}
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? (currentSlideData.type === 'buyer' 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 scale-125 shadow-lg shadow-blue-500/50' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 scale-125 shadow-lg shadow-green-500/50')
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentSlide === index && (
                  <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                    currentSlideData.type === 'buyer' 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`} />
                )}
              </button>
            ))}
          </div>

          {/* Call to Action Button */}
          <button className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-r ${
            currentSlideData.type === 'buyer' 
              ? 'from-blue-600 to-indigo-600 hover:shadow-blue-500/40' 
              : 'from-green-600 to-emerald-600 hover:shadow-green-500/40'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CtaIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10 text-base">{currentSlideData.ctaText}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Additional info text */}
          <p className="text-gray-500 text-sm text-center max-w-md leading-relaxed">
            {currentSlideData.type === 'buyer' 
              ? "Join thousands of smart buyers saving money together" 
              : "Start earning more with our proven broker network"
            }
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BenefitsComponent;