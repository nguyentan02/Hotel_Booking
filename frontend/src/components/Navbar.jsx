import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHotel, FaUser, FaBars, FaTimes, FaMoon, FaSun, FaSignOutAlt, FaCalendarAlt, FaCog, FaGlobe } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropdownOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <FaHotel className="brand-icon" />
          <span>StayBooker</span>
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
          <button className="nav-pill-btn" onClick={toggleDarkMode} title="Đổi giao diện">
            {darkMode ? <FaSun /> : <FaMoon />}
            <span className="pill-label">{darkMode ? 'Sáng' : 'Tối'}</span>
          </button>

          {user ? (
            <div className="user-menu" ref={dropdownRef}>
              <button className="nav-pill-btn user-pill" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaUser /> <span className="pill-label">{user.name}</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    <FaUser /> Tài khoản
                  </Link>
                  <Link to="/my-bookings" onClick={() => setDropdownOpen(false)}>
                    <FaCalendarAlt /> Đặt phòng
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setDropdownOpen(false)}>
                      <FaCog /> Quản trị
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout}><FaSignOutAlt /> Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="nav-pill-btn login-pill">
                <FaUser /> <span className="pill-label">Đăng nhập</span>
              </Link>
              <Link to="/register" className="nav-pill-btn register-pill">
                Đăng ký
              </Link>
            </div>
          )}

          <button className="nav-pill-btn menu-pill mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
            <span className="pill-label">Menu</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
