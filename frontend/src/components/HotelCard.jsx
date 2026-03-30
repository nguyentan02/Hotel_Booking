import { Link } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import './HotelCard.css'

export default function HotelCard({ hotel }) {
  const formatPrice = (price) => {
    if (!price) return 'Liên hệ'
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  return (
    <Link to={`/hotel/${hotel.id}`} className="hotel-card card">
      <div className="hotel-card-image">
        <img src={hotel.image_url} alt={hotel.name} loading="lazy" />
        {hotel.is_featured ? <span className="featured-badge">Nổi bật</span> : null}
      </div>
      <div className="hotel-card-body">
        <div className="hotel-card-location">
          <FaMapMarkerAlt /> {hotel.city}
        </div>
        <h3 className="hotel-card-title">{hotel.name}</h3>
        <div className="hotel-card-rating">
          <div className="stars">
            {[...Array(hotel.star_rating || 0)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span className="rating-score">{hotel.rating}</span>
          <span className="review-count">({hotel.review_count || 0} đánh giá)</span>
        </div>
        <div className="hotel-card-footer">
          <div className="price">
            {formatPrice(hotel.min_price)} <small>/đêm</small>
          </div>
        </div>
      </div>
    </Link>
  )
}
