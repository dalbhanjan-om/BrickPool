import React, { useState, useEffect } from 'react'
import { Home, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const languageContent = {
  en: {
    headline: 'Group Up. Drive Demand. Save on Your Dream Home.',
    subtext: 'With BrickPool, buyers unite to get the best builder quotes — at prices lower than the market.'
  },
  hi: {
    headline: 'अब बिल्डर आपसे डील करने के लिए लाइन में हैं।',
    subtext: 'अपनी पसंद बताएं, ब्रिकपूल पर बाकी खरीदारों से जुड़ें और सस्ते में घर पाएं।'
  },
  mr: {
    headline: 'आता बिल्डर तुमच्यासाठी स्पर्धा करतील.',
    subtext: 'तुमच्या गरजा सांगा, BrickPool वर इतर खरेदीदारांमध्ये सामील व्हा आणि घर स्वस्तात घ्या.'
  }
}

const Navbar = () => {
  const navigate = useNavigate()
  const [language, setLanguage] = useState(() => {
    return window.brickpoolLanguage || null
  })
  const [showLanguageModal, setShowLanguageModal] = useState(!window.brickpoolLanguage)

  useEffect(() => {
    if (language) {
      window.brickpoolLanguage = language
      setShowLanguageModal(false)
    }
  }, [language])

  const LanguageModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center border border-gray-100">
        <div className="mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg mx-auto w-fit mb-4">
            <Home className="text-white w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Choose Your Language</h2>
          <p className="text-sm text-gray-600">भाषा निवडा / भाषा चुनें</p>
        </div>
        <div className="space-y-3">
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            onClick={() => setLanguage('hi')}
          >
            हिंदी
          </button>
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            onClick={() => setLanguage('mr')}
          >
            मराठी
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {showLanguageModal && <LanguageModal />}

      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 p-3 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <Home className="text-white w-7 h-7" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse shadow-md">
                  <Sparkles className="w-2 h-2 text-white absolute top-1 left-1" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  BrickPool
                </h1>
                <div className="hidden sm:block">
                  <div className="h-0.5 w-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1"></div>
                </div>
              </div>
            </div>

            {/* Headline */}
            {language && (
              <div className="hidden lg:flex flex-1 justify-center px-8">
                <div className="text-center max-w-3xl p-4 rounded-xl bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 shadow-inner border border-blue-100">
                  <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-sm tracking-wide mb-3 animate-fade-in">
                    {languageContent[language].headline}
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    {languageContent[language].subtext}
                  </p>
                </div>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 flex-shrink-0 ml-auto lg:ml-0">
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 font-medium shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Headline */}
      {language && (
        <div className="block lg:hidden w-full bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100 shadow-sm">
          <div className="px-5 py-6 text-center">
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-sm mb-2 animate-fade-in">
              {languageContent[language].headline}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              {languageContent[language].subtext}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
