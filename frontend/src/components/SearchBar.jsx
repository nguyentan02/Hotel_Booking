import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa'
import api from '../services/api'
import './SearchBar.css'

export default function SearchBar({ initialValues = {}, compact = false }) {
  const navigate = useNavigate()
  const [city, setCity] = useState(initialValues.city || '')
  const [checkIn, setCheckIn] = useState(initialValues.check_in || '')
  const [checkOut, setCheckOut] = useState(initialValues.check_out || '')
  const [guests, setGuests] = useState(initialValues.guests || 2)
  const [rooms, setRooms] = useState(initialValues.rooms || 1)
  const [cities, setCities] = useState([])
  const [showCities, setShowCities] = useState(false)
  const [showGuests, setShowGuests] = useState(false)
  const [citySearch, setCitySearch] = useState(initialValues.city || '')
  const cityRef = useRef(null)
  const guestRef = useRef(null)

  useEffect(() => {
    api.get('/hotels/cities').then(res => setCities(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) setShowCities(false)
      if (guestRef.current && !guestRef.current.contains(e.target)) setShowGuests(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const filteredCities = cities.filter(c =>
    c.city.toLowerCase().includes(citySearch.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (checkIn) params.set('check_in', checkIn)
    if (checkOut) params.set('check_out', checkOut)
    navigate(`/search?${params.toString()}`)
  }

  const selectCity = (c) => {
    setCity(c.city)
    setCitySearch(c.city)
    setShowCities(false)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' })
  }

  return (
    <form className={`search-bar ${compact ? 'search-bar-compact' : ''}`} onSubmit={handleSearch}>
      {/* Location field */}
      <div className="search-field search-field-location" ref={cityRef}>
        <div className="search-field-label">Địa danh</div>
        <div className="search-field-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Bạn muốn đi đâu?"
            value={citySearch}
            onChange={e => { setCitySearch(e.target.value); setShowCities(true); setCity('') }}
            onFocus={() => setShowCities(true)}
          />
        </div>
        {showCities && (
          <div className="search-dropdown">
            {citySearch && (
              <div className="dropdown-section-title">Nơi bạn tìm</div>
            )}
            {filteredCities.map(c => (
              <button type="button" key={c.city} className="dropdown-item" onClick={() => selectCity(c)}>
                <FaMapMarkerAlt className="dropdown-item-icon" />
                <div>
                  <div className="dropdown-item-title">{c.city}</div>
                  <div className="dropdown-item-sub">{c.hotel_count} khách sạn</div>
                </div>
              </button>
            ))}
            {filteredCities.length === 0 && (
              <div className="dropdown-empty">Không tìm thấy địa điểm</div>
            )}
          </div>
        )}
      </div>

      {/* Date fields */}
      <div className="search-field search-field-dates">
        <div className="search-field-label">Nhận/trả phòng</div>
        <div className="search-field-input search-dates-row">
          <FaCalendarAlt className="search-icon" />
          <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} />
          <span className="date-separator">-</span>
          <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)} />
        </div>
      </div>

      {/* Guest/Room field */}
      <div className="search-field search-field-guests" ref={guestRef}>
        <div className="search-field-label">Số khách và phòng</div>
        <div className="search-field-input">
          <FaUserFriends className="search-icon" />
          <button type="button" className="guest-trigger" onClick={() => setShowGuests(!showGuests)}>
            {guests} khách, {rooms} phòng
          </button>
        </div>
        {showGuests && (
          <div className="search-dropdown guest-dropdown">
            <div className="guest-row">
              <span>Khách</span>
              <div className="guest-controls">
                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                <span>{guests}</span>
                <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))}>+</button>
              </div>
            </div>
            <div className="guest-row">
              <span>Phòng</span>
              <div className="guest-controls">
                <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                <span>{rooms}</span>
                <button type="button" onClick={() => setRooms(Math.min(5, rooms + 1))}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="search-submit-btn">
        <FaSearch className="search-submit-icon" />
        <span>Tìm</span>
      </button>
    </form>
  )
}
