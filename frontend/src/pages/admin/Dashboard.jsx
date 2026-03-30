import { useState, useEffect } from 'react'
import { FaHotel, FaBed, FaCalendarCheck, FaUsers, FaMoneyBillWave, FaClock } from 'react-icons/fa'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../services/api'
import './Admin.css'

const COLORS = ['#2563eb', '#f59e0b', '#ef4444', '#10b981']

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p)

  if (loading) return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content"><div className="loading"><div className="spinner"></div></div></div>
    </div>
  )

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="admin-title">Dashboard</h1>

        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dbeafe', color: '#2563eb' }}><FaHotel /></div>
            <div className="stat-value">{data?.stats?.totalHotels || 0}</div>
            <div className="stat-label">Khách sạn</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}><FaBed /></div>
            <div className="stat-value">{data?.stats?.totalRooms || 0}</div>
            <div className="stat-label">Loại phòng</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}><FaCalendarCheck /></div>
            <div className="stat-value">{data?.stats?.totalBookings || 0}</div>
            <div className="stat-label">Tổng đặt phòng</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}><FaUsers /></div>
            <div className="stat-value">{data?.stats?.totalUsers || 0}</div>
            <div className="stat-label">Khách hàng</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}><FaMoneyBillWave /></div>
            <div className="stat-value">{formatPrice(data?.stats?.totalRevenue || 0)}đ</div>
            <div className="stat-label">Tổng doanh thu</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#dc2626' }}><FaClock /></div>
            <div className="stat-value">{data?.stats?.pendingBookings || 0}</div>
            <div className="stat-label">Chờ xác nhận</div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Doanh thu theo tháng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.monthlyRevenue || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={v => formatPrice(v)} />
                <Tooltip formatter={v => formatPrice(v) + 'đ'} />
                <Bar dataKey="revenue" fill="#2563eb" name="Doanh thu" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Đặt phòng theo trạng thái</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={(data?.bookingsByStatus || []).map(b => ({
                    name: b.status === 'pending' ? 'Chờ xác nhận' :
                          b.status === 'confirmed' ? 'Đã xác nhận' :
                          b.status === 'cancelled' ? 'Đã hủy' : 'Hoàn thành',
                    value: b.count
                  }))}
                  cx="50%" cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {(data?.bookingsByStatus || []).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy */}
        <div className="chart-card">
          <h3>Công suất sử dụng phòng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={(data?.occupancyRates || []).map(o => ({
              name: o.hotel_name?.length > 20 ? o.hotel_name.substring(0, 20) + '...' : o.hotel_name,
              occupied: o.occupied,
              total: o.total_rooms,
              rate: o.total_rooms ? Math.round((o.occupied / o.total_rooms) * 100) : 0
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-20} textAnchor="end" height={80} fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupied" fill="#2563eb" name="Đang sử dụng" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" fill="#e2e8f0" name="Tổng phòng" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
