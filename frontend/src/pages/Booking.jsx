import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { FaHotel, FaCalendarAlt, FaUser, FaCreditCard, FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './Booking.css'

export default function Booking() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [form, setForm] = useState({
    check_in: searchParams.get('check_in') || today,
    check_out: searchParams.get('check_out') || tomorrow,
    num_rooms: 1,
    guest_name: user?.name || '',
    guest_email: user?.email || '',
    guest_phone: user?.phone || '',
    payment_method: 'credit_card',
    special_requests: ''
  })

  useEffect(() => {
    api.get(`/rooms/${roomId}`)
      .then(res => setRoom(res.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [roomId])

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        guest_name: prev.guest_name || user.name,
        guest_email: prev.guest_email || user.email,
        guest_phone: prev.guest_phone || user.phone || ''
      }))
    }
  }, [user])

  const nights = Math.max(1, Math.ceil(
    (new Date(form.check_out) - new Date(form.check_in)) / (1000 * 60 * 60 * 24)
  ))
  const totalPrice = room ? room.price * nights * form.num_rooms : 0

  const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p) + 'đ'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await api.post('/bookings', {
        room_id: parseInt(roomId),
        ...form,
        num_rooms: parseInt(form.num_rooms)
      })
      setSuccess(res.data.booking)
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>
  if (!room) return null

  if (success) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="booking-success">
            <FaCheckCircle className="success-icon" />
            <h1>Đặt phòng thành công!</h1>
            <p>Mã đặt phòng: <strong>#{success.id}</strong></p>
            <div className="success-details">
              <p><strong>Khách sạn:</strong> {success.hotel_name || success.room?.hotel?.name}</p>
              <p><strong>Phòng:</strong> {success.room_name || success.room?.name}</p>
              <p><strong>Nhận phòng:</strong> {new Date(success.check_in || success.checkIn).toLocaleDateString('vi-VN')}</p>
              <p><strong>Trả phòng:</strong> {new Date(success.check_out || success.checkOut).toLocaleDateString('vi-VN')}</p>
              <p><strong>Tổng tiền:</strong> {formatPrice(success.total_price || success.totalPrice)}</p>
            </div>
            <div className="success-actions">
              {user && (
                <button className="btn btn-primary" onClick={() => navigate('/my-bookings')}>
                  Xem đặt phòng của tôi
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <div className="container">
        <h1 className="page-title">Đặt phòng</h1>

        <div className="booking-layout">
          {/* Form */}
          <form className="booking-form" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-section">
              <h3><FaCalendarAlt /> Thời gian lưu trú</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày nhận phòng *</label>
                  <input type="date" className="form-control" value={form.check_in}
                    min={today} onChange={e => setForm(p => ({ ...p, check_in: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Ngày trả phòng *</label>
                  <input type="date" className="form-control" value={form.check_out}
                    min={form.check_in || today}
                    onChange={e => setForm(p => ({ ...p, check_out: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label>Số phòng</label>
                <select className="form-control" value={form.num_rooms}
                  onChange={e => setForm(p => ({ ...p, num_rooms: e.target.value }))}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} phòng</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3><FaUser /> Thông tin khách hàng</h3>
              <div className="form-group">
                <label>Họ tên *</label>
                <input type="text" className="form-control" value={form.guest_name}
                  onChange={e => setForm(p => ({ ...p, guest_name: e.target.value }))} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" className="form-control" value={form.guest_email}
                    onChange={e => setForm(p => ({ ...p, guest_email: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input type="tel" className="form-control" value={form.guest_phone}
                    onChange={e => setForm(p => ({ ...p, guest_phone: e.target.value }))} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3><FaCreditCard /> Thanh toán (mô phỏng)</h3>
              <div className="payment-options">
                {[
                  { value: 'credit_card', label: '💳 Thẻ tín dụng' },
                  { value: 'bank_transfer', label: '🏦 Chuyển khoản' },
                  { value: 'cash', label: '💵 Thanh toán tại khách sạn' }
                ].map(opt => (
                  <label key={opt.value} className={`payment-option ${form.payment_method === opt.value ? 'active' : ''}`}>
                    <input type="radio" name="payment" value={opt.value}
                      checked={form.payment_method === opt.value}
                      onChange={e => setForm(p => ({ ...p, payment_method: e.target.value }))} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>Yêu cầu đặc biệt</label>
                <textarea className="form-control" rows="3" value={form.special_requests}
                  onChange={e => setForm(p => ({ ...p, special_requests: e.target.value }))}
                  placeholder="VD: phòng tầng cao, giường phụ cho trẻ em..." />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={submitting}>
              {submitting ? 'Đang xử lý...' : `Xác nhận đặt phòng - ${formatPrice(totalPrice)}`}
            </button>

            {!user && (
              <p className="guest-note">
                Bạn đang đặt phòng với tư cách khách. <a href="/login">Đăng nhập</a> để quản lý booking.
              </p>
            )}
          </form>

          {/* Summary */}
          <div className="booking-summary">
            <div className="summary-card">
              <h3><FaHotel /> Thông tin phòng</h3>
              {room.image_url && <img src={room.image_url} alt={room.name} className="summary-img" />}
              <h4>{room.hotel_name}</h4>
              <p className="summary-room">{room.name}</p>
              <p className="summary-location">{room.city} - {room.address}</p>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Giá phòng</span>
                  <span>{formatPrice(room.price)} / đêm</span>
                </div>
                <div className="summary-row">
                  <span>Số đêm</span>
                  <span>{nights} đêm</span>
                </div>
                <div className="summary-row">
                  <span>Số phòng</span>
                  <span>{form.num_rooms}</span>
                </div>
                <div className="summary-row total">
                  <span>Tổng cộng</span>
                  <span className="price">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
