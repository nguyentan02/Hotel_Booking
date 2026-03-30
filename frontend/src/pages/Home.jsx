import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa'
import SearchBar from '../components/SearchBar'
import HotelCard from '../components/HotelCard'
import api from '../services/api'
import './Home.css'

export default function Home() {
  const [featuredHotels, setFeaturedHotels] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/hotels/featured'),
      api.get('/hotels/cities')
    ]).then(([hotelsRes, citiesRes]) => {
      setFeaturedHotels(hotelsRes.data)
      setCities(citiesRes.data)
    }).catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Tìm kiếm khách sạn <span>hoàn hảo</span> cho chuyến đi của bạn</h1>
            <p>Khám phá hàng ngàn khách sạn tại các thành phố du lịch nổi tiếng Việt Nam</p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Top Destinations */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Điểm đến phổ biến</h2>
            <Link to="/search" className="see-all">Xem tất cả <FaArrowRight /></Link>
          </div>
          <div className="city-grid">
            {cities.slice(0, 6).map(c => (
              <Link to={`/search?city=${encodeURIComponent(c.city)}`} key={c.city} className="city-card">
                <FaMapMarkerAlt />
                <div>
                  <strong>{c.city}</strong>
                  <span>{c.hotel_count} khách sạn</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Khách sạn nổi bật</h2>
            <Link to="/search" className="see-all">Xem tất cả <FaArrowRight /></Link>
          </div>
          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : (
            <div className="grid-3">
              {featuredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-section">
        <div className="container">
          <h2 className="text-center">Tại sao chọn StayBooker?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🏨</div>
              <h3>Đa dạng lựa chọn</h3>
              <p>Hàng trăm khách sạn từ bình dân đến cao cấp trên khắp Việt Nam</p>
            </div>
            <div className="why-card">
              <div className="why-icon">💰</div>
              <h3>Giá tốt nhất</h3>
              <p>Cam kết giá tốt nhất thị trường, nhiều ưu đãi hấp dẫn</p>
            </div>
            <div className="why-card">
              <div className="why-icon">⚡</div>
              <h3>Đặt phòng nhanh</h3>
              <p>Quy trình đặt phòng đơn giản, xác nhận tức thì</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🛡️</div>
              <h3>An toàn & bảo mật</h3>
              <p>Thông tin cá nhân được bảo mật, thanh toán an toàn</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
