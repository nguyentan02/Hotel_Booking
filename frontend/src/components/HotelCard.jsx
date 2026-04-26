import { Link } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import './HotelCard.css'

export default function HotelCard({ hotel }) {
  const formatPrice = (price) => {
    if (!price) return 'Liên hệ'
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const getRatingLabel = (rating) => {
    if (!rating) return ''
    if (rating >= 9) return 'Xuất sắc'
    if (rating >= 8) return 'Rất tốt'
    if (rating >= 7) return 'Tốt'
    if (rating >= 6) return 'Hài lòng'
    return 'Trung bình'
  }

  return (
    <Link to={`/hotel/${hotel.id}`} className="hotel-card">
      <div className="hotel-card-image">
        <img src={hotel.image_url} alt={hotel.name} loading="lazy" />
        {hotel.is_featured ? <span className="featured-badge">Nổi bật</span> : null}
      </div>
      <div className="hotel-card-body">
        <div className="hotel-card-location">
          <FaMapMarkerAlt /> {hotel.city}
        </div>
        <h3 className="hotel-card-title">{hotel.name}</h3>
        <div className="hotel-card-stars">
          {[...Array(hotel.star_rating || 0)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="star-label">{hotel.star_rating ? `${hotel.star_rating} sao` : ''}</span>
        </div>
        <div className="hotel-card-bottom">
          <div className="hotel-card-rating">
            {hotel.rating && (
              <>
                <span className="rating-badge">{Number(hotel.rating).toFixed(1)}</span>
                <div className="rating-info">
                  <span className="rating-label">{getRatingLabel(hotel.rating)}</span>
                  <span className="review-count">{hotel.review_count || 0} đánh giá</span>
                </div>
              </>
            )}
          </div>
          <div className="hotel-card-price">
            <span className="price-amount">{formatPrice(hotel.min_price)}</span>
            <span className="price-unit">/đêm</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
