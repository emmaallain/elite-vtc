import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BookingPage } from './pages/BookingPage'
import { ContactPage } from './pages/ContactPage'
import { DriversPage } from './pages/DriversPage'
import { HomePage } from './pages/HomePage'
import { ServicesAndPricingPage } from './pages/ServicesAndPricingPage'
import { QuotePage } from './pages/QuotePage'
import { VehiclesPage } from './pages/VehiclesPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chauffeurs" element={<DriversPage />} />
        <Route path="/vehicules" element={<VehiclesPage />} />
        <Route path="/services" element={<ServicesAndPricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reservation" element={<BookingPage />} />
        <Route path="/devis" element={<QuotePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
