import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield, ArrowRight, Hash, AlertCircle, CheckCircle, Eye, EyeOff, Smartphone, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contact: '',
    contactType: 'email',
    role: 'Buyer',
    verificationCode: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Timer effect for resend code
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    // Accept phones between 10-15 digits (international format)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const validateContact = (contact) => {
    if (!contact.trim()) {
      return 'Contact information is required';
    }
    
    const isPhone = /[\d\-\(\)\+\s]/.test(contact) && contact.replace(/\D/g, '').length >= 10;
    
    if (isPhone) {
      if (!validatePhone(contact)) {
        return 'Please enter a valid phone number (10-15 digits)';
      }
    } else {
      if (!validateEmail(contact)) {
        return 'Please enter a valid email address';
      }
    }
    
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    let processedValue = value;

    if (name === 'contact') {
      // Auto-detect and format contact type
      const isPhone = /[\d\-\(\)\+\s]/.test(value) && value.replace(/\D/g, '').length >= 3;
      
      if (isPhone) {
        processedValue = formatPhoneNumber(value);
        setFormData(prev => ({ ...prev, contactType: 'phone' }));
      } else {
        setFormData(prev => ({ ...prev, contactType: 'email' }));
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleVerify = async () => {
    const contactError = validateContact(formData.contact);
    
    if (contactError) {
      setErrors({ contact: contactError });
      return;
    }

    setErrors({});
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
      setResendTimer(60); // 60 second cooldown
      setAttempts(0);
    }, 2000);
  };

  const handleLogin = async () => {
    if (formData.verificationCode.length !== 4) {
      setErrors({ verificationCode: 'Please enter a 4-digit verification code' });
      return;
    }

    setErrors({});
    setIsLogging(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsLogging(false);
      
      // Simulate wrong code (for demo - remove in production)
      if (formData.verificationCode === '0000' && attempts < 2) {
        setAttempts(prev => prev + 1);
        setErrors({ verificationCode: 'Invalid verification code. Please try again.' });
        setFormData(prev => ({ ...prev, verificationCode: '' }));
        return;
      }
      
      // Success animation
      setFormData(prev => ({ ...prev, verificationCode: '✓✓✓✓' }));
      setTimeout(() => {
        // Navigate to dashboard after successful verification
        console.log(`Login successful - Role: ${formData.role}, Contact: ${formData.contact}`);
        navigate('/dashboard');
      }, 500);
    }, 1500);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setResendTimer(60);
      setErrors({});
      setFormData(prev => ({ ...prev, verificationCode: '' }));
    }, 1500);
  };

  const handleRegisterRedirect = () => {
    navigate('/Register');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      contact: '',
      contactType: 'email',
      role: 'Buyer',
      verificationCode: ''
    });
    setErrors({});
    setResendTimer(0);
    setAttempts(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {step === 1 ? 'Sign in to your account' : 'Enter verification code'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Contact Input */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    {formData.contactType === 'email' ? (
                      <Mail className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Phone className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder={formData.contactType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      errors.contact 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                  />
                  {formData.contact && !errors.contact && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.contact && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fadeIn">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.contact}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {formData.contactType === 'email' ? 'We\'ll send a verification code to your email' : 'We\'ll send a verification code via SMS'}
                </p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Select Your Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 focus:border-blue-500 appearance-none bg-white/50 backdrop-blur-sm hover:border-gray-300 transition-all duration-200 cursor-pointer text-gray-900 text-sm sm:text-base"
                    style={{ 
                      backgroundImage: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <option value="Buyer" className="bg-white py-2 px-2 text-sm sm:text-base">🏠 Property Buyer</option>
                    <option value="Broker" className="bg-white py-2 px-2 text-sm sm:text-base">🤝 Real Estate Broker</option>
                    <option value="Builder" className="bg-white py-2 px-2 text-sm sm:text-base">🏗️ Property Builder</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {/* Mobile-specific styling */}
                <style jsx>{`
                  @media (max-width: 640px) {
                    select {
                      font-size: 16px !important; /* Prevents zoom on iOS */
                      line-height: 1.4;
                    }
                    option {
                      padding: 12px 8px !important;
                      font-size: 14px !important;
                    }
                  }
                `}</style>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={!formData.contact.trim() || isVerifying || errors.contact}
                className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Send Verification Code</span>
                  </>
                )}
              </button>

              {/* Register Button */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white/80 text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={handleRegisterRedirect}
                className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] bg-white/70 border-2 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-gray-300"
              >
                <UserPlus className="w-5 h-5" />
                <span>Don't have an account? Sign up</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Verification Success Message */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                  {formData.contactType === 'email' ? (
                    <Mail className="w-8 h-8 text-white" />
                  ) : (
                    <Smartphone className="w-8 h-8 text-white" />
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  Verification code sent {formData.contactType === 'email' ? 'to' : 'via SMS to'}
                </p>
                <p className="font-semibold text-lg text-gray-900 break-all">
                  {formData.contact}
                </p>
              </div>

              {/* User Info Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Selected Role:</p>
                    <p className="font-bold text-xl text-gray-900">
                      {formData.role === 'Buyer' && '🏠 '}{formData.role === 'Broker' && '🤝 '}{formData.role === 'Builder' && '🏗️ '}
                      {formData.role}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Verification Code Input */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Enter 4-Digit Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Hash className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setFormData(prev => ({ ...prev, verificationCode: value }));
                      if (errors.verificationCode) {
                        setErrors(prev => ({ ...prev, verificationCode: '' }));
                      }
                    }}
                    placeholder="••••"
                    maxLength="4"
                    className={`w-full pl-14 pr-14 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-center text-3xl font-mono tracking-[0.5em] bg-white/50 backdrop-blur-sm ${
                      errors.verificationCode
                        ? 'border-red-300 focus:border-red-500'
                        : formData.verificationCode.length === 4
                        ? 'border-green-300 focus:border-green-500'
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  {formData.verificationCode.length === 4 && !errors.verificationCode && (
                    <div className="absolute inset-y-0 right-10 pr-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.verificationCode && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fadeIn">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.verificationCode}
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    Code expires in 5 minutes
                  </p>
                  {attempts > 0 && (
                    <p className="text-xs text-orange-600">
                      {3 - attempts} attempts remaining
                    </p>
                  )}
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={formData.verificationCode.length !== 4 || isLogging}
                className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isLogging ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    <span>Login to {formData.role} Dashboard</span>
                  </>
                )}
              </button>

              {/* Resend Code */}
              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0 || isVerifying}
                  className="text-sm transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed text-blue-600 hover:text-blue-700"
                >
                  {isVerifying 
                    ? 'Sending...' 
                    : resendTimer > 0 
                    ? `Resend code in ${resendTimer}s`
                    : "Didn't receive code? Resend"
                  }
                </button>
              </div>

              {/* Back Button */}
              <button
                onClick={resetForm}
                className="w-full py-3 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
              >
                ← Back to login form
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            🔒 Secure login powered by modern authentication
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Your privacy and security are our top priorities
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;