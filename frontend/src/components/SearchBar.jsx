import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import api from '../services/api'
import './SearchBar.css'

export default function SearchBar({ initialValues = {} }) {
  const navigate = useNavigate()
  const [city, setCity] = useState(initialValues.city || '')
  const [checkIn, setCheckIn] = useState(initialValues.check_in || '')
  const [checkOut, setCheckOut] = useState(initialValues.check_out || '')
  const [cities, setCities] = useState([])

  useEffect(() => {
    api.get('/hotels/cities').then(res => setCities(res.data)).catch(() => {})
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (checkIn) params.set('check_in', checkIn)
    if (checkOut) params.set('check_out', checkOut)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-field">
        <FaMapMarkerAlt className="search-icon" />
        <select value={city} onChange={e => setCity(e.target.value)}>
          <option value="">Tất cả thành phố</option>
          {cities.map(c => (
            <option key={c.city} value={c.city}>{c.city} ({c.hotel_count})</option>
          ))}
        </select>
      </div>
      <div className="search-field">
        <FaCalendarAlt className="search-icon" />
        <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} placeholder="Ngày nhận" />
      </div>
      <div className="search-field">
        <FaCalendarAlt className="search-icon" />
        <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)} placeholder="Ngày trả" />
      </div>
      <button type="submit" className="btn btn-primary btn-lg search-btn">
        <FaSearch /> Tìm kiếm
      </button>
    </form>
  )
}
