import { useState, useEffect, useCallback } from 'react'
import {
  FaTrash, FaEye, FaKey, FaLock, FaLockOpen,
  FaUserShield, FaUserCheck, FaSearch, FaTimes, FaCheck
} from 'react-icons/fa'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../services/api'
import './Admin.css'
import './UserManagement.css'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'
const formatDateTime = (d) => d ? new Date(d).toLocaleString('vi-VN') : '—'

const ROLE_LABELS = { admin: 'Quản trị viên', customer: 'Khách hàng' }

// ─── Modal Components ─────────────────────────────────────────────────────────
function UserDetailModal({ user, onClose }) {
  if (!user) return null
  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal um-modal--detail" onClick={e => e.stopPropagation()}>
        <div className="um-modal__header">
          <h2 className="um-modal__title"><FaEye /> Chi tiết tài khoản</h2>
          <button className="um-modal__close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="um-modal__body">
          <div className="um-detail-avatar">
            {user.avatar_url
              ? <img src={user.avatar_url} alt={user.full_name} className="um-avatar-img" />
              : <div className="um-avatar-placeholder">{user.full_name?.[0]?.toUpperCase() || '?'}</div>
            }
            <div className="um-detail-name-group">
              <h3>{user.full_name}</h3>
              <span className={`um-badge ${user.role === 'admin' ? 'um-badge--admin' : 'um-badge--customer'}`}>
                {ROLE_LABELS[user.role] || user.role}
              </span>
              <span className={`um-badge ${user.is_active ? 'um-badge--active' : 'um-badge--locked'}`}>
                {user.is_active ? 'Đang hoạt động' : 'Đã khóa'}
              </span>
            </div>
          </div>
          <div className="um-detail-grid">
            <div className="um-detail-item"><span className="um-detail-label">ID</span><span className="um-detail-value">#{user.id}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Email</span><span className="um-detail-value">{user.email}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Số điện thoại</span><span className="um-detail-value">{user.phone || '—'}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Ngày tạo</span><span className="um-detail-value">{formatDateTime(user.created_at)}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Cập nhật lần cuối</span><span className="um-detail-value">{formatDateTime(user.updated_at)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResetPasswordModal({ user, onClose, onSuccess }) {
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (newPassword.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return }
    if (newPassword !== confirm) { setError('Mật khẩu xác nhận không khớp'); return }
    setLoading(true)
    try {
      await api.put(`/admin/users/${user.id}/reset-password`, { new_password: newPassword })
      onSuccess('Đặt lại mật khẩu thành công!')
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi')
    } finally { setLoading(false) }
  }

  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal um-modal--sm" onClick={e => e.stopPropagation()}>
        <div className="um-modal__header">
          <h2 className="um-modal__title"><FaKey /> Đặt lại mật khẩu</h2>
          <button className="um-modal__close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="um-modal__body">
          <p className="um-modal__subtitle">Đặt lại mật khẩu cho: <strong>{user.full_name}</strong></p>
          {error && <div className="um-alert um-alert--error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="um-form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password" className="um-input" placeholder="Tối thiểu 6 ký tự"
                value={newPassword} onChange={e => setNewPassword(e.target.value)} required
              />
            </div>
            <div className="um-form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password" className="um-input" placeholder="Nhập lại mật khẩu"
                value={confirm} onChange={e => setConfirm(e.target.value)} required
              />
            </div>
            <div className="um-modal__footer">
              <button type="button" className="um-btn um-btn--ghost" onClick={onClose}>Hủy</button>
              <button type="submit" className="um-btn um-btn--warning" disabled={loading}>
                {loading ? 'Đang xử lý...' : <><FaKey /> Đặt lại mật khẩu</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function ChangeRoleModal({ user, onClose, onSuccess }) {
  const [role, setRole] = useState(user.role)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (role === user.role) { onClose(); return }
    setLoading(true)
    try {
      await api.put(`/admin/users/${user.id}/role`, { role })
      onSuccess('Phân quyền thành công!')
      onClose()
    } catch (err) {
      alert(err.response?.data?.message || 'Đã xảy ra lỗi')
    } finally { setLoading(false) }
  }

  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal um-modal--sm" onClick={e => e.stopPropagation()}>
        <div className="um-modal__header">
          <h2 className="um-modal__title"><FaUserShield /> Phân quyền tài khoản</h2>
          <button className="um-modal__close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="um-modal__body">
          <p className="um-modal__subtitle">Phân quyền cho: <strong>{user.full_name}</strong></p>
          <form onSubmit={handleSubmit}>
            <div className="um-role-options">
              <label className={`um-role-option ${role === 'customer' ? 'um-role-option--selected' : ''}`}>
                <input type="radio" name="role" value="customer" checked={role === 'customer'} onChange={() => setRole('customer')} />
                <div className="um-role-option__icon um-role-option__icon--customer"><FaUserCheck /></div>
                <div>
                  <div className="um-role-option__name">Khách hàng</div>
                  <div className="um-role-option__desc">Đặt phòng, xem lịch sử</div>
                </div>
              </label>
              <label className={`um-role-option ${role === 'admin' ? 'um-role-option--selected' : ''}`}>
                <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                <div className="um-role-option__icon um-role-option__icon--admin"><FaUserShield /></div>
                <div>
                  <div className="um-role-option__name">Quản trị viên</div>
                  <div className="um-role-option__desc">Toàn quyền quản trị hệ thống</div>
                </div>
              </label>
            </div>
            <div className="um-modal__footer">
              <button type="button" className="um-btn um-btn--ghost" onClick={onClose}>Hủy</button>
              <button type="submit" className="um-btn um-btn--primary" disabled={loading}>
                {loading ? 'Đang xử lý...' : <><FaCheck /> Lưu phân quyền</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)

  // Modal states
  const [detailUser, setDetailUser] = useState(null)
  const [resetPwUser, setResetPwUser] = useState(null)
  const [roleUser, setRoleUser] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get('/admin/users')
      setUsers(res.data)
    } catch (err) { console.error(err) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleViewDetail = async (id) => {
    setLoadingDetail(true)
    try {
      const res = await api.get(`/admin/users/${id}`)
      setDetailUser(res.data)
    } catch (err) { showToast('Không thể tải thông tin', 'error') }
    finally { setLoadingDetail(false) }
  }

  const handleToggleActive = async (user) => {
    const action = user.is_active ? 'khóa' : 'mở khóa'
    if (!window.confirm(`Xác nhận ${action} tài khoản của "${user.full_name}"?`)) return
    try {
      await api.put(`/admin/users/${user.id}/toggle-active`, { is_active: !user.is_active })
      showToast(`${user.is_active ? 'Khóa' : 'Mở khóa'} tài khoản thành công!`)
      fetchUsers()
    } catch (err) { showToast(err.response?.data?.message || 'Đã xảy ra lỗi', 'error') }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Xác nhận xóa vĩnh viễn tài khoản "${name}"?`)) return
    try {
      await api.delete(`/admin/users/${id}`)
      showToast('Xóa người dùng thành công!')
      fetchUsers()
    } catch (err) { showToast(err.response?.data?.message || 'Đã xảy ra lỗi', 'error') }
  }

  const onModalSuccess = (msg) => {
    showToast(msg)
    fetchUsers()
  }

  const filtered = users.filter(u =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    (u.phone || '').includes(search)
  )

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        {/* Toast */}
        {toast && (
          <div className={`um-toast um-toast--${toast.type}`}>
            {toast.type === 'success' ? <FaCheck /> : <FaTimes />}
            <span>{toast.msg}</span>
          </div>
        )}

        <div className="page-header">
          <h1 className="admin-title">Quản lý người dùng</h1>
          <div className="um-stats">
            <span className="um-stat-chip um-stat-chip--total">Tổng: {users.length}</span>
            <span className="um-stat-chip um-stat-chip--active">
              Hoạt động: {users.filter(u => u.is_active).length}
            </span>
            <span className="um-stat-chip um-stat-chip--locked">
              Đã khóa: {users.filter(u => !u.is_active).length}
            </span>
          </div>
        </div>

        <div className="admin-toolbar">
          <div className="search-input">
            <FaSearch style={{ color: 'var(--text-light)' }} />
            <input
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="um-clear-search" onClick={() => setSearch('')}><FaTimes /></button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className={!u.is_active ? 'um-row--locked' : ''}>
                    <td><span className="um-id">#{u.id}</span></td>
                    <td>
                      <div className="um-user-cell">
                        <div className="um-user-avatar-sm">
                          {u.avatar_url
                            ? <img src={u.avatar_url} alt={u.full_name} />
                            : <span>{u.full_name?.[0]?.toUpperCase() || '?'}</span>
                          }
                        </div>
                        <strong>{u.full_name}</strong>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone || '—'}</td>
                    <td>
                      <span className={`um-badge ${u.role === 'admin' ? 'um-badge--admin' : 'um-badge--customer'}`}>
                        {ROLE_LABELS[u.role] || u.role}
                      </span>
                    </td>
                    <td>
                      <span className={`um-badge ${u.is_active ? 'um-badge--active' : 'um-badge--locked'}`}>
                        {u.is_active ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td>{formatDate(u.created_at)}</td>
                    <td>
                      <div className="admin-actions um-actions">
                        <button
                          className="um-icon-btn um-icon-btn--info"
                          title="Xem chi tiết"
                          onClick={() => handleViewDetail(u.id)}
                          disabled={loadingDetail}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="um-icon-btn um-icon-btn--warning"
                          title="Đặt lại mật khẩu"
                          onClick={() => setResetPwUser(u)}
                        >
                          <FaKey />
                        </button>
                        <button
                          className={`um-icon-btn ${u.is_active ? 'um-icon-btn--danger' : 'um-icon-btn--success'}`}
                          title={u.is_active ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                          onClick={() => handleToggleActive(u)}
                        >
                          {u.is_active ? <FaLock /> : <FaLockOpen />}
                        </button>
                        <button
                          className="um-icon-btn um-icon-btn--purple"
                          title="Phân quyền"
                          onClick={() => setRoleUser(u)}
                        >
                          <FaUserShield />
                        </button>
                        <button
                          className="um-icon-btn um-icon-btn--delete"
                          title="Xóa tài khoản"
                          onClick={() => handleDelete(u.id, u.full_name)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: 40, color: 'var(--text-light)' }}>
                      {search ? 'Không tìm thấy người dùng phù hợp' : 'Không có người dùng nào'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {detailUser && <UserDetailModal user={detailUser} onClose={() => setDetailUser(null)} />}
      {resetPwUser && (
        <ResetPasswordModal
          user={resetPwUser}
          onClose={() => setResetPwUser(null)}
          onSuccess={onModalSuccess}
        />
      )}
      {roleUser && (
        <ChangeRoleModal
          user={roleUser}
          onClose={() => setRoleUser(null)}
          onSuccess={onModalSuccess}
        />
      )}
    </div>
  )
}
