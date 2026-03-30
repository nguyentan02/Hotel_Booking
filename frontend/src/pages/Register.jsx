import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHotel } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp')
    }

    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password, phone: form.phone })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <FaHotel className="auth-logo" />
          <h1>Đăng ký</h1>
          <p>Tạo tài khoản mới để đặt phòng</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FaUser /> Họ tên</label>
            <input type="text" className="form-control" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Nguyễn Văn A" required />
          </div>
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input type="email" className="form-control" value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="name@email.com" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label><FaLock /> Mật khẩu</label>
              <input type="password" className="form-control" value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Ít nhất 6 ký tự" required minLength={6} />
            </div>
            <div className="form-group">
              <label><FaLock /> Xác nhận</label>
              <input type="password" className="form-control" value={form.confirmPassword}
                onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Nhập lại mật khẩu" required />
            </div>
          </div>
          <div className="form-group">
            <label><FaPhone /> Số điện thoại</label>
            <input type="tel" className="form-control" value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              placeholder="0912345678" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className="auth-footer">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}
