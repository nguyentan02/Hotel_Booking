import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaStar, FaArrowRight, FaShieldAlt, FaBolt, FaTag, FaHotel } from 'react-icons/fa'
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
      {/* Hero Section - Trivago style */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Tiết kiệm đến <span className="highlight">60%</span> cho đặt phòng khách sạn</h1>
            <p className="hero-sub">Chúng tôi so sánh giá phòng từ nhiều trang</p>
          </div>
          <SearchBar />
          <div className="hero-badges">
            <span className="hero-badge">✓ Miễn phí Đổi/Hủy</span>
            <span className="hero-badge">✓ Giá tốt nhất</span>
            <span className="hero-badge">✓ Xác nhận tức thì</span>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Điểm đến phổ biến</h2>
            <Link to="/search" className="see-all">Xem tất cả <FaArrowRight /></Link>
          </div>
          <div className="city-grid">
            {cities.slice(0, 6).map(c => (
              <Link to={`/search?city=${encodeURIComponent(c.city)}`} key={c.city} className="city-card">
                <div className="city-card-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="city-card-info">
                  <strong>{c.city}</strong>
                  <span>{c.hotel_count} khách sạn</span>
                </div>
                <FaArrowRight className="city-card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="section section-featured">
        <div className="container">
          <div className="section-header">
            <h2>Khách sạn nổi bật</h2>
            <Link to="/search" className="see-all">Xem tất cả <FaArrowRight /></Link>
          </div>
          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : (
            <div className="hotel-grid">
              {featuredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us - Trivago style */}
      <section className="section why-section">
        <div className="container">
          <h2 className="text-center">Tại sao chọn StayBooker?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon why-icon-blue"><FaHotel /></div>
              <h3>Đa dạng lựa chọn</h3>
              <p>Hàng trăm khách sạn từ bình dân đến cao cấp trên khắp Việt Nam</p>
            </div>
            <div className="why-card">
              <div className="why-icon why-icon-green"><FaTag /></div>
              <h3>Giá tốt nhất</h3>
              <p>Cam kết giá tốt nhất thị trường, nhiều ưu đãi hấp dẫn</p>
            </div>
            <div className="why-card">
              <div className="why-icon why-icon-orange"><FaBolt /></div>
              <h3>Đặt phòng nhanh</h3>
              <p>Quy trình đặt phòng đơn giản, xác nhận tức thì</p>
            </div>
            <div className="why-card">
              <div className="why-icon why-icon-purple"><FaShieldAlt /></div>
              <h3>An toàn & bảo mật</h3>
              <p>Thông tin cá nhân được bảo mật, thanh toán an toàn</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
