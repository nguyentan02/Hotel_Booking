import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaDumbbell, FaSpa, FaConciergeBell, FaSnowflake, FaGlassMartini, FaBriefcase, FaTshirt, FaPlane, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './HotelDetail.css'

const iconMap = {
  FaWifi: <FaWifi />, FaSwimmingPool: <FaSwimmingPool />, FaParking: <FaParking />,
  FaUtensils: <FaUtensils />, FaDumbbell: <FaDumbbell />, FaSpa: <FaSpa />,
  FaConciergebell: <FaConciergeBell />, FaSnowflake: <FaSnowflake />,
  FaGlassMartini: <FaGlassMartini />, FaBriefcase: <FaBriefcase />,
  FaTshirt: <FaTshirt />, FaPlane: <FaPlane />
}

export default function HotelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [reviewMsg, setReviewMsg] = useState('')

  useEffect(() => {
    api.get(`/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  const allImages = hotel ? [
    { image_url: hotel.image_url, caption: hotel.name },
    ...(hotel.images || [])
  ] : []

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

  const handleReview = async (e) => {
    e.preventDefault()
    try {
      await api.post('/reviews', { hotel_id: hotel.id, ...reviewForm })
      setReviewMsg('Đánh giá thành công!')
      setReviewForm({ rating: 5, comment: '' })
      // Refresh
      const res = await api.get(`/hotels/${id}`)
      setHotel(res.data)
    } catch (err) {
      setReviewMsg(err.response?.data?.message || 'Lỗi')
    }
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>
  if (!hotel) return null

  return (
    <div className="hotel-detail">
      <div className="container">
        {/* Image Gallery */}
        <div className="gallery">
          <div className="gallery-main">
            <img src={allImages[currentImage]?.image_url} alt={allImages[currentImage]?.caption} />
            {allImages.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={() => setCurrentImage(i => i > 0 ? i - 1 : allImages.length - 1)}>
                  <FaChevronLeft />
                </button>
                <button className="gallery-nav next" onClick={() => setCurrentImage(i => i < allImages.length - 1 ? i + 1 : 0)}>
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="gallery-thumbs">
              {allImages.map((img, i) => (
                <img key={i} src={img.image_url} alt="" className={i === currentImage ? 'active' : ''}
                  onClick={() => setCurrentImage(i)} />
              ))}
            </div>
          )}
        </div>

        {/* Hotel Info */}
        <div className="hotel-info-grid">
          <div className="hotel-main-info">
            <div className="hotel-header">
              <div>
                <h1>{hotel.name}</h1>
                <div className="hotel-meta">
                  <div className="stars">
                    {[...Array(hotel.star_rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <span className="badge badge-info">{hotel.rating} ★ ({hotel.review_count} đánh giá)</span>
                </div>
                <p className="hotel-location"><FaMapMarkerAlt /> {hotel.address}, {hotel.city}</p>
              </div>
            </div>

            <div className="hotel-description">
              <h2>Giới thiệu</h2>
              <p>{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="hotel-amenities">
              <h2>Tiện ích</h2>
              <div className="amenity-grid">
                {hotel.amenities?.map(a => (
                  <div key={a.id} className="amenity-item">
                    {iconMap[a.icon] || <FaStar />}
                    <span>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="hotel-contact">
              {hotel.phone && <p><FaPhone /> {hotel.phone}</p>}
              {hotel.email && <p><FaEnvelope /> {hotel.email}</p>}
            </div>

            {/* Map placeholder */}
            {hotel.latitude && hotel.longitude && (
              <div className="hotel-map">
                <h2>Vị trí</h2>
                <div className="map-placeholder">
                  <FaMapMarkerAlt size={32} />
                  <p>{hotel.address}, {hotel.city}</p>
                  <p className="coords">📍 {hotel.latitude}, {hotel.longitude}</p>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="hotel-reviews">
              <h2>Đánh giá ({hotel.reviews?.length || 0})</h2>
              
              {user && (
                <form className="review-form" onSubmit={handleReview}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Đánh giá</label>
                      <select className="form-control" value={reviewForm.rating}
                        onChange={e => setReviewForm(p => ({ ...p, rating: parseInt(e.target.value) }))}>
                        {[5, 4, 3, 2, 1].map(r => (
                          <option key={r} value={r}>{r} ★</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ flex: 2 }}>
                      <label>Nhận xét</label>
                      <input className="form-control" value={reviewForm.comment}
                        onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                        placeholder="Chia sẻ trải nghiệm của bạn..." />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">Gửi đánh giá</button>
                  {reviewMsg && <span className="review-msg">{reviewMsg}</span>}
                </form>
              )}

              <div className="review-list">
                {hotel.reviews?.map(r => (
                  <div key={r.id} className="review-item">
                    <div className="review-header">
                      <strong>{r.user_name}</strong>
                      <div className="stars" style={{ fontSize: 12 }}>
                        {[...Array(r.rating)].map((_, i) => <FaStar key={i} />)}
                      </div>
                      <span className="review-date">
                        {new Date(r.created_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p>{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rooms sidebar */}
          <div className="rooms-panel">
            <h2>Chọn phòng</h2>
            {hotel.rooms?.map(room => (
              <div key={room.id} className="room-card">
                {room.image_url && <img src={room.image_url} alt={room.name} />}
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p className="room-desc">{room.description}</p>
                  <div className="room-meta">
                    <span><FaUsers /> {room.capacity} người</span>
                    <span>{room.total_rooms} phòng</span>
                  </div>
                  <div className="room-footer">
                    <div className="price">{formatPrice(room.price)} <small>/đêm</small></div>
                    <Link to={`/booking/${room.id}`} className="btn btn-primary btn-sm">
                      Đặt phòng
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
