import { Link } from 'react-router-dom'
import { FaChartLine, FaHotel, FaBed, FaCalendarCheck, FaUsers } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import './AdminSidebar.css'

const menuItems = [
  { path: '/admin', icon: <FaChartLine />, label: 'Dashboard' },
  { path: '/admin/hotels', icon: <FaHotel />, label: 'Khách sạn' },
  { path: '/admin/rooms', icon: <FaBed />, label: 'Phòng' },
  { path: '/admin/bookings', icon: <FaCalendarCheck />, label: 'Đặt phòng' },
  { path: '/admin/users', icon: <FaUsers />, label: 'Người dùng' },
]

export default function AdminSidebar() {
  const location = useLocation()

  return (
    <div className="admin-sidebar">
      <div className="sidebar-title">Quản trị</div>
      {menuItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={location.pathname === item.path ? 'active' : ''}
        >
          {item.icon} {item.label}
        </Link>
      ))}
    </div>
  )
}
