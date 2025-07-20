import React, { useState } from 'react';
import { Home, DollarSign, Users, Sofa, MapPin, Calendar, Car, Wifi } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HouseBuyingQuestions = () => {
  const [formData, setFormData] = useState({
    area: '',
    budget: '',
    familyMembers: '',
    furnished: '',
    propertyType: '',
    timeline: '',
    parking: '',
    amenities: []
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-white px-6 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Find Your Perfect Home</h1>
                <p className="text-gray-600 mt-1">Tell us about your preferences to get personalized recommendations</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Preferred Area */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Preferred Area/Location</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Bandra, Koramangala, Gurgaon, Near Metro Station"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <DollarSign className="w-4 h-4 text-blue-500" />
                <span>Budget Range</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              >
                <option value="">Select your budget range</option>
                <option value="under-10l">Under ₹10 Lakh</option>
                <option value="10l-25l">₹10 Lakh - ₹25 Lakh</option>
                <option value="25l-50l">₹25 Lakh - ₹50 Lakh</option>
                <option value="50l-75l">₹50 Lakh - ₹75 Lakh</option>
                <option value="75l-1cr">₹75 Lakh - ₹1 Crore</option>
                <option value="1cr-2cr">₹1 Crore - ₹2 Crore</option>
                <option value="2cr-5cr">₹2 Crore - ₹5 Crore</option>
                <option value="above-5cr">Above ₹5 Crore</option>
              </select>
            </div>

            {/* Family Members */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Number of Family Members</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                value={formData.familyMembers}
                onChange={(e) => handleInputChange('familyMembers', e.target.value)}
              >
                <option value="">Select family size</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6+">6+ People</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <Home className="w-4 h-4 text-blue-500" />
                <span>Property Type</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['2 BHK Apartment', '3 BHK Apartment', 'Villa/Bungalow', 'Independent House'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('propertyType', type)}
                    className={`p-3 rounded-md border text-sm font-medium transition-colors ${
                      formData.propertyType === type
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnished */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <Sofa className="w-4 h-4 text-blue-500" />
                <span>Furnished Preference</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Fully Furnished', 'Semi Furnished', 'Unfurnished'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInputChange('furnished', option)}
                    className={`p-3 rounded-md border text-sm font-medium transition-colors ${
                      formData.furnished === option
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>When are you looking to buy?</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              >
                <option value="">Select timeline</option>
                <option value="immediately">Within 1 month</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-12-months">6-12 months</option>
                <option value="more-than-year">More than a year</option>
              </select>
            </div>

            {/* Parking */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <Car className="w-4 h-4 text-blue-500" />
                <span>Parking Required</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['No Parking', '1 Space', '2+ Spaces'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInputChange('parking', option)}
                    className={`p-3 rounded-md border text-sm font-medium transition-colors ${
                      formData.parking === option
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                <Wifi className="w-4 h-4 text-blue-500" />
                <span>Desired Amenities (Select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Swimming Pool', 'Gym/Club House', '24/7 Security', 'Power Backup',
                  'Lift/Elevator', 'Car Parking', 'Children Play Area', 'CCTV Surveillance'
                ].map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={()=>navigate('/dashboard')}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Continue to view personalized property recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseBuyingQuestions;