import { FaHotel, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand"><FaHotel /> StayBooker</h3>
            <p className="footer-desc">Nền tảng đặt phòng khách sạn trực tuyến hàng đầu Việt Nam. Tìm kiếm và đặt phòng dễ dàng, nhanh chóng.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Khám phá</h4>
            <Link to="/">Trang chủ</Link>
            <Link to="/search">Tìm kiếm khách sạn</Link>
            <Link to="/search?city=Hà Nội">Khách sạn Hà Nội</Link>
            <Link to="/search?city=Đà Nẵng">Khách sạn Đà Nẵng</Link>
          </div>
          <div className="footer-col">
            <h4>Tài khoản</h4>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
            <Link to="/my-bookings">Đặt phòng của tôi</Link>
          </div>
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <p><FaPhone /> 1900-xxxx</p>
            <p><FaEnvelope /> info@staybooker.vn</p>
            <p><FaMapMarkerAlt /> Hà Nội, Việt Nam</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 StayBooker - PTIT Web Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
