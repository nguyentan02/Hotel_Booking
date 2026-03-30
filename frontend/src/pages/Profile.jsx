import { useState } from 'react'
import { FaUser, FaLock, FaSave } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './Profile.css'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [msg, setMsg] = useState('')
  const [pwMsg, setPwMsg] = useState('')

  const handleProfile = async (e) => {
    e.preventDefault()
    try {
      const res = await api.put('/auth/profile', form)
      updateUser(res.data.user)
      setMsg('Cập nhật thành công!')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      setMsg(err.response?.data?.message || 'Lỗi')
    }
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      return setPwMsg('Mật khẩu xác nhận không khớp')
    }
    try {
      await api.put('/auth/password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword
      })
      setPwMsg('Đổi mật khẩu thành công!')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setPwMsg(''), 3000)
    } catch (err) {
      setPwMsg(err.response?.data?.message || 'Lỗi')
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Tài khoản</h1>

        <div className="profile-grid">
          <div className="profile-section">
            <h2><FaUser /> Thông tin cá nhân</h2>
            {msg && <div className={`alert ${msg.includes('thành công') ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}
            <form onSubmit={handleProfile}>
              <div className="form-group">
                <label>Email</label>
                <input className="form-control" value={user?.email || ''} disabled />
              </div>
              <div className="form-group">
                <label>Họ tên</label>
                <input className="form-control" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input className="form-control" value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <button type="submit" className="btn btn-primary"><FaSave /> Lưu thay đổi</button>
            </form>
          </div>

          <div className="profile-section">
            <h2><FaLock /> Đổi mật khẩu</h2>
            {pwMsg && <div className={`alert ${pwMsg.includes('thành công') ? 'alert-success' : 'alert-danger'}`}>{pwMsg}</div>}
            <form onSubmit={handlePassword}>
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input type="password" className="form-control" value={pwForm.currentPassword}
                  onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input type="password" className="form-control" value={pwForm.newPassword}
                  onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))} required minLength={6} />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input type="password" className="form-control" value={pwForm.confirmPassword}
                  onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))} required />
              </div>
              <button type="submit" className="btn btn-primary"><FaLock /> Đổi mật khẩu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
