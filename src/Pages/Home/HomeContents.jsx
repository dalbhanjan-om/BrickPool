import React, { useState } from 'react';
import {
  Search, Users, Building, TrendingUp, Shield, Zap, Star,
  ArrowRight, MapPin, DollarSign, Award, CheckCircle,
  Home, UserCheck, Handshake
} from 'lucide-react';

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const stats = [
    { number: '50K+', label: 'Active Properties', icon: Home },
    { number: '12K+', label: 'Verified Brokers', icon: Users },
    { number: '800+', label: 'Builder Partners', icon: Building },
    { number: '₹2.5Cr', label: 'Monthly Referrals', icon: DollarSign }
  ];

  const userTypes = [
    {
      type: 'Property Buyers',
      description: 'Find your dream property with verified listings and expert guidance',
      features: ['Advanced Search Filters', 'Virtual Tours', 'Price Analytics', 'Broker Matching'],
      color: 'bg-blue-50 border-blue-200',
      icon: Search
    },
    {
      type: 'Real Estate Brokers',
      description: 'Expand your network and earn through our referral system',
      features: ['Lead Generation', 'Client Management', 'Commission Tracking', 'Buyer Network'],
      color: 'bg-teal-50 border-teal-200',
      icon: Users
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Property Buyer',
      content: 'Found my dream apartment in Mumbai within 2 weeks. The broker matching was perfect!',
      rating: 5,
      location: 'Mumbai'
    },
    {
      name: 'Priya Sharma',
      role: 'Real Estate Broker',
      content: 'Increased my monthly earnings by 40% through BrickPool referrals.',
      rating: 5,
      location: 'Delhi'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Stats Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-teal-400" />
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Buyers & Brokers
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're buying or brokering, we have the right tools for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {userTypes.map((user, index) => {
              const Icon = user.icon;
              return (
                <div key={index} className={`${user.color} rounded-2xl p-10 border-2 shadow-md hover:shadow-xl transition-shadow duration-300 group relative overflow-hidden`}> 
                  <div className="absolute -top-8 -right-8 opacity-10 text-9xl pointer-events-none select-none group-hover:opacity-20 transition-opacity duration-300">
                    <Icon className="w-32 h-32" />
                  </div>
                  <Icon className="h-14 w-14 text-blue-500 mb-6 z-10 relative" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 z-10 relative">{user.type}</h3>
                  <p className="text-gray-600 mb-6 z-10 relative">{user.description}</p>
                  <ul className="space-y-3 mb-8 z-10 relative">
                    {user.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow group-hover:scale-105 group-hover:shadow-lg">
                    Get Started
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BrickPool?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced technology meets personalized service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Matching</h3>
              <p className="text-gray-600">
                AI-powered algorithms match buyers with the perfect properties and brokers based on preferences and requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Network</h3>
              <p className="text-gray-600">
                All brokers and builders are thoroughly verified to ensure authentic and reliable partnerships.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Commissions</h3>
              <p className="text-gray-600">
                Clear commission structure with real-time tracking and guaranteed payouts for all successful referrals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our satisfied buyers and brokers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-10 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role} • {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Real Estate Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful buyers and brokers on BrickPool today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-colors duration-200 shadow">
              Start as Buyer
            </button>
            <button className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors duration-200 shadow">
              Join as Broker
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-2 rounded-lg mr-3">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">BrickPool</h3>
                  <p className="text-gray-400 text-sm">Connecting Real Estate Dreams</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                India’s most trusted platform for property buyers, brokers, and builders. 
                Enabling real estate success through connections that matter.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BrickPool. All rights reserved. | Made with ❤️ for Indian Real Estate</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
