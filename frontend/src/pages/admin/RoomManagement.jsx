import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../services/api'
import './Admin.css'

export default function RoomManagement() {
  const [rooms, setRooms] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [selectedHotel, setSelectedHotel] = useState('')
  const [form, setForm] = useState({
    hotel_id: '', name: '', description: '', price: '', capacity: 2,
    total_rooms: 1, status: 'available', image_url: ''
  })

  useEffect(() => {
    Promise.all([
      api.get('/hotels?limit=100'),
    ]).then(([hotelsRes]) => {
      setHotels(hotelsRes.data.hotels)
      if (hotelsRes.data.hotels.length > 0) {
        setSelectedHotel(hotelsRes.data.hotels[0].id)
      }
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (selectedHotel) fetchRooms()
  }, [selectedHotel])

  const fetchRooms = async () => {
    try {
      const res = await api.get(`/rooms/hotel/${selectedHotel}`)
      setRooms(res.data)
    } catch (err) { console.error(err) }
  }

  const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p) + 'đ'

  const openCreate = () => {
    setEditing(null)
    setForm({ hotel_id: selectedHotel, name: '', description: '', price: '', capacity: 2, total_rooms: 1, status: 'available', image_url: '' })
    setShowModal(true)
  }

  const openEdit = (room) => {
    setEditing(room)
    setForm({
      hotel_id: room.hotel_id || selectedHotel, name: room.name, description: room.description || '',
      price: room.price, capacity: room.capacity, total_rooms: room.total_rooms,
      status: room.status, image_url: room.image_url || ''
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/admin/rooms/${editing.id}`, form)
      } else {
        await api.post('/admin/rooms', form)
      }
      setShowModal(false)
      fetchRooms()
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa phòng này?')) return
    try {
      await api.delete(`/admin/rooms/${id}`)
      fetchRooms()
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="page-header">
          <h1 className="admin-title">Quản lý phòng</h1>
          <button className="btn btn-primary" onClick={openCreate}><FaPlus /> Thêm phòng</button>
        </div>

        <div className="admin-toolbar">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <select className="form-control" value={selectedHotel}
              onChange={e => setSelectedHotel(e.target.value)}>
              {hotels.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
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
                  <th>Tên phòng</th>
                  <th>Giá/đêm</th>
                  <th>Sức chứa</th>
                  <th>Số phòng</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td><strong>{r.name}</strong></td>
                    <td>{formatPrice(r.price)}</td>
                    <td>{r.capacity} người</td>
                    <td>{r.total_rooms}</td>
                    <td>
                      <span className={`badge ${r.status === 'available' ? 'badge-success' : 'badge-danger'}`}>
                        {r.status === 'available' ? 'Khả dụng' : 'Không khả dụng'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(r)}><FaEdit /></button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {rooms.length === 0 && (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40 }}>Chưa có phòng nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal admin-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editing ? 'Sửa phòng' : 'Thêm phòng'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Khách sạn</label>
                    <select className="form-control" value={form.hotel_id}
                      onChange={e => setForm(p => ({ ...p, hotel_id: e.target.value }))}>
                      {hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tên phòng *</label>
                    <input className="form-control" value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label>Mô tả</label>
                    <textarea className="form-control" rows="2" value={form.description}
                      onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Giá/đêm (VNĐ) *</label>
                      <input type="number" className="form-control" value={form.price}
                        onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Sức chứa</label>
                      <input type="number" className="form-control" value={form.capacity} min="1"
                        onChange={e => setForm(p => ({ ...p, capacity: parseInt(e.target.value) }))} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tổng số phòng</label>
                      <input type="number" className="form-control" value={form.total_rooms} min="1"
                        onChange={e => setForm(p => ({ ...p, total_rooms: parseInt(e.target.value) }))} />
                    </div>
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select className="form-control" value={form.status}
                        onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                        <option value="available">Khả dụng</option>
                        <option value="unavailable">Không khả dụng</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>URL hình ảnh</label>
                    <input className="form-control" value={form.image_url}
                      onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary">{editing ? 'Cập nhật' : 'Thêm'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
