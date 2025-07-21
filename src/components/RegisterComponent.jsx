import React, { useState } from 'react';
import { ChevronRight, Phone, Mail, User, Building, UserCheck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: ''
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'buyer', label: 'Buyer', icon: User },
    { value: 'broker', label: 'Broker', icon: Building }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.role) newErrors.role = 'Please select a role';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setErrors(prev => ({ ...prev, otp: 'Please enter OTP' }));
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      if (otp === '123456') { // Mock verification
        setOtpVerified(true);
        setErrors(prev => ({ ...prev, otp: '' }));
      } else {
        setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleNext = () => {
    if (otpVerified) {
      navigate('/questions');
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '').slice(0, 10);
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength <= 5) return phoneNumber;
    if (phoneNumberLength <= 10) {
      return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;
    }
    return phoneNumber;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
            Create Account
          </h1>
          <p className="text-gray-600">
            Join our platform to get started
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 border" style={{ borderColor: '#E5E7EB' }}>
          {!otpSent ? (
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors"
                    style={{ 
                      borderColor: errors.name ? '#EF4444' : '#E5E7EB',
                      focusRingColor: '#4A90E2'
                    }}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-700 text-base z-10">
                    <span className="mr-1">🇮🇳</span>+91
                  </span>
                  <input
                    type="tel"
                    value={formatPhoneNumber(formData.phone)}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="98765 43210"
                    className="w-full pl-20 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors"
                    style={{ 
                      borderColor: errors.phone ? '#EF4444' : '#E5E7EB',
                      focusRingColor: '#4A90E2'
                    }}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors"
                    style={{ 
                      borderColor: errors.email ? '#EF4444' : '#E5E7EB',
                      focusRingColor: '#4A90E2'
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#1A1A1A' }}>
                  I am a
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <label
                        key={role.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.role === role.value 
                            ? 'ring-2' 
                            : 'hover:bg-gray-50'
                        }`}
                        style={{
                          borderColor: formData.role === role.value ? '#4A90E2' : '#E5E7EB',
                          ringColor: formData.role === role.value ? '#4A90E2' : 'transparent',
                          backgroundColor: formData.role === role.value ? '#EFF6FF' : 'white'
                        }}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={formData.role === role.value}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="sr-only"
                        />
                        <IconComponent className="h-5 w-5 mr-3" style={{ color: '#4A90E2' }} />
                        <span className="font-medium" style={{ color: '#1A1A1A' }}>
                          {role.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>

              {/* Send OTP Button */}
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg font-medium text-white transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#4A90E2',
                  focusRingColor: '#4A90E2'
                }}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* OTP Verification */}
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#EFF6FF' }}>
                  <Phone className="h-8 w-8" style={{ color: '#4A90E2' }} />
                </div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                  Verify Your Phone
                </h2>
                <p className="text-gray-600 text-sm">
                  We've sent a verification code to<br />
                  <span className="font-medium">{formatPhoneNumber(formData.phone)}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }));
                  }}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors text-center text-lg font-mono"
                  style={{ 
                    borderColor: errors.otp ? '#EF4444' : '#E5E7EB',
                    focusRingColor: '#4A90E2'
                  }}
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Demo: Use "123456" as verification code
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp('');
                    setOtpVerified(false);
                    setErrors({});
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-medium border transition-colors"
                  style={{ 
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A'
                  }}
                >
                  Back
                </button>
                {!otpVerified ? (
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading || !otp.trim()}
                    className="flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#4A90E2' }}
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#50E3C2' }}
                  >
                    <Check className="h-4 w-4" />
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {otpVerified && (
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#F0FDF4' }}>
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">Phone number verified successfully!</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium hover:underline" style={{ color: '#4A90E2' }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;