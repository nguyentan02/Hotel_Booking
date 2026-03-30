import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTimes, FaEye } from 'react-icons/fa'
import api from '../services/api'
import './MyBookings.css'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    fetchBookings()
  }, [filter])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const params = filter ? `?status=${filter}` : ''
      const res = await api.get(`/bookings/my${params}`)
      setBookings(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) return
    try {
      await api.put(`/bookings/${id}/cancel`)
      fetchBookings()
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi')
    }
  }

  const handleEdit = (booking) => {
    setEditingId(booking.id)
    setEditForm({
      check_in: booking.check_in?.split('T')[0],
      check_out: booking.check_out?.split('T')[0],
      guest_name: booking.guest_name,
      guest_phone: booking.guest_phone || '',
      special_requests: booking.special_requests || ''
    })
  }

  const handleUpdate = async (id) => {
    try {
      await api.put(`/bookings/${id}`, editForm)
      setEditingId(null)
      fetchBookings()
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi')
    }
  }

  const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p) + 'đ'
  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN')

  const statusMap = {
    pending: { label: 'Chờ xác nhận', class: 'badge-warning' },
    confirmed: { label: 'Đã xác nhận', class: 'badge-success' },
    cancelled: { label: 'Đã hủy', class: 'badge-danger' },
    completed: { label: 'Hoàn thành', class: 'badge-info' }
  }

  return (
    <div className="my-bookings">
      <div className="container">
        <div className="page-header">
          <h1>Đặt phòng của tôi</h1>
          <div className="filter-tabs">
            {['', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
              <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(s)}>
                {s === '' ? 'Tất cả' : statusMap[s]?.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : bookings.length === 0 ? (
          <div className="no-results">
            <h3>Chưa có đặt phòng nào</h3>
            <p>Hãy <Link to="/search">tìm kiếm</Link> và đặt phòng khách sạn ngay!</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map(b => (
              <div key={b.id} className="booking-item">
                <div className="booking-image">
                  <img src={b.hotel_image || b.room_image} alt="" />
                </div>
                <div className="booking-info">
                  <div className="booking-top">
                    <div>
                      <Link to={`/hotel/${b.hotel_id}`} className="booking-hotel">{b.hotel_name}</Link>
                      <p className="booking-room">{b.room_name}</p>
                      <p className="booking-loc"><FaMapMarkerAlt /> {b.city}</p>
                    </div>
                    <span className={`badge ${statusMap[b.status]?.class}`}>
                      {statusMap[b.status]?.label}
                    </span>
                  </div>

                  {editingId === b.id ? (
                    <div className="edit-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nhận phòng</label>
                          <input type="date" className="form-control" value={editForm.check_in}
                            onChange={e => setEditForm(p => ({ ...p, check_in: e.target.value }))} />
                        </div>
                        <div className="form-group">
                          <label>Trả phòng</label>
                          <input type="date" className="form-control" value={editForm.check_out}
                            onChange={e => setEditForm(p => ({ ...p, check_out: e.target.value }))} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Yêu cầu đặc biệt</label>
                        <input className="form-control" value={editForm.special_requests}
                          onChange={e => setEditForm(p => ({ ...p, special_requests: e.target.value }))} />
                      </div>
                      <div className="edit-actions">
                        <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(b.id)}>Lưu</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Hủy</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="booking-dates">
                        <FaCalendarAlt />
                        <span>{formatDate(b.check_in)} → {formatDate(b.check_out)}</span>
                      </div>
                      <div className="booking-bottom">
                        <div className="price">{formatPrice(b.total_price)}</div>
                        <div className="booking-actions">
                          {['pending', 'confirmed'].includes(b.status) && (
                            <>
                              <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(b)}>
                                <FaEdit /> Sửa
                              </button>
                              <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b.id)}>
                                <FaTimes /> Hủy
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
