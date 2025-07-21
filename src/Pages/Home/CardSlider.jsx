import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const cards = [
    {
      heading: "Buyer Benefits",
      type: "buyer",
      subtitle: "Group Up. Drive Demand. Save on Your Dream Home.",
      description: "With BrickPool, buyers unite to get the best builder quotes — at prices lower than the market.",
      color: "bg-purple-50",
      accentColor: "purple-600",
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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cards.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);

  const currentCard = cards[currentSlide];

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-white">
      {/* Header Section */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className={`text-2xl sm:text-4xl font-bold text-${currentCard.accentColor} mb-2 sm:mb-4`}>
          {currentCard.heading}
        </h1>
        <h2 className="text-lg sm:text-xl text-gray-800 font-semibold mb-1 sm:mb-2">
          {currentCard.subtitle}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          {currentCard.description}
        </p>
      </div>

      {/* Benefits Container */}
      <div className={`${currentCard.color} rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative`}>
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {currentCard.advantages.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-100">
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

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md border border-gray-200 hover:shadow-lg"
        >
          <ChevronLeft className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md border border-gray-200 hover:shadow-lg"
        >
          <ChevronRight className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-center items-center space-x-4 sm:space-x-6 mt-4 sm:mt-8">
        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index 
                  ? `bg-${currentCard.accentColor}` 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <button className={`bg-${currentCard.accentColor} text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:opacity-90 text-sm sm:text-base`}>
          {currentCard.type === 'buyer' ? 'Join Pool' : 'Become Broker'}
        </button>
      </div>
    </div>
  );
};

export default CardSlider;