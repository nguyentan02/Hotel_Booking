import { FaHotel, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3><FaHotel /> StayBooker</h3>
            <p>Nền tảng đặt phòng khách sạn trực tuyến hàng đầu Việt Nam. Tìm kiếm và đặt phòng dễ dàng, nhanh chóng.</p>
          </div>
          <div className="footer-col">
            <h4>Liên kết</h4>
            <Link to="/">Trang chủ</Link>
            <Link to="/search">Tìm kiếm</Link>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </div>
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <p><FaPhone /> 1900-xxxx</p>
            <p><FaEnvelope /> info@staybooker.vn</p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 StayBooker - PTIT Web Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
