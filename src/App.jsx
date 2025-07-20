import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home/Home'  
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import HouseBuyingQuestions from './components/HouseBuyingQuestions'
import { Dashboard } from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />  
        <Route path='/Login' element={<LoginComponent />} />
        <Route path='/Register' element={<RegisterComponent />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/house-buying-questions' element={<HouseBuyingQuestions />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
