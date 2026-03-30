import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import HotelDetail from './pages/HotelDetail'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/admin/Dashboard'
import HotelManagement from './pages/admin/HotelManagement'
import RoomManagement from './pages/admin/RoomManagement'
import BookingManagement from './pages/admin/BookingManagement'
import UserManagement from './pages/admin/UserManagement'
import { useTheme } from './context/ThemeContext'

function App() {
  const { darkMode } = useTheme()

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/booking/:roomId" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-bookings" element={
            <ProtectedRoute><MyBookings /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>
          } />
          <Route path="/admin/hotels" element={
            <ProtectedRoute adminOnly><HotelManagement /></ProtectedRoute>
          } />
          <Route path="/admin/rooms" element={
            <ProtectedRoute adminOnly><RoomManagement /></ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute adminOnly><BookingManagement /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
