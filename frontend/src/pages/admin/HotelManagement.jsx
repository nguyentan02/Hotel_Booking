import { useState, useEffect, useRef } from 'react'
import { FaPlus, FaEdit, FaTrash, FaStar, FaSearch, FaCloudUploadAlt, FaTimes } from 'react-icons/fa'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../services/api'
import './Admin.css'

export default function HotelManagement() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    name: '', description: '', address: '', city: '', star_rating: 3,
    phone: '', email: '', is_featured: false, image_url: ''
  })

  useEffect(() => { fetchHotels() }, [])

  const fetchHotels = async () => {
    try {
      const res = await api.get('/hotels?limit=100')
      setHotels(res.data.hotels)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', description: '', address: '', city: '', star_rating: 3, phone: '', email: '', is_featured: false, image_url: '' })
    setImageFile(null)
    setImagePreview('')
    setShowModal(true)
  }

  const openEdit = (hotel) => {
    setEditing(hotel)
    setForm({
      name: hotel.name, description: hotel.description || '', address: hotel.address,
      city: hotel.city, star_rating: hotel.star_rating, phone: hotel.phone || '',
      email: hotel.email || '', is_featured: hotel.is_featured, image_url: hotel.image_url || ''
    })
    setImageFile(null)
    setImagePreview(hotel.image_url || '')
    setShowModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(editing?.image_url || '')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('address', form.address)
      formData.append('city', form.city)
      formData.append('star_rating', form.star_rating)
      formData.append('phone', form.phone)
      formData.append('email', form.email)
      formData.append('is_featured', form.is_featured)
      if (imageFile) {
        formData.append('image', imageFile)
      } else if (form.image_url) {
        formData.append('image_url', form.image_url)
      }

      if (editing) {
        await api.put(`/admin/hotels/${editing.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await api.post('/admin/hotels', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      setShowModal(false)
      fetchHotels()
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa khách sạn này?')) return
    try {
      await api.delete(`/admin/hotels/${id}`)
      fetchHotels()
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="page-header">
          <h1 className="admin-title">Quản lý khách sạn</h1>
          <button className="btn btn-primary" onClick={openCreate}><FaPlus /> Thêm khách sạn</button>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Thành phố</th>
                  <th>Hạng sao</th>
                  <th>Đánh giá</th>
                  <th>Nổi bật</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map(h => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td><strong>{h.name}</strong></td>
                    <td>{h.city}</td>
                    <td><span className="stars">{[...Array(h.star_rating)].map((_, i) => <FaStar key={i} />)}</span></td>
                    <td>{h.rating}</td>
                    <td>{h.is_featured ? '⭐' : '—'}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(h)}><FaEdit /></button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(h.id)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal admin-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editing ? 'Sửa khách sạn' : 'Thêm khách sạn'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Tên khách sạn *</label>
                    <input className="form-control" value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Thành phố *</label>
                      <input className="form-control" value={form.city}
                        onChange={e => setForm(p => ({ ...p, city: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Hạng sao</label>
                      <select className="form-control" value={form.star_rating}
                        onChange={e => setForm(p => ({ ...p, star_rating: parseInt(e.target.value) }))}>
                        {[1, 2, 3, 4, 5].map(s => <option key={s} value={s}>{s} sao</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ *</label>
                    <input className="form-control" value={form.address}
                      onChange={e => setForm(p => ({ ...p, address: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label>Mô tả</label>
                    <textarea className="form-control" rows="3" value={form.description}
                      onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Hình ảnh</label>
                    <div className="image-upload-area">
                      {imagePreview ? (
                        <div className="image-preview-container">
                          <img src={imagePreview} alt="Preview" className="image-preview" />
                          <button type="button" className="image-remove-btn" onClick={removeImage}>
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="image-upload-placeholder" onClick={() => fileInputRef.current?.click()}>
                          <FaCloudUploadAlt className="upload-icon" />
                          <span>Nhấn để chọn ảnh</span>
                          <small>JPEG, PNG, WebP - Tối đa 5MB</small>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                      {imagePreview && (
                        <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}
                          onClick={() => fileInputRef.current?.click()}>
                          Đổi ảnh
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Điện thoại</label>
                      <input className="form-control" value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input className="form-control" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="checkbox" checked={form.is_featured}
                      onChange={e => setForm(p => ({ ...p, is_featured: e.target.checked }))} />
                    Khách sạn nổi bật
                  </label>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Đang tải lên...' : (editing ? 'Cập nhật' : 'Thêm')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
