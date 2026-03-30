import { useState, useEffect } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../services/api'
import './Admin.css'

export default function BookingManagement() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => { fetchBookings() }, [page, statusFilter])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ page, limit: 15 })
      if (statusFilter) params.set('status', statusFilter)
      const res = await api.get(`/admin/bookings?${params}`)
      setBookings(res.data.bookings)
      setPagination(res.data.pagination)
    } catch (err) { console.error(err) } finally { setLoading(false) }
  }

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Xác nhận chuyển trạng thái sang "${statusLabel(status)}"?`)) return
    try {
      await api.put(`/admin/bookings/${id}`, { status })
      fetchBookings()
    } catch (err) { alert(err.response?.data?.message || 'Lỗi') }
  }

  const statusLabel = (s) => ({
    pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy', completed: 'Hoàn thành'
  }[s] || s)

  const statusBadge = (s) => ({
    pending: 'badge-warning', confirmed: 'badge-info',
    cancelled: 'badge-danger', completed: 'badge-success'
  }[s] || '')

  const paymentLabel = (s) => ({
    pending: 'Chưa thanh toán', paid: 'Đã thanh toán', refunded: 'Đã hoàn tiền'
  }[s] || s)

  const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p) + 'đ'
  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN')

  const statuses = ['', 'pending', 'confirmed', 'cancelled', 'completed']

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="page-header">
          <h1 className="admin-title">Quản lý đặt phòng</h1>
        </div>

        <div className="admin-toolbar">
          <div className="filter-tabs">
            {statuses.map(s => (
              <button key={s} className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setStatusFilter(s); setPage(1) }}>
                {s ? statusLabel(s) : 'Tất cả'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Khách sạn</th>
                    <th>Phòng</th>
                    <th>Ngày nhận</th>
                    <th>Ngày trả</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Thanh toán</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>
                        <strong>{b.guest_name}</strong>
                        <br /><small>{b.guest_email}</small>
                      </td>
                      <td>{b.hotel_name}</td>
                      <td>{b.room_name}</td>
                      <td>{formatDate(b.check_in_date)}</td>
                      <td>{formatDate(b.check_out_date)}</td>
                      <td><strong>{formatPrice(b.total_price)}</strong></td>
                      <td><span className={`badge ${statusBadge(b.status)}`}>{statusLabel(b.status)}</span></td>
                      <td><span className={`badge ${b.payment_status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{paymentLabel(b.payment_status)}</span></td>
                      <td>
                        <div className="admin-actions">
                          {b.status === 'pending' && (
                            <>
                              <button className="btn btn-success btn-sm" onClick={() => updateStatus(b.id, 'confirmed')}>Xác nhận</button>
                              <button className="btn btn-danger btn-sm" onClick={() => updateStatus(b.id, 'cancelled')}>Hủy</button>
                            </>
                          )}
                          {b.status === 'confirmed' && (
                            <button className="btn btn-primary btn-sm" onClick={() => updateStatus(b.id, 'completed')}>Hoàn thành</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr><td colSpan="10" style={{ textAlign: 'center', padding: 40 }}>Không có đặt phòng nào</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Trước</button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} className={page === p ? 'active' : ''}
                    onClick={() => setPage(p)}>{p}</button>
                ))}
                <button disabled={page >= pagination.totalPages} onClick={() => setPage(p => p + 1)}>Sau</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
