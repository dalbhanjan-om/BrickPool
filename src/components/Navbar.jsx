import React, { useState } from 'react'
import {
  Menu,
  X,
  Home,
  Users,
  Building,
  Search,
  UserCheck,
  ChevronDown,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Buyer')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
  const userTypes = ['Buyer', 'Broker', 'Builder']

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation Bar */}
        <div className="flex justify-between items-center py-4">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <Home className="text-white w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BrickPool
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Buyers • Brokers • Builders
              </p>
            </div>
          </div>



          {/* Enhanced User Type Selection - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <span className="text-sm font-medium text-gray-600">
              I'm looking as a:
            </span>
            <div className="flex items-center space-x-4">
              {userTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === type
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md border border-gray-200'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeTab === type
                        ? 'bg-white'
                        : type === 'Buyer'
                        ? 'bg-emerald-400'
                        : type === 'Broker'
                        ? 'bg-blue-400'
                        : 'bg-purple-400'
                    }`}
                  />
                  <span className="text-sm font-medium">{type}</span>
                  {activeTab === type && (
                    <ChevronDown className="w-3 h-3 animate-bounce" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button onClick={()=>navigate('/Login')} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all duration-200 font-medium">
              Login
            </button>
            <button onClick={()=>navigate('/Register')} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
              Register
            </button>
          </div>

          {/* Enhanced Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="space-y-4">
              {/* Mobile User Type Selection */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-3">I'm looking as a:</p>
                <div className="flex flex-col space-y-2">
                  {userTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveTab(type)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === type
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activeTab === type
                            ? 'bg-white'
                            : type === 'Buyer'
                            ? 'bg-emerald-400'
                            : type === 'Broker'
                            ? 'bg-blue-400'
                            : 'bg-purple-400'
                        }`}
                      />
                      <span className="font-medium">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-3">
                  <button onClick={()=>navigate('/Login')} className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-400 hover:text-blue-600 font-medium">
                    Login
                  </button>
                  <button onClick={()=>navigate('/Register')} className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar