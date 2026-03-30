import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaHotel } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(form.email, form.password)
      navigate(data.user.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <FaHotel className="auth-logo" />
          <h1>Đăng nhập</h1>
          <p>Chào mừng bạn trở lại!</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input type="email" className="form-control" value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="name@email.com" required />
          </div>
          <div className="form-group">
            <label><FaLock /> Mật khẩu</label>
            <input type="password" className="form-control" value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••" required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="auth-footer">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>

        <div className="demo-accounts">
          <p><strong>Tài khoản demo:</strong></p>
          <p>Admin: admin@hotel.com / admin123</p>
          <p>User: an@gmail.com / 123456</p>
        </div>
      </div>
    </div>
  )
}
