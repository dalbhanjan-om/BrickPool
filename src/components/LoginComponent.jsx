import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  ArrowRight,
  Hash,
  CheckCircle,
  Eye,
  EyeOff,
  Smartphone,
  UserPlus,
} from 'lucide-react';
import flag from '../assets/IndianFlag.png';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contact: '',
    contactType: 'phone',
    role: 'Buyer',
    verificationCode: '',
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'contact') {
      const hasDigits = /\d/.test(value);
      const hasAtSymbol = /@/.test(value);

      if (hasDigits && !hasAtSymbol) {
        processedValue = formatPhoneNumber(value);
        setFormData((prev) => ({ ...prev, contactType: 'phone' }));
      } else if (hasAtSymbol) {
        setFormData((prev) => ({ ...prev, contactType: 'email' }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleVerify = async () => {
    if (!formData.contact.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
      setResendTimer(60);
      setAttempts(0);
    }, 2000);
  };

  const handleLogin = async () => {
    if (formData.verificationCode.length !== 4) return;

    setIsLogging(true);
    setTimeout(() => {
      setIsLogging(false);
      if (formData.verificationCode === '0000' && attempts < 2) {
        setAttempts((prev) => prev + 1);
        setFormData((prev) => ({ ...prev, verificationCode: '' }));
        return;
      }
      setFormData((prev) => ({ ...prev, verificationCode: '✓✓✓✓' }));
      setTimeout(() => {
        console.log(`Login successful - Role: ${formData.role}, Contact: ${formData.contact}`);
      }, 500);
    }, 1500);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setResendTimer(60);
      setFormData((prev) => ({ ...prev, verificationCode: '' }));
    }, 1500);
  };

  const handleRegisterRedirect = () => {
    console.log('Navigate to Register');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      contact: '',
      contactType: 'phone',
      role: 'Buyer',
      verificationCode: '',
    });
    setResendTimer(0);
    setAttempts(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-md border border-[#E5E7EB]">
          <div className="text-center mb-6">
            <Shield className="w-10 h-10 text-[#4A90E2] mx-auto mb-3" />
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">{step === 1 ? 'Sign In' : 'Verify Code'}</h2>
            <p className="text-sm text-[#4A4A4A]">
              {step === 1 ? 'Secure login to your account' : 'Enter the 4-digit code sent to your contact'}
            </p>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Email or Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {formData.contactType === 'email' ? (
                      <Mail className="w-5 h-5 text-gray-400" />
                    ) : (
                      <div className="flex items-center space-x-1">
                        <img src={flag} alt="India Flag" className="w-5 h-5 object-cover rounded-sm" />
                        <span className="text-sm text-[#1A1A1A]">+91</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder={formData.contactType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    className={`w-full ${formData.contactType === 'phone' ? 'pl-20' : 'pl-10'} pr-10 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Select Your Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                >
                  <option value="Buyer">Property Buyer</option>
                  <option value="Broker">Real Estate Broker</option>
                </select>
              </div>

              <button
                onClick={handleVerify}
                disabled={!formData.contact.trim() || isVerifying}
                className="w-full bg-[#4A90E2] text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {isVerifying ? 'Sending Code...' : 'Send Verification Code'}
              </button>

              <button
                onClick={()=>navigate('/register')}
                className="w-full border border-[#E5E7EB] py-2 rounded-lg text-[#1A1A1A] hover:bg-gray-100"
              >
                <UserPlus className="inline-block mr-2" /> Don't have an account? Sign up
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">4-Digit Verification Code</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setFormData((prev) => ({ ...prev, verificationCode: value }));
                    }}
                    placeholder="••••"
                    maxLength="4"
                    className="w-full text-center text-lg tracking-widest px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <button
                onClick={()=>Navigate('/dashboard')}
                disabled={formData.verificationCode.length !== 4 || isLogging}
                className="w-full bg-[#50E3C2] text-white py-2 rounded-lg hover:bg-teal-500 transition"
              >
                {isLogging ? 'Verifying...' : `Login to ${formData.role} Dashboard`}
              </button>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Code expires in 5 minutes</span>
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0 || isVerifying}
                  className="text-[#4A90E2] disabled:text-gray-400"
                >
                  {isVerifying
                    ? 'Sending...'
                    : resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : 'Resend Code'}
                </button>
              </div>

              <button
                onClick={resetForm}
                className="w-full text-sm text-[#4A90E2] hover:underline"
              >
                ← Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
