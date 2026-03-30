import { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../services/api'
import './Admin.css'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await api.get('/admin/users')
      setUsers(res.data)
    } catch (err) { console.error(err) } finally { setLoading(false) }
  }

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin'
    if (!window.confirm(`Đổi vai trò thành "${newRole === 'admin' ? 'Quản trị viên' : 'Khách hàng'}"?`)) return
    try {
      await api.put(`/admin/users/${id}`, { role: newRole })
      fetchUsers()
    } catch (err) { alert(err.response?.data?.message || 'Lỗi') }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa người dùng này?')) return
    try {
      await api.delete(`/admin/users/${id}`)
      fetchUsers()
    } catch (err) { alert(err.response?.data?.message || 'Lỗi') }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN')

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="page-header">
          <h1 className="admin-title">Quản lý người dùng</h1>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td><strong>{u.full_name}</strong></td>
                    <td>{u.email}</td>
                    <td>{u.phone || '-'}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                        {u.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                      </span>
                    </td>
                    <td>{formatDate(u.created_at)}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => toggleRole(u.id, u.role)}>
                          Đổi vai trò
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40 }}>Không có người dùng nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
