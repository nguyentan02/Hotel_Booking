import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaFilter, FaTimes } from 'react-icons/fa'
import SearchBar from '../components/SearchBar'
import HotelCard from '../components/HotelCard'
import api from '../services/api'
import './SearchResults.css'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [hotels, setHotels] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [amenities, setAmenities] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Filters
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    check_in: searchParams.get('check_in') || '',
    check_out: searchParams.get('check_out') || '',
    min_price: '',
    max_price: '',
    star_rating: '',
    selectedAmenities: [],
    page: 1
  })

  useEffect(() => {
    api.get('/hotels/amenities').then(res => setAmenities(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      city: searchParams.get('city') || prev.city,
      check_in: searchParams.get('check_in') || prev.check_in,
      check_out: searchParams.get('check_out') || prev.check_out,
      page: 1
    }))
  }, [searchParams])

  useEffect(() => {
    fetchHotels()
  }, [filters.page, filters.city, filters.check_in, filters.check_out])

  const fetchHotels = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.city) params.set('city', filters.city)
      if (filters.check_in) params.set('check_in', filters.check_in)
      if (filters.check_out) params.set('check_out', filters.check_out)
      if (filters.min_price) params.set('min_price', filters.min_price)
      if (filters.max_price) params.set('max_price', filters.max_price)
      if (filters.star_rating) params.set('star_rating', filters.star_rating)
      if (filters.selectedAmenities.length > 0) params.set('amenities', filters.selectedAmenities.join(','))
      params.set('page', filters.page)

      const res = await api.get(`/hotels?${params.toString()}`)
      setHotels(res.data.hotels)
      setPagination(res.data.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    setFilters(prev => ({ ...prev, page: 1 }))
    fetchHotels()
    setShowFilters(false)
  }

  const toggleAmenity = (id) => {
    setFilters(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(id)
        ? prev.selectedAmenities.filter(a => a !== id)
        : [...prev.selectedAmenities, id]
    }))
  }

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-page-bar">
          <SearchBar initialValues={{
            city: filters.city,
            check_in: filters.check_in,
            check_out: filters.check_out
          }} />
        </div>

        <div className="search-layout">
          {/* Filters sidebar */}
          <aside className={`filters-panel ${showFilters ? 'open' : ''}`}>
            <div className="filters-header">
              <h3><FaFilter /> Bộ lọc</h3>
              <button className="mobile-close" onClick={() => setShowFilters(false)}><FaTimes /></button>
            </div>

            <div className="filter-group">
              <label>Khoảng giá (VNĐ/đêm)</label>
              <div className="price-range">
                <input type="number" placeholder="Từ" value={filters.min_price}
                  onChange={e => setFilters(p => ({ ...p, min_price: e.target.value }))} />
                <span>-</span>
                <input type="number" placeholder="Đến" value={filters.max_price}
                  onChange={e => setFilters(p => ({ ...p, max_price: e.target.value }))} />
              </div>
            </div>

            <div className="filter-group">
              <label>Hạng sao</label>
              <div className="star-filter">
                {[3, 4, 5].map(s => (
                  <button key={s}
                    className={`star-btn ${filters.star_rating === String(s) ? 'active' : ''}`}
                    onClick={() => setFilters(p => ({ ...p, star_rating: p.star_rating === String(s) ? '' : String(s) }))}>
                    {s} ★
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Tiện ích</label>
              <div className="amenity-list">
                {amenities.map(a => (
                  <label key={a.id} className="amenity-check">
                    <input type="checkbox"
                      checked={filters.selectedAmenities.includes(a.id)}
                      onChange={() => toggleAmenity(a.id)} />
                    {a.name}
                  </label>
                ))}
              </div>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleFilter}>Áp dụng</button>
          </aside>

          {/* Results */}
          <div className="search-results">
            <div className="results-header">
              <p>{pagination.total || 0} khách sạn được tìm thấy</p>
              <button className="btn btn-secondary btn-sm mobile-filter-btn"
                onClick={() => setShowFilters(true)}>
                <FaFilter /> Lọc
              </button>
            </div>

            {loading ? (
              <div className="loading"><div className="spinner"></div></div>
            ) : hotels.length === 0 ? (
              <div className="no-results">
                <h3>Không tìm thấy khách sạn</h3>
                <p>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            ) : (
              <>
                <div className="grid-3">
                  {hotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button disabled={pagination.page <= 1}
                      onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}>
                      Trước
                    </button>
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <button key={i + 1} className={pagination.page === i + 1 ? 'active' : ''}
                        onClick={() => setFilters(p => ({ ...p, page: i + 1 }))}>
                        {i + 1}
                      </button>
                    ))}
                    <button disabled={pagination.page >= pagination.totalPages}
                      onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}>
                      Sau
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
