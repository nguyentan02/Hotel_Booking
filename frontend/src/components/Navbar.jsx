import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHotel, FaUser, FaBars, FaTimes, FaMoon, FaSun, FaSignOutAlt, FaCalendarAlt, FaCog } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropdownOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <FaHotel /> StayBooker
        </Link>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
          <Link to="/search" onClick={() => setMenuOpen(false)}>Tìm kiếm</Link>
          {user && (
            <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>
              <FaCalendarAlt /> Đặt phòng của tôi
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              <FaCog /> Quản trị
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleDarkMode} title="Đổi giao diện">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <div className="user-menu">
              <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaUser /> {user.name}
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>Tài khoản</Link>
                  <Link to="/my-bookings" onClick={() => setDropdownOpen(false)}>Đặt phòng</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setDropdownOpen(false)}>Quản trị</Link>
                  )}
                  <button onClick={handleLogout}><FaSignOutAlt /> Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-secondary btn-sm">Đăng nhập</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Đăng ký</Link>
            </div>
          )}

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  )
}
